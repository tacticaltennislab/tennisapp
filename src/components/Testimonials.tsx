import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { IconArrowRight } from "@/components/icons";

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

  return (
    <section className="px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">
            What players are saying
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mt-1">Real feedback, from real customers</h2>
        </Reveal>

        {reviews.length === 0 ? (
          <Reveal variant="zoom" delay={100} className="mt-10">
            <div className="max-w-md mx-auto text-center rounded-2xl border border-dashed border-line p-8">
              <p className="text-body">
                No reviews yet — be the first to tell other players what working
                with your coach has been like.
              </p>
              <Link
                href="/review"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold px-4 py-2.5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                Leave a review
                <IconArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        ) : (
          <>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r, i) => {
                const name = r.user.name || r.user.email.split("@")[0];
                return (
                  <Reveal key={r.id} variant="zoom" delay={i * 100}>
                    <TiltCard maxTilt={5} className="h-full flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm hover:shadow-lg">
                      <Stars rating={r.rating} />
                      {r.mediaUrl &&
                        (r.mediaContentType?.startsWith("video/") ? (
                          <video
                            src={`/api/reviews/${r.id}/media`}
                            controls
                            className="mt-3 w-full rounded-lg bg-chip aspect-video"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element -- user-uploaded blob URL, not a static asset
                          <img
                            src={`/api/reviews/${r.id}/media`}
                            alt=""
                            className="mt-3 w-full rounded-lg object-cover aspect-video"
                          />
                        ))}
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
            <p className="mt-8 text-center text-sm text-muted">
              Worked with a coach?{" "}
              <Link href="/review" className="text-brand-600 font-medium hover:underline">
                Leave your own review
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
