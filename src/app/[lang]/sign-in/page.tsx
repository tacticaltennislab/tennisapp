import { notFound } from "next/navigation";
import SignInContent from "@/components/SignInContent";
import { isLocale } from "@/i18n/locales";

export default async function LocalizedSignIn({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <SignInContent lang={lang} />;
}
