import { CREDIT_RULES } from "@/lib/plans";

/** No server imports here, so the upload form can show the same cost the server charges. */
export type FootageKind = "stroke" | "match" | "training";

export function isFootageKind(value: unknown): value is FootageKind {
  return value === "stroke" || value === "match" || value === "training";
}

/**
 * Credits an analysis costs: one for a stroke analysis, and one per started 60 minutes of match or
 * training footage (a full match of up to 2 hours is 2). The numbers come from src/lib/plans.ts.
 */
export function creditsNeeded(footageType: FootageKind, durationMinutes?: number): number {
  if (footageType === "stroke") return CREDIT_RULES.strokeAnalysisCredits;
  const minutes = Number.isFinite(durationMinutes) && durationMinutes! > 0 ? durationMinutes! : 0;
  return Math.max(1, Math.ceil(minutes / CREDIT_RULES.minutesPerCredit));
}

/**
 * Checks what a submission really costs against what was charged, now that the coach has seen the
 * video and read its true length. Pure maths first, so it can be tested and shown in the editor.
 */
export interface DurationCheck {
  analysisType: string | null;
  declaredMinutes: number | null;
  actualMinutes: number;
  creditsDeclared: number;
  creditsActual: number;
  /** What the account has paid for this submission so far (charges minus refunds and corrections). */
  creditsCharged: number;
  /** Positive: the player owes credits. Negative: credits should go back. 0: the charge is right. */
  difference: number;
}

export function checkDuration(input: {
  analysisType: string | null;
  declaredMinutes: number | null;
  actualDurationSec: number;
  creditsCharged: number;
}): DurationCheck {
  const kind = isFootageKind(input.analysisType) ? input.analysisType : "stroke";
  const actualMinutes = input.actualDurationSec / 60;
  const creditsActual = creditsNeeded(kind, actualMinutes);
  const creditsDeclared = creditsNeeded(kind, input.declaredMinutes ?? undefined);
  return {
    analysisType: input.analysisType,
    declaredMinutes: input.declaredMinutes,
    actualMinutes,
    creditsDeclared,
    creditsActual,
    creditsCharged: input.creditsCharged,
    // A stroke analysis costs one credit whatever the length, so only match and training footage can differ.
    difference: kind === "stroke" ? 0 : creditsActual - input.creditsCharged,
  };
}

