import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { canManageAcademy } from "@/lib/academy";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; inviteId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const { id, inviteId } = await params;
  if (!(await canManageAcademy(session.user, id))) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  // Scoped to this academy and to still-pending invites, so one academy
  // can never cancel another's invitation and accepted invites stay as a
  // record of consent.
  const result = await prisma.academyInvite.deleteMany({
    where: { id: inviteId, academyId: id, acceptedAt: null },
  });
  if (result.count === 0) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
