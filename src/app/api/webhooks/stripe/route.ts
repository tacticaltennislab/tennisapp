import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe, StripeNotConfiguredError, stripeNotConfiguredResponse } from "@/lib/stripe";
import { processStripeEvent } from "@/lib/stripeEvents";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing webhook signature." }, { status: 400 });
  }

  let stripe;
  try {
    stripe = getStripe();
  } catch (error) {
    if (error instanceof StripeNotConfiguredError) return stripeNotConfiguredResponse();
    throw error;
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  // A thrown error returns 500, so Stripe delivers the event again later; everything in
  // processStripeEvent is safe to repeat.
  await processStripeEvent(event, { getSubscription: (id) => stripe.subscriptions.retrieve(id) });

  return NextResponse.json({ received: true });
}
