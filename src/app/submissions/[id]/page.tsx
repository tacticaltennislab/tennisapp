import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { canReviewPlayer } from "@/lib/academy";
import { getAnalysisForEditor } from "@/lib/analyses";
import { creditsChargedFor } from "@/lib/durationCorrection";
import { prisma } from "@/lib/prisma";
import ReportEditor from "@/components/ReportEditor";
import PageHeader from "@/components/PageHeader";
import type { Charting, DraftSummary } from "@/lib/analysisImport";

export const dynamic = "force-dynamic";

/** The coach report editor. Admins, and coaches of the player's academy, only. */
export default async function SubmissionEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) redirect(`/sign-in?callbackUrl=/submissions/${id}`);

  const loaded = await getAnalysisForEditor(id);
  // The same answer for "does not exist" and "not yours to review".
  if (!loaded || !(await canReviewPlayer(session.user, loaded.row.userId))) notFound();
  const { row, analysis } = loaded;

  const hasCharge = (await prisma.creditLedger.count({ where: { videoSubmissionId: id, reason: "submission" } })) > 0;
  const creditsCharged = hasCharge ? await creditsChargedFor(id) : null;

  const summary: DraftSummary = {
    strengths: analysis.feedback?.strengths ?? [],
    issues: analysis.feedback?.issues ?? [],
    tactical: analysis.feedback?.tactical ?? [],
    priorities: analysis.feedback?.priorities ?? [],
    drills: analysis.feedback?.drills ?? [],
  };

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="Coach review"
        title={analysis.title}
        subtitle={`${analysis.service} from ${row.user.name || row.user.email}, sent ${analysis.submittedAt}.`}
      />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-[96rem]">
          <ReportEditor
            videoSrc={`/api/videos/${id}/file`}
            initial={{
              observations: analysis.observations,
              summary,
              charting: (row.report?.charting as Charting | null) ?? undefined,
            }}
            submission={{
              id,
              analysis: { ...analysis, observations: [], feedback: undefined },
              playerName: row.user.name || row.user.email,
              status: row.status,
              analysisType: row.analysisType,
              declaredMinutes: row.declaredMinutes,
              actualDurationSec: row.actualDurationSec,
              creditsCharged,
              isAdmin: session.user.role === "admin",
            }}
          />
        </div>
      </main>
    </div>
  );
}
