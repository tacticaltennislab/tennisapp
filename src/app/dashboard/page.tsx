import Link from "next/link";
import { ANALYSES, MESSAGES, PLAN, PLAYER } from "@/lib/dashboardSample";
import { DIcons } from "@/components/dashboard/icons";
import { Panel, StatusChip } from "@/components/dashboard/ui";

export default function DashboardOverview() {
  const awaiting = ANALYSES.filter((a) => a.status === "awaiting");
  const reviewed = ANALYSES.filter((a) => a.status === "reviewed");
  const latest = reviewed[0];
  const lastMessage = MESSAGES[MESSAGES.length - 1];
  const next = PLAN.sessions[0];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted">Welcome back, {PLAYER.name.split(" ")[0]}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          {awaiting.length > 0
            ? `${awaiting.length} ${awaiting.length === 1 ? "analysis is" : "analyses are"} with your coach`
            : "You are all caught up"}
        </h2>
      </div>

      <dl className="grid grid-cols-3 gap-3">
        {[
          { label: "Awaiting review", value: awaiting.length },
          { label: "Reviewed", value: reviewed.length },
          { label: "Plan sessions", value: `0 / ${PLAN.sessions.length}` },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-line bg-surface p-4 md:p-5">
            <dt className="text-xs text-muted">{s.label}</dt>
            <dd className="t-mono mt-1.5 text-2xl font-semibold text-ink md:text-3xl">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          {latest && latest.feedback && (
            <Panel
              title="Recent feedback"
              action={
                <Link href={`/dashboard/analyses/${latest.id}`} className="link-arrow text-sm !text-brand-600">
                  Open analysis
                  <DIcons.arrow className="h-3.5 w-3.5" />
                </Link>
              }
            >
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <p className="font-semibold text-ink">{latest.title}</p>
                  <span className="text-muted">
                    {latest.service} · reviewed by {latest.coach} · {latest.reviewedAt}
                  </span>
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-muted">Your priorities</p>
                <ol className="mt-3 space-y-3">
                  {latest.feedback.priorities.map((p, i) => (
                    <li key={p} className="flex gap-3 text-[0.9375rem] leading-relaxed text-body">
                      <span className="t-mono mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-600 text-xs font-bold text-on-brand">
                        {i + 1}
                      </span>
                      {p}
                    </li>
                  ))}
                </ol>
              </div>
            </Panel>
          )}

          <Panel
            title="Your analyses"
            action={
              <Link href="/dashboard/analyses" className="link-arrow text-sm !text-brand-600">
                View all
                <DIcons.arrow className="h-3.5 w-3.5" />
              </Link>
            }
          >
            <ul className="divide-y divide-line">
              {ANALYSES.map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/dashboard/analyses/${a.id}`}
                    className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-brand-50"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink">{a.title}</p>
                      <p className="mt-0.5 text-xs text-muted">
                        {a.service} · sent {a.submittedAt}
                      </p>
                    </div>
                    <StatusChip status={a.status} />
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel
            title="Next training session"
            action={
              <Link href="/dashboard/plan" className="link-arrow text-sm !text-brand-600">
                Open plan
                <DIcons.arrow className="h-3.5 w-3.5" />
              </Link>
            }
          >
            <div className="p-5">
              <p className="text-xs text-muted">
                Session {next.number} of {PLAN.sessions.length} · {next.duration}
              </p>
              <p className="mt-1 text-lg font-semibold text-ink">{next.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-body">{next.objective}</p>
              <ul className="mt-4 space-y-2 text-sm text-body">
                {next.exercises.map((e) => (
                  <li key={e.id} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" aria-hidden="true" />
                    {e.name}
                  </li>
                ))}
              </ul>
            </div>
          </Panel>

          <Panel
            title="Latest message"
            action={
              <Link href="/dashboard/messages" className="link-arrow text-sm !text-brand-600">
                Open messages
                <DIcons.arrow className="h-3.5 w-3.5" />
              </Link>
            }
          >
            <div className="p-5">
              <p className="text-xs text-muted">
                {lastMessage.author} · {lastMessage.at}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-body">{lastMessage.body}</p>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
