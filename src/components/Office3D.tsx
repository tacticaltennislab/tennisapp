"use client";

import dynamic from "next/dynamic";
import { useLazyScene } from "@/hooks/useLazyScene";
import CenterCourtZoom from "@/components/CenterCourtZoom";

const OfficeScene = dynamic(() => import("@/components/OfficeScene"), {
  ssr: false,
});

export default function Office3D({ className = "" }: { className?: string }) {
  const { ref, showScene } = useLazyScene();

  return (
    <div ref={ref} className={`absolute inset-0 ${className}`}>
      {showScene ? <OfficeScene /> : <CenterCourtZoom />}
    </div>
  );
}
