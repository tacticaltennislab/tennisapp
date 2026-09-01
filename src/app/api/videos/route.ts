import path from "node:path";
import { writeFile } from "node:fs/promises";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ensureUploadsDir, uploadFilePath } from "@/lib/uploads";

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  const title = formData?.get("title");
  const note = formData?.get("note");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "A video file is required." }, { status: 400 });
  }

  if (!file.type.startsWith("video/")) {
    return NextResponse.json({ error: "File must be a video." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Video is too large (max 500MB)." }, { status: 400 });
  }

  const submission = await prisma.videoSubmission.create({
    data: {
      userId: session.user.id,
      title: typeof title === "string" && title.trim() ? title.trim() : null,
      note: typeof note === "string" && note.trim() ? note.trim() : null,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
    },
  });

  await ensureUploadsDir();
  const ext = path.extname(file.name);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(uploadFilePath(`${submission.id}${ext}`), buffer);

  return NextResponse.json({ submission }, { status: 201 });
}
