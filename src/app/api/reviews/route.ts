import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

const ADMIN_INBOX = process.env.CONTACT_INBOX_EMAIL || "tacticaltennislab@gmail.com";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const rating = Number(body?.rating);
  const text = typeof body?.body === "string" ? body.body.trim() : "";

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 });
  }
  if (!text || text.length < 10) {
    return NextResponse.json(
      { error: "Please write at least a couple of sentences." },
      { status: 400 }
    );
  }

  const review = await prisma.review.upsert({
    where: { userId: session.user.id },
    create: { userId: session.user.id, rating, body: text },
    update: { rating, body: text, status: "pending", reviewedAt: null },
  });

  await sendEmail({
    to: ADMIN_INBOX,
    subject: "New review awaiting approval",
    html: `<p>${session.user.name || session.user.email} left a ${rating}-star review:</p><p>"${text}"</p>`,
  });

  return NextResponse.json({ review });
}
