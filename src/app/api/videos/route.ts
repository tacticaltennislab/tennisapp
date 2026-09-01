import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

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

  if (!storagePath || !fileName || !fileType || !fileSize) {
    return NextResponse.json({ error: "Missing video upload details." }, { status: 400 });
  }

  const submission = await prisma.videoSubmission.create({
    data: {
      userId: session.user.id,
      title,
      note,
      storagePath,
      fileName,
      fileType,
      fileSize,
    },
  });

  return NextResponse.json({ submission }, { status: 201 });
}
