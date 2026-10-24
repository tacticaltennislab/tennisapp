"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DIcons } from "@/components/dashboard/icons";
import { Panel } from "@/components/dashboard/ui";
import { PLAN } from "@/lib/dashboardSample";

const KEY = "ttl-prototype-plan-progress";

export default function PlanTracker() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  // Progress is kept on this device only; the prototype has no account to save to.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time restore from localStorage after mount
      if (raw) setDone(JSON.parse(raw));
    } catch {
      // ignore unreadable storage
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(done));
    } catch {
      // storage can be blocked; tracking still works for this visit
    }
  }, [done, ready]);

  const sessions = PLAN.sessions;
  const sessionDone = (id: string) => {
    const s = sessions.find((x) => x.id === id)!;
    return s.exercises.every((e) => done[e.id]);
  };
  const totalEx = sessions.reduce((n, s) => n + s.exercises.length, 0);
  const doneEx = sessions.reduce((n, s) => n + s.exercises.filter((e) => done[e.id]).length, 0);
  const doneSessions = sessions.filter((s) => sessionDone(s.id)).length;
  const pct = totalEx ? Math.round((doneEx / totalEx) * 100) : 0;
  const nextId = useMemo(() => sessions.find((s) => !sessionDone(s.id))?.id ?? null, [done]); // eslint-disable-line react-hooks/exhaustive-deps
  const openId = open ?? nextId;
  const weeks = Array.from(new Set(sessions.map((s) => s.week)));

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="space-y-8">
        {weeks.map((w) => (
          <section key={w} aria-labelledby={`week-${w}`}>
            <h2 id={`week-${w}`} className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Week {w}
            </h2>
            <div className="space-y-3">
              {sessions
                .filter((s) => s.week === w)
                .map((s) => {
                  const complete = sessionDone(s.id);
                  const count = s.exercises.filter((e) => done[e.id]).length;
                  const isOpen = openId === s.id;
                  return (
                    <Panel key={s.id}>
                      <h3>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`sess-${s.id}`}
                          onClick={() => setOpen(isOpen ? "" : s.id)}
                          className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-600"
                        >
                          <span
                            className={`t-mono flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                              complete ? "bg-brand-600 text-on-brand" : "bg-chip text-ink"
                            }`}
                          >
                            {complete ? <DIcons.check className="h-4 w-4" /> : s.number}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-base font-semibold text-ink">{s.title}</span>
                            <span className="mt-0.5 block text-xs text-muted">
                              {s.duration} · {count} of {s.exercises.length} exercises
                              {s.id === nextId ? " · up next" : ""}
                            </span>
                          </span>
                          <svg viewBox="0 0 20 20" className={`h-4 w-4 shrink-0 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} fill="currentColor" aria-hidden="true">
                            <path d="M5.5 7.5 10 12l4.5-4.5-1-1L10 10 6.5 6.5z" />
                          </svg>
                        </button>
                      </h3>
                      {isOpen && (
                        <div id={`sess-${s.id}`} className="border-t border-line px-5 pb-5 pt-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Objective</p>
                          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink">{s.objective}</p>
                          <ul className="mt-5 space-y-2">
                            {s.exercises.map((e) => {
                              const on = Boolean(done[e.id]);
                              return (
                                <li key={e.id}>
                                  <label
                                    className={`flex cursor-pointer items-start gap-3.5 rounded-xl border p-3.5 transition-colors ${
                                      on ? "border-brand-600/40 bg-brand-50" : "border-line hover:border-line-strong"
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={on}
                                      onChange={() => {
                                        // Keep this session open even when ticking the last exercise completes it.
                                        setOpen(s.id);
                                        setDone((d) => ({ ...d, [e.id]: !d[e.id] }));
                                      }}
                                      className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-[#c8f135]"
                                    />
                                    <span>
                                      <span className={`block text-[0.9375rem] font-medium ${on ? "text-muted line-through" : "text-ink"}`}>
                                        {e.name}
                                      </span>
                                      <span className="mt-0.5 block text-sm leading-relaxed text-body">{e.detail}</span>
                                    </span>
                                  </label>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </Panel>
                  );
                })}
            </div>
          </section>
        ))}
      </div>

      <aside aria-label="Plan summary" className="order-first space-y-6 xl:order-none xl:sticky xl:top-24 xl:self-start">
        <Panel>
          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Your plan</p>
            <h2 className="mt-2 text-lg font-semibold text-ink">{PLAN.title}</h2>
            <p className="mt-1 text-xs text-muted">
              Written by {PLAN.author} · started {PLAN.startedAt}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-body">{PLAN.goal}</p>

            <div className="mt-5 flex items-baseline justify-between text-sm">
              <span className="text-muted">
                {doneSessions} of {sessions.length} sessions
              </span>
              <span className="t-mono font-semibold text-ink">{pct}%</span>
            </div>
            <div className="progress mt-2" role="progressbar" aria-label="Plan completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
              <span style={{ width: `${pct}%`, transition: "width 0.3s" }} />
            </div>
            <p className="mt-3 text-xs text-muted">
              {doneEx} of {totalEx} exercises done. Ticks are saved on this device only in the prototype.
            </p>
          </div>
          <div className="border-t border-line px-5 py-4 text-sm">
            <p className="text-muted">Based on</p>
            <Link href="/dashboard/analyses/serve-deuce" className="mt-0.5 inline-flex items-center gap-1.5 font-medium text-brand-600 hover:underline">
              {PLAN.basedOn}
              <DIcons.arrow className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Panel>
        <Panel>
          <div className="p-5 text-sm leading-relaxed text-body">
            <p className="font-medium text-ink">Finished a session?</p>
            <p className="mt-1.5 text-muted">Film it and upload the video so your coach can check the change.</p>
            <Link href="/dashboard/upload" className="btn btn-secondary mt-4 !min-h-10 !text-sm">
              Upload a video
            </Link>
          </div>
        </Panel>
      </aside>
    </div>
  );
}
