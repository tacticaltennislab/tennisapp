"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ClayPhoto, { CLAY } from "@/components/motion/ClayPhoto";
import { IconArrowRight } from "@/components/icons";
import { trackEvent } from "@/lib/analytics";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import { fill, sampleReportDict } from "@/i18n/dictionaries/sampleReport";
import { localizedHref, type AppLocale } from "@/i18n/locales";

const PAGES = 5;
const WIDTH = 1590;
const HEIGHT = 2248;
const PDF = "/sample-report/tactical-tennis-lab-sample-report.pdf";
const LIME = "#c8f135";

const full = (n: number) => `/sample-report/page-${n}.webp`;
const small = (n: number) => `/sample-report/page-${n}-sm.webp`;

/** The clay texture, blurred and dimmed, so the glass panel has something to refract. */
function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
      }}
    >
      {/* The texture is a charcoal duotone: a light, soft wash in light mode (never dark patches), deeper in dark mode. */}
      <div className="absolute -inset-8 opacity-[0.3] blur-[3px] dark:opacity-60">
        <ClayPhoto {...CLAY.texture} />
      </div>
      <div className="absolute inset-0 bg-background/45 dark:bg-black/35" />
    </div>
  );
}

function Sheet({ n, priority }: { n: number; priority: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static pre-sized pages with a hand written srcset (half size for small screens)
    <img
      src={full(n)}
      srcSet={`${small(n)} 795w, ${full(n)} 1590w`}
      sizes="(min-width: 640px) 25rem, 85vw"
      width={WIDTH}
      height={HEIGHT}
      alt=""
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className="block h-auto w-full select-none rounded-[6px] bg-white shadow-[0_2px_6px_rgba(30,20,10,0.12),0_14px_34px_rgba(30,20,10,0.2)]"
    />
  );
}

function Lightbox({
  page,
  onClose,
  onPage,
  t,
}: {
  page: number;
  onClose: () => void;
  onPage: (n: number) => void;
  t: ReturnType<typeof sampleReportDict>;
}) {
  const box = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const restore = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      restore?.focus();
    };
  }, []);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
    } else if (e.key === "ArrowLeft" && page > 1) onPage(page - 1);
    else if (e.key === "ArrowRight" && page < PAGES) onPage(page + 1);
    else if (e.key === "Tab") {
      // Keep focus inside the dialog.
      const items = Array.from(box.current?.querySelectorAll<HTMLElement>("button:not([disabled])") ?? []);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (!box.current?.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  const arrow = "glass-panel glass-round flex h-11 w-11 items-center justify-center text-ink disabled:opacity-40";
  return (
    <div
      ref={box}
      role="dialog"
      aria-modal="true"
      aria-label={fill(t.lightboxLabel, { n: page, total: PAGES })}
      onKeyDown={onKeyDown}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
      data-testid="report-lightbox"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- the full size page, already optimised */}
      <img
        src={full(page)}
        width={WIDTH}
        height={HEIGHT}
        alt={t.captions[page - 1]}
        className="max-h-[92vh] w-auto max-w-full rounded-[6px] bg-white object-contain shadow-2xl"
      />
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={t.close}
        className="glass-panel glass-round absolute right-3 top-3 flex h-11 w-11 items-center justify-center text-ink sm:right-6 sm:top-6"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="m5 5 10 10M15 5 5 15" />
        </svg>
      </button>
      <button type="button" onClick={() => onPage(page - 1)} disabled={page === 1} aria-label={t.prev} className={`${arrow} absolute left-2 top-1/2 -translate-y-1/2 sm:left-5`}>
        <IconArrowRight className="h-4 w-4 rotate-180" />
      </button>
      <button type="button" onClick={() => onPage(page + 1)} disabled={page === PAGES} aria-label={t.next} className={`${arrow} absolute right-2 top-1/2 -translate-y-1/2 sm:right-5`}>
        <IconArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function SampleReportCarousel({ lang = "en" }: { lang?: AppLocale }) {
  const t = sampleReportDict(lang);
  const demoLabel = homeDictionaries[lang].hero.ctaPrimary;
  const reduced = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const seen = useRef(new Set<number>());
  // The page that was active last, so only a real change (not the first render, nor a repeated effect run) is tracked.
  const lastActive = useRef(0);

  // The page nearest the middle is the active one: a thin band down the centre of the track.
  useEffect(() => {
    const root = track.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(slides.current.indexOf(e.target as HTMLDivElement));
        }
      },
      { root, rootMargin: "0px -48% 0px -48%", threshold: 0 }
    );
    slides.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // One analytics event per page, the first time it becomes the active page after the visitor moves.
  useEffect(() => {
    if (lastActive.current === active) return;
    lastActive.current = active;
    if (seen.current.has(active)) return;
    seen.current.add(active);
    trackEvent("sample_report_slide", { page: active + 1 });
  }, [active]);

  const goTo = useCallback(
    (i: number) => {
      const el = track.current;
      const slide = slides.current[Math.min(PAGES - 1, Math.max(0, i))];
      if (!el || !slide) return;
      setActive(Math.min(PAGES - 1, Math.max(0, i)));
      el.scrollTo({ left: slide.offsetLeft - (el.clientWidth - slide.offsetWidth) / 2, behavior: reduced ? "auto" : "smooth" });
    },
    [reduced]
  );

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(active - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(PAGES - 1);
    }
  }

  function open(page: number) {
    setLightbox(page);
    trackEvent("sample_report_lightbox", { page });
  }

  const round = "glass-panel glass-round flex h-11 w-11 items-center justify-center text-ink transition-opacity disabled:opacity-40";

  return (
    <section id="sample-report" aria-labelledby="sample-report-title" className="section-pad relative isolate scroll-mt-16">
      <Backdrop />
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="sample-report-title" className="t-h2 mt-4">
            {t.title}
          </h2>
          <p className="t-lead mt-5 max-w-xl">{t.subtitle}</p>
        </Reveal>

        <Reveal delay={60} className="mt-12 md:mt-16">
          {/* On phones the panel runs edge to edge, so one page can fill about 85% of the screen and its neighbours still peek at the sides. */}
          <div className="glass-panel -mx-[clamp(1.25rem,4vw,2rem)] rounded-none border-x-0 px-0 pb-6 pt-2 sm:mx-0 sm:rounded-[28px] sm:border-x sm:px-4 md:rounded-[40px] md:px-8 md:pb-8 md:pt-4">
            <div
              role="region"
              aria-roledescription="carousel"
              aria-label={t.carouselLabel}
              tabIndex={0}
              onKeyDown={onKeyDown}
              className="rounded-[24px] outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              data-testid="report-carousel"
            >
              <div className="report-carousel">
                <div ref={track} className="report-track relative" data-testid="report-track">
                  {Array.from({ length: PAGES }, (_, i) => (
                    <div
                      key={i}
                      ref={(el) => {
                        slides.current[i] = el;
                      }}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={fill(t.slideLabel, { n: i + 1, total: PAGES, caption: t.captions[i] })}
                      data-active={active === i}
                      data-pos={i < active ? "before" : i > active ? "after" : "current"}
                      className="report-slide"
                    >
                      <button
                        type="button"
                        onClick={() => open(i + 1)}
                        aria-label={fill(t.open, { n: i + 1 })}
                        className="report-sheet block w-full cursor-zoom-in rounded-[6px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                      >
                        <Sheet n={i + 1} priority={i === 0} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center px-2 text-center">
                <p className="glass-panel glass-round t-mono px-4 py-1.5 text-sm font-semibold text-ink" data-testid="report-counter">
                  {fill(t.counter, { n: active + 1, total: PAGES })}
                </p>
                <p aria-live="polite" className="mt-3 min-h-[3.5rem] max-w-md text-[1.0625rem] leading-relaxed text-body sm:min-h-[3rem]" data-testid="report-caption">
                  {t.captions[active]}
                </p>
              </div>

              <div className="mt-2 flex items-center justify-center gap-5">
                <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label={t.prev} className={round}>
                  <IconArrowRight className="h-4 w-4 rotate-180" />
                </button>
                <div className="flex items-center gap-1" role="group" aria-label={t.dots}>
                  {Array.from({ length: PAGES }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={fill(t.goTo, { n: i + 1 })}
                      aria-current={active === i ? "true" : undefined}
                      className="flex h-6 w-6 items-center justify-center"
                    >
                      <span
                        className={`block rounded-full transition-all duration-300 motion-reduce:transition-none ${active === i ? "h-2.5 w-2.5" : "h-2 w-2 bg-ink/25"}`}
                        style={active === i ? { backgroundColor: LIME, boxShadow: "0 0 0 1px rgba(0,0,0,0.25)" } : undefined}
                      />
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => goTo(active + 1)} disabled={active === PAGES - 1} aria-label={t.next} className={round}>
                  <IconArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="mt-5 text-center text-xs text-muted">{t.note}</p>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <a href={PDF} download onClick={() => trackEvent("sample_report_pdf")} className="btn btn-primary">
            {t.pdf}
          </a>
          <Link href={localizedHref(lang, "/demo")} className="btn btn-secondary">
            {demoLabel}
          </Link>
        </div>
      </div>

      {lightbox !== null &&
        createPortal(<Lightbox page={lightbox} onClose={() => setLightbox(null)} onPage={(n) => setLightbox(n)} t={t} />, document.body)}
    </section>
  );
}
