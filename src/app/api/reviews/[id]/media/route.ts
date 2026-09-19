import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review || !review.mediaUrl) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  if (review.status !== "approved") {
    const session = await auth();
    const isOwner = session?.user?.id === review.userId;
    const isAdmin = session?.user?.role === "admin";
    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }
  }

  const range = request.headers.get("range");

  const blob = await get(review.mediaUrl, {
    access: "private",
    ...(range ? { headers: { range } } : {}),
  }).catch(() => null);
  if (!blob || blob.statusCode !== 200) {
    return NextResponse.json({ error: "File missing." }, { status: 404 });
  }

  // Trust the blob's own recorded content type over the database value,
  // which is client-reported at submission time -- same reasoning as the
  // video-submission file route.
  const actualType = blob.blob.contentType || "";
  const safeContentType =
    actualType.startsWith("video/") || actualType.startsWith("image/")
      ? actualType
      : "application/octet-stream";

  const contentRange = blob.headers.get("content-range");
  const contentLength = blob.headers.get("content-length");

  const headers = new Headers({
    "Content-Type": safeContentType,
    "Cache-Control":
      review.status === "approved"
        ? "public, max-age=3600"
        : "private, max-age=0, no-store",
    "Accept-Ranges": "bytes",
  });
  if (contentLength) headers.set("Content-Length", contentLength);
  if (contentRange) headers.set("Content-Range", contentRange);

  return new NextResponse(blob.stream, {
    status: contentRange ? 206 : 200,
    headers,
  });
}
