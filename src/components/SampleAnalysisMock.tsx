import { homeDictionaries } from "@/i18n/dictionaries/home";
import type { AppLocale } from "@/i18n/locales";

function Findings({ title, items, tone }: { title: string; items: string[]; tone: "warn" | "good" | "next" }) {
  const marker =
    tone === "warn" ? "bg-[#b42318]" : tone === "good" ? "bg-brand-600" : "bg-brand-500";
  return (
    <section>
      <h3 className="eyebrow flex items-center gap-2">
        <span className={`h-2 w-2 ${marker}`} aria-hidden="true" />
        {title}
      </h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="text-[0.875rem] leading-snug text-body pl-4 relative">
            <span className={`absolute left-0 top-[0.5em] h-1 w-1 ${marker}`} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Top-down court with second-serve landing spots clustered in one service
 * box. Illustrative, like the rest of the report. */
function CourtDiagram({ label }: { label: string }) {
  // Landing spots (x, y) in the far service boxes. Nine on the left box, three on the right.
  const left = [[52, 82], [60, 96], [47, 104], [70, 88], [76, 108], [58, 116], [66, 102], [82, 94], [54, 110]];
  const right = [[122, 90], [134, 108], [128, 118]];
  return (
    <svg viewBox="0 0 160 260" role="img" aria-label={label} className="w-full max-w-[9.5rem] mx-auto">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" className="text-line">
        <rect x="24" y="10" width="112" height="240" />
        <line x1="24" y1="130" x2="136" y2="130" strokeWidth="2" className="text-muted" />
        <line x1="24" y1="68" x2="136" y2="68" />
        <line x1="24" y1="192" x2="136" y2="192" />
        <line x1="80" y1="68" x2="80" y2="192" />
      </g>
      <g className="text-brand-600" fill="currentColor">
        {left.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3.2" />
        ))}
      </g>
      <g className="text-brand-500" fill="currentColor" opacity="0.7">
        {right.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3.2" />
        ))}
      </g>
      <path d="M92 246 L58 104" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" fill="none" className="text-brand-600" />
    </svg>
  );
}

/** Illustrative analysis report shown inside the device frame on the
 * homepage. The player and numbers are made up -- the badge says so -- and
 * should be swapped for a real (consented) analysis once one exists. */
export default function SampleAnalysisMock({ lang = "en" }: { lang?: AppLocale }) {
  const t = homeDictionaries[lang].sampleAnalysis;

  return (
    <div className="w-full bg-background text-ink p-4 sm:p-6">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4 text-left">
        <div>
          <p className="text-lg font-bold leading-tight">{t.reportTitle}</p>
          <p className="mt-1 text-xs text-muted">{t.meta}</p>
          <p className="mt-0.5 text-xs font-medium text-body">{t.player}</p>
        </div>
        <span className="bg-brand-50 text-brand-600 border border-brand-500/40 text-[0.6875rem] font-semibold uppercase tracking-wider px-2.5 py-1">
          {t.badge}
        </span>
      </header>

      <div className="mt-5 grid gap-6 text-left md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-8">
        <div className="space-y-6">
          <Findings title={t.mistakesTitle} items={t.mistakes} tone="warn" />
          <Findings title={t.winningTitle} items={t.winning} tone="good" />
          <Findings title={t.focusTitle} items={t.focus} tone="next" />
        </div>

        <div className="space-y-6">
          <section className="card p-4">
            <h3 className="eyebrow">{t.courtTitle}</h3>
            <div className="mt-3 text-ink">
              <CourtDiagram label={t.courtTitle} />
            </div>
            <p className="t-mono mt-3 text-center text-sm font-semibold text-ink">{t.courtNote}</p>
          </section>

          <section className="card p-4">
            <h3 className="eyebrow">{t.patternsTitle}</h3>
            <div className="mt-3 space-y-3">
              {t.patterns.map((p) => (
                <div key={p.label}>
                  <div className="flex items-baseline justify-between gap-3 text-xs text-body">
                    <span>{p.label}</span>
                    <span className="t-mono font-semibold text-ink">{p.value}%</span>
                  </div>
                  <div className="progress mt-1.5">
                    <span style={{ width: `${p.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <p className="mt-5 text-[0.6875rem] text-muted text-left">{t.footer}</p>
    </div>
  );
}
