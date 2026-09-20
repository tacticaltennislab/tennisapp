import type { Metadata } from "next";
import { LOCALES, isLocale, type Locale } from "@/i18n/locales";
import { seoTranslations } from "@/i18n/dictionaries/seo";

/** Builds the generateMetadata() result for a translated page. `path` is
 * the un-prefixed path (e.g. "/pricing", or "" for the homepage). */
export function localizedMetadata(page: keyof typeof seoTranslations, lang: string, path: string): Metadata {
  if (!isLocale(lang)) return {};
  const seo = seoTranslations[page][lang as Locale];
  if (!seo) return {};

  const languages: Record<string, string> = { en: path || "/" };
  for (const l of LOCALES) {
    languages[l] = `/${l}${path}`;
  }

  return {
    title: seo.title,
    description: seo.description,
    openGraph: { title: seo.title, description: seo.description },
    twitter: { title: seo.title, description: seo.description },
    alternates: {
      canonical: `/${lang}${path}`,
      languages,
    },
  };
}
