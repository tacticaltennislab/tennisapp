import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactContent from "@/components/ContactContent";
import { isLocale } from "@/i18n/locales";
import { localizedMetadata } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return localizedMetadata("contact", lang, "/contact");
}

export default async function LocalizedContact({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <ContactContent lang={lang} />;
}
