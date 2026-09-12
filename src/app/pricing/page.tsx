import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import PricingCarousel, { type Plan } from "@/components/PricingCarousel";
import { IconArrowRight } from "@/components/icons";
import Link from "next/link";

const PLANS: Plan[] = [
  {
    planId: "stroke-fix",
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
    whatYouGet: [
      "What's actually causing the issue — not just what looks wrong",
      "Whether it's technique, timing, or a footwork problem underneath it",
      "The one change to prioritize first, not five conflicting opinions",
      "A drill you can start on today",
      "What it should feel like once it's actually fixed",
    ],
  },
  {
    planId: "smart-system",
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
    whatYouGet: [
      "Which single stroke is worth a full month of your court time",
      "A week-by-week progression, not a scattered list of drills",
      "What to check after each session so you're not repeating the same mistake",
      "When to move from feel, to speed, to match pace",
      "What \"done\" looks like before you move on to the next stroke",
    ],
  },
  {
    planId: "match-iq-short",
    name: "Match IQ: Short",
    price: "$99",
    period: "one-time",
    description: "A focused tactical analysis of one set or up to 60 minutes of match play.",
    features: [
      "Up to 60 minutes of match footage",
      "Point construction analysis",
      "Shot selection evaluation",
      "Tactical recommendations",
      "Match intelligence report",
    ],
    whatYouGet: [
      "Which patterns actually won you points in that set",
      "What really happened after your first and second serve",
      "Where you were positioned for the return",
      "The one tactical adjustment worth making next time you play",
    ],
  },
  {
    planId: "match-iq-full",
    name: "Match IQ: Full",
    price: "$159",
    period: "one-time",
    description: "A complete tactical breakdown of your match, point by point.",
    features: [
      "Up to one full match (max 2 hours of footage)",
      "Point construction analysis",
      "Shot selection evaluation",
      "Court positioning review",
      "Tactical recommendations",
      "Full match intelligence report",
    ],
    whatYouGet: [
      "Which patterns are actually winning you points — and which ones you keep repeating for nothing",
      "What really happens after your first and second serve",
      "Where you're positioned for the return, and whether you're pressuring second serves",
      "Whether your first shot after the return goes the right direction",
      "How your decision-making changes at 30-30, deuce, and break points",
      "Whether you're trying to finish points too early",
      "Which side of the court you keep getting pushed off of",
      "Whether you recover to a neutral position after defending",
      "The two patterns worth training next",
    ],
  },
  {
    planId: "pro-tour",
    name: "PRO Tour",
    price: "$249",
    period: "/month",
    description: "Ongoing coaching with monthly analysis and direct access to your coach.",
    features: [
      "Up to 4 video analyses per month",
      "Personalized planning",
      "Ongoing adjustments",
      "Direct coach access",
      "Response within 1 business day",
      "Full development support",
    ],
    whatYouGet: [
      "What's actually improving month over month, not just this session",
      "Direct access to ask \"why\" between analyses, not just wait for the next report",
      "Priorities that update as your game changes, not a static plan",
      "A coach who already knows your history when you send the next video",
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

          <Reveal variant="zoom" className="mt-10">
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
