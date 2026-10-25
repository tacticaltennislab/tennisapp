/** One free analysis per account. Change this number to change the offer. */
export const FREE_ANALYSES_PER_ACCOUNT = 1;

export const FOOTAGE_TYPES = ["match", "training"] as const;
export type FootageType = (typeof FOOTAGE_TYPES)[number];

export function isFootageType(value: unknown): value is FootageType {
  return typeof value === "string" && (FOOTAGE_TYPES as readonly string[]).includes(value);
}
