"use client";

import { useEffect, useState } from "react";
import { MAX_FRAMES, MAX_TOTAL_CHARS, buildImportFile, clock, type AnalysisResult, type Frame, type Lang } from "@/lib/aiAnalysis";

/** Admin only. The video stays on this computer: only small JPEG frames are sent, and nothing is stored. */

const INTERVALS = [3, 5, 10, 20];
const PRESETS = [
  { width: 768, quality: 0.62 },
  { width: 512, quality: 0.5 },
];

function loadVideo(url: string): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    const v = document.createElement("video");
    v.muted = true;
    v.preload = "auto";
    v.playsInline = true;
    v.onloadeddata = () => resolve(v);
    v.onerror = () => reject(new Error("The browser could not read this video. Try an MP4 (H.264) or MOV file."));
    v.src = url;
  });
}

function seekTo(v: HTMLVideoElement, t: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("The video did not respond while reading a frame.")), 10000);
    v.onseeked = () => {
      clearTimeout(timer);
      resolve();
    };
    v.currentTime = t;
  });
}

async function extract(url: string, times: number[], onProgress: (done: number) => void): Promise<Frame[]> {
  const video = await loadVideo(url);
  for (const preset of PRESETS) {
    const frames: Frame[] = [];
    const width = Math.min(preset.width, video.videoWidth);
    const height = Math.round((width * video.videoHeight) / video.videoWidth);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("This browser cannot read video frames.");
    let total = 0;
    for (const [i, t] of times.entries()) {
      await seekTo(video, t);
      ctx.drawImage(video, 0, 0, width, height);
      const data = canvas.toDataURL("image/jpeg", preset.quality).split(",")[1];
      total += data.length;
      frames.push({ t: Math.round(t * 100) / 100, data });
      onProgress(i + 1);
    }
    if (total <= MAX_TOTAL_CHARS) return frames;
    // Too big for one request: read them again, smaller.
  }
  throw new Error("The frames are too large to send. Choose a longer interval so there are fewer frames.");
}

function download(name: string, text: string) {
  const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

const CONF: Record<string, string> = { high: "bg-brand-50 text-brand-700", medium: "bg-chip text-body", low: "bg-amber-50 text-amber-800" };
const KIND: Record<string, string> = { strength: "Strength", issue: "Issue", tactical: "Tactical" };

export default function AiAnalysisTool() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [meta, setMeta] = useState({ player: "", opponent: "", surface: "", focus: "", lang: "en" as Lang });
  const [interval, setIntervalS] = useState(5);
  const [phase, setPhase] = useState<"idle" | "reading" | "asking" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => () => {
    if (url) URL.revokeObjectURL(url);
  }, [url]);

  // Frame times: evenly spaced, in the middle of each interval, never more than MAX_FRAMES.
  const frameCount = duration > 0 ? Math.min(MAX_FRAMES, Math.max(1, Math.floor(duration / interval))) : 0;
  const step = frameCount > 0 ? duration / frameCount : interval;
  const times = Array.from({ length: frameCount }, (_, i) => Math.min(duration - 0.1, step * i + step / 2));

  function choose(f: File | undefined) {
    if (!f) return;
    if (!f.type.startsWith("video/")) {
      setError("That file is not a video.");
      return;
    }
    setError(null);
    setResult(null);
    setPhase("idle");
    setDuration(0);
    setFile(f);
    setUrl((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(f);
    });
  }

  async function run() {
    if (!file || !url || frameCount === 0) return;
    setError(null);
    setResult(null);
    setPhase("reading");
    setProgress(0);
    try {
      const frames = await extract(url, times, setProgress);
      setPhase("asking");
      const res = await fetch("/api/ai-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frames, meta }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "The analysis failed. Try again.");
      setResult(data as AnalysisResult);
      setPhase("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "The analysis failed.");
      setPhase("idle");
    }
  }

  function exportJson() {
    if (!result || !file) return;
    const out = buildImportFile(result, meta, { fileName: file.name, durationSec: duration });
    download(`${(meta.player || "player").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-ai-suggestions.analysis.json`, JSON.stringify(out));
  }

  const busy = phase === "reading" || phase === "asking";
  const input = "w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600";

  return (
    <div className="space-y-6">
      <p role="note" className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Suggestions, not statistics.</strong> Claude sees a few still frames from the video. It cannot follow the ball, count points or tell where a shot
        landed, so there are no numbers here. Check every suggestion against the video before you use it. This page is visible to you only, the video stays on
        this computer, and nothing is saved or shown to clients.
      </p>

      <section className="rounded-2xl border border-line bg-surface p-5 space-y-4">
        <div>
          <label htmlFor="ai-video" className="block text-sm font-medium mb-1.5">
            Video
          </label>
          <input id="ai-video" type="file" accept="video/*" data-testid="ai-video" onChange={(e) => choose(e.target.files?.[0])} className={input} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Player to analyse
            <input className={`${input} mt-1.5 font-normal`} value={meta.player} onChange={(e) => setMeta({ ...meta, player: e.target.value })} />
          </label>
          <label className="block text-sm font-medium">
            Opponent
            <input className={`${input} mt-1.5 font-normal`} value={meta.opponent} onChange={(e) => setMeta({ ...meta, opponent: e.target.value })} />
          </label>
          <label className="block text-sm font-medium">
            Surface
            <input className={`${input} mt-1.5 font-normal`} placeholder="hard, clay, grass" value={meta.surface} onChange={(e) => setMeta({ ...meta, surface: e.target.value })} />
          </label>
          <label className="block text-sm font-medium">
            Language of the answer
            <select className={`${input} mt-1.5 font-normal`} value={meta.lang} onChange={(e) => setMeta({ ...meta, lang: e.target.value as Lang })}>
              <option value="en">English</option>
              <option value="pl">Polski</option>
            </select>
          </label>
        </div>
        <label className="block text-sm font-medium">
          What should it look at? <span className="font-normal text-muted">(optional)</span>
          <textarea
            rows={2}
            className={`${input} mt-1.5 font-normal`}
            placeholder="For example: the second serve, the position at the return, movement to the net"
            value={meta.focus}
            onChange={(e) => setMeta({ ...meta, focus: e.target.value })}
          />
        </label>

        <div>
          <p className="text-sm font-medium mb-1.5">One frame every</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Frame interval">
            {INTERVALS.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={interval === s}
                onClick={() => setIntervalS(s)}
                className={`rounded-lg border px-3 py-1.5 text-sm ${interval === s ? "border-brand-600 bg-brand-50 font-semibold" : "border-line"}`}
              >
                {s} seconds
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted" data-testid="ai-plan">
            {duration > 0
              ? `${frameCount} frame${frameCount === 1 ? "" : "s"} from a video of ${clock(duration)}${frameCount === MAX_FRAMES && duration / interval > MAX_FRAMES ? `, so about one every ${Math.round(step)} seconds (the most that can be sent is ${MAX_FRAMES})` : ""}.`
              : file
                ? "Reading the video length."
                : "Choose a video first."}
          </p>
        </div>

        {/* Hidden player only to read the length; the visible player is in the results. */}
        {url && <video src={url} className="hidden" preload="metadata" onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} />}

        <button type="button" className="btn btn-primary" onClick={run} disabled={busy || frameCount === 0} data-testid="ai-run">
          {phase === "reading" ? `Reading frames ${progress} of ${frameCount}` : phase === "asking" ? "Waiting for Claude (this can take a minute)" : "Analyse"}
        </button>
        {error && (
          <p role="alert" className="text-sm text-red-700" data-testid="ai-error">
            {error}
          </p>
        )}
      </section>

      {result && url && (
        <section aria-label="Result" className="space-y-6" data-testid="ai-result">
          <video src={url} controls className="w-full max-w-3xl rounded-xl bg-black" />

          <div>
            <h2 className="text-lg font-semibold">Moments to check ({result.suggestions.length})</h2>
            {result.suggestions.length === 0 && <p className="mt-2 text-sm text-muted">Nothing clear enough to suggest from these frames.</p>}
            <ol className="mt-3 space-y-3">
              {result.suggestions.map((s, i) => (
                <li key={i} className="rounded-xl border border-line bg-surface p-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <button
                      type="button"
                      className="t-mono rounded-md bg-chip px-2 py-1 font-semibold hover:bg-brand-100"
                      onClick={() => {
                        const v = document.querySelector<HTMLVideoElement>("[data-testid=ai-result] video");
                        if (v) {
                          v.currentTime = s.time;
                          v.pause();
                        }
                      }}
                    >
                      {clock(s.time)}
                    </button>
                    <span className="font-semibold">{KIND[s.kind]}</span>
                    <span className={`rounded-full px-2 py-0.5 ${CONF[s.confidence]}`}>{s.confidence} confidence</span>
                  </div>
                  <p className="mt-2 font-medium">{s.title}</p>
                  <p className="mt-1 text-sm text-body">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>

          {result.limits && (
            <div className="rounded-xl bg-chip p-4 text-sm">
              <p className="font-semibold">What these frames could not show</p>
              <p className="mt-1 text-body">{result.limits}</p>
            </div>
          )}

          <div className="rounded-2xl border border-line bg-surface p-5 space-y-4 text-sm">
            <h2 className="text-lg font-semibold">Draft summary</h2>
            {result.summary.priorities.length > 0 && (
              <div>
                <p className="font-semibold">Priorities</p>
                <ol className="mt-1 list-decimal pl-5">{result.summary.priorities.map((p, i) => <li key={i}>{p}</li>)}</ol>
              </div>
            )}
            {result.summary.strengths.length > 0 && (
              <div>
                <p className="font-semibold">Strengths</p>
                <ul className="mt-1 list-disc pl-5">{result.summary.strengths.map((p, i) => <li key={i}>{p}</li>)}</ul>
              </div>
            )}
            {result.summary.issues.length > 0 && (
              <div>
                <p className="font-semibold">Technical issues</p>
                <ul className="mt-1 space-y-1">{result.summary.issues.map((p, i) => <li key={i}><strong>{p.title}.</strong> {p.detail}</li>)}</ul>
              </div>
            )}
            {result.summary.tactical.length > 0 && (
              <div>
                <p className="font-semibold">Tactical things to check</p>
                <ul className="mt-1 list-disc pl-5">{result.summary.tactical.map((p, i) => <li key={i}>{p}</li>)}</ul>
              </div>
            )}
            {result.summary.drills.length > 0 && (
              <div>
                <p className="font-semibold">Drills</p>
                <ul className="mt-1 space-y-1">{result.summary.drills.map((p, i) => <li key={i}><strong>{p.name}.</strong> {p.detail}</li>)}</ul>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="btn btn-primary" onClick={exportJson} data-testid="ai-export">
              Download as analysis JSON
            </button>
            <p className="text-xs text-muted max-w-xl">
              Import this file in a submission&apos;s report editor (Import analysis JSON). Every note title starts with [AI] so you can see what you have not yet
              checked. Nothing reaches the client until you publish.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
