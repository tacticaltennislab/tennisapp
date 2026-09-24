import { notFound } from "next/navigation";
import CheckoutSuccessContent from "@/components/CheckoutSuccessContent";
import { isLocale } from "@/i18n/locales";

export const dynamic = "force-dynamic";

export default async function LocalizedCheckoutSuccess({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ session_id?: string; free?: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <CheckoutSuccessContent lang={lang} searchParams={searchParams} />;
}
