/**
 * Referral tiers: 1 referral -> 20% off, 2 -> 40% off, 5 -> free (with caps on
 * the highest-value plans so the giveaway doesn't wipe out margin entirely).
 *
 * Pure/no server-only imports so it can be shared with client components.
 */
export function referralDiscountPercent(referralCount: number, planId: string): number {
  if (referralCount >= 5) {
    if (planId === "pro-tour") return 40;
    if (planId === "match-iq-full") return 50;
    return 100;
  }
  if (referralCount >= 2) return 40;
  if (referralCount >= 1) return 20;
  return 0;
}
