import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  await prisma.message.updateMany({
    where: { userId: session.user.id, sender: "admin", read: false },
    data: { read: true },
  });

  return NextResponse.json({ ok: true });
}
