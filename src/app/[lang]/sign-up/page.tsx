import { notFound } from "next/navigation";
import SignUpContent from "@/components/SignUpContent";
import { isLocale } from "@/i18n/locales";

export default async function LocalizedSignUp({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <SignUpContent lang={lang} />;
}
