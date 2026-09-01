import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import SubmissionReview from "@/components/SubmissionReview";

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
    <main className="flex-1 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Submitted videos</h1>
        <p className="text-body mb-8">
          Review player videos and leave feedback.
        </p>

        {submissions.length === 0 ? (
          <p className="text-sm text-muted">
            No videos submitted yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {submissions.map((s) => (
              <SubmissionReview
                key={s.id}
                submission={{
                  id: s.id,
                  title: s.title,
                  note: s.note,
                  status: s.status,
                  coachNotes: s.coachNotes,
                  userName: s.user.name,
                  userEmail: s.user.email,
                }}
              />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
