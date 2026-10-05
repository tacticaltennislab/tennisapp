import type { Metadata } from "next";
import PricingContent from "@/components/PricingContent";
import { parseAudience } from "@/lib/pricingAudience";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tennis Coaching Plans & Pricing for Junior Players",
  description:
    "Coaching plans for junior and competitive tennis players, from $49. One-time technique reviews, a 4-week development program, match analysis, and ongoing PRO Tour coaching with a real coach.",
  alternates: {
    canonical: "/pricing",
    languages: {
      en: "/pricing",
      pl: "/pl/pricing",
      es: "/es/pricing",
      it: "/it/pricing",
      ru: "/ru/pricing",
    },
  },
};

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ audience?: string | string[] }>;
}) {
  const { audience } = await searchParams;
  return <PricingContent lang="en" initialAudience={parseAudience(audience)} />;
}
