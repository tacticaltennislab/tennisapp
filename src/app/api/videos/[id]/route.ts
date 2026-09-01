import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

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
  });

  return NextResponse.json({ submission });
}
