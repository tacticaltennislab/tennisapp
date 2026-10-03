import { del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendEmail, coachFeedbackEmail } from "@/lib/email";

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
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const coachNotes = typeof body?.coachNotes === "string" ? body.coachNotes.trim() : undefined;

  const submission = await prisma.videoSubmission.update({
    where: { id },
    data: {
      coachNotes: coachNotes ?? undefined,
      status: "reviewed",
      reviewedAt: new Date(),
    },
    include: { user: { select: { email: true } } },
  });

  if (coachNotes) {
    await sendEmail({
      to: submission.user.email,
      subject: "Your video has been reviewed",
      html: coachFeedbackEmail(submission.title || submission.fileName, coachNotes),
    });
  }

  return NextResponse.json({ submission });
}
