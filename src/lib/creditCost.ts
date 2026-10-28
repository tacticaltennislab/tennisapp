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
