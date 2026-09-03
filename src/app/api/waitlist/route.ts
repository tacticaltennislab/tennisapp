import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, waitlistNotificationEmail } from "@/lib/email";

const CONTACT_INBOX = process.env.CONTACT_INBOX_EMAIL || "tacticaltennislab@gmail.com";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const existing = await prisma.waitlistEntry.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ ok: true });
  }

  await prisma.waitlistEntry.create({ data: { name, email } });

  await sendEmail({
    to: CONTACT_INBOX,
    subject: `New waitlist signup: ${name}`,
    html: waitlistNotificationEmail(name, email),
  });

  return NextResponse.json({ ok: true });
}
