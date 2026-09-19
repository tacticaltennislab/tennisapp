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

  // Use the blob's own recorded content type, not the client-reported
  // fileType from the database -- that value is attacker-controlled and
  // serving it with Content-Disposition: inline would let a spoofed
  // Content-Type (e.g. text/html) execute in the admin's/owner's session.
  const safeContentType = blob.blob.contentType?.startsWith("video/")
    ? blob.blob.contentType
    : "application/octet-stream";

  return new NextResponse(blob.stream, {
    headers: {
      "Content-Type": safeContentType,
      "Content-Disposition": `inline; filename="${submission.fileName}"`,
      "Cache-Control": "private, max-age=0, no-store",
    },
  });
}
