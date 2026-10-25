import { prisma } from "@/lib/prisma";

export { referralDiscountPercent } from "@/lib/referralPricing";

/** A referral only counts once the invited friend has actually paid for something. */
export async function countSuccessfulReferrals(userId: string): Promise<number> {
  return prisma.user.count({
    where: {
      referredByUserId: userId,
      purchases: { some: { status: { in: ["paid", "active"] } } },
    },
  });
}

export function referralLink(userId: string, siteUrl: string): string {
  return `${siteUrl}/?ref=${userId}`;
}
