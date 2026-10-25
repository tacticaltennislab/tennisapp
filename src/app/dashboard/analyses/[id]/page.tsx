import Link from "next/link";
import { notFound } from "next/navigation";
import { ANALYSES } from "@/lib/dashboardSample";
import AnalysisViewer from "@/components/dashboard/AnalysisViewer";
import { StatusChip } from "@/components/dashboard/ui";

export default async function AnalysisPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const analysis = ANALYSES.find((a) => a.id === id);
  if (!analysis) notFound();

  return (
    <div>
      <nav aria-label="Breadcrumb" className="mb-4 text-sm">
        <Link href="/dashboard/analyses" className="text-muted underline underline-offset-4 transition-colors hover:text-ink">
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
            {analysis.coach ? ` · coach ${analysis.coach}` : ""} · {analysis.fileName} ({analysis.fileSize})
          </p>
        </div>
        <StatusChip status={analysis.status} />
      </div>

      <AnalysisViewer analysis={analysis} />
    </div>
  );
}
