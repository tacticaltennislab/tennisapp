import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const coaches = await prisma.coach.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ coaches });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  const coach = await prisma.coach.create({
    data: {
      name,
      email: typeof body?.email === "string" ? body.email.trim() || null : null,
      phone: typeof body?.phone === "string" ? body.phone.trim() || null : null,
      specialty: typeof body?.specialty === "string" ? body.specialty.trim() || null : null,
      bio: typeof body?.bio === "string" ? body.bio.trim() || null : null,
    },
  });

  return NextResponse.json({ coach }, { status: 201 });
}
