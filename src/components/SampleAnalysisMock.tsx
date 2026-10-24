import CourtDiagram, { BEFORE_LANDINGS, BEFORE_ZONE } from "@/components/motion/CourtDiagram";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import type { AppLocale } from "@/i18n/locales";

/**
 * Illustrative analysis report. Everything here is invented and the badge and
 * footer say so. Observations (what the coach saw) and the recommendation
 * (what to do about it) are deliberately separate blocks with different
 * markers. No statistics are shown. Swap in a real, consented report when one
 * exists.
 */
export default function SampleAnalysisMock({ lang = "en" }: { lang?: AppLocale }) {
  const t = homeDictionaries[lang].sampleAnalysis;

  return (
    <div className="w-full bg-surface text-ink p-5 sm:p-8">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-5 text-left">
        <div>
          <p className="text-lg font-semibold leading-tight">{t.reportTitle}</p>
          <p className="mt-1 text-xs text-muted">{t.meta}</p>
          <p className="mt-0.5 text-xs font-medium text-body">{t.player}</p>
        </div>
        <span className="rounded-full border border-accent/50 px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-accent">
          {t.badge}
        </span>
      </header>

      <div className="mt-6 grid gap-8 text-left lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
        <section aria-labelledby="rep-court" className="rounded-2xl border border-line bg-background p-4 sm:p-5">
          <h3 id="rep-court" className="eyebrow">{t.courtTitle}</h3>
          <CourtDiagram
            className="mt-3 h-auto w-full text-ink"
            landings={BEFORE_LANDINGS}
            zone={BEFORE_ZONE}
            label={`${t.courtTitle}. ${t.courtNote}`}
          />
          <p className="mt-2 text-xs text-muted">{t.courtNote}</p>
        </section>

        <div className="space-y-7">
          <section aria-labelledby="rep-observed">
            <h3 id="rep-observed" className="eyebrow flex items-center gap-2">
              <span className="h-2 w-2 rounded-full border border-body" aria-hidden="true" />
              {t.observedTitle}
            </h3>
            <ul className="mt-3 space-y-3">
              {t.observed.map((item) => (
                <li key={item} className="text-[0.9375rem] leading-snug text-body">{item}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="rep-priority" className="border-t border-line pt-5">
            <h3 id="rep-priority" className="eyebrow">{t.priorityTitle}</h3>
            <p className="mt-2 text-lg font-semibold leading-snug">{t.priority}</p>
          </section>

          <section aria-labelledby="rep-next" className="rounded-2xl border border-accent/40 bg-accent/10 p-4">
            <h3 id="rep-next" className="eyebrow flex items-center gap-2 !text-ink">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              {t.recommendedTitle}
            </h3>
            <ul className="mt-3 space-y-2.5">
              {t.recommended.map((item) => (
                <li key={item} className="relative pl-5 text-[0.9375rem] leading-snug text-body">
                  <span className="absolute left-0 top-[0.2em] text-accent" aria-hidden="true">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <p className="mt-6 border-t border-line pt-4 text-xs text-muted text-left">{t.footer}</p>
    </div>
  );
}
