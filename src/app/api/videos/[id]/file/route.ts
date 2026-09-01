import path from "node:path";
import { readFile } from "node:fs/promises";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { uploadFilePath } from "@/lib/uploads";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const { id } = await params;
  const submission = await prisma.videoSubmission.findUnique({ where: { id } });
  if (!submission) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const isOwner = submission.userId === session.user.id;
  const isAdmin = session.user.role === "admin";
  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const ext = path.extname(submission.fileName);
  const buffer = await readFile(uploadFilePath(`${submission.id}${ext}`)).catch(() => null);
  if (!buffer) {
    return NextResponse.json({ error: "File missing." }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": submission.fileType,
      "Content-Disposition": `inline; filename="${submission.fileName}"`,
      "Cache-Control": "private, max-age=0, no-store",
    },
  });
}
