import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/Reveal";
import { IconArrowRight } from "@/components/icons";
import { FREE_ANALYSES_PER_ACCOUNT } from "@/lib/freeAnalysis";
import { freeAnalysisDictionaries } from "@/i18n/dictionaries/freeAnalysis";
import { localizedHref, type AppLocale } from "@/i18n/locales";

/** The free tactical and technical analysis offer: what it is, how it works, why it can be
 * trusted, and (once there are any) real analyses published with the player's permission. */
export default async function FreeAnalysisContent({ lang = "en" }: { lang?: AppLocale }) {
  const t = freeAnalysisDictionaries[lang];
  const session = await auth();

  const [used, examples] = await Promise.all([
    session?.user
      ? prisma.videoSubmission.count({ where: { userId: session.user.id, isFree: true } })
      : Promise.resolve(0),
    // Only text the player agreed to share and an admin approved; never names, emails or video.
    prisma.videoSubmission.findMany({
      where: { isFree: true, publishConsent: true, publishedAt: { not: null } },
      orderBy: { publishedAt: "desc" },
      take: 6,
      select: { id: true, footageType: true, tacticalNotes: true, technicalNotes: true },
    }),
  ]);
  const alreadyUsed = Boolean(session?.user) && used >= FREE_ANALYSES_PER_ACCOUNT;

  const submitPath = `${localizedHref(lang, "/submit-video")}?free=1`;
  const signUpHref = `${localizedHref(lang, "/sign-up")}?callbackUrl=${encodeURIComponent(submitPath)}`;
  const signInHref = `${localizedHref(lang, "/sign-in")}?callbackUrl=${encodeURIComponent(submitPath)}`;

  const cta = alreadyUsed ? (
    <div className="mx-auto max-w-md rounded-2xl border border-line p-5 text-left">
      <p className="font-semibold">{t.page.used.title}</p>
      <p className="mt-1 text-sm text-body">{t.page.used.text}</p>
      <Link href={`${localizedHref(lang, "/pricing")}?audience=players`} className="link-arrow mt-3 text-sm">
        {t.page.used.cta}
        <IconArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  ) : (
    <div>
      <Link href={session?.user ? submitPath : signUpHref} className="btn btn-primary">
        {session?.user ? t.page.ctaSignedIn : t.page.ctaSignedOut}
      </Link>
      {!session?.user && (
        <p className="mt-4 text-sm text-muted">
          {t.page.haveAccount}{" "}
          <Link href={signInHref} className="font-medium text-ink underline underline-offset-4">
            {t.page.signIn}
          </Link>
        </p>
      )}
    </div>
  );

  return (
    <main className="flex-1">
      <section className="container-x pb-16 pt-20 text-center sm:pb-20 sm:pt-28">
        <p className="eyebrow">{t.page.eyebrow}</p>
        <h1 className="t-display mx-auto mt-5 max-w-4xl !text-[clamp(2.5rem,6vw,5rem)]">{t.page.title}</h1>
        <p className="t-lead mx-auto mt-6 max-w-2xl">{t.page.subtitle}</p>
        <div className="mt-10">{cta}</div>
      </section>

      <section className="section-pad border-t border-line">
        <div className="container-x">
          <Reveal>
            <h2 className="t-h2 max-w-3xl">{t.page.whatTitle}</h2>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
            {[t.page.tactical, t.page.technical].map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="border-t border-ink pt-6">
                <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 max-w-md text-[1.0625rem] leading-relaxed text-body">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-surface-muted">
        <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-24">
          <Reveal>
            <h2 className="t-h2">{t.page.howTitle}</h2>
          </Reveal>
          <ol className="border-t border-line">
            {t.page.steps.map((step, i) => (
              <Reveal key={step.title} as="li" delay={i * 70} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-6">
                <span className="t-mono pt-1 text-sm text-muted" aria-hidden="true">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-2 max-w-md text-[1.0625rem] leading-relaxed text-body">{step.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-24">
          <Reveal>
            <h2 className="t-h2">{t.page.trustTitle}</h2>
          </Reveal>
          <ul className="space-y-5">
            {t.page.trust.map((line, i) => (
              <Reveal key={line} as="li" delay={i * 60} className="flex gap-4 border-t border-line pt-5 text-[1.0625rem] leading-relaxed text-body">
                <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                {line}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {examples.length > 0 && (
        <section id="examples" className="section-pad border-t border-line">
          <div className="container-x">
            <Reveal className="max-w-3xl">
              <h2 className="t-h2">{t.examples.title}</h2>
              <p className="t-lead mt-4">{t.examples.lead}</p>
            </Reveal>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {examples.map((e, i) => (
                <Reveal key={e.id} delay={i * 60}>
                  <article className="rounded-3xl border border-line p-6 sm:p-8">
                    <p className="eyebrow">{e.footageType === "training" ? t.examples.training : t.examples.match}</p>
                    {e.tacticalNotes && (
                      <section className="mt-5">
                        <h3 className="text-lg font-semibold">{t.examples.tactical}</h3>
                        <p className="mt-2 whitespace-pre-wrap text-[1rem] leading-relaxed text-body">{e.tacticalNotes}</p>
                      </section>
                    )}
                    {e.technicalNotes && (
                      <section className="mt-5">
                        <h3 className="text-lg font-semibold">{t.examples.technical}</h3>
                        <p className="mt-2 whitespace-pre-wrap text-[1rem] leading-relaxed text-body">{e.technicalNotes}</p>
                      </section>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-pad border-t border-line text-center">
        <div className="container-x">{cta}</div>
      </section>
    </main>
  );
}
