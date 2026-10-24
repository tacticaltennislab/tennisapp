"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DIcons } from "@/components/dashboard/icons";
import { Panel } from "@/components/dashboard/ui";
import { FOCUS_OPTIONS } from "@/lib/dashboardSample";

// These mirror the real upload endpoint: any video type, up to 500 MB.
const MAX_BYTES = 500 * 1024 * 1024;

function size(bytes: number) {
  if (bytes >= 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
  return `${Math.max(1, Math.round(bytes / 1024 / 1024))} MB`;
}

type Phase = "choose" | "uploading" | "done";

export default function UploadDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [focus, setFocus] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>("choose");
  const [progress, setProgress] = useState(0);

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  function accept(f: File | undefined) {
    if (!f) return;
    if (!f.type.startsWith("video/")) {
      setFile(null);
      setError("That file is not a video. Choose an MP4 or MOV file.");
      return;
    }
    if (f.size > MAX_BYTES) {
      setFile(null);
      setError(`That video is ${size(f.size)}. The limit is 500 MB. Trim it or export it at a lower resolution.`);
      return;
    }
    setError(null);
    setFile(f);
  }

  function start(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Choose a video first.");
      inputRef.current?.focus();
      return;
    }
    setPhase("uploading");
    setProgress(0);
    timer.current = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + 2 + Math.random() * 5);
        if (next >= 100 && timer.current) {
          clearInterval(timer.current);
          setPhase("done");
        }
        return next;
      });
    }, 160);
  }

  function cancel() {
    if (timer.current) clearInterval(timer.current);
    setPhase("choose");
    setProgress(0);
  }

  function reset() {
    setFile(null);
    setTitle("");
    setNote("");
    setFocus([]);
    setPhase("choose");
    setProgress(0);
  }

  const steps = [
    { id: 1, label: "Choose video", done: Boolean(file) },
    { id: 2, label: "Add details", done: Boolean(file && title) },
    { id: 3, label: "Send", done: phase === "done" },
  ];
  const sent = file ? Math.round((progress / 100) * file.size) : 0;

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="space-y-6">
        <ol className="flex items-center gap-2 text-xs sm:gap-4 sm:text-sm" aria-label="Steps">
          {steps.map((s, i) => (
            <li key={s.id} className="flex items-center gap-2 sm:gap-3">
              <span
                className={`t-mono flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  s.done ? "bg-brand-600 text-on-brand" : "border border-line-strong text-muted"
                }`}
              >
                {s.done ? <DIcons.check className="h-3.5 w-3.5" /> : s.id}
              </span>
              <span className={s.done ? "text-ink" : "text-muted"}>{s.label}</span>
              {i < steps.length - 1 && <span className="h-px w-4 bg-line-strong sm:w-10" aria-hidden="true" />}
            </li>
          ))}
        </ol>

        {phase === "done" ? (
          <Panel>
            <div className="p-6 sm:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-on-brand">
                <DIcons.check className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-xl font-semibold text-ink">Demo complete</h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-body">
                Nothing was uploaded. In the real flow your video would now appear under Analyses as{" "}
                <strong className="text-ink">Awaiting review</strong>, and you would get an email when your coach has
                written the feedback.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/dashboard/analyses" className="btn btn-primary !min-h-10 !text-sm">
                  View analyses
                </Link>
                <button type="button" onClick={reset} className="btn btn-secondary !min-h-10 !text-sm">
                  Try again
                </button>
              </div>
            </div>
          </Panel>
        ) : (
          <form onSubmit={start} noValidate className="space-y-6">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                accept(e.dataTransfer.files?.[0]);
              }}
              className={`rounded-2xl border border-dashed p-8 text-center transition-colors ${
                dragging ? "border-brand-600 bg-brand-50" : "border-line-strong bg-surface"
              }`}
            >
              {file ? (
                <div className="mx-auto flex max-w-md items-center gap-4 text-left">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-chip text-brand-600">
                    <DIcons.file />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{file.name}</p>
                    <p className="t-mono mt-0.5 text-xs text-muted">{size(file.size)}</p>
                  </div>
                  {phase === "choose" && (
                    <button type="button" onClick={() => setFile(null)} className="text-sm font-medium text-muted underline underline-offset-4 hover:text-ink">
                      Remove
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-chip text-brand-600">
                    <DIcons.upload className="h-6 w-6" />
                  </span>
                  <p className="mt-4 text-base font-semibold text-ink">Drag a video here</p>
                  <p className="mt-1 text-sm text-muted">or choose one from your device</p>
                  <p className="t-mono mt-3 text-xs text-muted">MP4 or MOV · up to 500 MB</p>
                  <label className="btn btn-primary mt-5 cursor-pointer !min-h-10 !text-sm">
                    Choose a video
                    <input
                      ref={inputRef}
                      type="file"
                      accept="video/*"
                      onChange={(e) => accept(e.target.files?.[0])}
                      className="sr-only"
                    />
                  </label>
                </>
              )}
              {error && (
                <p role="alert" className="mt-4 text-sm text-[#ff8a7a]">
                  {error}
                </p>
              )}
            </div>

            {phase === "uploading" && file && (
              <Panel>
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-4 text-sm">
                    <p className="font-medium text-ink">Sending to your coach (demo)</p>
                    <p className="t-mono text-body">{Math.floor(progress)}%</p>
                  </div>
                  <div
                    className="progress mt-3"
                    role="progressbar"
                    aria-label="Upload progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.floor(progress)}
                  >
                    <span style={{ width: `${progress}%`, transition: "width 0.16s linear" }} />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-4 text-xs text-muted">
                    <p className="t-mono">
                      {size(sent)} of {size(file.size)}
                    </p>
                    <button type="button" onClick={cancel} className="font-medium text-body underline underline-offset-4 hover:text-ink">
                      Cancel
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-muted">Simulated progress. No file leaves this device.</p>
                </div>
              </Panel>
            )}

            <Panel title="Details for your coach">
              <div className="space-y-5 p-5">
                <div>
                  <label htmlFor="up-title" className="mb-1.5 block text-sm font-medium text-ink">
                    Title
                  </label>
                  <input
                    id="up-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="For example: Serve, deuce side practice"
                    disabled={phase === "uploading"}
                    className="field"
                  />
                </div>
                <div>
                  <label htmlFor="up-note" className="mb-1.5 block text-sm font-medium text-ink">
                    What do you want feedback on?
                  </label>
                  <textarea
                    id="up-note"
                    rows={4}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Describe what feels wrong, the session, and anything your on-court coach has told you."
                    disabled={phase === "uploading"}
                    className="field !py-3"
                  />
                </div>
                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-ink">Focus areas</legend>
                  <div className="flex flex-wrap gap-2">
                    {FOCUS_OPTIONS.map((f) => {
                      const on = focus.includes(f);
                      return (
                        <button
                          key={f}
                          type="button"
                          aria-pressed={on}
                          disabled={phase === "uploading"}
                          onClick={() => setFocus((cur) => (on ? cur.filter((x) => x !== f) : [...cur, f]))}
                          className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                            on ? "border-brand-600 bg-brand-600 text-on-brand" : "border-line-strong text-body hover:border-ink hover:text-ink"
                          }`}
                        >
                          {f}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4">
                <p className="text-xs text-muted">Your video is reviewed by a coach. Nothing is generated automatically.</p>
                <button type="submit" disabled={phase === "uploading"} className="btn btn-primary !min-h-10 !text-sm disabled:opacity-50">
                  <DIcons.send className="h-4 w-4" />
                  Send to coach (demo)
                </button>
              </div>
            </Panel>
          </form>
        )}
      </div>

      <aside aria-label="File requirements and filming tips" className="space-y-6 xl:sticky xl:top-24 xl:self-start">
        <Panel title="File requirements">
          <dl className="divide-y divide-line text-sm">
            {[
              ["Format", "Any video your phone or camera records. MP4 or MOV works best."],
              ["Size", "Up to 500 MB per video."],
              ["Per upload", "One video. Send a second one for a different stroke."],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-3 px-5 py-3.5">
                <dt className="text-muted">{k}</dt>
                <dd className="text-body">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>
        <Panel title="Filming tips">
          <ul className="space-y-3 p-5 text-sm leading-relaxed text-body">
            <li>Film from the side so the whole swing, footwork and body position are visible.</li>
            <li>Capture a few points or a short rally, not a single shot.</li>
            <li>Keep the camera steady: lean the phone on something solid or use a tripod.</li>
          </ul>
        </Panel>
      </aside>
    </div>
  );
}
