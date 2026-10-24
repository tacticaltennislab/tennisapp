import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/Reveal";
import ReviewMedia from "@/components/ReviewMedia";
import { IconArrowRight } from "@/components/icons";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import { localizedHref, type AppLocale } from "@/i18n/locales";

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
    <span className="text-brand-500 text-sm tracking-wide" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
      <span className="text-line">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

export default async function Testimonials({ lang = "en" }: { lang?: AppLocale }) {
  const t = homeDictionaries[lang].testimonials;
  const reviewHref = localizedHref(lang, "/review");

  const [reviews, stats] = await Promise.all([
    prisma.review.findMany({
      where: { status: "approved" },
      orderBy: { reviewedAt: "desc" },
      take: 6,
      include: { user: { select: { name: true, email: true } } },
    }),
    prisma.review.aggregate({
      where: { status: "approved" },
      _avg: { rating: true },
      _count: { rating: true },
    }),
  ]);

  const summary =
    stats._count.rating > 0 && stats._avg.rating != null
      ? t.summary
          .replace("{rating}", stats._avg.rating.toFixed(1))
          .replace("{count}", String(stats._count.rating))
      : null;

  return (
    <section id="reviews" className="scroll-mt-20 section-pad">
      <div className="container-x">
        <Reveal className="text-center">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="t-h2 mt-3">{t.title}</h2>
          {summary && <p className="t-mono mt-3 text-sm text-muted">{summary}</p>}
        </Reveal>

        {reviews.length === 0 ? (
          <Reveal variant="zoom" delay={100} className="mt-10">
            <div className="max-w-md mx-auto text-center rounded-2xl border border-dashed border-line p-8">
              <p className="text-body">{t.emptyText}</p>
              <Link href={reviewHref} className="btn btn-primary mt-4">
                {t.emptyCta}
                <IconArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        ) : (
          <>
            {/* Columns pack cards of different lengths without ragged gaps. */}
            <div className="mt-10 columns-1 gap-6 md:columns-2 lg:columns-3">
              {reviews.map((r, i) => {
                const name = r.user.name || r.user.email.split("@")[0];
                const mediaSrc = `/api/reviews/${r.id}/media`;
                return (
                  <Reveal key={r.id} variant="zoom" delay={i * 80} className="mb-6 break-inside-avoid">
                    <figure className="card p-6">
                      <Stars rating={r.rating} />
                      <blockquote className="mt-3 text-[0.9375rem] leading-relaxed text-body">
                        &ldquo;{r.body}&rdquo;
                      </blockquote>
                      {r.mediaUrl &&
                        (r.mediaContentType?.startsWith("video/") ? (
                          <ReviewMedia src={mediaSrc} playLabel={t.playVideo} />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element -- user-uploaded blob URL, not a static asset
                          <img
                            src={mediaSrc}
                            alt=""
                            loading="lazy"
                            className="mt-4 w-full rounded-lg object-cover aspect-video"
                          />
                        ))}
                      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                        <span className="w-9 h-9 rounded-full bg-brand-50 text-brand-600 text-sm font-semibold flex items-center justify-center shrink-0">
                          {initials(name)}
                        </span>
                        <span className="text-sm font-medium text-ink">{name}</span>
                      </figcaption>
                    </figure>
                  </Reveal>
                );
              })}
            </div>
            <p className="mt-6 text-center text-sm text-muted">
              {t.filledPrefix}{" "}
              <Link href={reviewHref} className="text-brand-600 font-semibold hover:underline">
                {t.filledCta}
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
