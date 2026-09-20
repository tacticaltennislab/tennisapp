import Link from "next/link";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { IconArrowRight } from "@/components/icons";
import { PLANS } from "@/lib/plans";
import { planTranslations } from "@/i18n/dictionaries/plans";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import { localizedHref, type AppLocale } from "@/i18n/locales";

export default function OffersPreview({ lang = "en" }: { lang?: AppLocale }) {
  const t = homeDictionaries[lang].offersPreview;

  return (
    <section className="px-4 py-16 bg-surface-muted">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">
            {t.eyebrow}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mt-1">{t.title}</h2>
          <p className="text-body mt-2 max-w-lg mx-auto">{t.subtitle}</p>
        </Reveal>

        <div className="mt-10 -mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:overflow-visible">
          {PLANS.map((plan, i) => {
            const text = lang === "en" ? plan : planTranslations[plan.planId]?.[lang] || plan;
            return (
              <Reveal key={plan.planId} variant="zoom" delay={i * 80} className="shrink-0 w-[220px] snap-start sm:w-auto">
                <TiltCard
                  maxTilt={6}
                  className={`h-full flex flex-col rounded-2xl border p-5 shadow-sm hover:shadow-lg ${
                    plan.featured ? "border-brand-600 bg-brand-600 text-white" : "border-line bg-surface"
                  }`}
                >
                  <h3 className={`font-bold text-base ${plan.featured ? "text-white" : "text-ink"}`}>
                    {text.name}
                  </h3>
                  <p className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{plan.price}</span>
                    <span className={`text-xs ${plan.featured ? "text-white/70" : "text-muted"}`}>
                      {text.period}
                    </span>
                  </p>
                  <p className={`mt-2 text-xs flex-1 ${plan.featured ? "text-white/85" : "text-body"}`}>
                    {text.description}
                  </p>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href={localizedHref(lang, "/pricing")}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-3 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            {t.cta}
            <IconArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
