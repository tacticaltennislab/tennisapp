import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { isFocusArea, isGoal, isSkillLevel } from "@/lib/trainingOptions";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const storagePath = typeof body?.storagePath === "string" ? body.storagePath : "";
  const fileName = typeof body?.fileName === "string" ? body.fileName : "";
  const fileType = typeof body?.fileType === "string" ? body.fileType : "";
  const fileSize = typeof body?.fileSize === "number" ? body.fileSize : 0;
  const title = typeof body?.title === "string" && body.title.trim() ? body.title.trim() : null;
  const note = typeof body?.note === "string" && body.note.trim() ? body.note.trim() : null;
  const skillLevel =
    typeof body?.skillLevel === "string" && isSkillLevel(body.skillLevel)
      ? body.skillLevel
      : null;
  const goal = typeof body?.goal === "string" && isGoal(body.goal) ? body.goal : null;
  const focusAreas = Array.isArray(body?.focusAreas)
    ? body.focusAreas.filter((a: unknown): a is string => typeof a === "string" && isFocusArea(a))
    : [];

  if (!storagePath || !fileName || !fileType || !fileSize) {
    return NextResponse.json({ error: "Missing video upload details." }, { status: 400 });
  }
  if (!fileType.startsWith("video/")) {
    return NextResponse.json({ error: "File must be a video." }, { status: 400 });
  }

  const submission = await prisma.videoSubmission.create({
    data: {
      userId: session.user.id,
      title,
      note,
      skillLevel,
      goal,
      focusAreas,
      storagePath,
      fileName,
      fileType,
      fileSize,
    },
  });

  return NextResponse.json({ submission }, { status: 201 });
}
