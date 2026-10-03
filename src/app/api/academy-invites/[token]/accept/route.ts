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

  await prisma.$transaction(async (tx) => {
    if (invite.role === "player") {
      await tx.academyPlayer.upsert({
        where: { academyId_userId: { academyId: invite.academyId, userId: session.user.id } },
        create: { academyId: invite.academyId, userId: session.user.id },
        update: {},
      });
    } else {
      await tx.academyMember.upsert({
        where: { academyId_userId: { academyId: invite.academyId, userId: session.user.id } },
        create: { academyId: invite.academyId, userId: session.user.id, role: invite.role },
        update: {},
      });
    }
    await tx.academyInvite.update({
      where: { id: invite.id },
      data: { acceptedAt: new Date() },
    });
  });

  return NextResponse.json({ academyId: invite.academyId });
}
