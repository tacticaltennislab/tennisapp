import { CREDIT_RULES, creditsForMatchMinutes } from "@/lib/plans";

/** No server imports here, so the upload form can show the same cost the server charges. */
export type FootageKind = "stroke" | "match" | "training";

export function isFootageKind(value: unknown): value is FootageKind {
  return value === "stroke" || value === "match" || value === "training";
}

/**
 * Analyses (credits in the ledger) one upload costs: always 1, whether it is a stroke analysis or a
 * full match or training recording. Nothing is charged by video length. The length limit for match and
 * training footage is checked separately, by `isTooLongForAnalysis`. The numbers come from src/lib/plans.ts.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept so callers can still pass the length
export function creditsNeeded(footageType: FootageKind, _durationMinutes?: number): number {
  return footageType === "stroke" ? CREDIT_RULES.strokeAnalysisCredits : CREDIT_RULES.matchRecordingCredits;
}

/**
 * True when a match or training recording is longer than one analysis covers (more than
 * CREDIT_RULES.maxMatchMinutes). A stroke analysis has no length limit, and an unknown length passes.
 */
export function isTooLongForAnalysis(footageType: FootageKind, durationMinutes?: number): boolean {
  if (footageType === "stroke") return false;
  if (typeof durationMinutes !== "number" || !Number.isFinite(durationMinutes) || durationMinutes <= 0) return false;
  return creditsForMatchMinutes(durationMinutes) === null;
}
