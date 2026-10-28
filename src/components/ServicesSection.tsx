import Link from "next/link";
import Reveal from "@/components/Reveal";
import ClayBackdrop from "@/components/motion/ClayBackdrop";
import SitePhoto from "@/components/SitePhoto";
import { IconArrowRight } from "@/components/icons";
import { PLANS, fillCreditVars, type Plan } from "@/lib/plans";
import { planTranslations } from "@/i18n/dictionaries/plans";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import { SITE_PHOTOS } from "@/lib/sitePhotos";
import { localizedHref, type AppLocale } from "@/i18n/locales";

// Each service is described by the plan that already defines it, so the copy
// here can never drift from what is actually sold. `priceId` is the entry
// plan used for the "from" price.
const SERVICES = [
  { planId: "stroke-analysis", priceId: "stroke-analysis" },
  { planId: "training-program", priceId: "training-program" },
  { planId: "match-analysis-full", priceId: "match-analysis" },
] as const;

function plan(id: string): Plan {
  return PLANS.find((p) => p.planId === id)!;
}

export default function ServicesSection({ lang = "en" }: { lang?: AppLocale }) {
  const t = homeDictionaries[lang].services;

  return (
    <section id="services" className="section-pad relative isolate scroll-mt-16">
      <ClayBackdrop />
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="t-h2 mt-4">{t.title}</h2>
          <p className="t-lead mt-5 max-w-xl">{t.included}</p>
        </Reveal>

        <ol className="mt-14 space-y-5 md:mt-20 md:space-y-6">
          {SERVICES.map((svc, i) => {
            const base = plan(svc.planId);
            const text = lang === "en" ? base : planTranslations[svc.planId]?.[lang] ?? base;
            const fromPrice = plan(svc.priceId).price;
            const photo = SITE_PHOTOS.services[i];
            return (
              <Reveal key={svc.planId} as="li" delay={i * 70} className="group glass-panel overflow-hidden rounded-3xl transition-colors duration-300 hover:border-line-strong">
                <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-12 md:gap-12 md:p-12">
                  <div className="md:col-span-5">
                    <span className="t-mono text-sm text-muted" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <h3 className="t-h3 mt-4">{t.names[i]}</h3>
                    <p className="t-lead mt-5 max-w-md">{fillCreditVars(text.description)}</p>
                  </div>

                  <div className="md:col-span-7">
                    {photo && (
                      <div className="mb-8 overflow-hidden rounded-3xl">
                        <SitePhoto
                          photo={photo}
                          className="aspect-[4/3] !rounded-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          sizes="(min-width: 768px) 55vw, 100vw"
                        />
                      </div>
                    )}
                    <ul className="border-t border-line">
                      {text.features.slice(0, 4).map((f) => (
                        <li key={f} className="border-b border-line py-3.5 text-[1.0625rem] text-body">
                          {fillCreditVars(f)}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
                      <p className="text-[0.9375rem] text-muted">
                        {t.from} <span className="t-mono text-lg font-semibold text-ink">{fromPrice}</span>
                      </p>
                      <Link
                        href={`${localizedHref(lang, "/pricing")}?audience=players`}
                        className="link-arrow text-[0.9375rem]"
                      >
                        {t.cta}
                        <IconArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
