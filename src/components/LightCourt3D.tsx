"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import CenterCourtZoom from "@/components/CenterCourtZoom";

const LightCourtScene = dynamic(() => import("@/components/LightCourtScene"), {
  ssr: false,
});

export default function LightCourt3D({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
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
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showScene = reducedMotion === false && inView;

  return (
    <div ref={ref} className={`absolute inset-0 ${className}`}>
      {showScene ? <LightCourtScene /> : <CenterCourtZoom />}
    </div>
  );
}
