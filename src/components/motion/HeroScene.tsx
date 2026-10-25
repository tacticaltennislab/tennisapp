"use client";

import { useEffect, useRef, useState } from "react";
import { getImageProps } from "next/image";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Two photographs of the same clay court and a scroll-driven "descent":
 * the drone view slowly breathes (Ken Burns), then as the visitor scrolls the
 * hero stays pinned while the drone view scales up and fades and the close
 * clay texture fades in beneath it. Only transform, opacity and filter are
 * animated. Narrow screens get a plain crossfade (no scaling); with reduced
 * motion everything is static and the hero is a single screen.
 */
function Photo({
  landscape,
  portrait,
  priority = false,
}: {
  landscape: { src: string; width: number; height: number };
  portrait: { src: string; width: number; height: number };
  priority?: boolean;
}) {
  const common = { alt: "", priority, quality: 60, className: "h-full w-full object-cover" } as const;
  const {
    props: { srcSet: wideSet },
  } = getImageProps({ ...common, ...landscape, sizes: "100vw" });
  const { props: tall } = getImageProps({ ...common, ...portrait, sizes: "100vw" });
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={wideSet} sizes="100vw" />
      <img {...tall} alt="" />
    </picture>
  );
}

export default function HeroScene({ children }: { children: React.ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [wide, setWide] = useState(false);
  // The texture is only needed once the visitor scrolls, so it loads after the page has finished:
  // the drone photograph, which is the first thing seen, gets the whole connection.
  const [textureReady, setTextureReady] = useState(false);

  useEffect(() => {
    const go = () => setTextureReady(true);
    if (document.readyState === "complete") {
      const id = window.setTimeout(go, 300);
      return () => window.clearTimeout(id);
    }
    window.addEventListener("load", go, { once: true });
    return () => window.removeEventListener("load", go);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress: raw } = useScroll({ target: track, offset: ["start start", "end end"] });
  // A plain, clamped motion value: it keeps the transforms on the JS path, so the values hold
  // after the pinned range ends instead of snapping back (as the browser's native scroll
  // timelines do outside their range).
  const scrollYProgress = useMotionValue(0);
  useMotionValueEvent(raw, "change", (v) => scrollYProgress.set(Math.min(1, Math.max(0, v))));
  const still = Boolean(reduced);

  const droneScale = useTransform(scrollYProgress, [0.08, 0.92], [1, wide && !still ? 1.4 : 1]);
  const droneOpacity = useTransform(scrollYProgress, [0.2, 0.85], [1, still ? 1 : 0]);
  const textureOpacity = useTransform(scrollYProgress, [0.15, 0.85], [0, still ? 0 : 1]);
  const textureScale = useTransform(scrollYProgress, [0.1, 0.95], [wide && !still ? 1.12 : 1, 1]);
  const dim = useTransform(scrollYProgress, [0.6, 1], [0, still ? 0 : 0.55]);
  const copyOpacity = useTransform(scrollYProgress, [0.12, 0.5], [1, still ? 1 : 0]);
  const copyY = useTransform(scrollYProgress, [0.12, 0.5], [0, wide && !still ? -48 : 0]);

  return (
    <div ref={track} className="relative h-[155svh] bg-[#121417] motion-reduce:h-svh md:h-[230svh] md:motion-reduce:h-svh">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Close clay texture, revealed underneath */}
        <motion.div aria-hidden="true" className="absolute inset-0" style={{ opacity: textureOpacity, scale: textureScale }}>
          {textureReady && (
            <Photo
              landscape={{ src: "/media/clay-texture.jpg", width: 1600, height: 900 }}
              portrait={{ src: "/media/clay-texture-portrait.jpg", width: 800, height: 1200 }}
            />
          )}
        </motion.div>

        {/* Drone view: scroll scale and fade on the outside, the slow Ken Burns loop inside */}
        <motion.div aria-hidden="true" className="absolute inset-0" style={{ scale: droneScale, opacity: droneOpacity }}>
          <motion.div
            className="h-full w-full"
            animate={still ? undefined : { scale: [1, 1.08] }}
            transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          >
            <Photo
              priority
              landscape={{ src: "/media/hero-clay.jpg", width: 1920, height: 1080 }}
              portrait={{ src: "/media/hero-clay-portrait.jpg", width: 828, height: 1472 }}
            />
          </motion.div>
        </motion.div>

        {/* Readability scrim, deepening into the next section */}
        <div aria-hidden="true" className="absolute inset-0 bg-black/40" />
        <motion.div aria-hidden="true" className="absolute inset-0 bg-[#121417]" style={{ opacity: dim }} />

        <motion.div
          className="relative z-10 flex h-full items-center justify-center"
          style={{ opacity: copyOpacity, y: copyY }}
        >
          {children}
        </motion.div>

        {/* Soft fade so the image melts into the section below */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: "linear-gradient(to bottom, rgba(18,20,23,0) 0%, rgba(18,20,23,0.55) 55%, #121417 100%)" }}
        />
      </div>
    </div>
  );
}
