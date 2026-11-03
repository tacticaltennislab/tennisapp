"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ClayPhoto, { CLAY } from "@/components/motion/ClayPhoto";
import { IconArrowRight } from "@/components/icons";
import { trackEvent } from "@/lib/analytics";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import { fill, sampleReportDict } from "@/i18n/dictionaries/sampleReport";
import { localizedHref, type AppLocale } from "@/i18n/locales";

/**
 * Turn this on once the technique sample files are in public/sample-report/technique/ (page-1..3.webp,
 * page-1..3-sm.webp and tactical-tennis-lab-technique-sample.pdf). Off: no tabs, only the match sample.
 */
const SHOW_TECHNIQUE_SAMPLE = false;

const WIDTH = 1590;
const HEIGHT = 2248;
const LIME = "#c8f135";
const FADE_MS = 150;

type SetId = "match" | "technique";

/** Where each sample's pages and PDF live, and how many pages it has. */
const SETS: Record<SetId, { dir: string; pages: number; pdf: string }> = {
  match: { dir: "/sample-report", pages: 5, pdf: "/sample-report/tactical-tennis-lab-sample-report.pdf" },
  technique: {
    dir: "/sample-report/technique",
    pages: 3,
    pdf: "/sample-report/technique/tactical-tennis-lab-technique-sample.pdf",
  },
};

const full = (dir: string, n: number) => `${dir}/page-${n}.webp`;
const small = (dir: string, n: number) => `${dir}/page-${n}-sm.webp`;

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

function Sheet({ dir, n, priority }: { dir: string; n: number; priority: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static pre-sized pages with a hand written srcset (half size for small screens)
    <img
      src={full(dir, n)}
      srcSet={`${small(dir, n)} 795w, ${full(dir, n)} 1590w`}
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
  dir,
  pages,
  captions,
  page,
  onClose,
  onPage,
  t,
}: {
  dir: string;
  pages: number;
  captions: readonly string[];
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
    else if (e.key === "ArrowRight" && page < pages) onPage(page + 1);
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
      aria-label={fill(t.lightboxLabel, { n: page, total: pages })}
      onKeyDown={onKeyDown}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
      data-testid="report-lightbox"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- the full size page, already optimised */}
      <img
        src={full(dir, page)}
        width={WIDTH}
        height={HEIGHT}
        alt={captions[page - 1]}
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
      <button type="button" onClick={() => onPage(page + 1)} disabled={page === pages} aria-label={t.next} className={`${arrow} absolute right-2 top-1/2 -translate-y-1/2 sm:right-5`}>
        <IconArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function SampleReportCarousel({ lang = "en" }: { lang?: AppLocale }) {
  const t = sampleReportDict(lang);
  const demoLabel = homeDictionaries[lang].hero.ctaPrimary;
  const reduced = useReducedMotion();
  const tabIds: SetId[] = SHOW_TECHNIQUE_SAMPLE ? ["match", "technique"] : ["match"];
  const showTabs = tabIds.length > 1;

  const track = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLDivElement | null)[]>([]);
  const tabRefs = useRef<Partial<Record<SetId, HTMLButtonElement | null>>>({});
  // `tab` is the one the visitor picked; `shown` is the set on screen. They differ for the moment of the cross fade.
  const [tab, setTab] = useState<SetId>("match");
  const [shown, setShown] = useState<SetId>("match");
  const [fading, setFading] = useState(false);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const seen = useRef(new Set<string>());
  // The page that was active last, so only a real change (not the first render, nor a repeated effect run) is tracked.
  const lastActive = useRef(0);

  const set = SETS[shown];
  const pages = set.pages;
  const captions: readonly string[] = shown === "match" ? t.captions : t.techniqueCaptions;
  const carouselLabel = shown === "match" ? t.carouselLabel : t.techniqueCarouselLabel;

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
  }, [shown]);

  // A new set always starts on its first page.
  useLayoutEffect(() => {
    track.current?.scrollTo({ left: 0, behavior: "instant" });
  }, [shown]);

  // One analytics event per page of each sample, the first time it becomes the active page after the visitor moves.
  useEffect(() => {
    if (lastActive.current === active) return;
    lastActive.current = active;
    const key = `${shown}:${active}`;
    if (seen.current.has(key)) return;
    seen.current.add(key);
    trackEvent("sample_report_slide", { page: active + 1, tab: shown });
  }, [active, shown]);

  const goTo = useCallback(
    (i: number) => {
      const el = track.current;
      const index = Math.min(pages - 1, Math.max(0, i));
      const slide = slides.current[index];
      if (!el || !slide) return;
      setActive(index);
      el.scrollTo({ left: slide.offsetLeft - (el.clientWidth - slide.offsetWidth) / 2, behavior: reduced ? "auto" : "smooth" });
    },
    [reduced, pages]
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
      goTo(pages - 1);
    }
  }

  function commit(id: SetId) {
    lastActive.current = 0;
    setActive(0);
    setShown(id);
    setFading(false);
  }

  function selectTab(id: SetId, focus = false) {
    if (id === tab) return;
    setTab(id);
    trackEvent("sample_tab", { tab: id });
    if (focus) tabRefs.current[id]?.focus();
    if (reduced) {
      commit(id);
    } else {
      // Cross fade: the current set fades out, then the new one fades in.
      setFading(true);
      window.setTimeout(() => commit(id), FADE_MS);
    }
  }

  function onTabKeyDown(e: React.KeyboardEvent) {
    const i = tabIds.indexOf(tab);
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % tabIds.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabIds.length) % tabIds.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabIds.length - 1;
    if (next < 0) return;
    e.preventDefault();
    selectTab(tabIds[next], true);
  }

  function open(page: number) {
    setLightbox(page);
    trackEvent("sample_report_lightbox", { page, tab: shown });
  }

  const round = "glass-panel glass-round flex h-11 w-11 items-center justify-center text-ink transition-opacity disabled:opacity-40";
  const tabLabel: Record<SetId, string> = { match: t.tabMatch, technique: t.tabTechnique };
  const panelProps = showTabs ? ({ role: "tabpanel", id: `sample-panel-${shown}`, "aria-labelledby": `sample-tab-${shown}` } as const) : {};

  return (
    <section id="sample-report" aria-labelledby="sample-report-title" className="section-pad relative isolate scroll-mt-16">
      <Backdrop />
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="sample-report-title" className="t-h2 mt-4">
            {t.title}
          </h2>
          <p className="t-lead mt-5 max-w-xl">{shown === "technique" ? t.techniqueSubtitle : t.subtitle}</p>
        </Reveal>

        <Reveal delay={60} className="mt-12 md:mt-16">
          {/* On phones the panel runs edge to edge, so one page can fill about 85% of the screen and its neighbours still peek at the sides. */}
          <div className="glass-panel -mx-[clamp(1.25rem,4vw,2rem)] rounded-none border-x-0 px-0 pb-6 pt-2 sm:mx-0 sm:rounded-[28px] sm:border-x sm:px-4 md:rounded-[40px] md:px-8 md:pb-8 md:pt-4">
            {showTabs && (
              <div className="overflow-x-auto px-4 pb-1 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-testid="report-tabs-scroll">
                <div
                  role="tablist"
                  aria-label={t.tabsLabel}
                  onKeyDown={onTabKeyDown}
                  className="glass-panel glass-round mx-auto flex w-max gap-1 p-1"
                  data-testid="report-tabs"
                >
                  {tabIds.map((id) => {
                    const selected = tab === id;
                    return (
                      <button
                        key={id}
                        ref={(el) => {
                          tabRefs.current[id] = el;
                        }}
                        type="button"
                        role="tab"
                        id={`sample-tab-${id}`}
                        aria-selected={selected}
                        aria-controls={`sample-panel-${id}`}
                        tabIndex={selected ? 0 : -1}
                        onClick={() => selectTab(id)}
                        className={`relative min-h-11 whitespace-nowrap rounded-full px-5 pb-1 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:px-6 ${
                          selected ? "text-ink" : "text-muted hover:text-ink"
                        }`}
                      >
                        {tabLabel[id]}
                        {/* The only lime on the tabs: a short bar under the active one. */}
                        <span
                          aria-hidden="true"
                          data-testid={selected ? "tab-indicator" : undefined}
                          className={`absolute inset-x-5 bottom-1.5 h-[3px] rounded-full transition-opacity duration-300 motion-reduce:transition-none ${selected ? "opacity-100" : "opacity-0"}`}
                          style={{ backgroundColor: LIME, boxShadow: "0 0 0 0.5px rgba(0,0,0,0.25)" }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            <div
              {...panelProps}
              className={`transition-opacity ease-out motion-reduce:transition-none ${fading ? "opacity-0" : "opacity-100"}`}
              style={{ transitionDuration: `${FADE_MS}ms` }}
            >
              <div
                role="region"
                aria-roledescription="carousel"
                aria-label={carouselLabel}
                tabIndex={0}
                onKeyDown={onKeyDown}
                className="rounded-[24px] outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                data-testid="report-carousel"
              >
                <div className="report-carousel">
                  <div ref={track} className="report-track relative" data-testid="report-track">
                    {Array.from({ length: pages }, (_, i) => (
                      <div
                        key={`${shown}-${i}`}
                        ref={(el) => {
                          slides.current[i] = el;
                        }}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={fill(t.slideLabel, { n: i + 1, total: pages, caption: captions[i] })}
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
                          <Sheet dir={set.dir} n={i + 1} priority={i === 0} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center px-2 text-center">
                  <p className="glass-panel glass-round t-mono px-4 py-1.5 text-sm font-semibold text-ink" data-testid="report-counter">
                    {fill(t.counter, { n: active + 1, total: pages })}
                  </p>
                  <p aria-live="polite" className="mt-3 min-h-[3.5rem] max-w-md text-[1.0625rem] leading-relaxed text-body sm:min-h-[3rem]" data-testid="report-caption">
                    {captions[active]}
                  </p>
                </div>

                <div className="mt-2 flex items-center justify-center gap-5">
                  <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label={t.prev} className={round}>
                    <IconArrowRight className="h-4 w-4 rotate-180" />
                  </button>
                  <div className="flex items-center gap-1" role="group" aria-label={t.dots}>
                    {Array.from({ length: pages }, (_, i) => (
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
                  <button type="button" onClick={() => goTo(active + 1)} disabled={active === pages - 1} aria-label={t.next} className={round}>
                    <IconArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="mt-5 text-center text-xs text-muted">{t.note}</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <a href={set.pdf} download onClick={() => trackEvent("sample_report_pdf", { tab: shown })} className="btn btn-primary">
            {shown === "match" ? t.pdf : t.techniquePdf}
          </a>
          {shown === "match" ? (
            <Link href={localizedHref(lang, "/demo")} className="btn btn-secondary">
              {demoLabel}
            </Link>
          ) : (
            // The same destination as the Stroke Analysis link in the services section: the players' prices.
            <Link href={`${localizedHref(lang, "/pricing")}?audience=players`} className="btn btn-secondary">
              {t.techniqueCta}
            </Link>
          )}
        </div>
      </div>

      {lightbox !== null &&
        createPortal(
          <Lightbox dir={set.dir} pages={pages} captions={captions} page={lightbox} onClose={() => setLightbox(null)} onPage={(n) => setLightbox(n)} t={t} />,
          document.body
        )}
    </section>
  );
}
