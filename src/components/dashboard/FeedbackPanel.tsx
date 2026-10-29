"use client";

import { useState } from "react";
import { DIcons } from "@/components/dashboard/icons";
import { Panel } from "@/components/dashboard/ui";
import type { Analysis } from "@/lib/dashboardSample";

type Tab = "strengths" | "issues" | "tactical";

export default function FeedbackPanel({ analysis }: { analysis: Analysis }) {
  const fb = analysis.feedback;
  const [tab, setTab] = useState<Tab>(
    !fb || fb.issues.length > 0 ? "issues" : fb.strengths.length > 0 ? "strengths" : fb.tactical.length > 0 ? "tactical" : "issues"
  );

  if (!fb) {
    const inReview = analysis.status === "in_review";
    const rejected = analysis.status === "rejected";
    return (
      <Panel title="Coach feedback">
        <div className="p-5 text-sm leading-relaxed text-body">
          <p className="font-medium text-ink">
            {rejected ? "This video was not accepted" : inReview ? "A coach is working on it" : "Not reviewed yet"}
          </p>
          <p className="mt-2 text-muted">
            {rejected
              ? "We could not use this video. Any credits you spent on it were returned. Send us a new clip or write to us in Messages."
              : inReview
                ? "Your coach has started the review. You will get an email when it is published, and the priorities, strengths, technical issues and tactical recommendations will appear here."
                : "Your coach has not reviewed this video yet. When the review is ready you will get an email, and the priorities, strengths, technical issues and tactical recommendations will appear here."}
          </p>
          {analysis.playerNote && (
            <>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-muted">What you asked</p>
              <p className="mt-2 text-body">&ldquo;{analysis.playerNote}&rdquo;</p>
            </>
          )}
        </div>
      </Panel>
    );
  }

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "strengths", label: "Strengths", count: fb.strengths.length },
    { id: "issues", label: "Technical issues", count: fb.issues.length },
    { id: "tactical", label: "Tactical", count: fb.tactical.length },
  ];

  return (
    <div className="space-y-4">
      {/* Priorities are what to do next, so they stay visible above the tabs. */}
      {fb.priorities.length > 0 && (
      <section aria-labelledby="priorities-heading" className="rounded-2xl border border-brand-600/40 bg-surface">
        <header className="flex items-center justify-between px-5 pt-5">
          <h2 id="priorities-heading" className="text-sm font-semibold text-ink">
            Your priorities
          </h2>
          <span className="text-xs text-muted">in order</span>
        </header>
        <ol className="space-y-4 p-5 pt-4">
          {fb.priorities.map((p, i) => (
            <li key={`${i}-${p}`} className="flex gap-3.5">
              <span className="t-mono flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-on-brand">
                {i + 1}
              </span>
              <p className="text-[0.9375rem] leading-relaxed text-ink">{p}</p>
            </li>
          ))}
        </ol>
      </section>
      )}

      <Panel>
        <div role="tablist" aria-label="Feedback sections" className="flex border-b border-line">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => {
                const i = tabs.findIndex((x) => x.id === tab);
                if (e.key === "ArrowRight") setTab(tabs[(i + 1) % tabs.length].id);
                if (e.key === "ArrowLeft") setTab(tabs[(i + tabs.length - 1) % tabs.length].id);
              }}
              className={`-mb-px flex-1 whitespace-nowrap border-b-2 px-1.5 py-3.5 text-[0.8125rem] font-medium transition-colors sm:text-sm focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-600 ${
                tab === t.id ? "border-brand-600 text-ink" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {t.label} <span className="t-mono text-xs text-muted">{t.count}</span>
            </button>
          ))}
        </div>

        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} tabIndex={0} className="p-5 outline-none">
          {(tab === "strengths" ? fb.strengths : tab === "issues" ? fb.issues : fb.tactical).length === 0 && (
            <p className="text-sm text-muted">Nothing in this section.</p>
          )}
          {tab === "strengths" && (
            <ul className="space-y-3.5">
              {fb.strengths.map((s) => (
                <li key={s} className="flex gap-3 text-[0.9375rem] leading-relaxed text-body">
                  <DIcons.check className="mt-1 h-4 w-4 shrink-0 text-brand-600" />
                  {s}
                </li>
              ))}
            </ul>
          )}
          {tab === "issues" && (
            <ul className="space-y-5">
              {fb.issues.map((s) => (
                <li key={s.title}>
                  <p className="flex items-center gap-2 text-[0.9375rem] font-medium text-ink">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#f5a524]" aria-hidden="true" />
                    {s.title}
                  </p>
                  <p className="mt-1.5 pl-4 text-sm leading-relaxed text-body">{s.detail}</p>
                </li>
              ))}
            </ul>
          )}
          {tab === "tactical" && (
            <ul className="space-y-3.5">
              {fb.tactical.map((s) => (
                <li key={s} className="flex gap-3 text-[0.9375rem] leading-relaxed text-body">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#9fb6ff]" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Panel>

      {fb.drills && fb.drills.length > 0 && (
        <Panel title="Drills to practise">
          <ul className="space-y-4 p-5">
            {fb.drills.map((d) => (
              <li key={d.name}>
                <p className="text-[0.9375rem] font-medium text-ink">{d.name}</p>
                {d.detail && <p className="mt-1 text-sm leading-relaxed text-body">{d.detail}</p>}
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <p className="px-1 text-xs leading-relaxed text-muted">
        {analysis.coach ? `Reviewed by ${analysis.coach}${analysis.reviewedAt ? ` on ${analysis.reviewedAt}` : ""}. ` : ""}Every note is written by your coach.
      </p>
    </div>
  );
}
