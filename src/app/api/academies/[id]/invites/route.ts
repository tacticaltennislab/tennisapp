import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { canManageAcademy, createAcademyInvite, parseInviteLang } from "@/lib/academy";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const { id } = await params;
  if (!(await canManageAcademy(session.user, id))) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const role = body?.role === "coach" || body?.role === "player" ? body.role : null;
  if (!email.includes("@") || !role) {
    return NextResponse.json({ error: "A valid email and role are required." }, { status: 400 });
  }

  const academy = await prisma.academy.findUnique({ where: { id }, select: { name: true } });
  if (!academy) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    select: { id: true },
  });
  if (existingUser) {
    const alreadyIn =
      role === "player"
        ? await prisma.academyPlayer.findUnique({
            where: { academyId_userId: { academyId: id, userId: existingUser.id } },
            select: { id: true },
          })
        : await prisma.academyMember.findUnique({
            where: { academyId_userId: { academyId: id, userId: existingUser.id } },
            select: { id: true },
          });
    if (alreadyIn) {
      return NextResponse.json(
        { error: `${email} is already ${role === "player" ? "a player" : "on the coaching staff"} in this academy.` },
        { status: 409 }
      );
    }
  }

  const { invite, url, emailSent } = await createAcademyInvite(
    id,
    academy.name,
    email,
    role,
    parseInviteLang(body?.lang)
  );
  return NextResponse.json({
    invite: { id: invite.id, email: invite.email, role: invite.role },
    inviteUrl: url,
    emailSent,
  });
}
