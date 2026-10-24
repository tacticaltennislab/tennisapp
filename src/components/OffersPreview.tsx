import Link from "next/link";
import Reveal from "@/components/Reveal";
import { IconArrowRight } from "@/components/icons";
import { CLUB_POPULAR_INDEX } from "@/lib/clubCheckoutLinks";
import { pricingDictionaries } from "@/i18n/dictionaries/pricing";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import { localizedHref, type AppLocale } from "@/i18n/locales";

export default function OffersPreview({ lang = "en" }: { lang?: AppLocale }) {
  const t = homeDictionaries[lang].offersPreview;
  const clubs = pricingDictionaries[lang].clubs;

  return (
    <section className="section-pad bg-surface-muted">
      <div className="container-x">
        <Reveal className="text-center">
          <p className="eyebrow">{clubs.eyebrow}</p>
          <h2 className="t-h2 mt-3">{clubs.title}</h2>
          <p className="t-lead mt-4 text-body max-w-2xl mx-auto">{clubs.subtitle}</p>
        </Reveal>

        {/* Phones: a swipeable strip where the next card peeks in as the cue
            to scroll. From sm up the packages sit in a grid. */}
        <div className="mt-12 -mx-4 px-4 pt-4 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-6 lg:grid-cols-5 sm:overflow-visible sm:pb-0">
          {clubs.tiers.map((tier, i) => {
            const popular = i === CLUB_POPULAR_INDEX;
            return (
              <Reveal key={tier.name} variant="zoom" delay={i * 60} className={`shrink-0 w-[74vw] max-w-[17rem] snap-start sm:w-auto sm:max-w-none lg:col-span-1 ${i < 3 ? "sm:col-span-2" : "sm:col-span-3"}`}>
                <div
                  className={`relative h-full flex flex-col rounded-2xl border p-5 transition-shadow ${
                    popular
                      ? "border-brand-600 bg-brand-600 text-on-brand shadow-lg"
                      : "card card-hover"
                  }`}
                >
                  {popular && (
                    <span className="absolute -top-3 left-5 rounded-sm bg-gold px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-forest">
                      {clubs.popularLabel}
                    </span>
                  )}
                  <h3 className={`text-base font-semibold leading-snug ${popular ? "text-on-brand" : "text-ink"}`}>
                    {tier.name}
                  </h3>
                  <p className="mt-3 flex items-baseline gap-1.5">
                    <span className="t-mono text-3xl font-semibold tracking-tight">{tier.price}</span>
                    <span className={`text-xs ${popular ? "text-on-brand/70" : "text-muted"}`}>{tier.period}</span>
                  </p>
                  <p className={`mt-3 text-[0.8125rem] leading-relaxed flex-1 ${popular ? "text-on-brand/85" : "text-body"}`}>
                    {tier.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href={`${localizedHref(lang, "/pricing")}?audience=clubs`} className="btn btn-primary">
            {t.cta}
            <IconArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
