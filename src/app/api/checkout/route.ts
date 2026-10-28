import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getStripe, CHECKOUT_PLANS, StripeNotConfiguredError, stripeNotConfiguredResponse } from "@/lib/stripe";
import { countSuccessfulReferrals, referralDiscountPercent } from "@/lib/referral";
import { sendEmail } from "@/lib/email";
import { grantCredits } from "@/lib/credits";
import { addOnsFor } from "@/lib/plans";

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

  // Add ons (the 4 Week Training Program with a Stroke Analysis): only the ones sold with this plan.
  const requestedAddOns: unknown[] = Array.isArray(body?.addOns) ? body.addOns : [];
  const sellable = addOnsFor(planId);
  const addOns = [...new Set(requestedAddOns)].map((id) => sellable.find((a) => a.planId === id));
  if (addOns.some((a) => !a)) {
    return NextResponse.json({ error: "Unknown add on for this plan." }, { status: 400 });
  }
  const chosenAddOns = addOns.filter((a): a is NonNullable<typeof a> => Boolean(a));

  if (body?.acknowledgedWithdrawal !== true) {
    return NextResponse.json(
      { error: "You must acknowledge the withdrawal rights notice before checkout." },
      { status: 400 }
    );
  }

  const referralCount = await countSuccessfulReferrals(session.user.id);
  const discountPercent = referralDiscountPercent(referralCount, planId);
  const discount = (cents: number) => Math.round((cents * (100 - discountPercent)) / 100);
  const discountedPlanAmount = discount(plan.amountCents);
  const discountedAddOns = chosenAddOns.map((a) => ({ name: a.name, amountCents: discount(a.amountCents) }));
  const discountedAmount = discountedPlanAmount + discountedAddOns.reduce((sum, a) => sum + a.amountCents, 0);
  const orderName = [plan.name, ...discountedAddOns.map((a) => a.name)].join(" + ");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // A 100% referral discount only ever applies to one-time plans (subscriptions
  // are capped below 100%), so this never needs to hand Stripe a $0 subscription.
  if (discountedAmount <= 0) {
    const freePurchase = await prisma.purchase.create({
      data: {
        userId: session.user.id,
        planName: `${orderName} (referral reward)`,
        amount: 0,
        mode: plan.mode,
        stripeSessionId: `referral_${crypto.randomUUID()}`,
        status: "paid",
      },
    });

    // A free order still brings what it includes.
    if (plan.credits > 0) {
      await grantCredits({
        account: { userId: session.user.id },
        amount: plan.credits,
        reason: "purchase",
        purchaseId: freePurchase.id,
        note: freePurchase.planName,
        idempotencyKey: `purchase:${freePurchase.stripeSessionId}`,
      });
    }

    await sendEmail({
      to: ADMIN_INBOX,
      subject: `Free order via referral: ${orderName}`,
      html: `<p>${session.user.name || session.user.email} redeemed <strong>${orderName}</strong> for free using their referral discount.</p>`,
    });

    return NextResponse.json({ url: `${siteUrl}/checkout/success?free=1` });
  }

  let stripe;
  try {
    stripe = getStripe();
  } catch (error) {
    if (error instanceof StripeNotConfiguredError) return stripeNotConfiguredResponse();
    throw error;
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: plan.mode,
    customer_email: session.user.email || undefined,
    client_reference_id: session.user.id,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: `Tactical Tennis Lab: ${plan.name}` },
          unit_amount: discountedPlanAmount,
          ...(plan.mode === "subscription"
            ? { recurring: { interval: plan.interval || "month", interval_count: plan.intervalCount || 1 } }
            : {}),
        },
        quantity: 1,
      },
      // Each add on is its own line, so the receipt shows what was bought. A line at $0 is left out.
      ...discountedAddOns
        .filter((a) => a.amountCents > 0)
        .map((a) => ({
          price_data: {
            currency: "usd",
            product_data: { name: `Tactical Tennis Lab: ${a.name}` },
            unit_amount: a.amountCents,
          },
          quantity: 1,
        })),
    ],
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/pricing?audience=players`,
    metadata: {
      userId: session.user.id,
      planName: orderName,
      planId,
      addOns: chosenAddOns.map((a) => a.planId).join(","),
      credits: String(plan.credits),
      discountPercent: String(discountPercent),
    },
  });

  await prisma.purchase.create({
    data: {
      userId: session.user.id,
      planName: orderName,
      amount: discountedAmount,
      mode: plan.mode,
      stripeSessionId: checkoutSession.id,
      status: "pending",
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
