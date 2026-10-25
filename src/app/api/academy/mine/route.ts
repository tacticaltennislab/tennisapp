import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const memberships = await prisma.academyMember.findMany({
    where: { userId: session.user.id },
    select: { academy: { select: { id: true, name: true } } },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({
    academies: memberships.map((m) => m.academy),
    isAdmin: session.user.role === "admin",
  });
}
