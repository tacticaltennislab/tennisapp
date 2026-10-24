"use client";

import { useEffect, useRef, useState } from "react";
import StrokeFigure from "@/components/motion/StrokeFigure";
import { useReducedMotion } from "@/lib/useReducedMotion";

export interface StrokeCopy {
  eyebrow: string;
  title: string;
  caption: string;
  goTo: string;
  steps: { label: string; title: string; text: string }[];
}

const HEADER = 56; // sticky site header, px

/**
 * A tall section whose visual stays pinned while four phases of a stroke
 * step through with the scroll position. One passive scroll listener, only
 * attached while the section is on screen, writes at most a few state
 * changes. Under reduced motion the pin is released (see globals.css) and
 * the four steps read as a plain list, each with its own illustration.
 */
export default function PinnedStrokeAnalysis({ copy }: { copy: StrokeCopy }) {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = wrap.current;
    if (!el || reduced) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - (window.innerHeight - HEADER);
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, scrollable)));
      el.style.setProperty("--p", p.toFixed(3));
      const next = Math.min(copy.steps.length - 1, Math.floor(p * copy.steps.length));
      setStep((cur) => (cur === next ? cur : next));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
          onScroll();
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { rootMargin: "20% 0px 20% 0px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced, copy.steps.length]);

  function goTo(i: number) {
    const el = wrap.current;
    if (!el) return;
    const scrollable = el.offsetHeight - (window.innerHeight - HEADER);
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((i + 0.5) / copy.steps.length) * scrollable, behavior: "smooth" });
  }

  return (
    <section id="stroke-analysis" aria-labelledby="stroke-title" className="scroll-mt-16">
      <div ref={wrap} className="pin-wrap relative h-[320vh] sm:h-[360vh]">
        <div className="pin-stage sticky top-14 flex h-[calc(100svh-3.5rem)] items-center overflow-hidden">
          <div className="container-x grid w-full items-center gap-4 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] md:gap-16">
            {/* Pinned visual: the four phases cross-fade as the scroll advances. */}
            <div className="pin-figure relative mx-auto aspect-[4/5] h-[30svh] max-w-full rounded-3xl border border-line bg-surface md:h-[64svh]">
              {copy.steps.map((s, i) => (
                <StrokeFigure
                  key={s.label}
                  step={i as 0 | 1 | 2 | 3}
                  className={`absolute inset-0 h-full w-full p-3 text-ink transition-opacity duration-300 ease-out ${
                    step === i ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <span className="t-mono absolute right-3 top-3 text-xs text-muted md:right-4 md:top-4" aria-hidden="true">
                0{step + 1} / 0{copy.steps.length}
              </span>
            </div>

            <div>
              <p className="eyebrow">{copy.eyebrow}</p>
              <h2 id="stroke-title" className="t-h2 mt-3 max-md:!text-[1.625rem] md:mt-4">
                {copy.title}
              </h2>

              <ol className="pin-steps mt-4 grid md:mt-8">
                {copy.steps.map((s, i) => (
                  <li
                    key={s.label}
                    aria-current={step === i ? "step" : undefined}
                    style={{ gridArea: "1 / 1" }}
                    className={`transition-[opacity,transform] duration-300 ease-out ${
                      step === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
                    }`}
                  >
                    <p className="t-mono text-sm text-muted">
                      0{i + 1} · {s.label}
                    </p>
                    <h3 className="mt-1.5 text-lg font-semibold tracking-tight md:mt-2 md:text-2xl">{s.title}</h3>
                    <p className="mt-1.5 max-w-md text-base leading-relaxed text-body md:mt-2 md:text-[1.0625rem]">{s.text}</p>
                    {/* Shown instead of the pinned visual when motion is reduced. */}
                    <StrokeFigure step={i as 0 | 1 | 2 | 3} className="pin-static-fig mt-5 hidden h-64 w-auto rounded-2xl border border-line bg-surface text-ink" />
                  </li>
                ))}
              </ol>

              <div className="pin-rail mt-4 md:mt-8" role="group" aria-label={copy.goTo}>
                <div className="relative h-px bg-line">
                  <span
                    className="absolute inset-y-0 left-0 w-full origin-left bg-ink"
                    style={{ transform: "scaleX(var(--p, 0))" }}
                  />
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {copy.steps.map((s, i) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`${copy.goTo} ${i + 1}: ${s.label}`}
                      className={`truncate rounded-lg px-1 py-2 text-left text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                        step === i ? "text-ink" : "text-muted hover:text-ink"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="container-x pb-10 pt-2 text-xs text-muted md:pb-14">{copy.caption}</p>
    </section>
  );
}
