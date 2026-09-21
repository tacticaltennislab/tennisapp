import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FaqContent from "@/components/FaqContent";
import { isLocale } from "@/i18n/locales";
import { localizedMetadata } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return localizedMetadata("faq", lang, "/faq");
}

export default async function LocalizedFaq({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <FaqContent lang={lang} />;
}
