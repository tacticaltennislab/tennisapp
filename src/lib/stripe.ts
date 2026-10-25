import Stripe from "stripe";

let stripeClient: Stripe | null = null;

/**
 * Lazily create the Stripe client so builds (e.g. Preview deployments without
 * STRIPE_SECRET_KEY) don't fail at module load. Throws only when called at
 * request time without a key.
 */
export function getStripe(): Stripe {
  if (stripeClient) return stripeClient;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  stripeClient = new Stripe(key);
  return stripeClient;
}

export interface CheckoutPlan {
  name: string;
  amountCents: number;
  mode: "payment" | "subscription";
  interval?: "month";
}

export const CHECKOUT_PLANS: Record<string, CheckoutPlan> = {
  "stroke-fix": { name: "Stroke Fix", amountCents: 4900, mode: "payment" },
  "smart-system": { name: "Smart System", amountCents: 9900, mode: "payment" },
  "match-iq-short": { name: "Match IQ: Short", amountCents: 9900, mode: "payment" },
  "match-iq-full": { name: "Match IQ: Full", amountCents: 15900, mode: "payment" },
  "pro-tour": {
    name: "PRO Tour",
    amountCents: 24900,
    mode: "subscription",
    interval: "month",
  },
};
