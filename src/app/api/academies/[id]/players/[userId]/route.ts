import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { canManageAcademy } from "@/lib/academy";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; userId: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const { id, userId } = await params;
  if (!(await canManageAcademy(session.user, id))) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  await prisma.academyPlayer.deleteMany({ where: { academyId: id, userId } });

  return NextResponse.json({ ok: true });
}
