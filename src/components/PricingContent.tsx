import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import PricingCarousel from "@/components/PricingCarousel";
import PricingAudienceSwitch from "@/components/PricingAudienceSwitch";
import type { Audience } from "@/lib/pricingAudience";
import ClubOffers from "@/components/ClubOffers";
import { PLANS } from "@/lib/plans";
import { auth } from "@/auth";
import { countSuccessfulReferrals } from "@/lib/referral";
import { pricingDictionaries } from "@/i18n/dictionaries/pricing";
import type { AppLocale } from "@/i18n/locales";

export default async function PricingContent({
  lang = "en",
  initialAudience = "players",
}: {
  lang?: AppLocale;
  initialAudience?: Audience;
}) {
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
          <PricingAudienceSwitch
            playersLabel={t.audience.players}
            clubsLabel={t.audience.clubs}
            initialAudience={initialAudience}
            players={
              <>
                <p className="text-center text-xs text-muted -mt-4 mb-8">{t.noVatNote}</p>
                <Reveal variant="zoom">
                  <PricingCarousel plans={PLANS} referralCount={referralCount} lang={lang} />
                </Reveal>
              </>
            }
            clubs={
              <Reveal variant="zoom">
                <ClubOffers
                  eyebrow={t.clubs.eyebrow}
                  title={t.clubs.title}
                  subtitle={t.clubs.subtitle}
                  benefits={t.clubs.benefits}
                  tiers={t.clubs.tiers}
                  cta={t.clubs.cta}
                  note={t.clubs.note}
                />
              </Reveal>
            }
          />
        </div>
      </main>
    </div>
  );
}
