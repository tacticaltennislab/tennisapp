"use client";

import { useEffect, useRef, useState } from "react";

// Phone-class GPUs vary too widely to safely tune WebGL settings for --
// some budget/older devices struggle with even a modest scene. Rather than
// keep guessing at settings for hardware we can't test against, phone-width
// viewports skip WebGL entirely and get the static fallback, which is
// smooth by construction since there's no 3D rendering happening at all.
const MOBILE_QUERY = "(max-width: 640px)";

export function useLazyScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mql.matches);
    mql.addEventListener("change", onChange);
    // Initial read of a browser-only API that isn't available during SSR,
    // so it can't be computed during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, showScene: reducedMotion === false && isMobile === false && inView };
}
