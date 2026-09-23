import { notFound } from "next/navigation";
import SubmitVideoContent from "@/components/SubmitVideoContent";
import { isLocale } from "@/i18n/locales";

export default async function LocalizedSubmitVideo({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <SubmitVideoContent lang={lang} />;
}
