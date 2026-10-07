import type { Metadata } from "next";
import PricingContent from "@/components/PricingContent";
import { parseAudience } from "@/lib/pricingAudience";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tennis Academy & Club Packages and Pricing",
  description:
    "Video and match analysis packages for tennis academies and clubs from $550/month, plus individual player plans from $49. Real coaches, shared feedback for coaches and players.",
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
