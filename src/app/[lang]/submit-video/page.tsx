import { notFound } from "next/navigation";
import SubmitVideoContent from "@/components/SubmitVideoContent";
import { isLocale } from "@/i18n/locales";

export const dynamic = "force-dynamic";

export default async function LocalizedSubmitVideo({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ free?: string | string[] }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { free } = await searchParams;

  return <SubmitVideoContent lang={lang} free={free === "1"} />;
}
