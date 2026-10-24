import Link from "next/link";
import CoachesRoom from "@/components/CoachesRoom";
import ProductScrollSection from "@/components/ProductScrollSection";
import OffersPreview from "@/components/OffersPreview";
import Testimonials from "@/components/Testimonials";
import BackedBy from "@/components/BackedBy";
import TrustStrip from "@/components/TrustStrip";
import FinalCta from "@/components/FinalCta";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import SitePhoto from "@/components/SitePhoto";
import { IconArrowRight } from "@/components/icons";
import { prisma } from "@/lib/prisma";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import { SITE_PHOTOS } from "@/lib/sitePhotos";
import { localizedHref, type AppLocale } from "@/i18n/locales";

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
    <main className="flex-1 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero: one sentence, one action. A wide photograph joins it once supplied. */}
      <section className="container-x pt-20 pb-16 text-center sm:pt-28 sm:pb-24 lg:pt-36">
        <h1 className="animate-fade-up t-display mx-auto max-w-5xl">{dict.hero.title}</h1>
        <p
          className="animate-fade-up t-lead mx-auto mt-7 max-w-2xl"
          style={{ animationDelay: "80ms" }}
        >
          {dict.hero.subtitle}
        </p>
        <div
          className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          style={{ animationDelay: "160ms" }}
        >
          <Link href={localizedHref(lang, "/contact")} className="btn btn-primary">
            {dict.hero.ctaPrimary}
          </Link>
          <Link
            href={`${localizedHref(lang, "/pricing")}?audience=clubs`}
            className="link-arrow"
          >
            {dict.hero.ctaSecondary}
            <IconArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <p
          className="animate-fade-up mt-8 text-sm text-muted"
          style={{ animationDelay: "240ms" }}
        >
          {dict.hero.playersNote}{" "}
          <Link
            href={`${localizedHref(lang, "/pricing")}?audience=players`}
            className="font-medium text-ink underline underline-offset-4 decoration-line-strong hover:decoration-ink transition-colors"
          >
            {dict.hero.playersLink}
          </Link>
        </p>
        <SitePhoto
          photo={SITE_PHOTOS.hero}
          priority
          className="mt-16 aspect-[21/9] sm:mt-20"
        />
      </section>

      <TrustStrip lang={lang} />

      <ServicesSection lang={lang} />

      <ProcessSection lang={lang} />

      <ProductScrollSection lang={lang} />

      <OffersPreview lang={lang} />

      <Testimonials lang={lang} />

      <CoachesRoom lang={lang} />

      <BackedBy lang={lang} />

      <FinalCta lang={lang} />
    </main>
  );
}
