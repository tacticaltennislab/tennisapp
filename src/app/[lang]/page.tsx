import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeContent from "@/components/HomeContent";
import { isLocale } from "@/i18n/locales";
import { seoTranslations } from "@/i18n/dictionaries/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const seo = seoTranslations.home[lang];
  return {
    title: seo.title,
    description: seo.description,
    openGraph: { title: seo.title, description: seo.description },
    twitter: { title: seo.title, description: seo.description },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/",
        pl: "/pl",
        es: "/es",
        it: "/it",
        ru: "/ru",
      },
    },
  };
}

export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <HomeContent lang={lang} />;
}
