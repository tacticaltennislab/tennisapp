import { notFound } from "next/navigation";
import ReviewPageContent from "@/components/ReviewPageContent";
import { isLocale } from "@/i18n/locales";

export const dynamic = "force-dynamic";

export default async function LocalizedReview({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <ReviewPageContent lang={lang} />;
}
