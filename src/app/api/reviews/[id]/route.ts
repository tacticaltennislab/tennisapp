import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) return { error: NextResponse.json({ error: "Sign in required." }, { status: 401 }) };
  if (session.user.role !== "admin") {
    return { error: NextResponse.json({ error: "Not authorized." }, { status: 403 }) };
  }
  return { session };
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const status = body?.status;
  if (status !== "approved" && status !== "rejected") {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const review = await prisma.review.update({
    where: { id },
    data: { status, reviewedAt: new Date() },
  });

  return NextResponse.json({ review });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  await prisma.review.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
