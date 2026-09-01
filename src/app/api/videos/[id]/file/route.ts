import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

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

  const blob = await get(submission.storagePath, { access: "private" }).catch(() => null);
  if (!blob || blob.statusCode !== 200) {
    return NextResponse.json({ error: "File missing." }, { status: 404 });
  }

  return new NextResponse(blob.stream, {
    headers: {
      "Content-Type": submission.fileType,
      "Content-Disposition": `inline; filename="${submission.fileName}"`,
      "Cache-Control": "private, max-age=0, no-store",
    },
  });
}
