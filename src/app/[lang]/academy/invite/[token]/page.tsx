import { notFound } from "next/navigation";
import AcademyInviteContent from "@/components/AcademyInviteContent";
import { isLocale } from "@/i18n/locales";

export const dynamic = "force-dynamic";

export default async function LocalizedAcademyInvitePage({
  params,
}: {
  params: Promise<{ lang: string; token: string }>;
}) {
  const { lang, token } = await params;
  if (!isLocale(lang)) notFound();

  return <AcademyInviteContent token={token} lang={lang} />;
}
