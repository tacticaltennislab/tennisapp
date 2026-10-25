"use client";

import { useState } from "react";

/** Video review tile. Shows a labelled play button and only requests the
 * file once the visitor presses it, so nothing is downloaded (or billed as
 * Blob transfer) up front, and there is no blank black box to puzzle over. */
export default function ReviewMedia({ src, playLabel }: { src: string; playLabel: string }) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  // If the file is missing from storage, drop the tile rather than show a
  // dead player; the written review above it still stands.
  if (failed) return null;

  if (playing) {
    return (
      <video
        src={src}
        controls
        autoPlay
        playsInline
        onError={() => setFailed(true)}
        className="mt-4 w-full aspect-video bg-brand-900 rounded-2xl"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={playLabel}
      className="group mt-4 relative w-full aspect-video rounded-2xl bg-neutral-200 dark:bg-brand-900 overflow-hidden flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      {/* No poster frame is stored for uploaded videos, so the tile is a theme-aware placeholder:
          light grey with a dark play icon in light mode, the dark tile in dark mode. */}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/15 to-transparent dark:from-black/40" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-ink/60 text-ink transition-colors group-hover:bg-ink group-hover:text-background dark:border-white/60 dark:text-white dark:group-hover:bg-white dark:group-hover:text-black">
        <svg viewBox="0 0 24 24" className="h-6 w-6 translate-x-0.5" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span className="absolute bottom-3 left-4 text-xs font-medium text-ink/80 dark:text-white/80">{playLabel}</span>
    </button>
  );
}
