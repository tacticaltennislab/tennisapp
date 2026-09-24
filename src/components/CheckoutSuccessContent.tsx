import Link from "next/link";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { IconArrowRight } from "@/components/icons";
import { checkoutSuccessDictionaries } from "@/i18n/dictionaries/checkout";
import { localizedHref, type AppLocale } from "@/i18n/locales";

export default async function CheckoutSuccessContent({
  lang = "en",
  searchParams,
}: {
  lang?: AppLocale;
  searchParams: Promise<{ session_id?: string; free?: string }>;
}) {
  const t = checkoutSuccessDictionaries[lang];
  const { session_id, free } = await searchParams;
  if (!session_id && free !== "1") {
    redirect(localizedHref(lang, "/pricing"));
  }

  const session = session_id
    ? await stripe.checkout.sessions.retrieve(session_id).catch(() => null)
    : null;

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-20">
      <div className="max-w-md text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-2xl">
          ✓
        </div>
        <h1 className="mt-4 text-2xl font-bold">{t.title}</h1>
        <p className="mt-2 text-body">
          {free === "1"
            ? t.freeMessage
            : session?.payment_status === "paid" || session?.status === "complete"
              ? t.paidMessage
              : t.pendingMessage}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href={localizedHref(lang, "/submit-video")}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-3 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            {t.sendVideo}
            <IconArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={localizedHref(lang, "/account")}
            className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 font-semibold hover:border-brand-600 transition-colors"
          >
            {t.goToAccount}
          </Link>
        </div>
      </div>
    </main>
  );
}
