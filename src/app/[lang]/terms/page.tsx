import { notFound } from "next/navigation";
import TermsContent from "@/components/TermsContent";
import { isLocale } from "@/i18n/locales";

export default async function LocalizedTerms({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <TermsContent lang={lang} />;
}
