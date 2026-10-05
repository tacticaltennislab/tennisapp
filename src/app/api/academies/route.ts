import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createAcademyInvite, parseInviteLang } from "@/lib/academy";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const ownerEmail = typeof body?.ownerEmail === "string" ? body.ownerEmail.trim() : "";
  if (!name || !ownerEmail.includes("@")) {
    return NextResponse.json({ error: "Academy name and owner email are required." }, { status: 400 });
  }

  const academy = await prisma.academy.create({ data: { name } });
  const { url, emailSent } = await createAcademyInvite(
    academy.id,
    academy.name,
    ownerEmail,
    "owner",
    parseInviteLang(body?.lang)
  );

  return NextResponse.json({ academy, inviteUrl: url, emailSent });
}
