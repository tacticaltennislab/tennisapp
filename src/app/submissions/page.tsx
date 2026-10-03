import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import SubmissionReview from "@/components/SubmissionReview";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import EmptyState from "@/components/EmptyState";
import { IconVideo } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/submissions");
  }
  if (session.user.role !== "admin") {
    redirect("/account");
  }

  const submissions = await prisma.videoSubmission.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } } },
  });

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="Coach review"
        title="Submitted videos"
        subtitle="Review player videos and leave feedback."
      />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {submissions.length === 0 ? (
            <EmptyState icon={IconVideo} title="No videos submitted yet" />
          ) : (
            <ul className="space-y-4">
              {submissions.map((s, i) => (
                <Reveal key={s.id} as="li" delay={Math.min(i, 6) * 60}>
                  <SubmissionReview
                    canDelete
                    submission={{
                      id: s.id,
                      title: s.title,
                      note: s.note,
                      status: s.status,
                      coachNotes: s.coachNotes,
                      userName: s.user.name,
                      userEmail: s.user.email,
                      skillLevel: s.skillLevel,
                      goal: s.goal,
                      focusAreas: s.focusAreas,
                    }}
                  />
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
