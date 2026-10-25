import Link from "next/link";
import DemoEmbed from "@/components/DemoEmbed";
import Reveal from "@/components/Reveal";
import { demoDictionaries } from "@/i18n/dictionaries/demo";
import { localizedHref, type AppLocale } from "@/i18n/locales";

/** "Book a demo" for academies and clubs: what happens on the call, then the booking calendar. */
export default function DemoContent({ lang = "en" }: { lang?: AppLocale }) {
  const t = demoDictionaries[lang];
  // Cal.com event link, for example "your-team/demo". Set NEXT_PUBLIC_CAL_LINK in the environment.
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK?.trim().replace(/^https?:\/\/(app\.)?cal\.com\//, "");
  const contactHref = localizedHref(lang, "/contact");

  return (
    <main className="flex-1">
      <section className="container-x pb-12 pt-20 text-center sm:pb-16 sm:pt-28">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="t-display mx-auto mt-5 max-w-4xl !text-[clamp(2.25rem,5.6vw,4.5rem)]">{t.title}</h1>
      </section>

      <section className="container-x pb-12 sm:pb-16" aria-labelledby="demo-what">
        <h2 id="demo-what" className="eyebrow text-center">
          {t.whatTitle}
        </h2>
        <ol className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-3 md:gap-10">
          {t.bullets.map((b, i) => (
            <Reveal key={b} as="li" delay={i * 70} className="border-t border-ink pt-5">
              <span className="t-mono text-sm text-muted" aria-hidden="true">
                0{i + 1}
              </span>
              <p className="mt-3 text-[1.1875rem] leading-snug tracking-tight text-ink">{b}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-x pb-20 sm:pb-28" aria-label={t.cta}>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-line bg-surface">
          {calLink ? (
            <DemoEmbed calLink={calLink} lang={lang} loadingLabel={t.loading} />
          ) : (
            <div className="px-6 py-20 text-center">
              <h2 className="text-2xl font-semibold tracking-tight">{t.unavailable.title}</h2>
              <p className="mx-auto mt-3 max-w-md text-body">{t.unavailable.text}</p>
            </div>
          )}
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          {t.emailLine.text}{" "}
          <Link href={contactHref} className="font-medium text-ink underline underline-offset-4">
            {t.emailLine.link}
          </Link>
        </p>
      </section>
    </main>
  );
}
