"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Where a floating button may sit on a phone without covering anything.
 *
 *   full    the round 44px button, only while the spot under it holds no text, link, button or picture
 *   tab     a narrow tab in the empty margin at the screen edge (still tappable), when the spot is not free
 *   hidden  nothing at all, if even the edge is taken by content
 *
 * On wider screens the button is always the normal round one: the margins there are empty.
 */
export type FloatMode = "full" | "tab" | "hidden";

const PHONE = "(max-width: 767.98px)";
const BUTTON = 44;
const INSET = 12;
// The margin on a phone is 20px; the tab stays inside it with a little to spare for sub pixel text edges.
const TAB = 18;
const BREATHING_ROOM = 8;

const INTERACTIVE = 'a, button, input, textarea, select, summary, label, [role="button"], [role="tab"]';

/** A picture that says something (a photo with a description, a labelled diagram, a video), not a background. */
function isMeaningfulPicture(el: Element): boolean {
  const img = el.closest("img");
  if (img) return Boolean(img.getAttribute("alt")?.trim());
  const svg = el.closest("svg");
  if (svg) return svg.getAttribute("role") === "img" || Boolean(svg.getAttribute("aria-label"));
  return Boolean(el.closest("video, canvas, iframe"));
}

/** Is this element something the button must not sit on? Decided from what is under a point on the screen. */
function isContent(el: Element, widget: Element): boolean {
  if (widget.contains(el) || el === document.documentElement || el === document.body) return false;
  // Decorative layers (backdrops, textures) are marked aria-hidden: they are not what the visitor reads.
  if (el.closest('[aria-hidden="true"]')) return false;
  if (el.closest(INTERACTIVE) || isMeaningfulPicture(el)) return true;
  for (const node of el.childNodes) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) return true;
  }
  return false;
}

/** Nothing but empty background under this rectangle (a 4 by 4 grid of points is enough for a 44px button). */
function isFree(widget: Element, x0: number, y0: number, x1: number, y1: number): boolean {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const steps = 3;
  for (let i = 0; i <= steps; i++) {
    for (let j = 0; j <= steps; j++) {
      const x = Math.min(vw - 1, Math.max(0, x0 + ((x1 - x0) * i) / steps));
      const y = Math.min(vh - 1, Math.max(0, y0 + ((y1 - y0) * j) / steps));
      if (document.elementsFromPoint(x, y).some((el) => isContent(el, widget))) return false;
    }
  }
  return true;
}

export function useClearSpot(root: RefObject<HTMLElement | null>, side: "left" | "right", pinned: boolean): FloatMode {
  // Start as the edge tab: it never covers anything, so nothing flashes over the page before the first check.
  const [mode, setMode] = useState<FloatMode>("tab");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const widget = root.current;
      if (!widget) return;
      if (!window.matchMedia(PHONE).matches) return setMode("full");
      const r = widget.getBoundingClientRect();
      const vw = window.innerWidth;
      const fullX = side === "left" ? [INSET, INSET + BUTTON] : [vw - INSET - BUTTON, vw - INSET];
      const tabX = side === "left" ? [0, TAB] : [vw - TAB, vw];
      const room = BREATHING_ROOM;
      if (isFree(widget, fullX[0] - room, r.top - room, fullX[1] + room, r.bottom + room)) return setMode("full");
      setMode(isFree(widget, tabX[0], r.top, tabX[1], r.bottom) ? "tab" : "hidden");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("orientationchange", schedule);
    // Images and reveals change what is under the button without any scrolling.
    const timer = window.setInterval(schedule, 700);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
      window.clearInterval(timer);
    };
  }, [root, side]);

  // An open chat panel is the visitor's own doing: the button stays put and whole.
  return pinned ? "full" : mode;
}

/** Classes for the round button on a phone (md and up always use the normal 56px circle). */
export function floatButtonClasses(mode: FloatMode, side: "left" | "right"): string {
  const base = "flex items-center justify-center shadow-lg transition-all duration-200 motion-reduce:transition-none md:ml-0 md:mr-0 md:h-14 md:w-14 md:rounded-full md:opacity-100";
  if (mode === "full") return `${base} h-11 w-11 rounded-full`;
  if (mode === "tab") {
    return `${base} h-11 w-[18px] ${side === "left" ? "-ml-3 rounded-l-none rounded-r-full" : "-mr-3 rounded-r-none rounded-l-full"}`;
  }
  return `${base} pointer-events-none h-11 w-11 rounded-full opacity-0`;
}
