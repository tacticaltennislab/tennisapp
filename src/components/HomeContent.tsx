import CoachesRoom from "@/components/CoachesRoom";
import ProductScrollSection from "@/components/ProductScrollSection";
import OffersPreview from "@/components/OffersPreview";
import Testimonials from "@/components/Testimonials";
import BackedBy from "@/components/BackedBy";
import TrustStrip from "@/components/TrustStrip";
import FinalCta from "@/components/FinalCta";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import HeroSection from "@/components/HeroSection";
import { prisma } from "@/lib/prisma";
import type { AppLocale } from "@/i18n/locales";

export default async function HomeContent({ lang = "en" }: { lang?: AppLocale }) {
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

      {/* One dark chapter: the headline, then the court view that proves it. */}
      <div className="theme-charcoal bg-background text-body">
        <HeroSection lang={lang} />
        <ProductScrollSection lang={lang} />
      </div>

      <TrustStrip lang={lang} />

      <ServicesSection lang={lang} />

      <ProcessSection lang={lang} />

      <OffersPreview lang={lang} />

      <Testimonials lang={lang} />

      <CoachesRoom lang={lang} />

      <BackedBy lang={lang} />

      <FinalCta lang={lang} />
    </main>
  );
}
