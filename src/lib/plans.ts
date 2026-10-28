/**
 * THE single source of truth for every product, price and credit number.
 *
 * Change a price or a credit count here and it flows to the pricing page, the homepage price
 * lines, the checkout (`CHECKOUT_PLANS` in src/lib/stripe.ts), the free account credit and the AI
 * FAQ prompt. Only the wording lives elsewhere (src/i18n/dictionaries/plans.ts for player plans,
 * pricing.ts for academy plans), and it may use the placeholders {minutes}, {maxMinutes} and
 * {maxHours}, which are filled from CREDIT_RULES by `fillCreditVars`.
 *
 * Amounts are USD cents. Old Purchase rows keep their own planName text, so removing a product
 * here never breaks purchase history.
 */

// ---------------------------------------------------------------------------------------------
// Credits
// ---------------------------------------------------------------------------------------------

/**
 * 1 credit = one stroke analysis, or up to 60 minutes of match footage.
 * A full match (up to 2 hours) = 2 credits.
 */
export const CREDIT_RULES = {
  strokeAnalysisCredits: 1,
  minutesPerCredit: 60,
  maxMatchMinutes: 120,
} as const;

/** Credits every new account gets. The free analysis rule is expressed through this. */
export const FREE_ACCOUNT_CREDITS = 1;

/** Credits needed for a match recording of this length, or null if it is longer than one match. */
export function creditsForMatchMinutes(minutes: number): number | null {
  if (!Number.isFinite(minutes) || minutes <= 0 || minutes > CREDIT_RULES.maxMatchMinutes) return null;
  return Math.ceil(minutes / CREDIT_RULES.minutesPerCredit);
}

/** Credits for a full match (up to CREDIT_RULES.maxMatchMinutes). */
export const FULL_MATCH_CREDITS = Math.ceil(CREDIT_RULES.maxMatchMinutes / CREDIT_RULES.minutesPerCredit);

/** Fills {minutes}, {maxMinutes} and {maxHours} in wording that mentions the credit rules. */
export function fillCreditVars(text: string): string {
  return text
    .replaceAll("{minutes}", String(CREDIT_RULES.minutesPerCredit))
    .replaceAll("{maxMinutes}", String(CREDIT_RULES.maxMatchMinutes))
    .replaceAll("{maxHours}", String(CREDIT_RULES.maxMatchMinutes / 60));
}

// ---------------------------------------------------------------------------------------------
// Money
// ---------------------------------------------------------------------------------------------

/** 4900 -> "$49", 110000 -> "$1,100", 46750 -> "$467.50". */
export function formatUsd(cents: number): string {
  const dollars = cents / 100;
  return cents % 100 === 0
    ? `$${dollars.toLocaleString("en-US")}`
    : `$${dollars.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ---------------------------------------------------------------------------------------------
// Players: one-time purchases
// ---------------------------------------------------------------------------------------------

export interface Plan {
  planId: string;
  name: string;
  /** Formatted price, derived from amountCents. */
  price: string;
  period: string;
  description: string;
  features: string[];
  whatYouGet: string[];
  mode: "payment" | "subscription";
  amountCents: number;
  /** Credits added to the account on purchase (0 for add ons). */
  credits: number;
  /** An add on to an analysis: no credit, it unlocks a plan. */
  addOn?: boolean;
  /** Can be bought online through /api/checkout. */
  sellOnline: boolean;
  featured?: boolean;
}

type PlayerPlanConfig = Omit<Plan, "price" | "mode">;

const PLAYER_PLANS: PlayerPlanConfig[] = [
  {
    planId: "stroke-analysis",
    amountCents: 4900,
    credits: CREDIT_RULES.strokeAnalysisCredits,
    sellOnline: true,
    name: "Stroke Analysis",
    period: "one time",
    description: "Professional biomechanical analysis of one specific technical issue.",
    features: ["Video breakdown", "Technical diagnosis", "Visual feedback", "Correction recommendations"],
    whatYouGet: [
      "What's actually causing the issue: not just what looks wrong",
      "Whether it's technique, timing, or a footwork problem underneath it",
      "The one change to prioritize first, not five conflicting opinions",
      "A drill you can start on today",
      "What it should feel like once it's actually fixed",
    ],
  },
  {
    planId: "match-analysis",
    amountCents: 9900,
    credits: 1,
    sellOnline: true,
    name: "Match Analysis",
    period: "one time",
    description: "A focused tactical analysis of one set or up to {minutes} minutes of match play.",
    features: [
      "Up to {minutes} minutes of match footage",
      "Point construction analysis",
      "Shot selection evaluation",
      "Tactical recommendations",
      "Match intelligence report",
    ],
    whatYouGet: [
      "Which patterns actually won you points in that set",
      "What really happened after your first and second serve",
      "Where you were positioned for the return",
      "The one tactical adjustment worth making next time you play",
    ],
  },
  {
    planId: "match-analysis-full",
    amountCents: 17900,
    credits: FULL_MATCH_CREDITS,
    sellOnline: true,
    name: "Match Analysis Full",
    period: "one time",
    description: "A complete tactical breakdown of your match, point by point.",
    features: [
      "Up to one full match (max {maxHours} hours of footage)",
      "Point construction analysis",
      "Shot selection evaluation",
      "Court positioning review",
      "Tactical recommendations",
      "Full match intelligence report",
    ],
    whatYouGet: [
      "Which patterns are actually winning you points, and which ones you keep repeating for nothing",
      "What really happens after your first and second serve",
      "Where you're positioned for the return, and whether you're pressuring second serves",
      "Whether your first shot after the return goes the right direction",
      "How your decision making changes at 30-30, deuce, and break points",
      "Whether you're trying to finish points too early",
      "Which side of the court you keep getting pushed off of",
      "Whether you recover to a neutral position after defending",
      "The two patterns worth training next",
    ],
  },
  {
    planId: "training-program",
    amountCents: 5000,
    credits: 0,
    addOn: true,
    sellOnline: true,
    name: "4 Week Training Program",
    period: "add on",
    description: "A four week training plan built from your analysis. Add it to unlock your plan.",
    features: [
      "7 progressive training sessions",
      "Technical development pathway",
      "Exercise library",
      "Coaching notes",
      "Exercise support",
    ],
    whatYouGet: [
      "A week by week progression, not a scattered list of drills",
      "What to check after each session so you're not repeating the same mistake",
      "When to move from feel, to speed, to match pace",
      "What \"done\" looks like before you move on to the next stroke",
    ],
  },
];

/** Player products in the shape the pricing page and the checkout use. */
export const PLANS: Plan[] = PLAYER_PLANS.map((p) => ({
  ...p,
  mode: "payment" as const,
  price: formatUsd(p.amountCents),
}));

export function getPlan(planId: string): Plan {
  const plan = PLANS.find((p) => p.planId === planId);
  if (!plan) throw new Error(`Unknown plan: ${planId}`);
  return plan;
}

// ---------------------------------------------------------------------------------------------
// Academies and clubs
// ---------------------------------------------------------------------------------------------

export interface BillingPeriod {
  id: "monthly" | "quarterly" | "semiannual";
  months: number;
  /** Discount on the monthly price, 0 to 1. */
  discount: number;
}

/** Academy subscriptions can be billed monthly, quarterly (-10%) or every 6 months (-15%). */
export const BILLING_PERIODS: BillingPeriod[] = [
  { id: "monthly", months: 1, discount: 0 },
  { id: "quarterly", months: 3, discount: 0.1 },
  { id: "semiannual", months: 6, discount: 0.15 },
];

export interface AcademyPlan {
  planId: string;
  name: string;
  monthlyPriceCents: number;
  creditsPerMonth: number;
  /** Flagged "Most popular". */
  popular?: boolean;
  /** Can be bought online through /api/checkout. Off while academies are sold through a demo call. */
  sellOnline: boolean;
}

export const ACADEMY_PLANS: AcademyPlan[] = [
  { planId: "academy-starter", name: "Starter", monthlyPriceCents: 55000, creditsPerMonth: 8, sellOnline: false },
  { planId: "academy", name: "Academy", monthlyPriceCents: 110000, creditsPerMonth: 17, sellOnline: false },
  {
    planId: "academy-high-performance",
    name: "High Performance",
    monthlyPriceCents: 195000,
    creditsPerMonth: 32,
    popular: true,
    sellOnline: false,
  },
];

export interface AcademyPrice {
  period: BillingPeriod;
  /** Charged each time the subscription renews. */
  totalCents: number;
  /** The equivalent monthly price after the discount. */
  perMonthCents: number;
  /** Credits added at each renewal. */
  credits: number;
}

export function academyPrice(plan: AcademyPlan, periodId: BillingPeriod["id"]): AcademyPrice {
  const period = BILLING_PERIODS.find((p) => p.id === periodId)!;
  const totalCents = Math.round(plan.monthlyPriceCents * period.months * (1 - period.discount));
  return {
    period,
    totalCents,
    perMonthCents: Math.round(totalCents / period.months),
    credits: plan.creditsPerMonth * period.months,
  };
}

/** One time pilot for academies: a small first step before a subscription. */
export const ACADEMY_PILOT = {
  planId: "academy-pilot",
  name: "Pilot",
  priceCents: 19900,
  credits: 3,
  sellOnline: false,
};

// ---------------------------------------------------------------------------------------------
// Checkout
// ---------------------------------------------------------------------------------------------

export interface CheckoutPlan {
  name: string;
  amountCents: number;
  mode: "payment" | "subscription";
  interval?: "month";
  /** Number of months between charges for subscriptions (1, 3 or 6). */
  intervalCount?: number;
  /** Credits added to the account when this is paid (for the credit ledger to come). */
  credits: number;
}

/**
 * Everything that can be bought online, derived from the products above (only those with
 * `sellOnline: true`). Academy subscriptions get one entry per billing period:
 * "academy", "academy:quarterly", "academy:semiannual".
 */
export function buildCheckoutPlans(): Record<string, CheckoutPlan> {
  const out: Record<string, CheckoutPlan> = {};

  for (const p of PLANS) {
    if (!p.sellOnline) continue;
    out[p.planId] = { name: p.name, amountCents: p.amountCents, mode: "payment", credits: p.credits };
  }

  if (ACADEMY_PILOT.sellOnline) {
    out[ACADEMY_PILOT.planId] = {
      name: `Academy ${ACADEMY_PILOT.name}`,
      amountCents: ACADEMY_PILOT.priceCents,
      mode: "payment",
      credits: ACADEMY_PILOT.credits,
    };
  }

  for (const plan of ACADEMY_PLANS) {
    if (!plan.sellOnline) continue;
    for (const period of BILLING_PERIODS) {
      const price = academyPrice(plan, period.id);
      out[period.id === "monthly" ? plan.planId : `${plan.planId}:${period.id}`] = {
        name: period.id === "monthly" ? `Academy ${plan.name}` : `Academy ${plan.name} (${period.id})`,
        amountCents: price.totalCents,
        mode: "subscription",
        interval: "month",
        intervalCount: period.months,
        credits: price.credits,
      };
    }
  }

  return out;
}
