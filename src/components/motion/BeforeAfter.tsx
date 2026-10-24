"use client";

import { useId, useState } from "react";
import StrokeFigure from "@/components/motion/StrokeFigure";

export interface BeforeAfterCopy {
  eyebrow: string;
  title: string;
  lead: string;
  before: string;
  after: string;
  beforeText: string;
  afterText: string;
  slider: string;
  caption: string;
}

/**
 * Compare one toss before and after the coach's correction. The slider is a
 * native range input stretched over the panel, so dragging, touch and the
 * arrow keys all work and assistive technology announces it. It is moved by
 * the visitor only: nothing animates on its own.
 */
export default function BeforeAfter({ copy }: { copy: BeforeAfterCopy }) {
  const [pos, setPos] = useState(50);
  const id = useId();

  return (
    <section id="before-after" aria-labelledby={`${id}-title`} className="section-pad scroll-mt-16">
      <div className="container-x grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-16">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id={`${id}-title`} className="t-h2 mt-4">
            {copy.title}
          </h2>
          <p className="t-lead mt-5 max-w-md">{copy.lead}</p>

          <dl className="mt-8 space-y-5">
            <div className="border-t border-line pt-4">
              <dt className="eyebrow">{copy.before}</dt>
              <dd className="mt-2 max-w-md text-[1.0625rem] leading-relaxed text-body">{copy.beforeText}</dd>
            </div>
            <div className="border-t border-ink pt-4">
              <dt className="eyebrow !text-ink">{copy.after}</dt>
              <dd className="mt-2 max-w-md text-[1.0625rem] leading-relaxed text-body">{copy.afterText}</dd>
            </div>
          </dl>
        </div>

        <div>
          <div
            className="group relative mx-auto aspect-[4/5] w-full max-w-md select-none overflow-hidden rounded-3xl border border-line bg-surface focus-within:ring-2 focus-within:ring-ink focus-within:ring-offset-2 focus-within:ring-offset-background sm:aspect-square md:aspect-[4/5]"
          >
            {/* After sits underneath; Before is clipped on top and revealed up to the handle. */}
            <StrokeFigure step={1} variant="ideal" marks={false} reference className="absolute inset-0 h-full w-full p-4 text-ink" />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <div className="absolute inset-0 bg-surface-muted" />
              <StrokeFigure step={1} variant="actual" marks={false} reference className="absolute inset-0 h-full w-full p-4 text-ink" />
            </div>

            <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-ink ring-1 ring-line">
              {copy.before}
            </span>
            <span className="absolute right-4 top-4 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-on-brand">
              {copy.after}
            </span>

            <div className="pointer-events-none absolute inset-y-0 w-px bg-ink" style={{ left: `${pos}%` }} aria-hidden="true">
              <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-background text-ink shadow-md">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
                </svg>
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label={copy.slider}
              aria-valuetext={`${copy.before} ${pos}%, ${copy.after} ${100 - pos}%`}
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
              style={{ touchAction: "pan-y" }}
            />
          </div>
          <p className="mt-4 text-center text-xs text-muted">{copy.caption}</p>
        </div>
      </div>
    </section>
  );
}
