import Link from "next/link";
import Court3D from "@/components/Court3D";
import CoachesRoom from "@/components/CoachesRoom";
import Reveal from "@/components/Reveal";
import ProductScrollSection from "@/components/ProductScrollSection";
import OffersPreview from "@/components/OffersPreview";
import Testimonials from "@/components/Testimonials";
import BackedBy from "@/components/BackedBy";
import TrustStrip from "@/components/TrustStrip";
import FinalCta from "@/components/FinalCta";
import { prisma } from "@/lib/prisma";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import { localizedHref, type AppLocale } from "@/i18n/locales";
import {
  IconArrowRight,
  IconPlan,
  IconTarget,
  IconUpload,
  IconGrowth,
  IconVideo,
} from "@/components/icons";

const AUDIENCE_ICONS = [IconTarget, IconGrowth, IconVideo];
// Card 1 -> academy packages, card 2 -> how it works (anchor, built inline), card 3 -> contact.
const AUDIENCE_PATHS = ["/pricing?audience=clubs", "", "/contact"];
const STEP_ICONS = [IconUpload, IconTarget, IconPlan];

export default async function HomeContent({ lang = "en" }: { lang?: AppLocale }) {
  const dict = homeDictionaries[lang];

  const reviewStats = await prisma.review.aggregate({
    where: { status: "approved" },
    _avg: { rating: true },
    _count: { rating: true },
  });

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Tennis coaching",
    name: "Tactical Tennis Lab: Video & Match Analysis for Tennis Academies and Clubs",
    provider: {
      "@type": "Organization",
      name: "Tactical Tennis Lab",
    },
    audience: {
      "@type": "Audience",
      audienceType: "Tennis academies, clubs and their coaches and players",
    },
    areaServed: "Worldwide",
    ...(reviewStats._count.rating > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: reviewStats._avg.rating?.toFixed(1),
            reviewCount: reviewStats._count.rating,
          },
        }
      : {}),
  };

  return (
    <div className="flex-1 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero: forest court backdrop, one headline, one primary action. */}
      <section className="relative overflow-hidden bg-forest min-h-[560px] lg:min-h-[640px] flex items-center">
        <div className="absolute inset-0">
          <Court3D />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(20,38,28,0.94) 0%, rgba(20,38,28,0.78) 45%, rgba(20,38,28,0.4) 75%, rgba(20,38,28,0.2) 100%)",
          }}
        />
        <div className="relative container-x py-16 sm:py-24">
          <div className="max-w-4xl">
            <h1 className="animate-fade-up t-display text-cream">
              {dict.hero.titlePre}
              <span className="text-gradient">{dict.hero.titleHighlight}</span>
              <br />
              {dict.hero.titleSuffix}
            </h1>
            <p
              className="animate-fade-up t-lead mt-6 text-cream/80 max-w-xl"
              style={{ animationDelay: "80ms" }}
            >
              {dict.hero.subtitle}
            </p>
            <div
              className="animate-fade-up mt-9 flex flex-wrap gap-3"
              style={{ animationDelay: "160ms" }}
            >
              <Link href={localizedHref(lang, "/contact")} className="btn btn-on-dark">
                {dict.hero.ctaPrimary}
                <IconArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`${localizedHref(lang, "/pricing")}?audience=clubs`}
                className="btn btn-ghost-dark"
              >
                {dict.hero.ctaSecondary}
              </Link>
            </div>
            <p
              className="animate-fade-up mt-6 text-sm text-cream/70"
              style={{ animationDelay: "240ms" }}
            >
              {dict.hero.playersNote}{" "}
              <Link
                href={`${localizedHref(lang, "/pricing")}?audience=players`}
                className="font-medium text-cream underline underline-offset-4 hover:text-gold"
              >
                {dict.hero.playersLink}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <TrustStrip lang={lang} />

      {/* Who it is for */}
      <section className="section-pad">
        <div className="container-x">
          <Reveal className="text-center">
            <p className="eyebrow">{dict.whoThisFor.eyebrow}</p>
            <h2 className="t-h2 mt-3">{dict.whoThisFor.title}</h2>
            <p className="t-lead mt-4 text-body max-w-2xl mx-auto">{dict.whoThisFor.subtitle}</p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {dict.audiences.map((a, i) => {
              const Icon = AUDIENCE_ICONS[i];
              return (
                <Reveal key={a.title} variant="zoom" delay={i * 100}>
                  <div className="card card-hover group h-full flex flex-col p-6">
                    <div className="w-10 h-10 rounded-md bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-on-brand transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="eyebrow mt-5">{a.title}</p>
                    <h3 className="mt-3 text-xl font-semibold leading-snug">{a.hook}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-body flex-1">{a.detail}</p>
                    <Link
                      href={
                        i === 1
                          ? `${localizedHref(lang, "/")}#how-it-works`
                          : localizedHref(lang, AUDIENCE_PATHS[i])
                      }
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline"
                    >
                      {a.cta}
                      <IconArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section-pad bg-surface-muted scroll-mt-20">
        <div className="container-x">
          <Reveal className="text-center">
            <h2 className="t-h2">{dict.howItWorks.title}</h2>
            <p className="t-lead mt-4 text-body max-w-2xl mx-auto">{dict.howItWorks.subtitle}</p>
          </Reveal>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {dict.steps.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <Reveal key={step.title} variant="zoom" delay={i * 100} as="li">
                  <div className="card h-full p-6">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-md bg-brand-50 text-brand-600 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="t-mono text-sm font-semibold text-gold-ink" aria-hidden="true">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold leading-snug">{step.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">{step.detail}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <ProductScrollSection lang={lang} />

      <OffersPreview lang={lang} />

      <Testimonials lang={lang} />

      <BackedBy lang={lang} />

      <CoachesRoom lang={lang} />

      <FinalCta lang={lang} />
    </div>
  );
}
