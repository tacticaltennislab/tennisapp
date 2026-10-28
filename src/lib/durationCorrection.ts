import { prisma } from "@/lib/prisma";
import { checkDuration, type DurationCheck } from "@/lib/creditCost";
import {
  InsufficientCreditsError,
  consumeCredits,
  grantCredits,
  type CreditAccount,
  type Db,
} from "@/lib/credits";

/** Net credits a submission has cost so far: the sum of every ledger row linked to it, sign flipped. */
export async function creditsChargedFor(videoSubmissionId: string, db: Db = prisma): Promise<number> {
  const sum = await db.creditLedger.aggregate({ where: { videoSubmissionId }, _sum: { delta: true } });
  return -(sum._sum.delta ?? 0);
}

export class NoChargeToCorrectError extends Error {
  constructor() {
    super("This submission has no credit charge to correct (it was sent before credits existed).");
  }
}

/**
 * Brings the charge in line with the real length: charges the missing credits to the account that paid,
 * or refunds the extra ones, as ledger rows with a note that says why. Running it twice changes nothing
 * the second time, because the difference is recomputed from the ledger each time. A charge fails with
 * InsufficientCreditsError (and writes nothing) if the account cannot cover the missing credits.
 */
export async function applyChargeCorrection(
  videoSubmissionId: string,
  actualDurationSec: number,
  db: typeof prisma = prisma
): Promise<DurationCheck & { applied: number }> {
  if (!Number.isFinite(actualDurationSec) || actualDurationSec <= 0) {
    throw new Error("The video length must be a positive number of seconds.");
  }
  return db.$transaction(async (tx) => {
    const submission = await tx.videoSubmission.findUniqueOrThrow({ where: { id: videoSubmissionId } });
    const payer = await tx.creditLedger.findFirst({
      where: { videoSubmissionId, reason: "submission" },
      orderBy: { createdAt: "asc" },
      select: { userId: true, academyId: true },
    });
    if (!payer) throw new NoChargeToCorrectError();
    const account: CreditAccount = payer.userId ? { userId: payer.userId } : { academyId: payer.academyId! };

    const check = checkDuration({
      analysisType: submission.analysisType,
      declaredMinutes: submission.declaredMinutes,
      actualDurationSec,
      creditsCharged: await creditsChargedFor(videoSubmissionId, tx),
    });

    await tx.videoSubmission.update({ where: { id: videoSubmissionId }, data: { actualDurationSec } });
    if (check.difference === 0) return { ...check, applied: 0 };

    const note = `Duration correction: the video is ${Math.round(check.actualMinutes)} min, declared ${
      check.declaredMinutes != null ? `${Math.round(check.declaredMinutes)} min` : "not stated"
    } (${check.creditsActual} credit${check.creditsActual === 1 ? "" : "s"} instead of ${check.creditsCharged})`;

    if (check.difference > 0) {
      await consumeCredits({ account, amount: check.difference, videoSubmissionId, note }, tx);
    } else {
      await grantCredits({ account, amount: -check.difference, reason: "refund", videoSubmissionId, note }, tx);
    }
    return { ...check, applied: check.difference };
  });
}

export { InsufficientCreditsError };
