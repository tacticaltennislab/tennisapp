import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendEmail, newMessageFromCustomerEmail, newMessageFromCoachEmail } from "@/lib/email";

const ADMIN_INBOX = process.env.CONTACT_INBOX_EMAIL || "tacticaltennislab@gmail.com";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const text = typeof body?.body === "string" ? body.body.trim() : "";
  const isAdmin = session.user.role === "admin";
  const targetUserId = isAdmin && typeof body?.userId === "string" ? body.userId : session.user.id;

  if (!text) {
    return NextResponse.json({ error: "Message can't be empty." }, { status: 400 });
  }

  const message = await prisma.message.create({
    data: {
      userId: targetUserId,
      sender: isAdmin ? "admin" : "customer",
      body: text,
    },
  });

  if (isAdmin) {
    const customer = await prisma.user.findUnique({ where: { id: targetUserId } });
    if (customer) {
      await sendEmail({
        to: customer.email,
        subject: "New message from your coach",
        html: newMessageFromCoachEmail(text),
      });
    }
  } else {
    await sendEmail({
      to: ADMIN_INBOX,
      subject: `New message from ${session.user.name || session.user.email}`,
      html: newMessageFromCustomerEmail(session.user.name || "A customer", session.user.email || "", text),
    });
  }

  return NextResponse.json({ message }, { status: 201 });
}
