import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import PricingCarousel, { type Plan } from "@/components/PricingCarousel";
import { IconArrowRight, IconTarget } from "@/components/icons";

const MATCH_IQ_QUESTIONS = [
  "Which patterns are actually winning you points — and which ones you keep repeating for nothing",
  "What really happens after your first and second serve",
  "Where you're positioned for the return, and whether you're pressuring second serves",
  "Whether your first shot after the return goes the right direction",
  "How your decision-making changes at 30-30, deuce, and break points",
  "Whether you're trying to finish points too early",
  "Which side of the court you keep getting pushed off of",
  "Whether you recover to a neutral position after defending",
  "The two patterns worth training next",
];

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
  },
  {
    planId: "match-iq-full",
    name: "Match IQ: Full",
    price: "$159",
    period: "one-time",
    description: "A complete tactical breakdown of your entire match, point by point.",
    features: [
      "Full match footage, no time limit",
      "Point construction analysis",
      "Shot selection evaluation",
      "Court positioning review",
      "Tactical recommendations",
      "Full match intelligence report",
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
            <div className="rounded-2xl border border-line bg-brand-50/40 p-8 sm:p-10">
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">
                What you get
              </p>
              <h2 className="text-2xl font-bold mt-1">
                What a Match IQ report actually answers
              </h2>
              <p className="mt-2 text-body max-w-2xl">
                Not a highlight reel — real answers to the questions that
                decide close matches.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {MATCH_IQ_QUESTIONS.map((q) => (
                  <li
                    key={q}
                    className="flex items-start gap-3 rounded-xl bg-white border border-line p-4"
                  >
                    <span className="shrink-0 mt-0.5 text-brand-600">
                      <IconTarget className="w-4 h-4" />
                    </span>
                    <span className="text-sm text-body">{q}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted max-w-2xl">
                Your on-court coach does the work that matters most — daily
                reps, technique under real pressure, knowing your game. We&apos;re
                not here to replace that. Match IQ is the frame-by-frame video
                and tactical analysis most coaches simply don&apos;t have the
                hours for — a second pair of eyes that makes their coaching
                even sharper.
              </p>
            </div>
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
