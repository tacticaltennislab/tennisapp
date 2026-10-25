import { notFound } from "next/navigation";
import AccountContent from "@/components/AccountContent";
import { isLocale } from "@/i18n/locales";

export const dynamic = "force-dynamic";

export default async function LocalizedAccount({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <AccountContent lang={lang} />;
}
