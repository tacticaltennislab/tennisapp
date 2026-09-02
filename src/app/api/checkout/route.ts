import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { stripe, CHECKOUT_PLANS } from "@/lib/stripe";

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: plan.mode,
    customer_email: session.user.email || undefined,
    client_reference_id: session.user.id,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: `Tactical Tennis Lab — ${plan.name}` },
          unit_amount: plan.amountCents,
          ...(plan.mode === "subscription"
            ? { recurring: { interval: plan.interval || "month" } }
            : {}),
        },
        quantity: 1,
      },
    ],
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/pricing`,
    metadata: { userId: session.user.id, planName: plan.name },
  });

  await prisma.purchase.create({
    data: {
      userId: session.user.id,
      planName: plan.name,
      amount: plan.amountCents,
      mode: plan.mode,
      stripeSessionId: checkoutSession.id,
      status: "pending",
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
