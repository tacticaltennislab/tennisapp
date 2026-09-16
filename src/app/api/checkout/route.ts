import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { stripe, CHECKOUT_PLANS } from "@/lib/stripe";
import { countSuccessfulReferrals, referralDiscountPercent } from "@/lib/referral";
import { sendEmail } from "@/lib/email";

const ADMIN_INBOX = process.env.CONTACT_INBOX_EMAIL || "tacticaltennislab@gmail.com";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const planId = typeof body?.planId === "string" ? body.planId : "";
  const plan = CHECKOUT_PLANS[planId];

  if (!plan) {
    return NextResponse.json({ error: "Unknown plan." }, { status: 400 });
  }

  const referralCount = await countSuccessfulReferrals(session.user.id);
  const discountPercent = referralDiscountPercent(referralCount, planId);
  const discountedAmount = Math.round((plan.amountCents * (100 - discountPercent)) / 100);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // A 100% referral discount only ever applies to one-time plans (subscriptions
  // are capped below 100%), so this never needs to hand Stripe a $0 subscription.
  if (discountedAmount <= 0) {
    await prisma.purchase.create({
      data: {
        userId: session.user.id,
        planName: `${plan.name} (referral reward)`,
        amount: 0,
        mode: plan.mode,
        stripeSessionId: `referral_${crypto.randomUUID()}`,
        status: "paid",
      },
    });

    await sendEmail({
      to: ADMIN_INBOX,
      subject: `Free order via referral: ${plan.name}`,
      html: `<p>${session.user.name || session.user.email} redeemed <strong>${plan.name}</strong> for free using their referral discount.</p>`,
    });

    return NextResponse.json({ url: `${siteUrl}/checkout/success?free=1` });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: plan.mode,
    customer_email: session.user.email || undefined,
    client_reference_id: session.user.id,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: `Tactical Tennis Lab — ${plan.name}` },
          unit_amount: discountedAmount,
          ...(plan.mode === "subscription"
            ? { recurring: { interval: plan.interval || "month" } }
            : {}),
        },
        quantity: 1,
      },
    ],
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/pricing`,
    metadata: { userId: session.user.id, planName: plan.name, discountPercent: String(discountPercent) },
  });

  await prisma.purchase.create({
    data: {
      userId: session.user.id,
      planName: plan.name,
      amount: discountedAmount,
      mode: plan.mode,
      stripeSessionId: checkoutSession.id,
      status: "pending",
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
