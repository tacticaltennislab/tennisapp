import { notFound } from "next/navigation";
import AcademyDetailContent from "@/components/AcademyDetailContent";
import { isLocale } from "@/i18n/locales";

export const dynamic = "force-dynamic";

export default async function LocalizedAcademyPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();

  return <AcademyDetailContent id={id} lang={lang} />;
}
