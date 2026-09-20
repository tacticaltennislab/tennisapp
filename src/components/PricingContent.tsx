import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import PricingCarousel from "@/components/PricingCarousel";
import { IconArrowRight } from "@/components/icons";
import { PLANS } from "@/lib/plans";
import { auth } from "@/auth";
import { countSuccessfulReferrals } from "@/lib/referral";
import { pricingDictionaries } from "@/i18n/dictionaries/pricing";
import { localizedHref, type AppLocale } from "@/i18n/locales";

export default async function PricingContent({ lang = "en" }: { lang?: AppLocale }) {
  const t = pricingDictionaries[lang];
  const session = await auth();
  const referralCount = session?.user ? await countSuccessfulReferrals(session.user.id) : 0;

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow={t.pageHeader.eyebrow}
        title={t.pageHeader.title}
        subtitle={t.pageHeader.subtitle}
      />

      <main className="flex-1 px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs text-muted -mt-4 mb-8">{t.noVatNote}</p>
          <Reveal variant="zoom">
            <PricingCarousel plans={PLANS} referralCount={referralCount} lang={lang} />
          </Reveal>

          <Reveal variant="zoom" className="mt-10">
            <div className="rounded-2xl bg-onyx text-white p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-sm font-semibold text-lime-400 uppercase tracking-wide">
                  {t.clubs.eyebrow}
                </p>
                <h2 className="text-2xl font-bold mt-1">{t.clubs.title}</h2>
                <p className="mt-2 text-white/70 max-w-xl">{t.clubs.subtitle}</p>
              </div>
              <Link
                href={localizedHref(lang, "/contact")}
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold px-5 py-3 shadow-lg transition-all hover:-translate-y-0.5"
              >
                {t.clubs.cta}
                <IconArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </main>
    </div>
  );
}
