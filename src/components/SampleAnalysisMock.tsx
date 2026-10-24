"use client";

import { useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { COURT, courtLines, makeCamera, type Corners, type Pt } from "@/lib/court";

export interface ReportCopy {
  badge: string;
  reportTitle: string;
  meta: string;
  player: string;
  observedTitle: string;
  observed: string[];
  priorityTitle: string;
  priority: string;
  recommendedTitle: string;
  recommended: string[];
  frameLabel: string;
  frameNote: string;
  courtNote: string;
  tabObserved: string;
  tabRecommended: string;
  zoneLabel: string;
  stepsInLabel: string;
  mixLabel: string;
  footer: string;
}

// Frame is 16:10. Corners are fractions of the frame: the camera stands behind
// the near baseline, slightly above the court. Change these four points and
// every mark follows the new perspective (also when a real frame replaces the
// drawn court).
const W = 1600;
const H = 1000;
const CORNERS: Corners = {
  nearLeft: [0.02, 0.87],
  nearRight: [0.72, 0.87],
  farRight: [0.555, 0.2],
  farLeft: [0.215, 0.2],
};

// Illustrative scene, in court metres. None of this is match data.
const SERVER: Pt = [-0.7, 7.1];
const CLUSTER: Pt[] = [[16.8, 3.0], [17.4, 3.6], [16.3, 3.5], [17.0, 2.7], [17.5, 3.1]];
const ZONE: Pt[] = [[15.6, 2.1], [18.2, 2.1], [18.2, 4.4], [15.6, 4.4]];
const RETURNER_BACK: Pt = [24.7, 3.1];
const RETURNER_IN: Pt = [22.5, 3.1];
const MIX: { to: Pt; zone: Pt[] }[] = [
  { to: [16.7, 5.0], zone: [[15.7, 4.5], [18.1, 4.5], [18.1, 5.4], [15.7, 5.4]] },
  { to: [16.9, 3.4], zone: [] },
  { to: [16.3, 1.9], zone: [[15.7, 1.45], [18.1, 1.45], [18.1, 2.35], [15.7, 2.35]] },
];

export default function SampleAnalysisMock({ t }: { t: ReportCopy }) {
  const [tab, setTab] = useState<"observed" | "recommended">("observed");
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const cam = useMemo(() => makeCamera(CORNERS), []);

  const px = (p: Pt): Pt => [p[0] * W, p[1] * H];
  const at = (m: Pt): Pt => px(cam.project(m[0], m[1]));
  const poly = (pts: Pt[]) => pts.map((m) => at(m).map((n) => n.toFixed(1)).join(",")).join(" ");
  const line = (pts: Pt[]) => "M" + pts.map((m) => at(m).map((n) => n.toFixed(1)).join(" ")).join("L");

  // A ball flight: the ground track lifted by a parabola, so it reads as an arc.
  const flight = (from: Pt, to: Pt, peak: number) => {
    const out: string[] = [];
    for (let i = 0; i <= 28; i++) {
      const s = i / 28;
      const g: Pt = [from[0] + (to[0] - from[0]) * s, from[1] + (to[1] - from[1]) * s];
      const [x, y] = at(g);
      const lift = 4 * peak * s * (1 - s) * cam.metre(g[0], g[1]) * H * 0.7;
      out.push(`${x.toFixed(1)} ${(y - lift).toFixed(1)}`);
    }
    return "M" + out.join("L");
  };

  const pct = (m: Pt, dx = 0, dy = 0): { left: string; top: string } => {
    const [x, y] = cam.project(m[0], m[1]);
    return { left: `${(x * 100 + dx).toFixed(2)}%`, top: `${(y * 100 + dy).toFixed(2)}%` };
  };

  const netBase = [[COURT.net, -0.8], [COURT.net, COURT.width + 0.8]] as Pt[];
  const netTop = netBase.map((m) => {
    const [x, y] = at(m);
    return [x, y - cam.metre(m[0], m[1]) * H * COURT.netHeight * 0.8] as Pt;
  });

  const onKey = (e: KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = 1 - i;
    setTab(n === 0 ? "observed" : "recommended");
    tabs.current[n]?.focus();
  };

  const observed = tab === "observed";
  const fade = "transition-opacity duration-500 motion-reduce:transition-none";
  const glass =
    "border border-white/15 bg-white/[0.07] backdrop-blur-xl shadow-[0_24px_64px_rgba(0,0,0,0.45)]";

  const chip = (n: string, label: string, pos: { left: string; top: string }, on: boolean) => (
    <div
      className={`pointer-events-none absolute -translate-x-1/2 -translate-y-full ${fade} ${on ? "opacity-100" : "opacity-0"}`}
      style={pos}
      aria-hidden={!on}
    >
      <span className={`${glass} !shadow-none flex items-center gap-2 rounded-full p-1 pr-1 text-xs font-medium text-white sm:pr-3`}>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[0.6875rem] font-bold text-[#11140a] sm:h-6 sm:w-6">
          {n}
        </span>
        <span className="hidden whitespace-nowrap sm:inline">{label}</span>
      </span>
    </div>
  );

  return (
    <figure className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0f11] text-white">
      <div className="relative aspect-[6/5] w-full overflow-hidden xl:aspect-[16/10]">
        {/* The stage keeps the 16:10 frame the marks are measured in. On narrow screens it is
            drawn wider than the window, so the court (left of centre) stays large and legible. */}
        <div className="absolute left-0 top-0 aspect-[16/10] w-[135%] xl:w-full">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t.frameLabel} className="absolute inset-0 h-full w-full">
          <rect width={W} height={H} fill="#0d0f11" />
          {/* Court surface */}
          <polygon points={poly([[0, 0], [COURT.length, 0], [COURT.length, COURT.width], [0, COURT.width]])} fill="#17231d" />

          {/* Highlighted areas */}
          <g className={`${fade} ${observed ? "opacity-100" : "opacity-0"}`}>
            <polygon points={poly(ZONE)} fill="var(--color-accent)" fillOpacity="0.22" stroke="var(--color-accent)" strokeWidth="1.5" />
          </g>
          <g className={`${fade} ${observed ? "opacity-0" : "opacity-100"}`}>
            {MIX.filter((m) => m.zone.length).map((m, i) => (
              <polygon key={i} points={poly(m.zone)} fill="var(--color-accent)" fillOpacity="0.2" stroke="var(--color-accent)" strokeWidth="1.5" />
            ))}
          </g>

          {/* Court lines */}
          <g fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" strokeLinejoin="round">
            {courtLines().map((l, i) => (
              <path key={i} d={line(l)} />
            ))}
          </g>

          {/* Net */}
          <path d={`M${netTop[0].join(" ")}L${netTop[1].join(" ")}`} stroke="#fff" strokeOpacity="0.8" strokeWidth="2.5" fill="none" />
          <polygon points={`${at(netBase[0]).join(",")} ${at(netBase[1]).join(",")} ${netTop[1].join(",")} ${netTop[0].join(",")}`} fill="#fff" fillOpacity="0.07" />

          {/* Observed: second serves into one zone, the returner steps in */}
          <g className={`${fade} ${observed ? "opacity-100" : "opacity-0"}`}>
            <g fill="none" stroke="var(--color-accent)" strokeOpacity="0.75" strokeWidth="2" strokeLinecap="round">
              {CLUSTER.map((c, i) => (
                <path key={i} d={flight(SERVER, c, 2.6)} />
              ))}
            </g>
            <g fill="var(--color-accent)">
              {CLUSTER.map((c, i) => {
                const [x, y] = at(c);
                return <circle key={i} cx={x} cy={y} r="7" />;
              })}
            </g>
            <path d={line([RETURNER_BACK, RETURNER_IN])} stroke="#fff" strokeOpacity="0.85" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" fill="none" />
            <circle cx={at(RETURNER_IN)[0]} cy={at(RETURNER_IN)[1]} r="9" fill="none" stroke="#fff" strokeWidth="3" />
          </g>

          {/* Recommended: mix the targets */}
          <g className={`${fade} ${observed ? "opacity-0" : "opacity-100"}`}>
            <g fill="none" stroke="var(--color-accent)" strokeOpacity="0.75" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 8">
              {MIX.map((m, i) => (
                <path key={i} d={flight(SERVER, m.to, 2.6)} />
              ))}
            </g>
            <g fill="var(--color-accent)">
              {MIX.map((m, i) => {
                const [x, y] = at(m.to);
                return <circle key={i} cx={x} cy={y} r="8" />;
              })}
            </g>
            <circle cx={at(RETURNER_BACK)[0]} cy={at(RETURNER_BACK)[1]} r="9" fill="none" stroke="#fff" strokeWidth="3" />
          </g>

          {/* Server, always */}
          <circle cx={at(SERVER)[0]} cy={at(SERVER)[1]} r="10" fill="#fff" />
        </svg>

        {chip("1", t.zoneLabel, pct([16.9, 3.2], 5.5, -3.5), observed)}
        {chip("2", t.stepsInLabel, pct(RETURNER_IN, 2.5, -3), observed)}
        {chip("3", t.mixLabel, pct([16.9, 3.4], 5, -5), !observed)}
        </div>

        {/* View switch */}
        <div role="tablist" aria-label={t.frameLabel} className={`${glass} absolute left-3 top-3 flex rounded-full p-1 text-sm sm:left-5 sm:top-5`}>
          {(["observed", "recommended"] as const).map((k, i) => (
            <button
              key={k}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`${id}-${k}`}
              aria-selected={tab === k}
              tabIndex={tab === k ? 0 : -1}
              onClick={() => setTab(k)}
              onKeyDown={(e) => onKey(e, i)}
              className={`rounded-full px-4 py-1.5 font-medium transition-colors motion-reduce:transition-none ${
                tab === k ? "bg-white text-[#0d0f11]" : "text-white/80 hover:text-white"
              }`}
            >
              {k === "observed" ? t.tabObserved : t.tabRecommended}
            </button>
          ))}
        </div>

        <p className="absolute bottom-3 left-3 max-w-[70%] rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[0.6875rem] leading-snug text-white/80 backdrop-blur-md sm:bottom-5 sm:left-5 sm:text-xs">
          {t.frameNote}
        </p>
      </div>

      {/* Report panel: glass over the dark side of the frame on large screens, stacked below on phones. */}
      <div
        className={`${glass} relative m-3 rounded-2xl p-5 text-left sm:m-5 sm:p-7 xl:absolute xl:inset-y-5 xl:right-5 xl:m-0 xl:flex xl:w-[33%] xl:flex-col xl:overflow-hidden`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{t.reportTitle}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-white/60">
              {t.meta} · {t.player}
            </p>
          </div>
          <span className="rounded-full border border-accent/60 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-wider text-accent">
            {t.badge}
          </span>
        </div>

        <section aria-labelledby={`${id}-obs`} className="mt-6">
          <h4 id={`${id}-obs`} className="eyebrow !text-white/60">{t.observedTitle}</h4>
          <ol className="mt-3 space-y-3">
            {t.observed.map((item, i) => (
              <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-2 text-[0.9375rem] leading-snug text-white/90">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[0.6875rem] font-bold text-[#11140a]" aria-hidden="true">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby={`${id}-pri`} className="mt-6 border-t border-white/15 pt-5">
          <h4 id={`${id}-pri`} className="eyebrow !text-white/60">{t.priorityTitle}</h4>
          <p className="mt-2 text-lg font-semibold leading-snug tracking-tight">{t.priority}</p>
        </section>

        <section aria-labelledby={`${id}-rec`} className="mt-6 border-l-2 border-accent pl-4">
          <h4 id={`${id}-rec`} className="eyebrow flex items-center gap-2 !text-white">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[0.6875rem] font-bold text-[#11140a]" aria-hidden="true">3</span>
            {t.recommendedTitle}
          </h4>
          <ul className="mt-3 space-y-2.5">
            {t.recommended.map((item) => (
              <li key={item} className="text-[0.9375rem] leading-snug text-white/90">{item}</li>
            ))}
          </ul>
        </section>

        <p className="mt-6 text-[0.6875rem] leading-relaxed text-white/50 xl:mt-auto xl:pt-5">
          {t.courtNote} {t.footer}
        </p>
      </div>

    </figure>
  );
}
