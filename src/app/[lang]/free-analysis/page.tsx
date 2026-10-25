import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FreeAnalysisContent from "@/components/FreeAnalysisContent";
import { freeAnalysisDictionaries } from "@/i18n/dictionaries/freeAnalysis";
import { LOCALES, isLocale } from "@/i18n/locales";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const seo = freeAnalysisDictionaries[lang].meta;
  const languages: Record<string, string> = { en: "/free-analysis" };
  for (const l of LOCALES) languages[l] = `/${l}/free-analysis`;
  return {
    title: seo.title,
    description: seo.description,
    openGraph: { title: seo.title, description: seo.description },
    alternates: { canonical: `/${lang}/free-analysis`, languages },
  };
}

export default async function LocalizedFreeAnalysis({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <FreeAnalysisContent lang={lang} />;
}
