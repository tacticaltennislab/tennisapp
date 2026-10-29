import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { canReviewPlayer } from "@/lib/academy";
import { analysisReadyEmail, sendEmail } from "@/lib/email";
import { sendPushToUser } from "@/lib/push";

/** Publish the analysis: it becomes visible to the client, who is told by email and push. */
export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });

  const { id } = await params;
  const submission = await prisma.videoSubmission.findUnique({
    where: { id },
    include: { user: { select: { email: true } }, report: true, observations: { select: { id: true } } },
  });
  if (!submission || !(await canReviewPlayer(session.user, submission.userId))) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  if (submission.status === "rejected") {
    return NextResponse.json({ error: "A rejected submission cannot be published." }, { status: 409 });
  }
  const hasContent =
    submission.observations.length > 0 ||
    (submission.report &&
      (submission.report.priorities.length > 0 ||
        submission.report.strengths.length > 0 ||
        submission.report.tactical.length > 0 ||
        (Array.isArray(submission.report.issues) && submission.report.issues.length > 0)));
  if (!hasContent) {
    return NextResponse.json({ error: "Save some observations or a summary first." }, { status: 400 });
  }

  const firstPublish = submission.status !== "reviewed";
  const now = new Date();
  const priorities = submission.report?.priorities ?? [];

  await prisma.$transaction(async (tx) => {
    await tx.videoSubmission.update({
      where: { id },
      data: {
        status: "reviewed",
        reviewedAt: firstPublish ? now : submission.reviewedAt ?? now,
        reviewedById: session.user.id,
        // Older screens (the account page) show coachNotes, so keep a plain text copy of the priorities.
        coachNotes: priorities.length > 0 ? priorities.map((p, i) => `${i + 1}. ${p}`).join("\n") : submission.coachNotes,
      },
    });
    if (submission.report) await tx.submissionReport.update({ where: { submissionId: id }, data: { publishedAt: now } });
  });

  // Tell the client once, on the first publish; later edits just update what they see.
  if (firstPublish) {
    const title = submission.title || submission.fileName;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tacticaltennislab.com";
    await sendEmail({
      to: submission.user.email,
      subject: "Your analysis is ready",
      html: analysisReadyEmail(title, priorities, `${siteUrl}/dashboard/analyses/${id}`),
    });
    await sendPushToUser(submission.userId, {
      title: "Your analysis is ready",
      body: title,
      url: `/dashboard/analyses/${id}`,
    });
  }

  return NextResponse.json({ ok: true, firstPublish });
}
