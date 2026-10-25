import Stripe from "stripe";
import { NextResponse } from "next/server";

/** Thrown by getStripe() when STRIPE_SECRET_KEY is not set in this environment. */
export class StripeNotConfiguredError extends Error {
  constructor() {
    super("Stripe is not configured: STRIPE_SECRET_KEY is not set in this environment.");
    this.name = "StripeNotConfiguredError";
  }
}

let client: Stripe | null = null;

/**
 * The Stripe client, created on first use. It is never created at import or build time, so a
 * deployment without the key (for example a Preview deployment) still builds; a request that
 * needs Stripe fails with a clear error instead.
 */
export function getStripe(): Stripe {
  if (client) return client;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new StripeNotConfiguredError();
  client = new Stripe(key);
  return client;
}

/** 503 response for route handlers when payments are not configured here. */
export function stripeNotConfiguredResponse() {
  return NextResponse.json(
    { error: "Payments are not configured in this environment (STRIPE_SECRET_KEY is missing)." },
    { status: 503 }
  );
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
