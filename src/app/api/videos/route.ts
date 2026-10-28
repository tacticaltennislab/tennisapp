import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { isFocusArea, isGoal, isSkillLevel } from "@/lib/trainingOptions";
import { isFootageType } from "@/lib/freeAnalysis";
import { InsufficientCreditsError, consumeCredits, creditsNeeded, isFootageKind, resolveCreditAccount } from "@/lib/credits";
import { del } from "@vercel/blob";

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

  const wantsFree = body?.free === true;
  const footageType = isFootageType(body?.footageType) ? body.footageType : null;
  const publishConsent = wantsFree && body?.publishConsent === true;

  if (!storagePath || !fileName || !fileType || !fileSize) {
    return NextResponse.json({ error: "Missing video upload details." }, { status: 400 });
  }
  if (!fileType.startsWith("video/")) {
    return NextResponse.json({ error: "File must be a video." }, { status: 400 });
  }

  if (wantsFree && !footageType) {
    return NextResponse.json({ error: "Say whether the video is a match or a training session." }, { status: 400 });
  }

  // What the analysis costs and who pays: the user's own credits, or an academy's if they belong to it.
  const analysisType = isFootageKind(body?.analysisType) ? body.analysisType : wantsFree ? footageType! : "stroke";
  const durationMinutes = typeof body?.durationMinutes === "number" ? body.durationMinutes : undefined;
  const needed = creditsNeeded(analysisType, durationMinutes);
  const academyId = typeof body?.academyId === "string" && body.academyId ? body.academyId : null;
  const account = await resolveCreditAccount(session.user.id, academyId);
  if (!account) {
    return NextResponse.json({ error: "You cannot use that academy's credits." }, { status: 403 });
  }

  // The submission and its credits are one transaction: if the balance is too low nothing is saved.
  let submission;
  try {
    submission = await prisma.$transaction(async (tx) => {
      const created = await tx.videoSubmission.create({
        data: {
          userId: session.user.id,
          isFree: wantsFree,
          footageType: wantsFree ? footageType : null,
          publishConsent,
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
      await consumeCredits(
        {
          account,
          amount: needed,
          videoSubmissionId: created.id,
          note: durationMinutes ? `${analysisType}, ${Math.round(durationMinutes)} min` : analysisType,
          idempotencyKey: `submission:${created.id}`,
        },
        tx
      );
      return created;
    });
  } catch (error) {
    if (error instanceof InsufficientCreditsError) {
      // The file was already uploaded; do not leave it behind.
      await del(storagePath).catch(() => undefined);
      return NextResponse.json(
        {
          error: error.message,
          code: "insufficient_credits",
          needed: error.needed,
          balance: error.balance,
          missing: error.missing,
        },
        { status: 402 }
      );
    }
    throw error;
  }

  return NextResponse.json({ submission }, { status: 201 });
}
