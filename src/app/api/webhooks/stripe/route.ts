import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

const ADMIN_INBOX = process.env.CONTACT_INBOX_EMAIL || "tacticaltennislab@gmail.com";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing webhook signature." }, { status: 400 });
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

    const purchase = await prisma.purchase.update({
      where: { stripeSessionId: checkoutSession.id },
      data: {
        status: "paid",
        stripeCustomerId:
          typeof checkoutSession.customer === "string" ? checkoutSession.customer : null,
      },
      include: { user: true },
    });

    await sendEmail({
      to: ADMIN_INBOX,
      subject: `New paid order: ${purchase.planName}`,
      html: `<p>${purchase.user.name || purchase.user.email} just purchased <strong>${purchase.planName}</strong> ($${(purchase.amount / 100).toFixed(2)}).</p>`,
    });
  }

  return NextResponse.json({ received: true });
}
