import { notFound } from "next/navigation";
import ResetPasswordContent from "@/components/ResetPasswordContent";
import { isLocale } from "@/i18n/locales";

export default async function LocalizedResetPassword({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <ResetPasswordContent lang={lang} />;
}
