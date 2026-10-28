import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { InsufficientCreditsError } from "@/lib/credits";
import { NoChargeToCorrectError, applyChargeCorrection } from "@/lib/durationCorrection";

/** Admin only: bring the credit charge in line with the video's real length (charge or refund the difference). */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const seconds = typeof body?.actualDurationSec === "number" ? body.actualDurationSec : NaN;
  if (!Number.isFinite(seconds) || seconds <= 0 || seconds > 60 * 60 * 12) {
    return NextResponse.json({ error: "Send the video length in seconds, as read by the player." }, { status: 400 });
  }
  if (!(await prisma.videoSubmission.findUnique({ where: { id }, select: { id: true } }))) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    const result = await applyChargeCorrection(id, seconds);
    return NextResponse.json({ ...result, actualMinutes: Math.round(result.actualMinutes * 10) / 10 });
  } catch (error) {
    if (error instanceof InsufficientCreditsError) {
      return NextResponse.json({ error: `The account cannot cover it: ${error.message.toLowerCase()}.` }, { status: 409 });
    }
    if (error instanceof NoChargeToCorrectError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    throw error;
  }
}
