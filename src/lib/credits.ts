import type { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { FREE_ACCOUNT_CREDITS } from "@/lib/plans";
import { creditsNeeded, isFootageKind, type FootageKind } from "@/lib/creditCost";

// Re-exported so server code can import every credit helper from one place.
export { creditsNeeded, isFootageKind };
export type { FootageKind };

/**
 * Credit ledger. Every change to a balance is one CreditLedger row and a balance is the sum of
 * `delta`, so history is never overwritten. Server only: the client formats credits with
 * src/lib/creditFormat.ts.
 *
 * Grants are idempotent through `idempotencyKey` (a unique column): the same signup, Stripe
 * checkout session or invoice can be processed twice and still writes one row.
 */

export type CreditAccount = { userId: string } | { academyId: string };

export type CreditReason =
  | "free_signup"
  | "purchase"
  | "subscription_renewal"
  | "submission"
  | "refund"
  | "admin_adjustment";

/** A client or a transaction: every helper takes one so callers can compose them in a transaction. */
export type Db = PrismaClient | Prisma.TransactionClient;

export class InsufficientCreditsError extends Error {
  readonly needed: number;
  readonly balance: number;
  /** How many more credits are needed. */
  readonly missing: number;

  constructor(needed: number, balance: number) {
    const missing = needed - balance;
    super(`You need ${missing} more credit${missing === 1 ? "" : "s"}`);
    this.name = "InsufficientCreditsError";
    this.needed = needed;
    this.balance = balance;
    this.missing = missing;
  }
}

function where(account: CreditAccount) {
  return "userId" in account ? { userId: account.userId } : { academyId: account.academyId };
}

function accountKey(account: CreditAccount): string {
  return "userId" in account ? `user:${account.userId}` : `academy:${account.academyId}`;
}

function isClient(db: Db): db is PrismaClient {
  return "$transaction" in db;
}

/** Runs `fn` in a transaction (or inside the one `db` already is). */
async function inTransaction<T>(db: Db, fn: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
  return isClient(db) ? db.$transaction((tx) => fn(tx)) : fn(db);
}

/** Current balance: the sum of every ledger row for the account. */
export async function getBalance(account: CreditAccount, db: Db = prisma): Promise<number> {
  const sum = await db.creditLedger.aggregate({ where: where(account), _sum: { delta: true } });
  return sum._sum.delta ?? 0;
}

export interface GrantInput {
  account: CreditAccount;
  /** Credits to add (positive). */
  amount: number;
  reason: Exclude<CreditReason, "submission">;
  purchaseId?: string;
  videoSubmissionId?: string;
  note?: string;
  /** Same key, same grant: the second call writes nothing and returns granted: false. */
  idempotencyKey?: string;
}

/** Adds credits. Safe to call twice with the same idempotencyKey. */
export async function grantCredits(input: GrantInput, db: Db = prisma): Promise<{ granted: boolean }> {
  if (!Number.isInteger(input.amount) || input.amount <= 0) {
    throw new Error("grantCredits needs a positive whole number of credits");
  }
  // createMany + skipDuplicates is INSERT ... ON CONFLICT DO NOTHING: race safe, and it does not
  // abort an enclosing transaction the way a caught unique violation would.
  const created = await db.creditLedger.createMany({
    data: [
      {
        ...where(input.account),
        delta: input.amount,
        reason: input.reason,
        purchaseId: input.purchaseId,
        videoSubmissionId: input.videoSubmissionId,
        note: input.note,
        idempotencyKey: input.idempotencyKey,
      },
    ],
    skipDuplicates: true,
  });
  return { granted: created.count === 1 };
}

export interface ConsumeInput {
  account: CreditAccount;
  amount: number;
  videoSubmissionId?: string;
  note?: string;
  idempotencyKey?: string;
}

/**
 * Takes credits off a balance, inside a transaction. Fails cleanly with InsufficientCreditsError
 * (and writes nothing) if the balance is too low. Concurrent calls for the same account are
 * serialised with a transaction level advisory lock, so two submissions can never both spend the
 * last credit.
 */
export async function consumeCredits(input: ConsumeInput, db: Db = prisma): Promise<{ balance: number }> {
  if (!Number.isInteger(input.amount) || input.amount <= 0) {
    throw new Error("consumeCredits needs a positive whole number of credits");
  }
  return inTransaction(db, async (tx) => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${accountKey(input.account)}))`;

    if (input.idempotencyKey) {
      const existing = await tx.creditLedger.findUnique({ where: { idempotencyKey: input.idempotencyKey } });
      if (existing) return { balance: await getBalance(input.account, tx) };
    }

    const balance = await getBalance(input.account, tx);
    if (balance < input.amount) throw new InsufficientCreditsError(input.amount, balance);

    await tx.creditLedger.create({
      data: {
        ...where(input.account),
        delta: -input.amount,
        reason: "submission",
        videoSubmissionId: input.videoSubmissionId,
        note: input.note,
        idempotencyKey: input.idempotencyKey,
      },
    });
    return { balance: balance - input.amount };
  });
}

/**
 * Gives back what a submission has cost: per account, the credits still outstanding (charges minus any
 * refunds and corrections already made for it), so a submission is never refunded more than it cost.
 * Idempotent: once refunded, a second call finds nothing outstanding. Returns the credits refunded.
 */
export async function refundSubmissionCredits(
  videoSubmissionId: string,
  note: string | undefined,
  db: Db = prisma
): Promise<number> {
  return inTransaction(db, async (tx) => {
    const rows = await tx.creditLedger.groupBy({
      by: ["userId", "academyId"],
      where: { videoSubmissionId },
      _sum: { delta: true },
    });
    let refunded = 0;
    for (const row of rows) {
      const outstanding = -(row._sum.delta ?? 0);
      if (outstanding <= 0) continue;
      const account: CreditAccount = row.userId ? { userId: row.userId } : { academyId: row.academyId! };
      const { granted } = await grantCredits(
        {
          account,
          amount: outstanding,
          reason: "refund",
          videoSubmissionId,
          note,
          idempotencyKey: `refund:${videoSubmissionId}:${accountKey(account)}`,
        },
        tx
      );
      if (granted) refunded += outstanding;
    }
    return refunded;
  });
}

/** The free credit every new account gets, once (reason free_signup). */
export async function grantFreeSignupCredit(userId: string, db: Db = prisma): Promise<{ granted: boolean }> {
  return grantCredits(
    {
      account: { userId },
      amount: FREE_ACCOUNT_CREDITS,
      reason: "free_signup",
      idempotencyKey: `free_signup:${userId}`,
    },
    db
  );
}

/** Manual correction by an admin. A negative adjustment may not take the balance below zero. */
export async function adjustCredits(
  input: { account: CreditAccount; delta: number; note: string; adminId?: string },
  db: Db = prisma
): Promise<{ balance: number }> {
  if (!Number.isInteger(input.delta) || input.delta === 0) {
    throw new Error("An adjustment needs a non zero whole number of credits");
  }
  return inTransaction(db, async (tx) => {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${accountKey(input.account)}))`;
    const balance = await getBalance(input.account, tx);
    if (balance + input.delta < 0) throw new InsufficientCreditsError(-input.delta, balance);
    await tx.creditLedger.create({
      data: {
        ...where(input.account),
        delta: input.delta,
        reason: "admin_adjustment",
        note: input.adminId ? `${input.note} (admin ${input.adminId})` : input.note,
      },
    });
    return { balance: balance + input.delta };
  });
}

export interface AcademyCredits {
  id: string;
  name: string;
  balance: number;
  /** When the academy's subscription renews, if it has one. */
  renewsAt: Date | null;
  subscriptionStatus: string | null;
}

/** The academies a user belongs to (as owner, coach or player) with their balances and renewal dates. */
export async function getAcademyCreditsForUser(userId: string, db: Db = prisma): Promise<AcademyCredits[]> {
  const academies = await db.academy.findMany({
    where: { OR: [{ members: { some: { userId } } }, { players: { some: { userId } } }] },
    select: {
      id: true,
      name: true,
      subscriptions: { orderBy: { currentPeriodEnd: "desc" }, take: 1, select: { currentPeriodEnd: true, status: true } },
    },
    orderBy: { name: "asc" },
  });
  return Promise.all(
    academies.map(async (a) => ({
      id: a.id,
      name: a.name,
      balance: await getBalance({ academyId: a.id }, db),
      renewsAt: a.subscriptions[0]?.currentPeriodEnd ?? null,
      subscriptionStatus: a.subscriptions[0]?.status ?? null,
    }))
  );
}

/**
 * Which balance pays for a submission: the user's own, or an academy's when `academyId` is given and
 * the user belongs to that academy (as owner, coach or player). Returns null if they are not allowed
 * to use that academy's credits.
 */
export async function resolveCreditAccount(
  userId: string,
  academyId: string | null | undefined,
  db: Db = prisma
): Promise<CreditAccount | null> {
  if (!academyId) return { userId };
  const member = await db.academy.findFirst({
    where: { id: academyId, OR: [{ members: { some: { userId } } }, { players: { some: { userId } } }] },
    select: { id: true },
  });
  return member ? { academyId } : null;
}
