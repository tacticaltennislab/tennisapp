"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import ClayPhoto, { CLAY } from "@/components/motion/ClayPhoto";
import { useClampedScroll } from "@/components/motion/useClampedScroll";

/**
 * Two photographs of the same clay court and a scroll-driven "descent": the
 * drone view slowly breathes (Ken Burns); while the visitor scrolls through
 * the short pinned range the drone view scales up and fades and the close clay
 * texture fades in beneath it. The next section overlaps the end of this
 * track (see HomeContent), so the screen is never empty: the report slides up
 * over the texture while the transition is still running. Only transform,
 * opacity and filter are animated. Narrow screens get a plain crossfade; with
 * reduced motion everything is static and the hero is a single screen.
 */
export default function HeroScene({ children }: { children: React.ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [wide, setWide] = useState(false);
  // The texture is only needed once the visitor scrolls, so it loads after the page has finished:
  // the drone photograph, which is the first thing seen, gets the whole connection.
  const [textureReady, setTextureReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const go = () => setTextureReady(true);
    if (document.readyState === "complete") {
      const id = window.setTimeout(go, 300);
      return () => window.clearTimeout(id);
    }
    window.addEventListener("load", go, { once: true });
    return () => window.removeEventListener("load", go);
  }, []);

  const progress = useClampedScroll(track, ["start start", "end end"]);
  const still = Boolean(reduced);
  const zoom = wide && !still;

  // The pinned range is short (40svh on wide screens, 20svh on phones), so everything happens
  // inside it: the drone view is gone by 70%, the texture is in by 65%, the headline by 35%.
  const droneScale = useTransform(progress, [0, 0.9], [1, zoom ? 1.4 : 1]);
  const droneOpacity = useTransform(progress, [0.1, 0.7], [1, still ? 1 : 0]);
  const textureOpacity = useTransform(progress, [0.05, 0.65], [0, still ? 0 : 1]);
  const textureScale = useTransform(progress, [0, 1], [zoom ? 1.15 : 1, 1]);
  const dim = useTransform(progress, [0.4, 1], [0, still ? 0 : 0.35]);
  const copyOpacity = useTransform(progress, [0.05, 0.35], [1, still ? 1 : 0]);
  const copyY = useTransform(progress, [0.05, 0.35], [0, zoom ? -40 : 0]);

  return (
    <div ref={track} className="relative h-[120svh] bg-[#121417] motion-reduce:h-svh md:h-[140svh] md:motion-reduce:h-svh">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Close clay texture, revealed underneath */}
        <motion.div aria-hidden="true" className="absolute inset-0" style={{ opacity: textureOpacity, scale: textureScale }}>
          {textureReady && <ClayPhoto {...CLAY.texture} />}
        </motion.div>

        {/* Drone view: scroll scale and fade on the outside, the slow Ken Burns loop inside */}
        <motion.div aria-hidden="true" className="absolute inset-0" style={{ scale: droneScale, opacity: droneOpacity }}>
          <motion.div
            className="h-full w-full"
            animate={still ? undefined : { scale: [1, 1.08] }}
            transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          >
            <ClayPhoto priority {...CLAY.hero} />
          </motion.div>
        </motion.div>

        {/* The photographs are charcoal duotones (court lines tinted a little toward the lime accent).
            A radial scrim, darkest behind the headline, keeps the text and the lime button clean. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 58% 46% at 50% 50%, rgba(13,15,17,0.8) 0%, rgba(13,15,17,0.52) 55%, rgba(13,15,17,0.12) 100%)" }}
        />
        {/* Deepens a little into the next section (capped so the texture stays visible) */}
        <motion.div aria-hidden="true" className="absolute inset-0 bg-[#121417]" style={{ opacity: dim }} />

        <motion.div className="relative z-10 flex h-full items-center justify-center" style={{ opacity: copyOpacity, y: copyY }}>
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
