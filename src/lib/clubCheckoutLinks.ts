/**
 * Stripe Payment Links for the club/academy tiers on the pricing page.
 * These are live-mode links created directly in the Stripe dashboard --
 * not wired through /api/checkout like the individual plans, since club
 * deals aren't self-serve in the same way. Order matches the `tiers`
 * array in src/i18n/dictionaries/pricing.ts (clubs.tiers), which is the
 * same across every locale.
 */
export const CLUB_CHECKOUT_LINKS: string[] = [
  "https://buy.stripe.com/bJe9AT8o72hG9gJejRf3a0a", // Club Starter Package
  "https://buy.stripe.com/6oUdR91ZJ9K8fF7cbJf3a0b", // Academy Standard Package
  "https://buy.stripe.com/28EeVd47Re0o2Sl0t1f3a0c", // High Performance Club Package
  "https://buy.stripe.com/eVqaEX7k35tSakN7Vtf3a0d", // Season Package — 3 Months
  "https://buy.stripe.com/3cIeVd1ZJ3lK3Wp2B9f3a0e", // Season Package — 6 Months
];
