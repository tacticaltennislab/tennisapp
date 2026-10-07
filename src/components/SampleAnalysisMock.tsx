import { homeDictionaries } from "@/i18n/dictionaries/home";
import type { AppLocale } from "@/i18n/locales";

function Column({ title, items, tone }: { title: string; items: string[]; tone: "warn" | "good" | "next" }) {
  const dot = tone === "warn" ? "bg-red-500" : tone === "good" ? "bg-brand-600" : "bg-lime-500";
  return (
    <div className="rounded-xl border border-line bg-surface p-4 text-left">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs md:text-sm text-body leading-snug">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Illustrative analysis report shown inside the tablet frame on the homepage.
 * The player and numbers are made up -- the badge says so -- and should be
 * swapped for a real (consented) analysis once one exists. */
export default function SampleAnalysisMock({ lang = "en" }: { lang?: AppLocale }) {
  const t = homeDictionaries[lang].sampleAnalysis;

  return (
    <div className="w-full bg-background text-ink p-3 md:p-5 space-y-3 md:space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-2 text-left">
        <div>
          <p className="text-base md:text-lg font-bold leading-tight">{t.reportTitle}</p>
          <p className="mt-0.5 text-xs text-muted">{t.meta}</p>
          <p className="mt-0.5 text-xs font-medium text-body">{t.player}</p>
        </div>
        <span className="rounded-full bg-lime-100 text-lime-800 text-[11px] font-semibold px-2.5 py-1 dark:bg-lime-900/40 dark:text-lime-200">
          {t.badge}
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Column title={t.mistakesTitle} items={t.mistakes} tone="warn" />
        <Column title={t.winningTitle} items={t.winning} tone="good" />
        <Column title={t.focusTitle} items={t.focus} tone="next" />
      </div>

      <div className="rounded-xl border border-line bg-surface p-4 text-left">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">{t.patternsTitle}</h3>
        <div className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {t.patterns.map((p) => (
            <div key={p.label}>
              <div className="flex items-baseline justify-between text-xs text-body">
                <span>{p.label}</span>
                <span className="font-semibold text-ink">{p.value}%</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-chip overflow-hidden">
                <div className="h-full rounded-full bg-brand-600" style={{ width: `${p.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[11px] text-muted text-left">{t.footer}</p>
    </div>
  );
}
