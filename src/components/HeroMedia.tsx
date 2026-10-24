"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { SiteVideo } from "@/lib/siteMedia";

/**
 * The poster frame is real markup from the first byte (it is the LCP image).
 * The video is only added on large screens, when the visitor has not asked
 * for reduced motion or data saving, and only after the page has loaded, so
 * phones never download it and desktops never wait for it.
 */
export default function HeroMedia({ video, caption }: { video: SiteVideo; caption: string }) {
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const calm = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const lean = Boolean(conn?.saveData) || /(^|-)2g$/.test(conn?.effectiveType ?? "");
    if (!wide || !calm || lean) return;

    const start = () => setEnabled(true);
    if (document.readyState === "complete") {
      const id = window.setTimeout(start, 400);
      return () => window.clearTimeout(id);
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  // Pause when scrolled out of view or the tab is hidden: no wasted decoding.
  useEffect(() => {
    const v = ref.current;
    if (!enabled || !v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) void v.play().catch(() => undefined);
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [enabled]);

  return (
    <figure>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-black sm:aspect-[16/11]">
        <Image
          src={video.poster.src}
          alt={video.alt}
          width={video.poster.width}
          height={video.poster.height}
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {enabled && (
          <video
            ref={ref}
            src={video.mp4}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => setPlaying(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>
      <figcaption className="mt-3 text-xs text-white/60">
        {caption}{" "}
        <a
          href={video.credit.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-white"
        >
          {video.credit.creator} / Pexels
        </a>
      </figcaption>
    </figure>
  );
}
