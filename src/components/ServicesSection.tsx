import Link from "next/link";
import Reveal from "@/components/Reveal";
import SitePhoto from "@/components/SitePhoto";
import ServicePreview from "@/components/motion/ServicePreview";
import { IconArrowRight } from "@/components/icons";
import { PLANS, type Plan } from "@/lib/plans";
import { planTranslations } from "@/i18n/dictionaries/plans";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import { SITE_PHOTOS } from "@/lib/sitePhotos";
import { localizedHref, type AppLocale } from "@/i18n/locales";

// Each service is described by the plan that already defines it, so the copy
// here can never drift from what is actually sold. `priceId` is the entry
// plan used for the "from" price.
const SERVICES = [
  { planId: "stroke-fix", priceId: "stroke-fix" },
  { planId: "smart-system", priceId: "smart-system" },
  { planId: "match-iq-full", priceId: "match-iq-short" },
] as const;

function plan(id: string): Plan {
  return PLANS.find((p) => p.planId === id)!;
}

export default function ServicesSection({ lang = "en" }: { lang?: AppLocale }) {
  const t = homeDictionaries[lang].services;

  return (
    <section id="services" className="section-pad scroll-mt-16">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="t-h2 mt-4">{t.title}</h2>
          <p className="t-lead mt-5 max-w-xl">{t.included}</p>
        </Reveal>

        <ol className="mt-14 border-t border-line md:mt-20">
          {SERVICES.map((svc, i) => {
            const base = plan(svc.planId);
            const text = lang === "en" ? base : planTranslations[svc.planId]?.[lang] ?? base;
            const fromPrice = plan(svc.priceId).price;
            const photo = SITE_PHOTOS.services[i];
            return (
              <Reveal key={svc.planId} as="li" delay={i * 70} className="service-row group border-b border-line">
                <div className="grid gap-8 py-12 md:grid-cols-12 md:gap-12 md:py-20">
                  <div className={photo ? "md:col-span-5" : "md:col-span-5"}>
                    <span className="t-mono text-sm text-muted" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <h3 className="t-h3 mt-4">{t.names[i]}</h3>
                    <p className="t-lead mt-5 max-w-md">{text.description}</p>
                    {!photo && <ServicePreview kind={i as 0 | 1 | 2} />}
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
                          {f}
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
