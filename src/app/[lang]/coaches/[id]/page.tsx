import { notFound } from "next/navigation";
import CoachDetailContent from "@/components/CoachDetailContent";
import { isLocale } from "@/i18n/locales";

export default async function LocalizedCoachProfile({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();

  return <CoachDetailContent id={id} lang={lang} />;
}
