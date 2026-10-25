import { notFound } from "next/navigation";
import AcademyIndexContent from "@/components/AcademyIndexContent";
import { isLocale } from "@/i18n/locales";

export const dynamic = "force-dynamic";

export default async function LocalizedAcademyIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <AcademyIndexContent lang={lang} />;
}
