import { notFound } from "next/navigation";
import ForgotPasswordContent from "@/components/ForgotPasswordContent";
import { isLocale } from "@/i18n/locales";

export default async function LocalizedForgotPassword({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <ForgotPasswordContent lang={lang} />;
}
