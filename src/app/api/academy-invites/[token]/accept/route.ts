import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const { token } = await params;
  const invite = await prisma.academyInvite.findUnique({ where: { token } });
  if (!invite || invite.acceptedAt || invite.expiresAt < new Date()) {
    return NextResponse.json({ error: "This invitation is no longer valid." }, { status: 410 });
  }

  if ((session.user.email || "").toLowerCase() !== invite.email) {
    return NextResponse.json(
      { error: `This invitation was sent to ${invite.email}. Sign in with that email address.` },
      { status: 403 }
    );
  }

  const accepted = await prisma.$transaction(async (tx) => {
    // Claim the invite first so two concurrent accepts can't both succeed.
    const claim = await tx.academyInvite.updateMany({
      where: { id: invite.id, acceptedAt: null, expiresAt: { gt: new Date() } },
      data: { acceptedAt: new Date() },
    });
    if (claim.count === 0) return false;

    if (invite.role === "player") {
      await tx.academyPlayer.upsert({
        where: { academyId_userId: { academyId: invite.academyId, userId: session.user.id } },
        create: { academyId: invite.academyId, userId: session.user.id },
        update: {},
      });
    } else {
      const existing = await tx.academyMember.findUnique({
        where: { academyId_userId: { academyId: invite.academyId, userId: session.user.id } },
        select: { id: true, role: true },
      });
      if (!existing) {
        await tx.academyMember.create({
          data: { academyId: invite.academyId, userId: session.user.id, role: invite.role },
        });
      } else if (invite.role === "owner" && existing.role !== "owner") {
        await tx.academyMember.update({ where: { id: existing.id }, data: { role: "owner" } });
      }
    }
    return true;
  });

  if (!accepted) {
    return NextResponse.json({ error: "This invitation is no longer valid." }, { status: 410 });
  }

  return NextResponse.json({ academyId: invite.academyId });
}
