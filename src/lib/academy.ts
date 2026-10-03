import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendEmail, academyInviteEmail } from "@/lib/email";

interface Viewer {
  id: string;
  email?: string | null;
  role?: string;
}

const INVITE_TTL_MS = 14 * 24 * 60 * 60 * 1000;

export async function canReviewPlayer(viewer: Viewer, playerUserId: string): Promise<boolean> {
  if (viewer.role === "admin") return true;
  const link = await prisma.academyPlayer.findFirst({
    where: {
      userId: playerUserId,
      academy: { members: { some: { userId: viewer.id } } },
    },
    select: { id: true },
  });
  return link !== null;
}

export async function canViewAcademy(viewer: Viewer, academyId: string): Promise<boolean> {
  if (viewer.role === "admin") return true;
  const membership = await prisma.academyMember.findUnique({
    where: { academyId_userId: { academyId, userId: viewer.id } },
    select: { id: true },
  });
  return membership !== null;
}

export async function canManageAcademy(viewer: Viewer, academyId: string): Promise<boolean> {
  if (viewer.role === "admin") return true;
  const membership = await prisma.academyMember.findUnique({
    where: { academyId_userId: { academyId, userId: viewer.id } },
    select: { role: true },
  });
  return membership?.role === "owner";
}

export function inviteUrl(token: string): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tacticaltennislab.com";
  return `${siteUrl}/academy/invite/${token}`;
}

export async function createAcademyInvite(
  academyId: string,
  academyName: string,
  email: string,
  role: "owner" | "coach" | "player"
) {
  const token = randomBytes(32).toString("hex");
  const invite = await prisma.academyInvite.create({
    data: {
      academyId,
      email: email.toLowerCase(),
      role,
      token,
      expiresAt: new Date(Date.now() + INVITE_TTL_MS),
    },
  });

  const url = inviteUrl(token);
  await sendEmail({
    to: invite.email,
    subject: `Invitation to ${academyName} on Tactical Tennis Lab`,
    html: academyInviteEmail(academyName, role, url),
  });

  return { invite, url };
}
