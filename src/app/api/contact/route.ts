import { NextResponse } from "next/server";
import { sendEmail, contactFormEmail } from "@/lib/email";

const CONTACT_INBOX = process.env.CONTACT_INBOX_EMAIL || "hello@tacticaltennislab.com";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  await sendEmail({
    to: CONTACT_INBOX,
    subject: `New message from ${name}`,
    html: contactFormEmail(name, email, message),
  });

  return NextResponse.json({ ok: true });
}
