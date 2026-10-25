import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendEmail, academyInviteEmail, academyInviteSubject } from "@/lib/email";
import { isLocale, localizedHref, type AppLocale } from "@/i18n/locales";

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

export function inviteUrl(token: string, lang: AppLocale = "en"): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tacticaltennislab.com";
  return `${siteUrl}${localizedHref(lang, `/academy/invite/${token}`)}`;
}

export function parseInviteLang(value: unknown): AppLocale {
  return typeof value === "string" && (value === "en" || isLocale(value)) ? value : "en";
}

export type InviteRole = "owner" | "coach" | "player";

async function emailInvite(
  invite: { email: string; role: string; token: string },
  academyName: string,
  lang: AppLocale
) {
  const url = inviteUrl(invite.token, lang);
  const emailSent = await sendEmail({
    to: invite.email,
    subject: academyInviteSubject(academyName, lang),
    html: academyInviteEmail(academyName, invite.role as InviteRole, url, lang),
  });
  return { url, emailSent };
}

/** Creates an invite (replacing any still-pending one for the same
 * email + role in this academy) and emails it. */
export async function createAcademyInvite(
  academyId: string,
  academyName: string,
  email: string,
  role: InviteRole,
  lang: AppLocale = "en"
) {
  const normalized = email.trim().toLowerCase();
  const token = randomBytes(32).toString("hex");
  const invite = await prisma.$transaction(async (tx) => {
    await tx.academyInvite.deleteMany({
      where: { academyId, email: normalized, role, acceptedAt: null },
    });
    return tx.academyInvite.create({
      data: {
        academyId,
        email: normalized,
        role,
        token,
        expiresAt: new Date(Date.now() + INVITE_TTL_MS),
      },
    });
  });

  const { url, emailSent } = await emailInvite(invite, academyName, lang);
  return { invite, url, emailSent };
}

/** Extends an existing pending invite's expiry and emails it again. */
export async function resendAcademyInvite(inviteId: string, academyName: string, lang: AppLocale = "en") {
  const invite = await prisma.academyInvite.update({
    where: { id: inviteId },
    data: { expiresAt: new Date(Date.now() + INVITE_TTL_MS) },
  });
  const { url, emailSent } = await emailInvite(invite, academyName, lang);
  return { invite, url, emailSent };
}
