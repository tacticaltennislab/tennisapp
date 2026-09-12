"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import CourtBackdrop from "@/components/CourtBackdrop";
import { useLazyScene } from "@/hooks/useLazyScene";

const Court3DScene = dynamic(() => import("@/components/Court3DScene"), {
  ssr: false,
});

export default function Court3D() {
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const { ref, showScene } = useLazyScene();

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

  // The hero is always visible on load, so `showScene` starts true (the
  // court renders immediately) and only becomes false once you've scrolled
  // it out of view -- unlike before, when this WebGL canvas and its camera
  // animation kept running forever in the background for the rest of the
  // session, regardless of scroll position.
  return (
    <div ref={ref} className="absolute inset-0">
      {reducedMotion !== false || !showScene ? <CourtBackdrop /> : <Court3DScene />}
    </div>
  );
}
