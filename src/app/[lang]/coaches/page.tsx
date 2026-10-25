import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CoachesListContent from "@/components/CoachesListContent";
import { isLocale } from "@/i18n/locales";
import { localizedMetadata } from "@/i18n/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return localizedMetadata("coaches", lang, "/coaches");
}

export default async function LocalizedCoaches({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <CoachesListContent lang={lang} />;
}
