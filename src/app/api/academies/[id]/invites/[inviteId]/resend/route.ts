import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { canManageAcademy, parseInviteLang, resendAcademyInvite } from "@/lib/academy";

export async function POST(
  request: Request,
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

  const invite = await prisma.academyInvite.findFirst({
    where: { id: inviteId, academyId: id, acceptedAt: null },
    include: { academy: { select: { name: true } } },
  });
  if (!invite) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const { url, emailSent } = await resendAcademyInvite(
    invite.id,
    invite.academy.name,
    parseInviteLang(body?.lang)
  );
  return NextResponse.json({ inviteUrl: url, emailSent });
}
