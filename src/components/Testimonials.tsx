import { prisma } from "@/lib/prisma";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-lime-500 text-sm" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
      <span className="text-line">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

export default async function Testimonials() {
  const reviews = await prisma.review.findMany({
    where: { status: "approved" },
    orderBy: { reviewedAt: "desc" },
    take: 6,
    include: { user: { select: { name: true, email: true } } },
  });

  if (reviews.length === 0) return null;

  return (
    <section className="px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">
            What players are saying
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mt-1">Real feedback, from real customers</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => {
            const name = r.user.name || r.user.email.split("@")[0];
            return (
              <Reveal key={r.id} variant="zoom" delay={i * 100}>
                <TiltCard maxTilt={5} className="h-full flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm hover:shadow-lg">
                  <Stars rating={r.rating} />
                  <p className="mt-3 text-sm text-body flex-1">&ldquo;{r.body}&rdquo;</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-50 text-brand-600 text-sm font-semibold flex items-center justify-center shrink-0">
                      {initials(name)}
                    </div>
                    <p className="text-sm font-medium">{name}</p>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
