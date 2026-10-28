import Link from "next/link";
import Reveal from "@/components/Reveal";
import { IconArrowRight } from "@/components/icons";
import { buildClubView } from "@/lib/clubPricing";
import { pricingDictionaries, type ClubBenefits } from "@/i18n/dictionaries/pricing";
import { localizedHref, type AppLocale } from "@/i18n/locales";

function Benefits({ benefits }: { benefits: ClubBenefits }) {
  const lists = [
    { title: benefits.businessTitle, items: benefits.businessItems },
    { title: benefits.marketingTitle, items: benefits.marketingItems },
  ];
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
      {lists.map((list) => (
        <div key={list.title} className="rounded-2xl border border-line bg-surface p-6">
          <h3 className="font-bold text-ink">{list.title}</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {list.items.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-brand-600 shrink-0">✓</span>
                <span className="text-body">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Academy and club packages. Prices, credits and billing discounts come from src/lib/plans.ts. */
export default function ClubOffers({ lang = "en" }: { lang?: AppLocale }) {
  const t = pricingDictionaries[lang].clubs;
  const { tiers, pilot } = buildClubView(lang);
  const demoHref = localizedHref(lang, "/demo");
  const cta = (
    <Link
      href={demoHref}
      className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-on-brand font-semibold px-4 py-2.5 text-sm shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
    >
      {t.cta}
      <IconArrowRight className="w-4 h-4" />
    </Link>
  );

  return (
    <div>
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">{t.eyebrow}</p>
        <h2 className="text-2xl sm:text-3xl font-bold mt-1">{t.title}</h2>
        <p className="mt-2 text-body">{t.subtitle}</p>
      </div>

      <Benefits benefits={t.benefits} />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {tiers.map((tier, i) => (
          <Reveal key={tier.id} delay={i * 60}>
            <div
              className={`relative h-full flex flex-col rounded-2xl border bg-surface p-6 shadow-sm ${
                tier.popular ? "border-brand-600 ring-2 ring-brand-600/30 shadow-md" : "border-line"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 text-on-brand text-xs font-semibold px-3 py-1 shadow-sm whitespace-nowrap">
                  {t.popularLabel}
                </span>
              )}
              <h3 className="font-bold text-lg text-ink">{tier.name}</h3>
              <p className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold">{tier.monthlyPrice}</span>
                <span className="text-muted">{t.perMonth}</span>
              </p>
              <p className="t-mono mt-1 text-sm font-semibold text-ink">{tier.creditsPerMonth}</p>
              <p className="mt-3 text-sm text-body">{tier.description}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-brand-600">✓</span>
                    <span className="text-body">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex-1">
                <p className="eyebrow">{t.billing.title}</p>
                <ul className="mt-2 divide-y divide-line border-y border-line text-sm">
                  {tier.billing.map((b) => (
                    <li key={b.id} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 py-2">
                      <span className="text-body">{b.label}</span>
                      <span className="text-right">
                        <span className="t-mono font-semibold text-ink">{b.perMonth}</span>
                        <span className="text-muted">{t.perMonth}</span>
                        {b.save && (
                          <span className="ml-2 rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-ink">{b.save}</span>
                        )}
                        {b.billed && <span className="block text-xs text-muted">{b.billed}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {cta}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-6 grid gap-4 rounded-2xl border border-line bg-surface p-6 md:grid-cols-[1.4fr_1fr_auto] md:items-center">
          <div>
            <h3 className="font-bold text-lg text-ink">{pilot.name}</h3>
            <p className="mt-1 text-sm text-body">{pilot.description}</p>
            <ul className="mt-3 space-y-1 text-sm">
              {pilot.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="text-brand-600">✓</span>
                  <span className="text-body">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{pilot.price}</span>
            <span className="text-muted">{pilot.period}</span>
            <span className="t-mono ml-2 text-sm font-semibold text-ink">{pilot.credits}</span>
          </p>
          {cta}
        </div>
      </Reveal>

      <p className="mt-8 text-sm text-muted text-center max-w-xl mx-auto">{t.note}</p>
    </div>
  );
}
