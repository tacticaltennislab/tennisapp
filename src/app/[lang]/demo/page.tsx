import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DemoContent from "@/components/DemoContent";
import { demoDictionaries } from "@/i18n/dictionaries/demo";
import { LOCALES, isLocale } from "@/i18n/locales";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const seo = demoDictionaries[lang].meta;
  const languages: Record<string, string> = { en: "/demo" };
  for (const l of LOCALES) languages[l] = `/${l}/demo`;
  return {
    title: { absolute: seo.title },
    description: seo.description,
    openGraph: { title: seo.title, description: seo.description },
    twitter: { title: seo.title, description: seo.description },
    alternates: { canonical: `/${lang}/demo`, languages },
  };
}

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LocalizedDemo({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <DemoContent lang={lang} />;
}
