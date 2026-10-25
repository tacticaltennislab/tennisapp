import { del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendEmail, coachFeedbackEmail } from "@/lib/email";
import { canReviewPlayer } from "@/lib/academy";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const { id } = await params;
  const submission = await prisma.videoSubmission.findUnique({ where: { id } });
  if (!submission) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  await del(submission.storagePath);
  await prisma.videoSubmission.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const { id } = await params;
  const existing = await prisma.videoSubmission.findUnique({
    where: { id },
    select: { userId: true },
  });
  if (!existing || !(await canReviewPlayer(session.user, existing.userId))) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);

  // Publishing a free analysis on the public page is an admin decision, and only
  // possible when the player agreed to it and the analysis has been written.
  if (typeof body?.published === "boolean") {
    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }
    const target = await prisma.videoSubmission.findUnique({ where: { id } });
    if (!target || !target.isFree) {
      return NextResponse.json({ error: "Only free analyses can be published." }, { status: 400 });
    }
    if (body.published && !(target.publishConsent && (target.tacticalNotes || target.technicalNotes))) {
      return NextResponse.json(
        { error: "The player has not agreed to publication, or the analysis is empty." },
        { status: 400 }
      );
    }
    const updated = await prisma.videoSubmission.update({
      where: { id },
      data: { publishedAt: body.published ? new Date() : null },
    });
    return NextResponse.json({ submission: updated });
  }

  const clean = (v: unknown) => (typeof v === "string" ? v.trim() : undefined);
  const tacticalNotes = clean(body?.tacticalNotes);
  const technicalNotes = clean(body?.technicalNotes);
  let coachNotes = clean(body?.coachNotes);
  // A free analysis has two parts; coachNotes keeps a combined copy so older views and the
  // email still show everything.
  if (tacticalNotes !== undefined || technicalNotes !== undefined) {
    coachNotes = [
      tacticalNotes ? `Tactical analysis\n${tacticalNotes}` : "",
      technicalNotes ? `Technical analysis\n${technicalNotes}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");
  }

  const submission = await prisma.videoSubmission.update({
    where: { id },
    data: {
      coachNotes: coachNotes ?? undefined,
      tacticalNotes: tacticalNotes ?? undefined,
      technicalNotes: technicalNotes ?? undefined,
      status: "reviewed",
      reviewedAt: new Date(),
    },
    include: { user: { select: { email: true } } },
  });

  if (coachNotes) {
    await sendEmail({
      to: submission.user.email,
      subject: submission.isFree ? "Your free analysis is ready" : "Your video has been reviewed",
      html: coachFeedbackEmail(submission.title || submission.fileName, coachNotes),
    });
  }

  return NextResponse.json({ submission });
}
