"use client";

import dynamic from "next/dynamic";
import { useLazyScene } from "@/hooks/useLazyScene";
import CenterCourtZoom from "@/components/CenterCourtZoom";

const LightCourtScene = dynamic(() => import("@/components/LightCourtScene"), {
  ssr: false,
});

export default function LightCourt3D({ className = "" }: { className?: string }) {
  const { ref, showScene } = useLazyScene();

  return (
    <div ref={ref} className={`absolute inset-0 ${className}`}>
      {showScene ? <LightCourtScene /> : <CenterCourtZoom />}
    </div>
  );
}
