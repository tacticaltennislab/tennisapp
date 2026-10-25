"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import ClayPhoto, { CLAY } from "@/components/motion/ClayPhoto";
import { useClampedScroll } from "@/components/motion/useClampedScroll";

/**
 * The clay texture as a quiet backdrop for a whole section. It sits behind the
 * content (the parent needs `relative isolate`), heavily dimmed, and drifts a
 * few percent slower than the page on wide screens. Its top and bottom edges
 * are masked out, so it never ends in a hard line. On phones and with reduced
 * motion it is static.
 */
export default function ClayBackdrop() {
  const box = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const progress = useClampedScroll(box, ["start end", "end start"]);
  const shift = wide && !reduced ? 5 : 0;
  const y = useTransform(progress, [0, 1], [`${-shift}%`, `${shift}%`]);

  return (
    <div
      ref={box}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)",
      }}
    >
      {/* The texture is a charcoal duotone: about 7% in light mode under a light veil, 30% in dark mode */}
      <motion.div className="absolute -inset-y-[8%] inset-x-0 opacity-[0.07] dark:opacity-30" style={{ y }}>
        <ClayPhoto {...CLAY.texture} />
      </motion.div>
      <div className="absolute inset-0 bg-background/40 dark:bg-transparent" />
    </div>
  );
}
