import Link from "next/link";
import PlanForm from "@/components/PlanForm";
import Court3D from "@/components/Court3D";
import CoachesRoom from "@/components/CoachesRoom";
import Reveal from "@/components/Reveal";
import RacquetMark from "@/components/RacquetMark";
import BallMark from "@/components/BallMark";
import TiltCard from "@/components/TiltCard";
import CenterCourtZoom from "@/components/CenterCourtZoom";
import { IconArrowRight, IconPlan, IconTarget, IconUpload } from "@/components/icons";

export const dynamic = "force-dynamic";

const STEPS = [
  {
    icon: IconUpload,
    title: "Send your video",
    detail: "Upload a practice or match clip, plus what you want feedback on.",
  },
  {
    icon: IconTarget,
    title: "Professional analysis",
    detail: "Former ATP players and ITF-level coaches review it frame by frame.",
  },
  {
    icon: IconPlan,
    title: "Receive your plan",
    detail: "Personalized drills, corrections, and tactical advice you can act on.",
  },
];

const BADGES = ["Former ATP Players", "ITF Level 2 Coaches", "Worldwide Coaching"];

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <section className="relative overflow-hidden min-h-[560px] sm:min-h-[640px] flex items-center">
        <div className="absolute inset-0">
          <Court3D />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(10,20,14,0.92) 0%, rgba(10,20,14,0.72) 45%, rgba(10,20,14,0.35) 75%, rgba(10,20,14,0.15) 100%)",
          }}
        />
        <div
          className="animate-drift absolute w-24 h-24 rounded-full bg-lime-400/20 blur-2xl top-16 right-[12%] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="animate-drift absolute w-32 h-32 rounded-full bg-brand-500/20 blur-2xl bottom-10 right-[28%] pointer-events-none"
          style={{ animationDelay: "-4s" }}
          aria-hidden="true"
        />
        <RacquetMark
          className="hidden lg:block absolute -right-16 top-1/2 -translate-y-1/2 w-[280px] h-[560px] text-white/[0.07] pointer-events-none rotate-[18deg]"
        />
        <BallMark
          className="animate-float-3d absolute w-10 h-10 text-lime-300/40 top-[22%] right-[8%] pointer-events-none hidden sm:block"
          style={{ animationDelay: "-2s" }}
        />

        <div className="relative max-w-3xl mx-auto px-4 py-16 sm:py-20 w-full">
          <div className="animate-fade-up flex flex-wrap gap-2 mb-6">
            {BADGES.map((b) => (
              <span
                key={b}
                className="text-xs font-medium text-white bg-white/10 border border-white/20 backdrop-blur rounded-full px-3 py-1"
              >
                {b}
              </span>
            ))}
          </div>
          <h1
            className="animate-fade-up text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-white"
            style={{ animationDelay: "60ms" }}
          >
            Train like it&apos;s <span className="text-gradient">match point</span>
            <br />
            every session.
          </h1>
          <p
            className="animate-fade-up mt-5 text-lg text-white/80 max-w-xl"
            style={{ animationDelay: "120ms" }}
          >
            Tactical Tennis Lab builds personalized training plans and reviews
            your game on video &mdash; for amateurs and everyone who plays.
          </p>
          <div
            className="animate-fade-up mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "180ms" }}
          >
            <Link
              href="/submit-video"
              className="group inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold px-5 py-3 shadow-lg shadow-black/30 hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              Send your video
              <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#plan-generator"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/25 hover:bg-white/20 backdrop-blur text-white font-semibold px-5 py-3 transition-colors"
            >
              Build a free training plan
            </a>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 w-full">
        <CenterCourtZoom className="opacity-80" />
        <BallMark className="hidden md:block absolute -top-8 -right-8 w-40 h-40 text-brand-100 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4">
          <Reveal className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">How it works</h2>
            <p className="text-body mt-2 max-w-lg mx-auto">
              Three steps from raw footage to a plan you can put on court.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <TiltCard
                  maxTilt={6}
                  className="group relative h-full rounded-2xl border border-line bg-white p-6 shadow-sm hover:shadow-lg"
                >
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-ink text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="mt-4 font-semibold text-lg">{step.title}</h3>
                  <p className="mt-1 text-sm text-body">{step.detail}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CoachesRoom />

      <section id="plan-generator" className="relative overflow-hidden border-y border-line">
        <CenterCourtZoom />
        <RacquetMark className="hidden lg:block absolute -left-20 bottom-0 w-[220px] h-[440px] text-brand-100/70 pointer-events-none -rotate-[14deg]" />
        <div className="relative max-w-3xl mx-auto px-4 py-16">
          <Reveal className="text-center mb-10">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">
              Free tool
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1">
              Build your tennis training plan
            </h2>
            <p className="mt-2 text-body max-w-xl mx-auto">
              Tell us your level, goals, and schedule, and we&apos;ll put
              together a weekly plan &mdash; no sign-up required.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <PlanForm />
          </Reveal>
        </div>
      </section>

      <footer className="py-8">
        <p className="text-center text-xs text-muted">
          Tactical Tennis Lab &mdash; training plans for every level.
        </p>
      </footer>
    </div>
  );
}
