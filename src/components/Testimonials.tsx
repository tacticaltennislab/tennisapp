import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/Reveal";
import ReviewMedia from "@/components/ReviewMedia";
import { IconArrowRight } from "@/components/icons";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import { localizedHref, type AppLocale } from "@/i18n/locales";

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
    <section id="reviews" className="section-pad scroll-mt-16">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="t-h2 mt-4">{t.title}</h2>
          {summary && <p className="t-mono mt-5 text-sm text-muted">{summary}</p>}
        </Reveal>

        {reviews.length === 0 ? (
          <Reveal delay={100} className="mt-14">
            <p className="t-lead max-w-xl">{t.emptyText}</p>
            <Link href={reviewHref} className="btn btn-primary mt-6">
              {t.emptyCta}
            </Link>
          </Reveal>
        ) : (
          <>
            {/* Real customer words, set as quotations. Columns pack unequal lengths. */}
            <div className="mt-14 columns-1 gap-x-14 md:mt-20 md:columns-2 lg:columns-3">
              {reviews.map((r, i) => {
                const name = r.user.name || r.user.email.split("@")[0];
                const mediaSrc = `/api/reviews/${r.id}/media`;
                return (
                  <Reveal key={r.id} delay={i * 60} className="mb-12 break-inside-avoid">
                    <figure className="border-t border-ink pt-6">
                      <blockquote className="text-[1.1875rem] leading-relaxed tracking-tight text-ink">
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
                            className="mt-5 w-full rounded-2xl object-cover aspect-video"
                          />
                        ))}
                      <figcaption className="mt-5 text-sm text-muted">
                        <span className="font-medium text-ink">{name}</span>
                        <span className="ml-2" aria-label={`${r.rating} out of 5 stars`}>
                          {"★".repeat(r.rating)}
                        </span>
                      </figcaption>
                    </figure>
                  </Reveal>
                );
              })}
            </div>
            <p className="text-sm text-muted">
              {t.filledPrefix}{" "}
              <Link href={reviewHref} className="link-arrow !font-semibold">
                {t.filledCta}
                <IconArrowRight className="h-3.5 w-3.5" />
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
