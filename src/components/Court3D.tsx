"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import CourtBackdrop from "@/components/CourtBackdrop";

const Court3DScene = dynamic(() => import("@/components/Court3DScene"), {
  ssr: false,
});

export default function Court3D() {
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);

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

  if (reducedMotion !== false) {
    return <CourtBackdrop />;
  }

  return <Court3DScene />;
}
