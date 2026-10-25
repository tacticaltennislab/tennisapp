import Link from "next/link";
import Reveal from "@/components/Reveal";
import ClayBackdrop from "@/components/motion/ClayBackdrop";
import { IconArrowRight } from "@/components/icons";
import { CLUB_POPULAR_INDEX } from "@/lib/clubCheckoutLinks";
import { pricingDictionaries } from "@/i18n/dictionaries/pricing";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import { localizedHref, type AppLocale } from "@/i18n/locales";

/** Transparent pricing as a plain ledger: name, what it covers, price. */
export default function OffersPreview({ lang = "en" }: { lang?: AppLocale }) {
  const t = homeDictionaries[lang].offersPreview;
  const clubs = pricingDictionaries[lang].clubs;

  return (
    <section id="pricing" className="section-pad relative isolate scroll-mt-16">
      <ClayBackdrop />
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{clubs.eyebrow}</p>
          <h2 className="t-h2 mt-4">{clubs.title}</h2>
          <p className="t-lead mt-5 max-w-xl">{clubs.subtitle}</p>
        </Reveal>

        <Reveal delay={60} className="mt-14 md:mt-20">
          <ul className="space-y-4">
            {clubs.tiers.map((tier, i) => {
              const popular = i === CLUB_POPULAR_INDEX;
              return (
                <li
                  key={tier.name}
                  className={`glass-panel grid gap-x-10 gap-y-3 rounded-3xl p-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)_10rem] md:items-baseline md:p-8 ${
                    popular ? "!border-ink" : ""
                  }`}
                >
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{tier.name}</h3>
                    {popular && (
                      <span className="mt-2 inline-block rounded-full bg-brand-600 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-on-brand">
                        {clubs.popularLabel}
                      </span>
                    )}
                  </div>
                  <p className="text-[1.0625rem] leading-relaxed text-body max-w-xl">{tier.description}</p>
                  <p className="md:text-right">
                    <span className="t-mono text-2xl font-semibold tracking-tight">{tier.price}</span>
                    <span className="ml-1.5 text-sm text-muted">{tier.period}</span>
                  </p>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href={`${localizedHref(lang, "/pricing")}?audience=clubs`} className="btn btn-primary">
            {t.cta}
          </Link>
          <Link
            href={`${localizedHref(lang, "/pricing")}?audience=players`}
            className="link-arrow"
          >
            {homeDictionaries[lang].hero.playersLink}
            <IconArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
