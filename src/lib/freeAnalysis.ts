import { FREE_ACCOUNT_CREDITS } from "@/lib/plans";

/**
 * Free analyses per account. A free analysis is one credit (src/lib/plans.ts), so the free credit
 * every new account gets is what sets this number.
 */
export const FREE_ANALYSES_PER_ACCOUNT = FREE_ACCOUNT_CREDITS;

export const FOOTAGE_TYPES = ["match", "training"] as const;
export type FootageType = (typeof FOOTAGE_TYPES)[number];

export function isFootageType(value: unknown): value is FootageType {
  return typeof value === "string" && (FOOTAGE_TYPES as readonly string[]).includes(value);
}
