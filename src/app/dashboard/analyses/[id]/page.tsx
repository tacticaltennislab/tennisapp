import Link from "next/link";
import { notFound } from "next/navigation";
import { ANALYSES } from "@/lib/dashboardSample";
import { getAnalysis } from "@/lib/analyses";
import { getDashboardContext, type DashboardSearchParams } from "@/lib/dashboardContext";
import AnalysisViewer from "@/components/dashboard/AnalysisViewer";
import { StatusChip } from "@/components/dashboard/ui";

export default async function AnalysisPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: DashboardSearchParams;
}) {
  const { id } = await params;
  const { user, demo, q } = await getDashboardContext(searchParams);

  const found = demo ? (ANALYSES.find((a) => a.id === id) ?? null) : await getAnalysis(user, id);
  // Someone else's analysis looks exactly like one that does not exist.
  if (!found) notFound();
  const analysis = found;
  const ownerName = "ownerName" in analysis ? analysis.ownerName : undefined;
  const reviewer = !demo && "ownerId" in analysis && analysis.ownerId !== user.id;

  return (
    <div>
      <nav aria-label="Breadcrumb" className="mb-4 text-sm">
        <Link href={`/dashboard/analyses${q}`} className="text-muted underline underline-offset-4 transition-colors hover:text-ink">
          Analyses
        </Link>
        <span className="mx-2 text-line-strong" aria-hidden="true">
          /
        </span>
        <span className="text-body">{analysis.title}</span>
      </nav>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">{analysis.title}</h2>
          <p className="mt-2 text-sm text-muted">
            {analysis.service} · sent {analysis.submittedAt}
            {ownerName ? ` · player ${ownerName}` : ""}
            {analysis.coach ? ` · coach ${analysis.coach}` : ""} · {analysis.fileName} ({analysis.fileSize})
          </p>
        </div>
        <div className="flex items-center gap-3">
          {reviewer && (
            <Link href={`/submissions/${analysis.id}`} className="btn btn-secondary !min-h-9 !px-4 !text-sm">
              Open in report editor
            </Link>
          )}
          <StatusChip status={analysis.status} />
        </div>
      </div>

      <AnalysisViewer analysis={analysis} videoSrc={demo ? undefined : `/api/videos/${analysis.id}/file`} />
    </div>
  );
}
