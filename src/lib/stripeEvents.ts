import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { grantCredits } from "@/lib/credits";
import { ACADEMY_PLANS, BILLING_PERIODS, academyPrice, getPlan, type BillingPeriod } from "@/lib/plans";

const ADMIN_INBOX = process.env.CONTACT_INBOX_EMAIL || "tacticaltennislab@gmail.com";

export interface StripeEventDeps {
  /** Looks a subscription up in Stripe (for the period end). Injected so tests need no network. */
  getSubscription?: (id: string) => Promise<Stripe.Subscription>;
  /** Tells the owner about a paid order. Injected so tests send no email. */
  notify?: (subject: string, html: string) => Promise<unknown>;
}

const defaultNotify = (subject: string, html: string) => sendEmail({ to: ADMIN_INBOX, subject, html });

/** Metadata the checkout puts on an academy subscription so the webhook can attach it to an academy. */
export const ACADEMY_SUBSCRIPTION_KIND = "academy_subscription";

function periodEndOf(subscription: Stripe.Subscription): Date | null {
  const seconds = subscription.items.data[0]?.current_period_end;
  return seconds ? new Date(seconds * 1000) : null;
}

function subscriptionIdOfInvoice(invoice: Stripe.Invoice): string | null {
  const sub = invoice.parent?.subscription_details?.subscription;
  if (!sub) return null;
  return typeof sub === "string" ? sub : sub.id;
}

/** Credits and plan facts always come from our own config, never from what the metadata claims. */
function academySubscriptionFromMetadata(metadata: Stripe.Metadata | null | undefined) {
  const plan = ACADEMY_PLANS.find((p) => p.planId === metadata?.planKey);
  const period = BILLING_PERIODS.find((p) => p.id === metadata?.billingInterval) as BillingPeriod | undefined;
  const academyId = metadata?.academyId;
  if (!plan || !period || !academyId) return null;
  return { academyId, planKey: plan.planId, billingInterval: period.id, creditsPerPeriod: academyPrice(plan, period.id).credits };
}

async function onCheckoutCompleted(session: Stripe.Checkout.Session, deps: StripeEventDeps) {
  const subscriptionId = typeof session.subscription === "string" ? session.subscription : null;
  const customerId = typeof session.customer === "string" ? session.customer : null;

  // An academy subscription: record it. Its credits arrive with each paid invoice (invoice.paid).
  if (session.metadata?.kind === ACADEMY_SUBSCRIPTION_KIND && subscriptionId) {
    const data = academySubscriptionFromMetadata(session.metadata);
    if (!data) {
      console.error("Academy subscription checkout with unusable metadata:", session.id);
      return;
    }
    const subscription = deps.getSubscription ? await deps.getSubscription(subscriptionId) : null;
    await prisma.academySubscription.upsert({
      where: { stripeSubscriptionId: subscriptionId },
      create: {
        ...data,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        currentPeriodEnd: subscription ? periodEndOf(subscription) : null,
      },
      update: { stripeCustomerId: customerId },
    });
    return;
  }

  // A player purchase.
  let currentPeriodEnd: Date | null = null;
  if (subscriptionId && deps.getSubscription) {
    currentPeriodEnd = periodEndOf(await deps.getSubscription(subscriptionId));
  }

  const existing = await prisma.purchase.findUnique({ where: { stripeSessionId: session.id } });
  if (!existing) {
    console.error("Stripe checkout completed for an unknown purchase:", session.id);
    return;
  }

  const purchase = await prisma.purchase.update({
    where: { stripeSessionId: session.id },
    data: {
      status: subscriptionId ? "active" : "paid",
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      currentPeriodEnd,
    },
    include: { user: true },
  });

  // Credits for what was bought, exactly once per checkout session.
  const planId = session.metadata?.planId;
  let credits = 0;
  if (planId) {
    try {
      credits = getPlan(planId).credits;
    } catch {
      credits = Number(session.metadata?.credits) || 0;
    }
  }
  if (credits > 0) {
    await grantCredits({
      account: { userId: purchase.userId },
      amount: credits,
      reason: "purchase",
      purchaseId: purchase.id,
      note: purchase.planName,
      idempotencyKey: `purchase:${session.id}`,
    });
  }

  await (deps.notify ?? defaultNotify)(
    `New paid order: ${purchase.planName}`,
    `<p>${purchase.user.name || purchase.user.email} just purchased <strong>${purchase.planName}</strong> ($${(purchase.amount / 100).toFixed(2)}).</p>`
  );
}

async function onInvoicePaid(invoice: Stripe.Invoice, deps: StripeEventDeps) {
  const subscriptionId = subscriptionIdOfInvoice(invoice);
  if (!subscriptionId) return;

  const subscription = await prisma.academySubscription.findUnique({ where: { stripeSubscriptionId: subscriptionId } });
  if (!subscription) {
    // The invoice can arrive before the checkout that creates the row: ask Stripe to deliver it again.
    if (invoice.parent?.subscription_details?.metadata?.kind === ACADEMY_SUBSCRIPTION_KIND) {
      throw new Error(`Academy subscription ${subscriptionId} is not recorded yet`);
    }
    return; // not an academy subscription
  }

  await grantCredits({
    account: { academyId: subscription.academyId },
    amount: subscription.creditsPerPeriod,
    reason: "subscription_renewal",
    note: `${subscription.planKey} (${subscription.billingInterval})`,
    idempotencyKey: `invoice:${invoice.id}`,
  });

  const periodEnd = invoice.lines?.data?.[0]?.period?.end;
  const fetched = !periodEnd && deps.getSubscription ? periodEndOf(await deps.getSubscription(subscriptionId)) : null;
  await prisma.academySubscription.update({
    where: { id: subscription.id },
    data: { status: "active", currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : fetched ?? subscription.currentPeriodEnd },
  });
}

async function onSubscriptionChanged(subscription: Stripe.Subscription, deleted: boolean) {
  const periodEnd = periodEndOf(subscription);
  const status = deleted ? "canceled" : subscription.status;

  await prisma.purchase
    .update({
      where: { stripeSubscriptionId: subscription.id },
      data: deleted ? { status } : { status, currentPeriodEnd: periodEnd },
    })
    .catch(() => {
      // No matching Purchase row (e.g. a subscription created outside the player checkout): nothing to sync.
    });

  await prisma.academySubscription
    .update({
      where: { stripeSubscriptionId: subscription.id },
      data: deleted ? { status } : { status, currentPeriodEnd: periodEnd },
    })
    .catch(() => {
      // Not an academy subscription.
    });
}

/**
 * The business logic of the Stripe webhook, separate from the HTTP route (signature checking stays
 * there) so it can be tested with plain event objects. Safe to run twice on the same event: credit
 * grants are idempotent and the status updates just repeat.
 */
export async function processStripeEvent(event: Stripe.Event, deps: StripeEventDeps = {}): Promise<void> {
  switch (event.type) {
    case "checkout.session.completed":
      return onCheckoutCompleted(event.data.object as Stripe.Checkout.Session, deps);
    case "invoice.paid":
      return onInvoicePaid(event.data.object as Stripe.Invoice, deps);
    case "customer.subscription.updated":
      return onSubscriptionChanged(event.data.object as Stripe.Subscription, false);
    case "customer.subscription.deleted":
      return onSubscriptionChanged(event.data.object as Stripe.Subscription, true);
    default:
      return;
  }
}
