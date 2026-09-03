import { prisma } from "@/lib/prisma";
import Reveal from "@/components/Reveal";
import BallMark from "@/components/BallMark";
import TiltCard from "@/components/TiltCard";

const BADGES = [
  "Former ATP Players",
  "ATP Certified Coaches",
  "ITF Level 2 Coaches",
  "Worldwide Coaching",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function CoachesRoom() {
  const coaches = await prisma.coach.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return (
    <section className="spotlight-room relative overflow-hidden">
      <BallMark className="hidden md:block absolute top-10 -right-10 w-48 h-48 text-white/[0.05] pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-4 py-16 sm:py-20">
        <Reveal className="text-center">
          <p className="text-sm font-semibold text-lime-400 uppercase tracking-wide">
            Real coaches, not an algorithm
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-white">
            The room behind your training plan
          </h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            Every submission is reviewed by former ATP players and ITF
            Level&nbsp;2 certified coaches &mdash; frame-by-frame technical and
            tactical breakdowns, then a plan built around what you actually
            need to fix.
          </p>
        </Reveal>

        {coaches.length > 0 ? (
          <div
            className={`mt-10 grid gap-5 max-w-2xl mx-auto sm:grid-cols-2 ${
              coaches.length >= 3 ? "lg:max-w-none lg:grid-cols-3" : ""
            }`}
          >
            {coaches.map((coach, i) => (
              <Reveal key={coach.id} delay={i * 80}>
                <TiltCard className="h-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur px-5 py-6 transition-colors hover:bg-white/10 hover:border-white/20 shadow-xl shadow-black/20">
                  <div className="w-12 h-12 rounded-full bg-brand-500/20 text-lime-300 font-semibold flex items-center justify-center">
                    {initials(coach.name)}
                  </div>
                  <p className="mt-4 font-semibold text-white">{coach.name}</p>
                  {coach.specialty && (
                    <p className="text-sm text-lime-300">{coach.specialty}</p>
                  )}
                  {coach.bio && (
                    <p className="mt-2 text-sm text-white/60">{coach.bio}</p>
                  )}
                </TiltCard>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={100} className="mt-10 flex flex-wrap justify-center gap-3">
            {BADGES.map((b) => (
              <span
                key={b}
                className="rounded-full bg-white/5 border border-white/10 backdrop-blur text-white/90 text-sm px-4 py-2"
              >
                {b}
              </span>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
