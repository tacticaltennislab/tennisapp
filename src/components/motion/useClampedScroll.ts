"use client";

import { useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";
import type { RefObject } from "react";

/**
 * Scroll progress (0 to 1) of an element through the viewport, as a plain,
 * clamped motion value. Feeding transforms from this keeps them on the JS
 * path, so they hold their end value after the range instead of snapping back
 * (as the browser's native scroll timelines do outside their range).
 */
export function useClampedScroll(
  target: RefObject<HTMLElement | null>,
  offset: NonNullable<Parameters<typeof useScroll>[0]>["offset"],
) {
  const { scrollYProgress: raw } = useScroll({ target, offset });
  const progress = useMotionValue(0);
  useMotionValueEvent(raw, "change", (v) => progress.set(Math.min(1, Math.max(0, v))));
  return progress;
}
