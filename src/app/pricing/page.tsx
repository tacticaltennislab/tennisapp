import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import PricingCarousel from "@/components/PricingCarousel";
import { IconArrowRight } from "@/components/icons";
import { PLANS } from "@/lib/plans";
import { auth } from "@/auth";
import { countSuccessfulReferrals } from "@/lib/referral";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tennis Coaching Plans & Pricing for Junior Players",
  description:
    "Coaching plans for junior and competitive tennis players, from $49. One-time technique reviews, a 4-week development program, match analysis, and ongoing PRO Tour coaching with a real coach.",
};

export default async function PricingPage() {
  const session = await auth();
  const referralCount = session?.user ? await countSuccessfulReferrals(session.user.id) : 0;

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="Pricing"
        title="Coaching plans for every goal"
        subtitle="Send your video, choose the analysis that fits what you're working on, and get feedback from a real coach — not an algorithm."
      />

      <main className="flex-1 px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs text-muted -mt-4 mb-8">
            All prices are in USD. No VAT or sales tax is added at checkout.
          </p>
          <Reveal variant="zoom">
            <PricingCarousel plans={PLANS} referralCount={referralCount} />
          </Reveal>

          <Reveal variant="zoom" className="mt-10">
            <div className="rounded-2xl bg-onyx text-white p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-sm font-semibold text-lime-400 uppercase tracking-wide">
                  Clubs &amp; academies
                </p>
                <h2 className="text-2xl font-bold mt-1">Coaching for your whole team</h2>
                <p className="mt-2 text-white/70 max-w-xl">
                  Running a club, academy, or team? We put together custom group
                  coaching packages &mdash; volume pricing on video analysis,
                  shared training plans, and a dedicated point of contact.
                </p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold px-5 py-3 shadow-lg transition-all hover:-translate-y-0.5"
              >
                Ask about club pricing
                <IconArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </main>
    </div>
  );
}
