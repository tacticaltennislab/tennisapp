import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendEmail, welcomeEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password || password.length < 8) {
    return NextResponse.json(
      { error: "Email and a password of at least 8 characters are required." },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists." },
      { status: 409 }
    );
  }

  const referrerId = (await cookies()).get("ref_by")?.value || null;
  const referrer = referrerId
    ? await prisma.user.findUnique({ where: { id: referrerId }, select: { id: true } })
    : null;

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: {
      name: name || null,
      email,
      passwordHash,
      referredByUserId: referrer?.id || null,
    },
  });

  await sendEmail({
    to: email,
    subject: "Welcome to Tactical Tennis Lab",
    html: welcomeEmail(name || null),
  });

  return NextResponse.json({ ok: true });
}
