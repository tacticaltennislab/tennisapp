import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import {
  InsufficientCreditsError,
  adjustCredits,
  consumeCredits,
  creditsNeeded,
  getBalance,
  grantCredits,
  grantFreeSignupCredit,
  refundSubmissionCredits,
  resolveCreditAccount,
} from "@/lib/credits";
import { processStripeEvent } from "@/lib/stripeEvents";

// These tests use the real database with throwaway rows (everything is tagged with RUN and removed in
// afterAll; deleting the users and academies cascades to their ledger rows).
const RUN = `e2e-credits-${Date.now()}`;
const email = (n: string) => `${RUN}-${n}@e2e-test.invalid`;

const userIds: string[] = [];
const academyIds: string[] = [];

async function newUser(n: string) {
  const user = await prisma.user.create({ data: { email: email(n), name: `Test ${n}` } });
  userIds.push(user.id);
  return user;
}
async function newAcademy(n: string) {
  const academy = await prisma.academy.create({ data: { name: `${RUN} ${n}` } });
  academyIds.push(academy.id);
  return academy;
}
async function newSubmission(userId: string) {
  return prisma.videoSubmission.create({
    data: { userId, storagePath: `videos/${RUN}.mp4`, fileName: "t.mp4", fileType: "video/mp4", fileSize: 1 },
  });
}

afterAll(async () => {
  await prisma.academy.deleteMany({ where: { id: { in: academyIds } } });
  await prisma.user.deleteMany({ where: { id: { in: userIds } } });
  expect(await prisma.user.count({ where: { email: { startsWith: RUN } } })).toBe(0);
  await prisma.$disconnect();
});

describe("creditsNeeded", () => {
  it("is 1 for a stroke analysis, whatever the length", () => {
    expect(creditsNeeded("stroke")).toBe(1);
    expect(creditsNeeded("stroke", 400)).toBe(1);
  });
  it("is one credit per started 60 minutes of match or training footage", () => {
    expect(creditsNeeded("match", 45)).toBe(1);
    expect(creditsNeeded("match", 60)).toBe(1);
    expect(creditsNeeded("match", 61)).toBe(2);
    expect(creditsNeeded("match", 120)).toBe(2);
    expect(creditsNeeded("training", 90)).toBe(2);
  });
  it("is at least 1 when the length is unknown", () => {
    expect(creditsNeeded("match")).toBe(1);
    expect(creditsNeeded("training", NaN)).toBe(1);
  });
});

describe("grantCredits and getBalance", () => {
  it("a balance is the sum of the ledger", async () => {
    const u = await newUser("sum");
    expect(await getBalance({ userId: u.id })).toBe(0);
    await grantCredits({ account: { userId: u.id }, amount: 3, reason: "purchase" });
    await grantCredits({ account: { userId: u.id }, amount: 2, reason: "admin_adjustment", note: "bonus" });
    expect(await getBalance({ userId: u.id })).toBe(5);
  });

  it("the same idempotency key never grants twice", async () => {
    const u = await newUser("idem");
    const input = { account: { userId: u.id }, amount: 4, reason: "purchase" as const, idempotencyKey: `${RUN}:idem` };
    expect((await grantCredits(input)).granted).toBe(true);
    expect((await grantCredits(input)).granted).toBe(false);
    expect(await getBalance({ userId: u.id })).toBe(4);
    expect(await prisma.creditLedger.count({ where: { idempotencyKey: `${RUN}:idem` } })).toBe(1);
  });

  it("rejects zero, negative and fractional grants", async () => {
    const u = await newUser("bad");
    for (const amount of [0, -1, 1.5]) {
      await expect(grantCredits({ account: { userId: u.id }, amount, reason: "purchase" })).rejects.toThrow();
    }
  });

  it("the free signup credit is granted once per account", async () => {
    const u = await newUser("free");
    expect((await grantFreeSignupCredit(u.id)).granted).toBe(true);
    expect((await grantFreeSignupCredit(u.id)).granted).toBe(false);
    expect(await getBalance({ userId: u.id })).toBe(1);
    const row = await prisma.creditLedger.findFirstOrThrow({ where: { userId: u.id } });
    expect(row.reason).toBe("free_signup");
  });

  it("user and academy balances are separate", async () => {
    const u = await newUser("sep");
    const a = await newAcademy("sep");
    await grantCredits({ account: { userId: u.id }, amount: 1, reason: "free_signup" });
    await grantCredits({ account: { academyId: a.id }, amount: 8, reason: "subscription_renewal" });
    expect(await getBalance({ userId: u.id })).toBe(1);
    expect(await getBalance({ academyId: a.id })).toBe(8);
  });
});

describe("consumeCredits", () => {
  it("takes credits off the balance and records a submission row", async () => {
    const u = await newUser("consume");
    await grantCredits({ account: { userId: u.id }, amount: 3, reason: "purchase" });
    const sub = await newSubmission(u.id);
    const { balance } = await consumeCredits({ account: { userId: u.id }, amount: 2, videoSubmissionId: sub.id });
    expect(balance).toBe(1);
    expect(await getBalance({ userId: u.id })).toBe(1);
    const row = await prisma.creditLedger.findFirstOrThrow({ where: { videoSubmissionId: sub.id } });
    expect(row).toMatchObject({ delta: -2, reason: "submission" });
  });

  it("fails cleanly when the balance is too low and writes nothing", async () => {
    const u = await newUser("short");
    await grantCredits({ account: { userId: u.id }, amount: 1, reason: "free_signup" });
    const err = await consumeCredits({ account: { userId: u.id }, amount: 2 }).catch((e) => e);
    expect(err).toBeInstanceOf(InsufficientCreditsError);
    expect(err.message).toBe("You need 1 more credit");
    expect(err).toMatchObject({ needed: 2, balance: 1, missing: 1 });
    expect(await getBalance({ userId: u.id })).toBe(1);
    expect(await prisma.creditLedger.count({ where: { userId: u.id, delta: { lt: 0 } } })).toBe(0);
  });

  it("says 'credits' when more than one is missing", async () => {
    const u = await newUser("short2");
    const err = await consumeCredits({ account: { userId: u.id }, amount: 3 }).catch((e) => e);
    expect(err.message).toBe("You need 3 more credits");
  });

  it("two submissions can never both spend the last credit", async () => {
    const u = await newUser("race");
    await grantCredits({ account: { userId: u.id }, amount: 1, reason: "free_signup" });
    const results = await Promise.allSettled([
      consumeCredits({ account: { userId: u.id }, amount: 1 }),
      consumeCredits({ account: { userId: u.id }, amount: 1 }),
      consumeCredits({ account: { userId: u.id }, amount: 1 }),
    ]);
    expect(results.filter((r) => r.status === "fulfilled")).toHaveLength(1);
    expect(results.filter((r) => r.status === "rejected")).toHaveLength(3 - 1);
    expect(await getBalance({ userId: u.id })).toBe(0);
  });

  it("inside a transaction a failed consume rolls the submission back with it", async () => {
    const u = await newUser("tx");
    const before = await prisma.videoSubmission.count({ where: { userId: u.id } });
    await expect(
      prisma.$transaction(async (tx) => {
        const created = await tx.videoSubmission.create({
          data: { userId: u.id, storagePath: "x", fileName: "x.mp4", fileType: "video/mp4", fileSize: 1 },
        });
        await consumeCredits({ account: { userId: u.id }, amount: 1, videoSubmissionId: created.id }, tx);
      })
    ).rejects.toBeInstanceOf(InsufficientCreditsError);
    expect(await prisma.videoSubmission.count({ where: { userId: u.id } })).toBe(before);
  });

  it("an academy pays from the academy balance only", async () => {
    const u = await newUser("acad");
    const a = await newAcademy("acad");
    await grantCredits({ account: { academyId: a.id }, amount: 8, reason: "subscription_renewal" });
    await consumeCredits({ account: { academyId: a.id }, amount: 2 });
    expect(await getBalance({ academyId: a.id })).toBe(6);
    await expect(consumeCredits({ account: { userId: u.id }, amount: 1 })).rejects.toBeInstanceOf(InsufficientCreditsError);
  });
});

describe("refundSubmissionCredits", () => {
  it("gives the credits back once, to whoever paid", async () => {
    const u = await newUser("refund");
    await grantCredits({ account: { userId: u.id }, amount: 2, reason: "purchase" });
    const sub = await newSubmission(u.id);
    await consumeCredits({ account: { userId: u.id }, amount: 2, videoSubmissionId: sub.id });
    expect(await getBalance({ userId: u.id })).toBe(0);

    expect(await refundSubmissionCredits(sub.id, "Rejected")).toBe(2);
    expect(await getBalance({ userId: u.id })).toBe(2);
    const row = await prisma.creditLedger.findFirstOrThrow({ where: { videoSubmissionId: sub.id, reason: "refund" } });
    expect(row.delta).toBe(2);

    // A second refund (a double click, a retry) changes nothing.
    expect(await refundSubmissionCredits(sub.id, "Rejected")).toBe(0);
    expect(await getBalance({ userId: u.id })).toBe(2);
  });

  it("refunds the academy when the academy paid", async () => {
    const u = await newUser("refund-academy");
    const a = await newAcademy("refund-academy");
    await grantCredits({ account: { academyId: a.id }, amount: 8, reason: "subscription_renewal" });
    const sub = await newSubmission(u.id);
    await consumeCredits({ account: { academyId: a.id }, amount: 1, videoSubmissionId: sub.id });
    await refundSubmissionCredits(sub.id, undefined);
    expect(await getBalance({ academyId: a.id })).toBe(8);
    expect(await getBalance({ userId: u.id })).toBe(0);
  });

  it("does nothing for a submission that cost nothing", async () => {
    const u = await newUser("refund-none");
    const sub = await newSubmission(u.id);
    expect(await refundSubmissionCredits(sub.id, undefined)).toBe(0);
    expect(await getBalance({ userId: u.id })).toBe(0);
  });
});

describe("adjustCredits", () => {
  it("adds and removes credits with a note, but never below zero", async () => {
    const u = await newUser("adjust");
    expect((await adjustCredits({ account: { userId: u.id }, delta: 5, note: "goodwill" })).balance).toBe(5);
    expect((await adjustCredits({ account: { userId: u.id }, delta: -2, note: "correction" })).balance).toBe(3);
    await expect(adjustCredits({ account: { userId: u.id }, delta: -4, note: "too much" })).rejects.toBeInstanceOf(
      InsufficientCreditsError
    );
    expect(await getBalance({ userId: u.id })).toBe(3);
    const rows = await prisma.creditLedger.findMany({ where: { userId: u.id }, orderBy: { createdAt: "asc" } });
    expect(rows.map((r) => [r.delta, r.reason])).toEqual([[5, "admin_adjustment"], [-2, "admin_adjustment"]]);
    expect(rows[0].note).toContain("goodwill");
  });
});

describe("resolveCreditAccount", () => {
  it("uses the user's own credits, or an academy's only for its members and players", async () => {
    const owner = await newUser("rc-owner");
    const player = await newUser("rc-player");
    const stranger = await newUser("rc-stranger");
    const a = await newAcademy("rc");
    await prisma.academyMember.create({ data: { academyId: a.id, userId: owner.id, role: "owner" } });
    await prisma.academyPlayer.create({ data: { academyId: a.id, userId: player.id } });

    expect(await resolveCreditAccount(stranger.id, null)).toEqual({ userId: stranger.id });
    expect(await resolveCreditAccount(owner.id, a.id)).toEqual({ academyId: a.id });
    expect(await resolveCreditAccount(player.id, a.id)).toEqual({ academyId: a.id });
    expect(await resolveCreditAccount(stranger.id, a.id)).toBeNull();
  });
});

describe("Stripe webhook processing", () => {
  const notify = vi.fn(async () => undefined);
  let userId: string;

  beforeAll(async () => {
    userId = (await newUser("webhook")).id;
  });

  const event = (type: string, object: unknown) => ({ id: `evt_${RUN}`, type, data: { object } }) as unknown as Stripe.Event;

  it("a paid player purchase grants that product's credits, and replaying the event grants nothing more", async () => {
    const sessionId = `cs_${RUN}_full`;
    await prisma.purchase.create({
      data: { userId, planName: "Match Analysis Full", amount: 17900, mode: "payment", stripeSessionId: sessionId },
    });
    const paid = event("checkout.session.completed", {
      id: sessionId,
      mode: "payment",
      customer: "cus_test",
      subscription: null,
      metadata: { planId: "match-analysis-full", credits: "999" },
    });

    await processStripeEvent(paid, { notify });
    expect(await getBalance({ userId })).toBe(2); // from the config (2), not from the metadata (999)
    await processStripeEvent(paid, { notify });
    await processStripeEvent(paid, { notify });
    expect(await getBalance({ userId })).toBe(2);

    const purchase = await prisma.purchase.findUniqueOrThrow({ where: { stripeSessionId: sessionId } });
    expect(purchase.status).toBe("paid");
    const row = await prisma.creditLedger.findFirstOrThrow({ where: { purchaseId: purchase.id } });
    expect(row).toMatchObject({ delta: 2, reason: "purchase", userId });
  });

  it("an add on grants no credits", async () => {
    const sessionId = `cs_${RUN}_addon`;
    await prisma.purchase.create({
      data: { userId, planName: "4 Week Training Program", amount: 5000, mode: "payment", stripeSessionId: sessionId },
    });
    const before = await getBalance({ userId });
    await processStripeEvent(
      event("checkout.session.completed", { id: sessionId, mode: "payment", metadata: { planId: "training-program", credits: "0" } }),
      { notify }
    );
    expect(await getBalance({ userId })).toBe(before);
  });

  it("an academy subscription is recorded, and each paid invoice grants the plan's credits once", async () => {
    const academy = await newAcademy("sub");
    const subId = `sub_${RUN}`;
    const periodEnd = Math.floor(Date.now() / 1000) + 30 * 86400;

    await processStripeEvent(
      event("checkout.session.completed", {
        id: `cs_${RUN}_sub`,
        mode: "subscription",
        customer: "cus_acad",
        subscription: subId,
        // creditsPerPeriod in the metadata is ignored: the config decides (8 per month x 3 months).
        metadata: { kind: "academy_subscription", academyId: academy.id, planKey: "academy-starter", billingInterval: "quarterly", creditsPerPeriod: "9999" },
      }),
      { notify, getSubscription: async () => ({ items: { data: [{ current_period_end: periodEnd }] } }) as unknown as Stripe.Subscription }
    );
    const subscription = await prisma.academySubscription.findUniqueOrThrow({ where: { stripeSubscriptionId: subId } });
    expect(subscription).toMatchObject({ academyId: academy.id, planKey: "academy-starter", billingInterval: "quarterly", creditsPerPeriod: 24 });
    expect(subscription.currentPeriodEnd?.getTime()).toBe(periodEnd * 1000);
    expect(await getBalance({ academyId: academy.id })).toBe(0); // credits come with the invoice

    const invoice = (id: string, end: number) => ({
      id,
      parent: { subscription_details: { subscription: subId, metadata: { kind: "academy_subscription" } } },
      lines: { data: [{ period: { end } }] },
    });
    await processStripeEvent(event("invoice.paid", invoice(`in_${RUN}_1`, periodEnd)), { notify });
    await processStripeEvent(event("invoice.paid", invoice(`in_${RUN}_1`, periodEnd)), { notify }); // replay
    expect(await getBalance({ academyId: academy.id })).toBe(24);

    await processStripeEvent(event("invoice.paid", invoice(`in_${RUN}_2`, periodEnd + 90 * 86400)), { notify }); // next renewal
    expect(await getBalance({ academyId: academy.id })).toBe(48);

    const renewals = await prisma.creditLedger.findMany({ where: { academyId: academy.id, reason: "subscription_renewal" } });
    expect(renewals).toHaveLength(2);
    const updated = await prisma.academySubscription.findUniqueOrThrow({ where: { stripeSubscriptionId: subId } });
    expect(updated.currentPeriodEnd?.getTime()).toBe((periodEnd + 90 * 86400) * 1000);

    // Cancelling keeps the credits that are left and just updates the status.
    await processStripeEvent(event("customer.subscription.deleted", { id: subId, status: "canceled", items: { data: [] } }));
    expect((await prisma.academySubscription.findUniqueOrThrow({ where: { stripeSubscriptionId: subId } })).status).toBe("canceled");
    expect(await getBalance({ academyId: academy.id })).toBe(48);
  });

  it("an invoice for an academy subscription we have not recorded yet is retried, not dropped", async () => {
    const invoice = {
      id: `in_${RUN}_early`,
      parent: { subscription_details: { subscription: `sub_${RUN}_early`, metadata: { kind: "academy_subscription" } } },
      lines: { data: [] },
    };
    await expect(processStripeEvent(event("invoice.paid", invoice), { notify })).rejects.toThrow(/not recorded yet/);
  });

  it("an invoice for some other subscription is ignored", async () => {
    const invoice = { id: `in_${RUN}_other`, parent: { subscription_details: { subscription: `sub_${RUN}_other`, metadata: {} } }, lines: { data: [] } };
    await expect(processStripeEvent(event("invoice.paid", invoice), { notify })).resolves.toBeUndefined();
    expect(await prisma.creditLedger.count({ where: { idempotencyKey: `invoice:in_${RUN}_other` } })).toBe(0);
  });
});
