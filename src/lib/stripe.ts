import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

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
