import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import {
  IconArrowRight,
  IconTarget,
  IconSpark,
  IconGrowth,
  IconTrophy,
  IconGlobe,
  IconVideo,
  IconUsers,
} from "@/components/icons";

const PHILOSOPHY = [
  {
    icon: IconTarget,
    title: "Technical Excellence",
    detail:
      "Every stroke is analyzed in detail to build efficient, repeatable technique that performs under pressure.",
  },
  {
    icon: IconSpark,
    title: "Tactical Intelligence",
    detail:
      "Tennis is more than hitting the ball. We teach decision making, match strategy, and point construction.",
  },
  {
    icon: IconGrowth,
    title: "Continuous Improvement",
    detail:
      "Every player follows an individual development path with measurable long-term progress.",
  },
];

const TRUST = [
  {
    icon: IconTrophy,
    title: "Professional Experience",
    detail: "Coaching built on real competitive tennis experience.",
  },
  {
    icon: IconGlobe,
    title: "Worldwide Coaching",
    detail: "Helping players improve from anywhere through online coaching.",
  },
  {
    icon: IconVideo,
    title: "Detailed Video Analysis",
    detail: "Every recommendation is supported with clear visual feedback.",
  },
  {
    icon: IconUsers,
    title: "Individual Development",
    detail: "Every player receives a plan tailored to their goals and level.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="About us"
        title="Helping ambitious players improve, from anywhere"
        subtitle="Independent video and match analysis for ambitious amateurs and competitive juniors — built for the gap most on-court coaches don't have hours in the week to fill."
      />

      <main className="flex-1 px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-2xl font-bold">Our story</h2>
            <div className="mt-3 space-y-4 text-body">
              <p>
                Tactical Tennis Lab exists to fill one specific gap: the
                systematic video and match analysis most on-court coaches
                simply don&apos;t have hours in the week to do. We&apos;re not
                trying to replace your coach &mdash; we&apos;re the independent
                second opinion that works alongside them.
              </p>
              <p>
                It&apos;s built for ambitious amateurs and competitive juniors
                who want more than a single lesson&apos;s worth of feedback:
                real analysis of technique and tactics, not a generic training
                plan aimed at everyone.
              </p>
              <p>
                And a report on its own doesn&apos;t change anything. Every
                analysis comes with clear priorities, drills to work on, and a
                path back to check what actually improved &mdash; video,
                diagnosis, correction, repeat.
              </p>
            </div>
          </Reveal>

          <div className="mt-14">
            <Reveal className="text-center">
              <h2 className="text-2xl font-bold">Our philosophy</h2>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {PHILOSOPHY.map((p, i) => (
                <Reveal key={p.title} variant="zoom" delay={i * 100}>
                  <TiltCard
                    maxTilt={5}
                    className="group h-full rounded-2xl border border-line bg-white p-6 shadow-sm hover:shadow-lg"
                  >
                    <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <p.icon className="w-6 h-6" />
                    </div>
                    <h3 className="mt-4 font-semibold text-lg">{p.title}</h3>
                    <p className="mt-2 text-sm text-body">{p.detail}</p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <Reveal className="text-center">
              <h2 className="text-2xl font-bold">Why players trust us</h2>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {TRUST.map((t, i) => (
                <Reveal key={t.title} delay={i * 80}>
                  <TiltCard maxTilt={4} className="group h-full rounded-2xl border border-line bg-white p-6 shadow-sm hover:shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                        <t.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{t.title}</h3>
                        <p className="mt-1 text-sm text-body">{t.detail}</p>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal variant="zoom" className="mt-14 text-center">
            <p className="text-body">Want to know the coaches behind the plans?</p>
            <Link
              href="/coaches"
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-3 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              Meet the coaches
              <IconArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </main>
    </div>
  );
}
