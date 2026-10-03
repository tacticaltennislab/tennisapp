import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { canManageAcademy, createAcademyInvite } from "@/lib/academy";

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

  const { invite } = await createAcademyInvite(id, academy.name, email, role);
  return NextResponse.json({ invite: { id: invite.id, email: invite.email, role: invite.role } });
}
