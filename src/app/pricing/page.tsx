import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import PricingCarousel, { type Plan } from "@/components/PricingCarousel";
import { IconArrowRight } from "@/components/icons";

const PLANS: Plan[] = [
  {
    name: "Stroke Fix",
    price: "$49",
    period: "one-time",
    description: "Professional biomechanical analysis of one specific technical issue.",
    features: [
      "Video breakdown",
      "Technical diagnosis",
      "Visual feedback",
      "Correction recommendations",
    ],
  },
  {
    name: "Smart System",
    price: "$99",
    period: "4-week program",
    description: "An individualized four-week development system focused on one stroke.",
    features: [
      "7 progressive training sessions",
      "Technical development pathway",
      "Exercise library",
      "Coaching notes",
      "Exercise support",
    ],
  },
  {
    name: "Match IQ",
    price: "$99",
    period: "one-time",
    description: "A comprehensive tactical analysis of your match play.",
    features: [
      "Point construction analysis",
      "Shot selection evaluation",
      "Court positioning review",
      "Tactical recommendations",
      "Match intelligence report",
    ],
  },
  {
    name: "PRO Tour",
    price: "$249",
    period: "/month",
    description: "The complete online coaching experience.",
    features: [
      "Technical analysis",
      "Personalized planning",
      "Ongoing adjustments",
      "Direct coach access",
      "24-hour response guarantee",
      "Full development support",
    ],
    featured: true,
  },
];

export default function PricingPage() {
  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="Pricing"
        title="Coaching plans for every goal"
        subtitle="Send your video, choose the analysis that fits what you're working on, and get feedback from a real coach — not an algorithm."
      />

      <main className="flex-1 px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Reveal variant="zoom">
            <PricingCarousel plans={PLANS} />
          </Reveal>

          <Reveal variant="zoom" className="mt-16">
            <div className="rounded-2xl bg-ink text-white p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
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
