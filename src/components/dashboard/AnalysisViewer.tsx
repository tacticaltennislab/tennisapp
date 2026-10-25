"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DIcons } from "@/components/dashboard/icons";
import FeedbackPanel from "@/components/dashboard/FeedbackPanel";
import { KIND_META, Panel } from "@/components/dashboard/ui";
import { formatClock, type Analysis, type Observation, type ObservationKind } from "@/lib/dashboardSample";

const RATES = [0.25, 0.5, 1, 1.5, 2];
const FPS_OPTIONS = [24, 25, 30, 50, 60];

function clockPrecise(t: number) {
  const s = Math.max(0, t);
  const cs = Math.floor((s % 1) * 100);
  return `${formatClock(s)}.${String(cs).padStart(2, "0")}`;
}

type Filter = "all" | ObservationKind;

export default function AnalysisViewer({ analysis }: { analysis: Analysis }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [rate, setRate] = useState(1);
  const [fps, setFps] = useState(30);
  const [loop, setLoop] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  // Some containers report no length; fall back to the sample length rather than break the slider.
  const duration = src && Number.isFinite(videoDuration) && videoDuration > 0 ? videoDuration : analysis.durationSec;

  // Free the object URL when the file changes or the page closes.
  useEffect(() => {
    return () => {
      if (src) URL.revokeObjectURL(src);
    };
  }, [src]);

  // Smooth time readout while playing (timeupdate alone is too coarse for frame work).
  useEffect(() => {
    if (!playing) return;
    const tick = () => {
      const v = videoRef.current;
      if (v) setTime(v.currentTime);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  const seek = useCallback((t: number) => {
    const v = videoRef.current;
    if (!v) return;
    const clamped = Math.min(Math.max(0, t), v.duration || t);
    v.currentTime = clamped;
    setTime(clamped);
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setSelected(null);
    if (v.paused) void v.play();
    else v.pause();
  }, []);

  const stepFrames = useCallback(
    (frames: number) => {
      const v = videoRef.current;
      if (!v) return;
      v.pause();
      seek(v.currentTime + frames / fps);
    },
    [fps, seek]
  );

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (!f.type.startsWith("video/")) {
      setLoadError("That file is not a video. Choose an MP4 or MOV file.");
      return;
    }
    setLoadError(null);
    setPlaying(false);
    setTime(0);
    setVideoDuration(0);
    setSelected(null);
    setFileName(f.name);
    setSrc(URL.createObjectURL(f));
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!src) return;
    const target = e.target as HTMLElement;
    if (target.tagName === "SELECT" || target.tagName === "INPUT") return;
    switch (e.key) {
      case " ":
      case "k":
        e.preventDefault();
        togglePlay();
        break;
      case ",":
        e.preventDefault();
        stepFrames(-1);
        break;
      case ".":
        e.preventDefault();
        stepFrames(1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        seek((videoRef.current?.currentTime ?? 0) - 5);
        break;
      case "ArrowRight":
        e.preventDefault();
        seek((videoRef.current?.currentTime ?? 0) + 5);
        break;
    }
  }

  const visible = useMemo(() => analysis.observations.filter((o) => o.t <= duration), [analysis.observations, duration]);
  const shown = filter === "all" ? visible : visible.filter((o) => o.kind === filter);

  // The observation to highlight: the one the user picked, otherwise the latest one passed.
  const current: Observation | null = useMemo(() => {
    if (selected) return visible.find((o) => o.id === selected) ?? null;
    if (!src || time <= 0) return null;
    return [...visible].reverse().find((o) => o.t <= time + 0.05) ?? null;
  }, [selected, src, time, visible]);

  const showPin = Boolean(src && current?.pin && (selected || Math.abs(time - current.t) < 2.5));

  function pick(o: Observation) {
    setSelected(o.id);
    if (src) {
      videoRef.current?.pause();
      seek(o.t);
    }
  }

  const frameNumber = Math.round(time * fps);
  const btn =
    "flex h-11 w-11 items-center justify-center rounded-lg text-ink transition-colors hover:bg-brand-100 disabled:opacity-40 disabled:hover:bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600";

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_26rem]">
      {/* Stage and transport. First on every screen. */}
      <div className="xl:col-start-1 xl:row-start-1">
      <div
        role="group"
        aria-label="Video player"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="overflow-hidden rounded-2xl border border-line bg-black outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
      >
        <div className={`relative aspect-video w-full bg-black ${src ? "" : "min-h-[17rem]"}`}>
          {src ? (
            <>
              <video
                ref={videoRef}
                src={src}
                playsInline
                preload="metadata"
                loop={loop}
                className="h-full w-full"
                onLoadedMetadata={(e) => setVideoDuration(e.currentTarget.duration)}
                onDurationChange={(e) => setVideoDuration(e.currentTarget.duration)}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onSeeked={(e) => setTime(e.currentTarget.currentTime)}
                onEnded={() => setPlaying(false)}
                onRateChange={(e) => setRate(e.currentTarget.playbackRate)}
                onClick={togglePlay}
              />
              {showPin && current?.pin && (
                <div
                  className="pointer-events-none absolute"
                  style={{ left: `${current.pin.x}%`, top: `${current.pin.y}%` }}
                >
                  <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full border-2 border-brand-600 bg-brand-600/20" />
                  <span className="absolute left-4 top-3 w-max max-w-[14rem] rounded-md bg-black/80 px-2.5 py-1.5 text-xs font-medium leading-snug text-white">
                    {current.title}
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-line-strong text-muted">
                <DIcons.analyses className="h-6 w-6" />
              </span>
              <div>
                <p className="text-base font-semibold text-ink">Try the viewer with a video from your device</p>
                <p className="mx-auto mt-1.5 max-w-md text-sm text-muted">
                  The prototype does not stream your uploaded files. The video plays on this device only and is
                  never uploaded.
                </p>
              </div>
              <label className="btn btn-primary cursor-pointer !min-h-10 !text-sm">
                Choose a video
                <input type="file" accept="video/*" onChange={onFile} className="sr-only" />
              </label>
              {loadError && (
                <p role="alert" className="text-sm text-[#ff8a7a]">
                  {loadError}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Timeline with the coach's markers */}
        <div className="border-t border-line bg-surface px-3 pb-3 pt-4 sm:px-5">
          <div className="relative">
            <input
              type="range"
              min={0}
              max={duration || 1}
              step={0.01}
              value={Math.min(time, duration)}
              disabled={!src}
              onChange={(e) => {
                setSelected(null);
                seek(Number(e.target.value));
              }}
              aria-label="Seek"
              aria-valuetext={`${clockPrecise(time)} of ${clockPrecise(duration)}`}
              className="h-2 w-full cursor-pointer accent-[#c8f135] disabled:cursor-not-allowed"
            />
            <div className="relative mx-2 mt-2 h-5" aria-label="Coach observations on the timeline" role="group">
              {visible.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => pick(o)}
                  aria-label={`${KIND_META[o.kind].label} at ${formatClock(o.t)}: ${o.title}`}
                  title={`${formatClock(o.t)} ${o.title}`}
                  className={`absolute top-0 h-5 w-5 -translate-x-1/2 rounded-full transition-transform hover:scale-125 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                    current?.id === o.id ? "scale-125" : ""
                  }`}
                  style={{ left: `${(o.t / (duration || 1)) * 100}%` }}
                >
                  <span className={`mx-auto block h-2.5 w-2.5 rounded-full ${KIND_META[o.kind].dot} ${current?.id === o.id ? "ring-2 ring-white" : ""}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Transport */}
          <div className="mt-1 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <div className="flex items-center">
              <button type="button" className={btn} disabled={!src} onClick={() => seek((videoRef.current?.currentTime ?? 0) - 5)} aria-label="Back 5 seconds" title="Back 5 seconds (Left arrow)">
                <DIcons.back5 />
              </button>
              <button type="button" className={btn} disabled={!src} onClick={() => stepFrames(-1)} aria-label="Previous frame" title="Previous frame (comma)">
                <DIcons.stepBack />
              </button>
              <button
                type="button"
                disabled={!src}
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                title="Play or pause (Space)"
                className="mx-1 flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-on-brand transition-colors hover:bg-brand-700 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                {playing ? <DIcons.pause /> : <DIcons.play />}
              </button>
              <button type="button" className={btn} disabled={!src} onClick={() => stepFrames(1)} aria-label="Next frame" title="Next frame (period)">
                <DIcons.stepForward />
              </button>
              <button type="button" className={btn} disabled={!src} onClick={() => seek((videoRef.current?.currentTime ?? 0) + 5)} aria-label="Forward 5 seconds" title="Forward 5 seconds (Right arrow)">
                <DIcons.forward5 />
              </button>
            </div>

            <p className="t-mono text-sm text-body" aria-live="off">
              <span className="text-ink">{clockPrecise(time)}</span>
              <span className="text-muted"> / {clockPrecise(duration)}</span>
              <span className="ml-3 text-muted">frame {frameNumber}</span>
            </p>

            <div className="flex items-center gap-2 text-xs text-muted">
              <label className="flex items-center gap-1.5">
                Speed
                <select
                  value={rate}
                  disabled={!src}
                  onChange={(e) => {
                    const r = Number(e.target.value);
                    setRate(r);
                    if (videoRef.current) videoRef.current.playbackRate = r;
                  }}
                  className="h-9 rounded-lg border border-line-strong bg-surface px-2 text-sm text-ink disabled:opacity-40"
                >
                  {RATES.map((r) => (
                    <option key={r} value={r}>
                      {r}x
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-1.5" title="Frame stepping assumes this frame rate. Check your camera's setting.">
                Step at
                <select
                  value={fps}
                  disabled={!src}
                  onChange={(e) => setFps(Number(e.target.value))}
                  className="h-9 rounded-lg border border-line-strong bg-surface px-2 text-sm text-ink disabled:opacity-40"
                >
                  {FPS_OPTIONS.map((f) => (
                    <option key={f} value={f}>
                      {f} fps
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                disabled={!src}
                aria-pressed={loop}
                onClick={() => setLoop((v) => !v)}
                className={`h-9 rounded-lg border px-3 text-sm font-medium transition-colors disabled:opacity-40 ${
                  loop ? "border-brand-600 text-brand-600" : "border-line-strong text-body hover:text-ink"
                }`}
              >
                Loop
              </button>
            </div>
          </div>

          <details className="mt-3 text-xs text-muted">
            <summary className="cursor-pointer select-none hover:text-ink">Keyboard shortcuts</summary>
            <p className="mt-2 leading-relaxed">
              With the player focused: <kbd className="rounded bg-chip px-1.5 py-0.5 text-ink">Space</kbd> play or pause,{" "}
              <kbd className="rounded bg-chip px-1.5 py-0.5 text-ink">,</kbd> and{" "}
              <kbd className="rounded bg-chip px-1.5 py-0.5 text-ink">.</kbd> step one frame,{" "}
              <kbd className="rounded bg-chip px-1.5 py-0.5 text-ink">Left</kbd> and{" "}
              <kbd className="rounded bg-chip px-1.5 py-0.5 text-ink">Right</kbd> jump 5 seconds. Frame stepping uses the
              frame rate selected above, so set it to match your camera.
            </p>
          </details>

          {src && (
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
              <span className="truncate">Playing {fileName} from this device.</span>
              <label className="cursor-pointer font-medium text-brand-600 underline underline-offset-4">
                Choose another
                <input type="file" accept="video/*" onChange={onFile} className="sr-only" />
              </label>
            </p>
          )}
        </div>
      </div>

      </div>

      {/* Feedback: second on phones (priorities before the long list), a sticky right column on wide screens. */}
      <div className="xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:sticky xl:top-24 xl:self-start">
        <FeedbackPanel analysis={analysis} />
      </div>

      {/* Observations */}
      <div className="xl:col-start-1 xl:row-start-2">
      <Panel
        title={`Coach observations (${visible.length})`}
        action={
          visible.length > 0 ? (
            <div role="group" aria-label="Filter observations" className="flex flex-wrap gap-1.5">
              {(["all", "strength", "issue", "tactical"] as Filter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    filter === f ? "bg-brand-600 text-on-brand" : "bg-chip text-body hover:text-ink"
                  }`}
                >
                  {f === "all" ? "All" : f === "issue" ? "Issues" : f === "strength" ? "Strengths" : "Tactical"}
                </button>
              ))}
            </div>
          ) : undefined
        }
      >
        {shown.length === 0 ? (
          <p className="px-5 py-8 text-sm text-muted">
            {analysis.observations.length === 0
              ? "Observations appear here, linked to moments in your video, once your coach has reviewed it."
              : "No observations in this filter."}
          </p>
        ) : (
          <ol className="divide-y divide-line">
            {shown.map((o) => {
              const meta = KIND_META[o.kind];
              const isCurrent = current?.id === o.id;
              return (
                <li key={o.id}>
                  <button
                    type="button"
                    onClick={() => pick(o)}
                    aria-current={isCurrent ? "true" : undefined}
                    className={`flex w-full gap-4 px-5 py-4 text-left transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-600 ${
                      isCurrent ? "bg-brand-50" : ""
                    }`}
                  >
                    <span className="t-mono mt-0.5 shrink-0 self-start rounded-md bg-chip px-2 py-1 text-xs font-semibold text-ink">
                      {formatClock(o.t)}
                    </span>
                    <span className="min-w-0">
                      <span className={`flex items-center gap-2 text-xs font-semibold ${meta.text}`}>
                        <span className={`h-2 w-2 rounded-full ${meta.dot}`} aria-hidden="true" />
                        {meta.label}
                      </span>
                      <span className="mt-1 block text-[0.9375rem] font-medium text-ink">{o.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-body">{o.text}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        )}
      </Panel>
      </div>
    </div>
  );
}
