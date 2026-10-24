import Link from "next/link";
import { ANALYSES, formatClock } from "@/lib/dashboardSample";
import { Panel, StatusChip } from "@/components/dashboard/ui";

export default function AnalysesList() {
  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-sm text-muted">
        Every video you have sent, with the coach&apos;s review once it is ready. Open an analysis to watch it with
        the coach&apos;s notes on the timeline.
      </p>

      <Panel>
        <ul className="divide-y divide-line">
          {ANALYSES.map((a) => (
            <li key={a.id}>
              <Link
                href={`/dashboard/analyses/${a.id}`}
                className="grid gap-3 px-5 py-5 transition-colors hover:bg-brand-50 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_auto] md:items-center md:gap-6"
              >
                <div className="min-w-0">
                  <p className="truncate text-base font-medium text-ink">{a.title}</p>
                  <p className="mt-1 text-sm text-muted">
                    {a.service} · {a.focus.join(", ")}
                  </p>
                </div>
                <dl className="grid grid-cols-3 gap-4 text-xs md:block md:space-y-1 md:text-sm">
                  <div className="md:flex md:gap-2">
                    <dt className="text-muted">Sent</dt>
                    <dd className="text-body">{a.submittedAt}</dd>
                  </div>
                  <div className="md:flex md:gap-2">
                    <dt className="text-muted">Length</dt>
                    <dd className="t-mono text-body">{formatClock(a.durationSec)}</dd>
                  </div>
                  <div className="md:flex md:gap-2">
                    <dt className="text-muted">Coach</dt>
                    <dd className="text-body">{a.coach ?? "Not assigned yet"}</dd>
                  </div>
                </dl>
                <StatusChip status={a.status} />
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
