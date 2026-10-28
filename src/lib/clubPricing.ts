import { formatCredits } from "@/lib/creditFormat";
import {
  ACADEMY_PILOT,
  ACADEMY_PLANS,
  BILLING_PERIODS,
  FULL_MATCH_CREDITS,
  academyPrice,
  fillCreditVars,
  formatUsd,
} from "@/lib/plans";
import { pricingDictionaries } from "@/i18n/dictionaries/pricing";
import type { AppLocale } from "@/i18n/locales";

export interface ClubBillingView {
  id: string;
  label: string;
  /** "$495" */
  perMonth: string;
  /** "billed $1,485", empty for monthly */
  billed: string;
  /** "save 10%", empty for monthly */
  save: string;
}

export interface ClubTierView {
  id: string;
  name: string;
  description: string;
  features: string[];
  popular: boolean;
  /** "$550" */
  monthlyPrice: string;
  /** "8 credits per month" */
  creditsPerMonth: string;
  billing: ClubBillingView[];
}

export interface ClubPilotView {
  name: string;
  description: string;
  features: string[];
  price: string;
  period: string;
  /** "3 credits" */
  credits: string;
}

/** Academy and club offers: prices and credit numbers from src/lib/plans.ts, wording from the dictionary. */
export function buildClubView(lang: AppLocale): { tiers: ClubTierView[]; pilot: ClubPilotView } {
  const t = pricingDictionaries[lang];
  const { clubs, credits } = t;

  const tiers = ACADEMY_PLANS.map((plan, i) => {
    const text = clubs.tiers[i];
    return {
      id: plan.planId,
      name: text.name,
      description: text.description,
      features: text.features,
      popular: Boolean(plan.popular),
      monthlyPrice: formatUsd(plan.monthlyPriceCents),
      creditsPerMonth: clubs.creditsPerMonth.replace(
        "{credits}",
        formatCredits(lang, plan.creditsPerMonth, credits.noun)
      ),
      billing: BILLING_PERIODS.map((period) => {
        const price = academyPrice(plan, period.id);
        return {
          id: period.id,
          label: clubs.billing[period.id],
          perMonth: formatUsd(price.perMonthCents),
          billed: period.months > 1 ? clubs.billing.billed.replace("{total}", formatUsd(price.totalCents)) : "",
          save:
            period.discount > 0
              ? clubs.billing.save.replace("{pct}", String(Math.round(period.discount * 100)))
              : "",
        };
      }),
    };
  });

  return {
    tiers,
    pilot: {
      name: clubs.pilot.name,
      description: clubs.pilot.description,
      features: clubs.pilot.features,
      price: formatUsd(ACADEMY_PILOT.priceCents),
      period: clubs.pilotPeriod,
      credits: formatCredits(lang, ACADEMY_PILOT.credits, credits.noun),
    },
  };
}

/** "1 credit covers one stroke analysis or up to 60 minutes of match footage. A full match ... uses 2 credits." */
export function creditRuleText(lang: AppLocale): string {
  const { credits } = pricingDictionaries[lang];
  return fillCreditVars(
    credits.rule
      .replace("{oneCredit}", formatCredits(lang, 1, credits.noun))
      .replace("{fullCredits}", formatCredits(lang, FULL_MATCH_CREDITS, credits.noun))
  );
}
