"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AnalysisViewer from "@/components/dashboard/AnalysisViewer";
import { KIND_META } from "@/components/dashboard/ui";
import { chartingLines, parseAnalysisImport, type Charting, type DraftSummary } from "@/lib/analysisImport";
import { formatClock, type Analysis, type Observation, type ObservationKind } from "@/lib/analysisTypes";
import { checkDuration } from "@/lib/creditCost";

/** The coach report editor: watch, mark moments, write the summary, preview as the client sees it, publish. */

export interface EditorInitial {
  observations: Observation[];
  summary: DraftSummary;
  charting?: Charting;
}

export interface EditorSubmission {
  id: string;
  /** The analysis as the client dashboard would show it, with drafts included. */
  analysis: Analysis;
  playerName: string;
  /** pending | in_review | reviewed | rejected */
  status: string;
  analysisType: string | null;
  declaredMinutes: number | null;
  actualDurationSec: number | null;
  /** Credits this submission has cost so far (null if it was sent before credits existed). */
  creditsCharged: number | null;
  isAdmin: boolean;
}

interface Obs {
  id: string;
  t: number;
  kind: ObservationKind;
  title: string;
  text: string;
  pin?: { x: number; y: number };
  drawing?: string;
}

interface Summary {
  strengths: string;
  issues: { title: string; detail: string }[];
  tactical: string;
  priorities: [string, string, string];
  drills: { name: string; detail: string }[];
}

const RATES = [0.25, 0.5, 1];
const FPS_OPTIONS = [24, 25, 30, 50, 60];
/** Route handlers on Vercel accept about 4.5 MB; stay under it and say so instead of failing. */
const MAX_PAYLOAD_CHARS = 4_000_000;

const lines = (v: string) => v.split("\n").map((s) => s.trim()).filter(Boolean);

function clock(t: number) {
  const s = Math.max(0, t);
  return `${formatClock(s)}.${String(Math.floor((s % 1) * 100)).padStart(2, "0")}`;
}

function toSummary(s: DraftSummary): Summary {
  const p = s.priorities;
  return {
    strengths: s.strengths.join("\n"),
    issues: s.issues.map((i) => ({ ...i })),
    tactical: s.tactical.join("\n"),
    priorities: [p[0] ?? "", p[1] ?? "", p[2] ?? ""],
    drills: s.drills.map((d) => ({ ...d })),
  };
}

function fromSummary(s: Summary): DraftSummary {
  return {
    strengths: lines(s.strengths),
    issues: s.issues.filter((i) => i.title.trim()).map((i) => ({ title: i.title.trim(), detail: i.detail.trim() })),
    tactical: lines(s.tactical),
    priorities: s.priorities.map((p) => p.trim()).filter(Boolean),
    drills: s.drills.filter((d) => d.name.trim()).map((d) => ({ name: d.name.trim(), detail: d.detail.trim() })),
  };
}

const uid = () => `o-${Math.random().toString(36).slice(2, 10)}`;

export default function ReportEditor({ submission, initial, videoSrc }: { submission: EditorSubmission; initial: EditorInitial; videoSrc: string }) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const titleRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [observations, setObservations] = useState<Obs[]>(() => initial.observations.map((o) => ({ ...o })));
  const [summary, setSummary] = useState<Summary>(() => toSummary(initial.summary));
  const [charting, setCharting] = useState<Charting | undefined>(initial.charting);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState(submission.status);
  const [busy, setBusy] = useState<"save" | "publish" | "charge" | null>(null);
  const [notice, setNotice] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [confirmPublish, setConfirmPublish] = useState(false);
  const [pendingImport, setPendingImport] = useState<{ obs: Obs[]; summary: Summary; charting?: Charting; text: string } | null>(null);

  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);
  const [fps, setFps] = useState(30);

  const [creditsCharged, setCreditsCharged] = useState(submission.creditsCharged);

  const edit = useCallback(<T,>(setter: (fn: (cur: T) => T) => void, fn: (cur: T) => T) => {
    setter(fn);
    setDirty(true);
    setNotice(null);
    setConfirmPublish(false);
  }, []);

  // The video can load its metadata before React hydrates, and then its loadedmetadata event is missed.
  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 1 && Number.isFinite(v.duration)) setDuration(v.duration);
  }, [tab]);

  // Warn before leaving with unsaved work.
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  // Smooth time readout while playing.
  useEffect(() => {
    if (!playing) return;
    const tick = () => {
      if (videoRef.current) setTime(videoRef.current.currentTime);
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
    if (v.paused) void v.play();
    else v.pause();
  }, []);

  const step = useCallback(
    (frames: number) => {
      const v = videoRef.current;
      if (!v) return;
      v.pause();
      seek(v.currentTime + frames / fps);
    },
    [fps, seek]
  );

  const setSpeed = useCallback((r: number) => {
    setRate(r);
    if (videoRef.current) videoRef.current.playbackRate = r;
  }, []);

  const addAtCurrentTime = useCallback(() => {
    const v = videoRef.current;
    const t = Math.round((v ? v.currentTime : time) * 100) / 100;
    const id = uid();
    v?.pause();
    edit<Obs[]>(setObservations, (cur) => [...cur, { id, t, kind: "issue" as const, title: "", text: "" }].sort((a, b) => a.t - b.t));
    setActiveId(id);
    // Move the cursor to the new title field so the coach can type straight away.
    setTimeout(() => titleRefs.current[id]?.focus(), 30);
  }, [edit, time]);

  // Keyboard: arrows step frames, Space plays, N adds an observation. Ignored while typing.
  useEffect(() => {
    if (tab !== "edit") return;
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (e.shiftKey) seek((videoRef.current?.currentTime ?? 0) - 1);
        else step(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (e.shiftKey) seek((videoRef.current?.currentTime ?? 0) + 1);
        else step(1);
      } else if (e.key === " " && el.tagName !== "BUTTON") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        addAtCurrentTime();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tab, step, seek, togglePlay, addAtCurrentTime]);

  function placePin(e: React.MouseEvent<HTMLDivElement>) {
    if (!activeId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100)) * 10) / 10;
    const y = Math.round(Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100)) * 10) / 10;
    edit<Obs[]>(setObservations, (cur) => cur.map((o) => (o.id === activeId ? { ...o, pin: { x, y } } : o)));
  }

  const patchObs = (id: string, patch: Partial<Obs>) =>
    edit<Obs[]>(setObservations, (cur) => cur.map((o) => (o.id === id ? { ...o, ...patch } : o)).sort((a, b) => a.t - b.t));

  const draft = useMemo(() => fromSummary(summary), [summary]);

  // What the client will see: the same Analysis shape and the same viewer as the dashboard.
  const previewAnalysis: Analysis = useMemo(
    () => ({
      ...submission.analysis,
      status: "reviewed",
      coach: submission.analysis.coach ?? "You",
      reviewedAt: submission.analysis.reviewedAt ?? "today",
      observations: observations.map((o) => ({
        id: o.id,
        t: o.t,
        kind: o.kind,
        title: o.title.trim() || "(no title)",
        text: o.text,
        pin: o.pin,
        drawing: o.drawing,
      })),
      feedback: {
        strengths: draft.strengths,
        issues: draft.issues,
        tactical: draft.tactical,
        priorities: draft.priorities,
        drills: draft.drills,
      },
    }),
    [submission.analysis, observations, draft]
  );

  // ---- Duration check -------------------------------------------------------------------------------
  const playerSeconds = duration > 0 ? duration : null;
  const check =
    playerSeconds != null && creditsCharged != null
      ? checkDuration({
          analysisType: submission.analysisType,
          declaredMinutes: submission.declaredMinutes,
          actualDurationSec: playerSeconds,
          creditsCharged,
        })
      : null;

  async function applyCharge() {
    if (playerSeconds == null) return;
    setBusy("charge");
    setNotice(null);
    try {
      const res = await fetch(`/api/submissions/${submission.id}/charge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actualDurationSec: playerSeconds }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setNotice({ kind: "error", text: data.error || "The charge could not be applied." });
        return;
      }
      setCreditsCharged((c) => (c ?? 0) + (data.applied ?? 0));
      setNotice({
        kind: "ok",
        text:
          data.applied > 0
            ? `Charged ${data.applied} more credit${data.applied === 1 ? "" : "s"}.`
            : `Refunded ${-data.applied} credit${data.applied === -1 ? "" : "s"}.`,
      });
      router.refresh();
    } catch {
      setNotice({ kind: "error", text: "The charge could not be applied. Check your connection." });
    } finally {
      setBusy(null);
    }
  }

  // ---- Save, publish ----------------------------------------------------------------------------------
  function payload() {
    return JSON.stringify({
      observations: observations.map((o) => ({ t: o.t, kind: o.kind, title: o.title, text: o.text, pin: o.pin, drawing: o.drawing })),
      summary: draft,
      charting,
    });
  }

  async function save(): Promise<boolean> {
    const untitled = observations.find((o) => !o.title.trim());
    if (untitled) {
      setActiveId(untitled.id);
      setNotice({ kind: "error", text: `The observation at ${clock(untitled.t)} needs a title.` });
      return false;
    }
    const body = payload();
    if (body.length > MAX_PAYLOAD_CHARS) {
      setNotice({ kind: "error", text: "The report is too large to save (drawings). Remove some drawings and try again." });
      return false;
    }
    const res = await fetch(`/api/submissions/${submission.id}/report`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setNotice({ kind: "error", text: data.error || "The draft could not be saved." });
      return false;
    }
    setDirty(false);
    setStatus((s) => (s === "pending" ? "in_review" : s));
    return true;
  }

  async function onSave() {
    setBusy("save");
    setNotice(null);
    try {
      if (await save()) setNotice({ kind: "ok", text: "Draft saved. The client cannot see it yet." });
    } catch {
      setNotice({ kind: "error", text: "The draft could not be saved. Check your connection." });
    } finally {
      setBusy(null);
    }
  }

  async function onPublish() {
    setBusy("publish");
    setNotice(null);
    setConfirmPublish(false);
    try {
      if (!(await save())) return;
      const res = await fetch(`/api/submissions/${submission.id}/publish`, { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setNotice({ kind: "error", text: data.error || "The analysis could not be published." });
        return;
      }
      setStatus("reviewed");
      setNotice({
        kind: "ok",
        text: data.firstPublish ? "Published. The client has been notified by email and push." : "Updated. The client sees the latest version.",
      });
      router.refresh();
    } catch {
      setNotice({ kind: "error", text: "The analysis could not be published. Check your connection." });
    } finally {
      setBusy(null);
    }
  }

  // ---- Import ---------------------------------------------------------------------------------------------
  function applyImport(p: { obs: Obs[]; summary: Summary; charting?: Charting }) {
    setObservations(p.obs);
    setSummary(p.summary);
    setCharting(p.charting);
    setActiveId(null);
    setDirty(true);
    setPendingImport(null);
  }

  async function onImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setNotice(null);
    let raw: unknown;
    try {
      raw = JSON.parse(await file.text());
    } catch {
      setNotice({ kind: "error", text: "That file is not valid JSON." });
      return;
    }
    const result = parseAnalysisImport(raw);
    if (!result.ok) {
      setNotice({ kind: "error", text: result.error });
      return;
    }
    const { data, warnings } = result;
    const extra = [...warnings];
    if (data.videoDurationSec != null && duration > 0 && Math.abs(data.videoDurationSec - duration) > 2) {
      extra.push(
        `The file was made for a video of ${clock(data.videoDurationSec)}, but this video is ${clock(duration)}. Check that the times line up.`
      );
    }
    const imported = {
      obs: data.observations.map((o) => ({ ...o, id: uid() })),
      summary: toSummary(data.summary),
      charting: data.charting,
    };
    const text = `Imported ${data.observations.length} observation${data.observations.length === 1 ? "" : "s"}${
      data.charting ? " and match charting" : ""
    }. Review it, then save.${extra.length ? ` ${extra.join(" ")}` : ""}`;
    const hasWork = observations.length > 0 || draft.priorities.length + draft.strengths.length + draft.tactical.length + draft.issues.length > 0;
    if (hasWork) {
      setPendingImport({ ...imported, text });
    } else {
      applyImport(imported);
      setNotice({ kind: "ok", text });
    }
  }

  // ---- Render ---------------------------------------------------------------------------------------------
  const input = "w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600";
  const small = "rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-body transition-colors hover:border-brand-600 hover:text-ink disabled:opacity-50";
  const ctl = "flex h-10 min-w-10 items-center justify-center rounded-lg border border-line px-2 text-sm font-medium text-ink transition-colors hover:border-brand-600 disabled:opacity-50";
  const active = observations.find((o) => o.id === activeId) ?? null;
  const nearby = observations.filter((o) => o.pin && (o.id === activeId || Math.abs(time - o.t) < 1.5));
  const published = status === "reviewed";
  const chartLines = chartingLines(charting);

  return (
    <div className="space-y-5">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-3 sm:p-4">
        <div role="tablist" aria-label="Editor view" className="flex rounded-lg bg-chip p-1">
          {(["edit", "preview"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${tab === t ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink"}`}
            >
              {t === "edit" ? "Edit" : "Preview as client"}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-chip px-2.5 py-1 text-xs font-semibold text-body">
            {published ? "Published" : status === "in_review" ? "Draft" : status === "rejected" ? "Rejected" : "Not started"}
            {dirty ? " · unsaved changes" : ""}
          </span>
          <input ref={fileRef} type="file" accept="application/json,.json" onChange={onImportFile} className="sr-only" aria-label="Import analysis JSON file" />
          <button type="button" className={small} onClick={() => fileRef.current?.click()} disabled={busy !== null || status === "rejected"}>
            Import analysis JSON
          </button>
          <button type="button" className={small} onClick={onSave} disabled={busy !== null || status === "rejected"}>
            {busy === "save" ? "Saving" : "Save draft"}
          </button>
          {confirmPublish ? (
            <span className="flex items-center gap-2">
              <button type="button" className="btn btn-primary !min-h-9 !px-4 !text-sm" onClick={onPublish} disabled={busy !== null}>
                {published ? "Confirm update" : "Confirm: publish and notify the player"}
              </button>
              <button type="button" className={small} onClick={() => setConfirmPublish(false)}>
                Cancel
              </button>
            </span>
          ) : (
            <button
              type="button"
              className="btn btn-primary !min-h-9 !px-4 !text-sm"
              onClick={() => setConfirmPublish(true)}
              disabled={busy !== null || status === "rejected"}
            >
              {busy === "publish" ? "Publishing" : published ? "Update published analysis" : "Publish"}
            </button>
          )}
        </div>
      </div>

      {notice && (
        <p
          role={notice.kind === "error" ? "alert" : "status"}
          className={`rounded-lg px-4 py-3 text-sm ${notice.kind === "error" ? "bg-red-50 text-red-700" : "bg-brand-50 text-brand-700"}`}
        >
          {notice.text}
        </p>
      )}

      {pendingImport && (
        <div role="alertdialog" aria-label="Replace the current draft" className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-medium">Replace the current draft with the imported file?</p>
          <p className="mt-1">{pendingImport.text}</p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="btn btn-primary !min-h-9 !px-4 !text-sm"
              onClick={() => {
                const { text, ...rest } = pendingImport;
                applyImport(rest);
                setNotice({ kind: "ok", text });
              }}
            >
              Replace draft
            </button>
            <button type="button" className={small} onClick={() => setPendingImport(null)}>
              Keep my draft
            </button>
          </div>
        </div>
      )}

      {status === "rejected" && (
        <p role="status" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          This submission was rejected and its credits were refunded, so it cannot be edited or published.
        </p>
      )}

      {tab === "preview" ? (
        <div>
          <p className="mb-3 text-sm text-muted">
            This is exactly what {submission.playerName} sees in their dashboard once you publish, including your unsaved changes.
          </p>
          <div className="theme-dashboard rounded-2xl bg-background p-4 sm:p-6">
            <AnalysisViewer analysis={previewAnalysis} videoSrc={videoSrc} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_26rem]">
          {/* Player */}
          <div className="space-y-4 xl:col-start-1 xl:row-start-1">
            <div className="overflow-hidden rounded-2xl border border-line bg-black">
              <div
                className={`relative aspect-video w-full select-none ${active ? "cursor-crosshair" : ""}`}
                onClick={placePin}
                data-testid="stage"
              >
                <video
                  ref={videoRef}
                  src={videoSrc}
                  playsInline
                  preload="metadata"
                  className="pointer-events-none h-full w-full"
                  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                  onDurationChange={(e) => setDuration(e.currentTarget.duration)}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onSeeked={(e) => setTime(e.currentTarget.currentTime)}
                  onEnded={() => setPlaying(false)}
                />
                {nearby.map((o) => (
                  <div key={o.id} className="pointer-events-none absolute" style={{ left: `${o.pin!.x}%`, top: `${o.pin!.y}%` }}>
                    <span
                      className={`absolute -left-3 -top-3 h-6 w-6 rounded-full border-2 ${o.id === activeId ? "border-white bg-white/30" : "border-brand-600 bg-brand-600/20"}`}
                    />
                    <span className="absolute left-4 top-3 w-max max-w-[14rem] rounded-md bg-black/80 px-2.5 py-1.5 text-xs font-medium leading-snug text-white">
                      {o.title || "(no title)"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-line bg-surface px-3 pb-3 pt-4 sm:px-4">
                <div className="relative">
                  <input
                    type="range"
                    min={0}
                    max={duration || 1}
                    step={0.01}
                    value={Math.min(time, duration || 1)}
                    onChange={(e) => seek(Number(e.target.value))}
                    aria-label="Seek"
                    className="h-2 w-full cursor-pointer accent-[#4d7c0f]"
                  />
                  <div className="relative mx-2 mt-2 h-5" role="group" aria-label="Observations on the timeline">
                    {observations.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => {
                          setActiveId(o.id);
                          videoRef.current?.pause();
                          seek(o.t);
                        }}
                        title={`${clock(o.t)} ${o.title}`}
                        aria-label={`${KIND_META[o.kind].label} at ${clock(o.t)}: ${o.title || "no title"}`}
                        className="absolute top-0 h-5 w-5 -translate-x-1/2"
                        style={{ left: `${(o.t / (duration || 1)) * 100}%` }}
                      >
                        <span className={`mx-auto block h-2.5 w-2.5 rounded-full ${KIND_META[o.kind].dot} ${o.id === activeId ? "ring-2 ring-ink" : ""}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button type="button" className={ctl} onClick={() => step(-1)} aria-label="Previous frame" title="Previous frame (Left arrow)">
                    ←
                  </button>
                  <button type="button" className={ctl} onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} title="Play or pause (Space)">
                    {playing ? "Pause" : "Play"}
                  </button>
                  <button type="button" className={ctl} onClick={() => step(1)} aria-label="Next frame" title="Next frame (Right arrow)">
                    →
                  </button>
                  <span className="t-mono ml-1 text-sm text-body" data-testid="clock">
                    <span className="text-ink">{clock(time)}</span> / {clock(duration)}
                  </span>
                  <div className="ml-auto flex items-center gap-1.5" role="group" aria-label="Playback speed">
                    {RATES.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setSpeed(r)}
                        aria-pressed={rate === r}
                        className={`h-10 rounded-lg border px-3 text-sm font-medium ${rate === r ? "border-brand-600 bg-brand-50 text-ink" : "border-line text-body hover:text-ink"}`}
                      >
                        {r}x
                      </button>
                    ))}
                    <label className="ml-1 flex items-center gap-1 text-xs text-muted" title="Frame stepping assumes this frame rate">
                      Step at
                      <select value={fps} onChange={(e) => setFps(Number(e.target.value))} className="h-10 rounded-lg border border-line bg-surface px-1.5 text-sm text-ink">
                        {FPS_OPTIONS.map((f) => (
                          <option key={f} value={f}>
                            {f} fps
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button type="button" className="btn btn-primary !min-h-10 !px-4 !text-sm" onClick={addAtCurrentTime} disabled={status === "rejected"}>
                    Add observation at current time <kbd className="ml-1 rounded bg-black/10 px-1.5 text-xs">N</kbd>
                  </button>
                  <p className="text-xs text-muted">
                    Arrow keys step one frame (hold Shift for one second), Space plays, N adds an observation. Select an observation, then click the video to pin it.
                  </p>
                </div>
              </div>
            </div>

            {/* Declared length against the real one */}
            <section aria-labelledby="duration-heading" className="rounded-2xl border border-line bg-surface p-4 text-sm">
              <h2 id="duration-heading" className="font-semibold text-ink">
                Video length and credits
              </h2>
              <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-muted">Declared by the client</dt>
                  <dd className="t-mono text-ink" data-testid="declared">
                    {submission.analysisType === "stroke"
                      ? "Stroke analysis (length does not change the cost)"
                      : submission.declaredMinutes != null
                        ? `${Math.round(submission.declaredMinutes)} min`
                        : "Not stated"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Read by the player</dt>
                  <dd className="t-mono text-ink" data-testid="actual">
                    {playerSeconds != null ? `${clock(playerSeconds)} (${(playerSeconds / 60).toFixed(1)} min)` : "Loading"}
                  </dd>
                </div>
              </dl>
              {creditsCharged == null ? (
                <p className="mt-3 text-muted">This video was sent before credits existed, so there is no charge to check.</p>
              ) : check && check.difference !== 0 ? (
                <div className="mt-3 rounded-lg border border-amber-300 bg-amber-50 p-3 text-amber-900" data-testid="mismatch">
                  <p>
                    The real length costs <strong>{check.creditsActual}</strong> credit{check.creditsActual === 1 ? "" : "s"}; the client was charged{" "}
                    <strong>{check.creditsCharged}</strong>.{" "}
                    {check.difference > 0
                      ? `${check.difference} more credit${check.difference === 1 ? "" : "s"} should be charged.`
                      : `${-check.difference} credit${check.difference === -1 ? "" : "s"} should be refunded.`}
                  </p>
                  {submission.isAdmin ? (
                    <button type="button" className="btn btn-primary mt-3 !min-h-9 !px-4 !text-sm" onClick={applyCharge} disabled={busy !== null}>
                      {busy === "charge" ? "Applying" : "Apply correct charge"}
                    </button>
                  ) : (
                    <p className="mt-2 text-xs">Only an admin can apply the correction.</p>
                  )}
                </div>
              ) : check ? (
                <p className="mt-3 text-muted" data-testid="match">
                  {check.creditsCharged} credit{check.creditsCharged === 1 ? "" : "s"} charged, which matches the real length.
                </p>
              ) : null}
            </section>

            {/* Summary */}
            <section aria-labelledby="summary-heading" className="space-y-5 rounded-2xl border border-line bg-surface p-4 sm:p-5">
              <h2 id="summary-heading" className="text-base font-semibold text-ink">
                Summary for the client
              </h2>

              <fieldset>
                <legend className="mb-1.5 text-sm font-medium text-ink">Top 3 priorities, in order</legend>
                <div className="space-y-2">
                  {summary.priorities.map((p, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="t-mono flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-600 text-sm font-bold text-on-brand">{i + 1}</span>
                      <input
                        className={input}
                        aria-label={`Priority ${i + 1}`}
                        value={p}
                        onChange={(e) =>
                          edit<Summary>(setSummary, (cur) => {
                            const next = [...cur.priorities] as Summary["priorities"];
                            next[i] = e.target.value;
                            return { ...cur, priorities: next };
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="strengths" className="mb-1.5 block text-sm font-medium text-ink">
                  Strengths <span className="font-normal text-muted">(one per line)</span>
                </label>
                <textarea id="strengths" rows={4} className={input} value={summary.strengths} onChange={(e) => edit<Summary>(setSummary, (c) => ({ ...c, strengths: e.target.value }))} />
              </div>

              <div>
                <p className="mb-1.5 text-sm font-medium text-ink">Technical issues</p>
                <div className="space-y-3">
                  {summary.issues.map((it, i) => (
                    <div key={i} className="rounded-lg border border-line p-3">
                      <input
                        className={input}
                        placeholder="Issue"
                        aria-label={`Issue ${i + 1} title`}
                        value={it.title}
                        onChange={(e) => edit<Summary>(setSummary, (c) => ({ ...c, issues: c.issues.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)) }))}
                      />
                      <textarea
                        rows={2}
                        className={`${input} mt-2`}
                        placeholder="What is happening and how to fix it"
                        aria-label={`Issue ${i + 1} detail`}
                        value={it.detail}
                        onChange={(e) => edit<Summary>(setSummary, (c) => ({ ...c, issues: c.issues.map((x, j) => (j === i ? { ...x, detail: e.target.value } : x)) }))}
                      />
                      <button type="button" className="mt-2 text-xs text-muted underline underline-offset-4 hover:text-ink" onClick={() => edit<Summary>(setSummary, (c) => ({ ...c, issues: c.issues.filter((_, j) => j !== i) }))}>
                        Remove issue
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" className={`${small} mt-2`} onClick={() => edit<Summary>(setSummary, (c) => ({ ...c, issues: [...c.issues, { title: "", detail: "" }] }))}>
                  Add technical issue
                </button>
              </div>

              <div>
                <label htmlFor="tactical" className="mb-1.5 block text-sm font-medium text-ink">
                  Tactical notes <span className="font-normal text-muted">(one per line)</span>
                </label>
                <textarea id="tactical" rows={4} className={input} value={summary.tactical} onChange={(e) => edit<Summary>(setSummary, (c) => ({ ...c, tactical: e.target.value }))} />
                {chartLines.length > 0 && (
                  <div className="mt-2 rounded-lg bg-chip p-3 text-xs text-body">
                    <p className="font-medium text-ink">Match charting from the imported file</p>
                    <ul className="mt-1 list-disc pl-4">
                      {chartLines.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="mt-2 underline underline-offset-4"
                      onClick={() =>
                        edit<Summary>(setSummary, (c) => {
                          const have = new Set(lines(c.tactical));
                          const add = chartLines.filter((l) => !have.has(l));
                          return { ...c, tactical: [...lines(c.tactical), ...add].join("\n") };
                        })
                      }
                    >
                      Add these to the tactical notes
                    </button>
                  </div>
                )}
              </div>

              <div>
                <p className="mb-1.5 text-sm font-medium text-ink">Drills</p>
                <div className="space-y-3">
                  {summary.drills.map((d, i) => (
                    <div key={i} className="rounded-lg border border-line p-3">
                      <input
                        className={input}
                        placeholder="Drill name"
                        aria-label={`Drill ${i + 1} name`}
                        value={d.name}
                        onChange={(e) => edit<Summary>(setSummary, (c) => ({ ...c, drills: c.drills.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)) }))}
                      />
                      <textarea
                        rows={2}
                        className={`${input} mt-2`}
                        placeholder="How to do it"
                        aria-label={`Drill ${i + 1} detail`}
                        value={d.detail}
                        onChange={(e) => edit<Summary>(setSummary, (c) => ({ ...c, drills: c.drills.map((x, j) => (j === i ? { ...x, detail: e.target.value } : x)) }))}
                      />
                      <button type="button" className="mt-2 text-xs text-muted underline underline-offset-4 hover:text-ink" onClick={() => edit<Summary>(setSummary, (c) => ({ ...c, drills: c.drills.filter((_, j) => j !== i) }))}>
                        Remove drill
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" className={`${small} mt-2`} onClick={() => edit<Summary>(setSummary, (c) => ({ ...c, drills: [...c.drills, { name: "", detail: "" }] }))}>
                  Add drill
                </button>
              </div>
            </section>
          </div>

          {/* Observations */}
          <aside aria-labelledby="obs-heading" className="space-y-3 xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto xl:self-start xl:sticky xl:top-20">
            <div className="flex items-center justify-between">
              <h2 id="obs-heading" className="text-base font-semibold text-ink">
                Observations ({observations.length})
              </h2>
            </div>
            {submission.analysis.playerNote && (
              <p className="rounded-lg bg-chip p-3 text-sm text-body">
                <span className="font-medium text-ink">Client asked:</span> &ldquo;{submission.analysis.playerNote}&rdquo;
              </p>
            )}
            {observations.length === 0 && (
              <p className="rounded-lg border border-dashed border-line p-4 text-sm text-muted">
                Pause the video where something matters and press N, or import a file from the analysis tool.
              </p>
            )}
            <ol className="space-y-3">
              {observations.map((o) => {
                const isActive = o.id === activeId;
                return (
                  <li key={o.id} className={`rounded-xl border p-3 ${isActive ? "border-brand-600 bg-brand-50/50" : "border-line bg-surface"}`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        className="t-mono rounded-md bg-chip px-2 py-1 text-xs font-semibold text-ink hover:bg-brand-100"
                        onClick={() => {
                          setActiveId(o.id);
                          videoRef.current?.pause();
                          seek(o.t);
                        }}
                        aria-label={`Go to ${clock(o.t)}`}
                      >
                        {clock(o.t)}
                      </button>
                      <select
                        aria-label="Kind"
                        value={o.kind}
                        onChange={(e) => patchObs(o.id, { kind: e.target.value as ObservationKind })}
                        className="h-8 rounded-lg border border-line bg-surface px-2 text-xs text-ink"
                      >
                        {(Object.keys(KIND_META) as ObservationKind[]).map((k) => (
                          <option key={k} value={k}>
                            {KIND_META[k].label}
                          </option>
                        ))}
                      </select>
                      <button type="button" className="ml-auto text-xs text-muted underline underline-offset-4 hover:text-ink" onClick={() => patchObs(o.id, { t: Math.round(time * 100) / 100 })}>
                        Set to current time
                      </button>
                    </div>
                    <input
                      ref={(el) => {
                        titleRefs.current[o.id] = el;
                      }}
                      className={`${input} mt-2`}
                      placeholder="Title"
                      aria-label="Title"
                      value={o.title}
                      onFocus={() => setActiveId(o.id)}
                      onChange={(e) => patchObs(o.id, { title: e.target.value })}
                    />
                    <textarea
                      rows={3}
                      className={`${input} mt-2`}
                      placeholder="What you see and what to do about it"
                      aria-label="Text"
                      value={o.text}
                      onFocus={() => setActiveId(o.id)}
                      onChange={(e) => patchObs(o.id, { text: e.target.value })}
                    />
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                      <button type="button" className="font-medium text-brand-700 underline underline-offset-4" onClick={() => setActiveId(isActive ? null : o.id)}>
                        {isActive ? "Click the video to pin" : o.pin ? "Move pin" : "Add pin"}
                      </button>
                      {o.pin && (
                        <>
                          <span className="t-mono text-muted">
                            {Math.round(o.pin.x)}%, {Math.round(o.pin.y)}%
                          </span>
                          <button type="button" className="text-muted underline underline-offset-4 hover:text-ink" onClick={() => patchObs(o.id, { pin: undefined })}>
                            Remove pin
                          </button>
                        </>
                      )}
                      {o.drawing && (
                        <span className="flex items-center gap-2 text-muted">
                          {/* eslint-disable-next-line @next/next/no-img-element -- a data URL from the analysis tool */}
                          <img src={o.drawing} alt="Drawing from the analysis tool" className="h-8 w-14 rounded border border-line object-cover" />
                          <button type="button" className="underline underline-offset-4 hover:text-ink" onClick={() => patchObs(o.id, { drawing: undefined })}>
                            Remove drawing
                          </button>
                        </span>
                      )}
                      <button
                        type="button"
                        className="ml-auto text-red-700 underline underline-offset-4"
                        onClick={() => {
                          edit<Obs[]>(setObservations, (cur) => cur.filter((x) => x.id !== o.id));
                          if (isActive) setActiveId(null);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ol>
          </aside>
        </div>
      )}

      <p className="text-xs text-muted">
        <Link href="/submissions" className="underline underline-offset-4">
          Back to submitted videos
        </Link>
        {published ? (
          <>
            {" · "}
            <Link href={`/dashboard/analyses/${submission.id}`} className="underline underline-offset-4">
              Open the published analysis
            </Link>
          </>
        ) : null}
      </p>
    </div>
  );
}
