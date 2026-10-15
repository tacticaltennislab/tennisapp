import Link from "next/link";
import Court3D from "@/components/Court3D";
import CoachesRoom from "@/components/CoachesRoom";
import Reveal from "@/components/Reveal";
import BallMark from "@/components/BallMark";
import TiltCard from "@/components/TiltCard";
import LightCourt3D from "@/components/LightCourt3D";
import JourneySection from "@/components/JourneySection";
import ProductScrollSection from "@/components/ProductScrollSection";
import OffersPreview from "@/components/OffersPreview";
import Testimonials from "@/components/Testimonials";
import BackedBy from "@/components/BackedBy";
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
      <section className="relative overflow-hidden min-h-[560px] sm:min-h-[640px] flex items-center">
        <div className="absolute inset-0">
          <Court3D />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(10,20,14,0.92) 0%, rgba(10,20,14,0.72) 45%, rgba(10,20,14,0.35) 75%, rgba(10,20,14,0.15) 100%)",
          }}
        />
        <div
          className="animate-drift absolute w-24 h-24 rounded-full bg-lime-400/20 blur-2xl top-16 right-[12%] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="animate-drift absolute w-32 h-32 rounded-full bg-brand-500/20 blur-2xl bottom-10 right-[28%] pointer-events-none"
          style={{ animationDelay: "-4s" }}
          aria-hidden="true"
        />
        <div className="relative max-w-3xl mx-auto px-4 py-16 sm:py-20 w-full">
          <div className="animate-fade-up flex flex-wrap gap-2 mb-6">
            {dict.badges.map((b) => (
              <span
                key={b}
                className="text-xs font-medium text-white bg-white/10 border border-white/20 backdrop-blur rounded-full px-3 py-1"
              >
                {b}
              </span>
            ))}
          </div>
          <h1
            className="animate-fade-up text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-white"
            style={{ animationDelay: "60ms" }}
          >
            {dict.hero.titlePre}
            <span className="text-gradient">{dict.hero.titleHighlight}</span>
            <br />
            {dict.hero.titleSuffix}
          </h1>
          <p
            className="animate-fade-up mt-5 text-lg text-white/80 max-w-xl"
            style={{ animationDelay: "120ms" }}
          >
            {dict.hero.subtitle}
          </p>
          <div
            className="animate-fade-up mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "180ms" }}
          >
            <Link
              href={localizedHref(lang, "/contact")}
              className="group inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold px-5 py-3 shadow-lg shadow-black/30 hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              {dict.hero.ctaPrimary}
              <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={`${localizedHref(lang, "/pricing")}?audience=clubs`}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/25 hover:bg-white/20 backdrop-blur text-white font-semibold px-5 py-3 transition-colors"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>
          <p
            className="animate-fade-up mt-5 text-sm text-white/70"
            style={{ animationDelay: "240ms" }}
          >
            {dict.hero.playersNote}{" "}
            <Link
              href={`${localizedHref(lang, "/pricing")}?audience=players`}
              className="font-medium text-white underline underline-offset-4 hover:text-lime-300"
            >
              {dict.hero.playersLink}
            </Link>
          </p>
        </div>
      </section>

      <div
        aria-hidden="true"
        className="h-16 sm:h-24"
        style={{ background: "linear-gradient(to bottom, var(--color-onyx), var(--background))" }}
      />

      <OffersPreview lang={lang} />

      <section className="px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">
              {dict.whoThisFor.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1">{dict.whoThisFor.title}</h2>
            <p className="text-body mt-2 max-w-lg mx-auto">{dict.whoThisFor.subtitle}</p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {dict.audiences.map((a, i) => {
              const Icon = AUDIENCE_ICONS[i];
              return (
                <Reveal key={a.title} variant="zoom" delay={i * 120}>
                  <TiltCard
                    maxTilt={6}
                    className="group h-full flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm hover:shadow-lg"
                  >
                    <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="mt-4 text-xs font-semibold text-brand-600 uppercase tracking-wide">
                      {a.title}
                    </p>
                    <h3 className="mt-1 font-bold text-lg leading-snug">{a.hook}</h3>
                    <p className="mt-2 text-sm text-body flex-1">{a.detail}</p>
                    <Link
                      href={i === 1 ? `${localizedHref(lang, "/")}#how-it-works` : localizedHref(lang, AUDIENCE_PATHS[i])}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline"
                    >
                      {a.cta}
                      <IconArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <ProductScrollSection lang={lang} />

      <section id="how-it-works" className="relative overflow-hidden py-16 w-full">
        <LightCourt3D />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 38%, color-mix(in srgb, var(--background) 60%, transparent) 0%, color-mix(in srgb, var(--background) 32%, transparent) 55%, color-mix(in srgb, var(--background) 5%, transparent) 100%)",
          }}
        />
        <BallMark className="hidden md:block absolute -top-8 -right-8 w-40 h-40 text-brand-100 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4">
          <Reveal className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">{dict.howItWorks.title}</h2>
            <p className="text-body mt-2 max-w-lg mx-auto">{dict.howItWorks.subtitle}</p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {dict.steps.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <Reveal key={step.title} variant="zoom" delay={i * 120}>
                  <TiltCard
                    maxTilt={6}
                    className="group relative h-full rounded-2xl border border-line bg-surface p-6 shadow-sm hover:shadow-lg"
                  >
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="mt-4 font-semibold text-lg">{step.title}</h3>
                    <p className="mt-1 text-sm text-body">{step.detail}</p>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <BackedBy lang={lang} />

      <Testimonials lang={lang} />

      <div
        aria-hidden="true"
        className="h-16 sm:h-24"
        style={{ background: "linear-gradient(to bottom, var(--background), var(--color-onyx))" }}
      />

      <JourneySection lang={lang} />

      <CoachesRoom lang={lang} />

      <div
        aria-hidden="true"
        className="h-16 sm:h-24"
        style={{ background: "linear-gradient(to bottom, var(--color-onyx), var(--background))" }}
      />
    </div>
  );
}
