import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { canReviewPlayer } from "@/lib/academy";
import { parseReportInput } from "@/lib/reportInput";

/** Save the coach's draft: observations and summary. Admins and coaches of the player's academy only. */
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });

  const { id } = await params;
  const submission = await prisma.videoSubmission.findUnique({ where: { id }, select: { userId: true, status: true } });
  if (!submission || !(await canReviewPlayer(session.user, submission.userId))) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  if (submission.status === "rejected") {
    return NextResponse.json({ error: "A rejected submission cannot be edited." }, { status: 409 });
  }

  const parsed = parseReportInput(await request.json().catch(() => null));
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });
  const { observations, summary, charting } = parsed.value;

  await prisma.$transaction(async (tx) => {
    await tx.submissionObservation.deleteMany({ where: { submissionId: id } });
    if (observations.length > 0) {
      await tx.submissionObservation.createMany({
        data: observations.map((o) => ({
          submissionId: id,
          timeSec: o.t,
          kind: o.kind,
          title: o.title,
          text: o.text,
          pinX: o.pin?.x ?? null,
          pinY: o.pin?.y ?? null,
          drawing: o.drawing ?? null,
        })),
      });
    }
    const data = {
      strengths: summary.strengths,
      issues: summary.issues as unknown as Prisma.InputJsonValue,
      tactical: summary.tactical,
      priorities: summary.priorities,
      drills: summary.drills as unknown as Prisma.InputJsonValue,
      ...(charting ? { charting: charting as unknown as Prisma.InputJsonValue } : {}),
    };
    await tx.submissionReport.upsert({ where: { submissionId: id }, create: { submissionId: id, ...data }, update: data });
    // The first save means a coach has started: pending becomes in_review.
    if (submission.status === "pending") {
      await tx.videoSubmission.update({ where: { id }, data: { status: "in_review" } });
    }
  });

  return NextResponse.json({ ok: true, observations: observations.length });
}
