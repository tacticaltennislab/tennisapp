import CourtDiagram, { BEFORE_LANDINGS, BEFORE_ZONE } from "@/components/motion/CourtDiagram";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import type { AppLocale } from "@/i18n/locales";

/**
 * Illustrative analysis report. Everything here is invented and the badge and
 * footer say so. What the coach saw (numbered, the first one is marked on the
 * court) is kept apart from what to do about it (set off by a lime rule). No
 * statistics. Swap in a real, consented report when one exists.
 */
export default function SampleAnalysisMock({ lang = "en" }: { lang?: AppLocale }) {
  const t = homeDictionaries[lang].sampleAnalysis;

  return (
    <article className="w-full bg-surface p-6 text-ink sm:p-10 lg:p-14">
      <header className="flex flex-wrap items-start justify-between gap-4 text-left">
        <div>
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{t.reportTitle}</h3>
          <p className="mt-2 text-sm text-muted">
            {t.meta} · {t.player}
          </p>
        </div>
        <span className="rounded-full border border-accent/50 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-accent">
          {t.badge}
        </span>
      </header>

      <div className="mt-10 grid gap-12 text-left lg:mt-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16">
        <figure>
          <CourtDiagram
            className="h-auto w-full text-ink"
            landings={BEFORE_LANDINGS}
            zone={BEFORE_ZONE}
            marker="1"
            label={`${t.courtTitle}. ${t.courtNote}`}
          />
          <figcaption className="mt-4 text-xs leading-relaxed text-muted">
            <span className="font-semibold text-body">{t.courtTitle}.</span> {t.courtNote}
          </figcaption>
        </figure>

        <div className="space-y-10">
          <section aria-labelledby="rep-observed">
            <h4 id="rep-observed" className="eyebrow">{t.observedTitle}</h4>
            <ol className="mt-5 space-y-5">
              {t.observed.map((item, i) => (
                <li key={item} className="grid grid-cols-[1.5rem_1fr] gap-3 text-[1.0625rem] leading-snug text-body">
                  <span className="t-mono pt-0.5 text-sm text-muted" aria-hidden="true">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="rep-priority" className="border-t border-line pt-8">
            <h4 id="rep-priority" className="eyebrow">{t.priorityTitle}</h4>
            <p className="mt-3 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">{t.priority}</p>
          </section>

          <section aria-labelledby="rep-next" className="border-l-2 border-accent pl-5">
            <h4 id="rep-next" className="eyebrow !text-ink">{t.recommendedTitle}</h4>
            <ul className="mt-4 space-y-3">
              {t.recommended.map((item) => (
                <li key={item} className="text-[1.0625rem] leading-snug text-body">{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <p className="mt-12 border-t border-line pt-5 text-xs leading-relaxed text-muted">{t.footer}</p>
    </article>
  );
}
