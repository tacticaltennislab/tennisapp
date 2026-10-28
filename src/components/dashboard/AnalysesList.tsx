import Link from "next/link";
import { Panel, StatusChip } from "@/components/dashboard/ui";
import { formatClock, type Analysis } from "@/lib/analysisTypes";

export type AnalysisRow = Analysis & { ownerName?: string };

/** The list of analyses, shared by the real dashboard and the demo. `q` keeps demo mode on in links. */
export default function AnalysesList({ items, q = "" }: { items: AnalysisRow[]; q?: string }) {
  return (
    <Panel>
      <ul className="divide-y divide-line">
        {items.map((a) => (
          <li key={a.id}>
            <Link
              href={`/dashboard/analyses/${a.id}${q}`}
              className="grid gap-3 px-5 py-5 transition-colors hover:bg-brand-50 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_auto] md:items-center md:gap-6"
            >
              <div className="min-w-0">
                <p className="truncate text-base font-medium text-ink">{a.title}</p>
                <p className="mt-1 text-sm text-muted">
                  {a.service}
                  {a.focus.length > 0 ? ` · ${a.focus.join(", ")}` : ""}
                  {a.ownerName ? ` · player ${a.ownerName}` : ""}
                </p>
              </div>
              <dl className="grid grid-cols-3 gap-4 text-xs md:block md:space-y-1 md:text-sm">
                <div className="md:flex md:gap-2">
                  <dt className="text-muted">Sent</dt>
                  <dd className="text-body">{a.submittedAt}</dd>
                </div>
                <div className="md:flex md:gap-2">
                  <dt className="text-muted">Length</dt>
                  <dd className="t-mono text-body">{a.durationSec > 0 ? formatClock(a.durationSec) : "Not set"}</dd>
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
  );
}
