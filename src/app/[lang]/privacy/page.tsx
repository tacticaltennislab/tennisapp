import { notFound } from "next/navigation";
import PrivacyContent from "@/components/PrivacyContent";
import { isLocale } from "@/i18n/locales";

export default async function LocalizedPrivacy({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <PrivacyContent lang={lang} />;
}
