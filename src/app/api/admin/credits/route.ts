import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { InsufficientCreditsError, adjustCredits, type CreditAccount } from "@/lib/credits";

/** Admin only: add or remove credits for a user or an academy, with a note. */
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const delta = typeof body?.delta === "number" ? body.delta : Number(body?.delta);
  const note = typeof body?.note === "string" ? body.note.trim() : "";
  const userId = typeof body?.userId === "string" ? body.userId : "";
  const academyId = typeof body?.academyId === "string" ? body.academyId : "";

  if (!Number.isInteger(delta) || delta === 0 || Math.abs(delta) > 10000) {
    return NextResponse.json({ error: "Enter a whole number of credits, positive or negative." }, { status: 400 });
  }
  if (!note) {
    return NextResponse.json({ error: "A note is required so the history explains the change." }, { status: 400 });
  }
  if (!userId === !academyId) {
    return NextResponse.json({ error: "Choose either a user or an academy." }, { status: 400 });
  }

  const exists = userId
    ? await prisma.user.findUnique({ where: { id: userId }, select: { id: true } })
    : await prisma.academy.findUnique({ where: { id: academyId }, select: { id: true } });
  if (!exists) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const account: CreditAccount = userId ? { userId } : { academyId };
  try {
    const { balance } = await adjustCredits({ account, delta, note, adminId: session.user.id });
    return NextResponse.json({ balance });
  } catch (error) {
    if (error instanceof InsufficientCreditsError) {
      return NextResponse.json(
        { error: `That would take the balance below zero (it is ${error.balance}).` },
        { status: 400 }
      );
    }
    throw error;
  }
}
