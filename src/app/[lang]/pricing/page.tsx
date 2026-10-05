import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PricingContent from "@/components/PricingContent";
import { parseAudience } from "@/lib/pricingAudience";
import { isLocale } from "@/i18n/locales";
import { localizedMetadata } from "@/i18n/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return localizedMetadata("pricing", lang, "/pricing");
}

export default async function LocalizedPricing({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ audience?: string | string[] }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { audience } = await searchParams;

  return <PricingContent lang={lang} initialAudience={parseAudience(audience)} />;
}
