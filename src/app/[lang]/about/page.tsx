import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutContent from "@/components/AboutContent";
import { isLocale } from "@/i18n/locales";
import { localizedMetadata } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return localizedMetadata("about", lang, "/about");
}

export default async function LocalizedAbout({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <AboutContent lang={lang} />;
}
