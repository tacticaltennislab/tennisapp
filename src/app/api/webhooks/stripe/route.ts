import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe, StripeNotConfiguredError, stripeNotConfiguredResponse } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

const ADMIN_INBOX = process.env.CONTACT_INBOX_EMAIL || "tacticaltennislab@gmail.com";

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

  if (event.type === "checkout.session.completed") {
    const checkoutSession = event.data.object as Stripe.Checkout.Session;
    const subscriptionId =
      typeof checkoutSession.subscription === "string" ? checkoutSession.subscription : null;

    let currentPeriodEnd: Date | null = null;
    if (subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const periodEndSeconds = subscription.items.data[0]?.current_period_end;
      if (periodEndSeconds) currentPeriodEnd = new Date(periodEndSeconds * 1000);
    }

    const purchase = await prisma.purchase.update({
      where: { stripeSessionId: checkoutSession.id },
      data: {
        status: subscriptionId ? "active" : "paid",
        stripeCustomerId:
          typeof checkoutSession.customer === "string" ? checkoutSession.customer : null,
        stripeSubscriptionId: subscriptionId,
        currentPeriodEnd,
      },
      include: { user: true },
    });

    await sendEmail({
      to: ADMIN_INBOX,
      subject: `New paid order: ${purchase.planName}`,
      html: `<p>${purchase.user.name || purchase.user.email} just purchased <strong>${purchase.planName}</strong> ($${(purchase.amount / 100).toFixed(2)}).</p>`,
    });
  }

  if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object as Stripe.Subscription;
    const periodEndSeconds = subscription.items.data[0]?.current_period_end;

    await prisma.purchase
      .update({
        where: { stripeSubscriptionId: subscription.id },
        data: {
          status: subscription.status,
          currentPeriodEnd: periodEndSeconds ? new Date(periodEndSeconds * 1000) : null,
        },
      })
      .catch(() => {
        // No matching Purchase row (e.g. subscription created outside our checkout flow) -- nothing to sync.
      });
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;

    await prisma.purchase
      .update({
        where: { stripeSubscriptionId: subscription.id },
        data: { status: "canceled" },
      })
      .catch(() => {
        // No matching Purchase row -- nothing to sync.
      });
  }

  return NextResponse.json({ received: true });
}
