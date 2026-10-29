import { Resend } from "resend";
import type { AppLocale } from "@/i18n/locales";

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

let resendClient: Resend | null = null;

/** The Resend client, created on first use; null when RESEND_API_KEY is not set. */
function getResend(): Resend | null {
  if (resendClient) return resendClient;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  resendClient = new Resend(key);
  return resendClient;
}

const FROM = `Tactical Tennis Lab <hello@${process.env.RESEND_EMAIL_DOMAIN || "tacticaltennislab.com"}>`;

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping email send:", subject, "to", to);
    return false;
  }

  try {
    const { error } = await resend.emails.send({ from: FROM, to, subject, html });
    if (error) {
      console.error("Failed to send email:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}

function layout(title: string, bodyHtml: string) {
  return `
    <div style="font-family: -apple-system, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #14231a;">
      <p style="font-size: 13px; font-weight: 700; color: #24432f; text-transform: uppercase; letter-spacing: 0.04em; margin: 0 0 8px;">Tactical Tennis Lab</p>
      <h1 style="font-size: 22px; margin: 0 0 16px;">${title}</h1>
      ${bodyHtml}
      <p style="margin-top: 32px; font-size: 12px; color: #6b7280;">Tactical Tennis Lab: video and match analysis for tennis academies and clubs.</p>
    </div>
  `;
}

export function welcomeEmail(name: string | null) {
  return layout(
    `Welcome${name ? `, ${escapeHtml(name)}` : ""}!`,
    `<p style="font-size: 15px; line-height: 1.6;">
      Your Tactical Tennis Lab account is ready. Build a free training plan,
      or send in a practice video and one of our coaches will review it
      frame by frame.
    </p>`
  );
}

export function passwordResetEmail(resetUrl: string) {
  return layout(
    "Reset your password",
    `<p style="font-size: 15px; line-height: 1.6;">
      We got a request to reset your password. This link expires in 1 hour.
    </p>
    <p style="margin: 24px 0;">
      <a href="${resetUrl}" style="background: #24432f; color: #fff; padding: 12px 20px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 14px;">Reset password</a>
    </p>
    <p style="font-size: 13px; color: #6b7280;">If you didn't request this, you can ignore this email.</p>`
  );
}

type InviteRole = "owner" | "coach" | "player";

const INVITE_COPY: Record<
  AppLocale,
  {
    subject: (academy: string) => string;
    title: (academy: string) => string;
    intro: (role: InviteRole, academy: string) => string;
    button: string;
    footer: string;
  }
> = {
  en: {
    subject: (a) => `Invitation to ${a} on Tactical Tennis Lab`,
    title: (a) => `Invitation to ${a}`,
    intro: (role, a) =>
      `You've been invited to ${
        role === "owner"
          ? "manage your academy's account on Tactical Tennis Lab"
          : role === "coach"
            ? "review your academy's players' videos on Tactical Tennis Lab"
            : "join your academy on Tactical Tennis Lab so your coaches can review your videos"
      } as part of <strong>${a}</strong>.`,
    button: "Accept invitation",
    footer:
      "Sign in, or create an account, with the email address this invitation was sent to. The link expires in 14 days.",
  },
  pl: {
    subject: (a) => `Zaproszenie do ${a} w Tactical Tennis Lab`,
    title: (a) => `Zaproszenie do ${a}`,
    intro: (role, a) =>
      `Zaproszono Cię do ${
        role === "owner"
          ? "zarządzania kontem Twojej akademii w Tactical Tennis Lab"
          : role === "coach"
            ? "oceniania filmów zawodników Twojej akademii w Tactical Tennis Lab"
            : "dołączenia do Twojej akademii w Tactical Tennis Lab, aby trenerzy mogli oceniać Twoje filmy"
      } w ramach <strong>${a}</strong>.`,
    button: "Przyjmij zaproszenie",
    footer:
      "Zaloguj się lub załóż konto na adres e-mail, na który wysłano to zaproszenie. Link wygasa po 14 dniach.",
  },
  es: {
    subject: (a) => `Invitación a ${a} en Tactical Tennis Lab`,
    title: (a) => `Invitación a ${a}`,
    intro: (role, a) =>
      `Te han invitado a ${
        role === "owner"
          ? "gestionar la cuenta de tu academia en Tactical Tennis Lab"
          : role === "coach"
            ? "revisar los vídeos de los jugadores de tu academia en Tactical Tennis Lab"
            : "unirte a tu academia en Tactical Tennis Lab para que tus entrenadores puedan revisar tus vídeos"
      } como parte de <strong>${a}</strong>.`,
    button: "Aceptar invitación",
    footer:
      "Inicia sesión o crea una cuenta con la dirección de correo a la que se envió esta invitación. El enlace caduca en 14 días.",
  },
  it: {
    subject: (a) => `Invito a ${a} su Tactical Tennis Lab`,
    title: (a) => `Invito a ${a}`,
    intro: (role, a) =>
      `Ti è stato inviato un invito a ${
        role === "owner"
          ? "gestire l'account della tua accademia su Tactical Tennis Lab"
          : role === "coach"
            ? "esaminare i video dei giocatori della tua accademia su Tactical Tennis Lab"
            : "unirti alla tua accademia su Tactical Tennis Lab, così i tuoi allenatori potranno esaminare i tuoi video"
      } come parte di <strong>${a}</strong>.`,
    button: "Accetta l'invito",
    footer:
      "Accedi o crea un account con l'indirizzo e-mail a cui è stato inviato questo invito. Il link scade tra 14 giorni.",
  },
  ru: {
    subject: (a) => `Приглашение в ${a} на Tactical Tennis Lab`,
    title: (a) => `Приглашение в ${a}`,
    intro: (role, a) =>
      `Вас пригласили ${
        role === "owner"
          ? "управлять аккаунтом вашей академии на Tactical Tennis Lab"
          : role === "coach"
            ? "просматривать видео игроков вашей академии на Tactical Tennis Lab"
            : "присоединиться к вашей академии на Tactical Tennis Lab, чтобы тренеры могли разбирать ваши видео"
      } в составе <strong>${a}</strong>.`,
    button: "Принять приглашение",
    footer:
      "Войдите или создайте аккаунт с адресом электронной почты, на который отправлено это приглашение. Ссылка действует 14 дней.",
  },
};

export function academyInviteSubject(academyName: string, lang: AppLocale = "en") {
  return INVITE_COPY[lang].subject(academyName);
}

export function academyInviteEmail(
  academyName: string,
  role: InviteRole,
  inviteUrl: string,
  lang: AppLocale = "en"
) {
  const copy = INVITE_COPY[lang];
  const name = escapeHtml(academyName);
  return layout(
    copy.title(name),
    `<p style="font-size: 15px; line-height: 1.6;">${copy.intro(role, name)}</p>
    <p style="margin: 24px 0;">
      <a href="${inviteUrl}" style="background: #24432f; color: #fff; padding: 12px 20px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 14px;">${copy.button}</a>
    </p>
    <p style="font-size: 13px; color: #6b7280;">${copy.footer}</p>`
  );
}

export function coachFeedbackEmail(title: string, coachNotes: string) {
  return layout(
    "Your video has been reviewed",
    `<p style="font-size: 15px; line-height: 1.6;">
      A coach reviewed <strong>${escapeHtml(title)}</strong> and left feedback:
    </p>
    <blockquote style="margin: 16px 0; padding: 12px 16px; background: #eceedd; border-radius: 4px; font-size: 14px; white-space: pre-wrap;">${escapeHtml(coachNotes)}</blockquote>
    <p style="margin: 24px 0;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://tacticaltennislab.com"}/account" style="background: #24432f; color: #fff; padding: 12px 20px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 14px;">View in your account</a>
    </p>`
  );
}

export function analysisReadyEmail(title: string, priorities: string[], url: string) {
  return layout(
    "Your analysis is ready",
    `<p style="font-size: 15px; line-height: 1.6;">The review of <strong>${escapeHtml(title)}</strong> is ready.</p>
    ${
      priorities.length > 0
        ? `<p style="font-size: 14px; margin: 16px 0 6px;">Your priorities:</p><ol style="font-size: 14px; line-height: 1.6; padding-left: 20px;">${priorities
            .map((p) => `<li>${escapeHtml(p)}</li>`)
            .join("")}</ol>`
        : ""
    }
    <p style="margin: 24px 0;">
      <a href="${url}" style="background: #24432f; color: #fff; padding: 12px 20px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 14px;">Open your analysis</a>
    </p>`
  );
}

export function submissionRejectedEmail(title: string, reason: string | null, creditsRefunded: number) {
  return layout(
    "We could not analyse your video",
    `<p style="font-size: 15px; line-height: 1.6;">
      We were not able to analyse <strong>${escapeHtml(title)}</strong>.
      ${creditsRefunded > 0 ? `${creditsRefunded} credit${creditsRefunded === 1 ? " has" : "s have"} been returned to your balance.` : ""}
    </p>
    ${reason ? `<blockquote style="margin: 16px 0; padding: 12px 16px; background: #eceedd; border-radius: 4px; font-size: 14px; white-space: pre-wrap;">${escapeHtml(reason)}</blockquote>` : ""}
    <p style="margin: 24px 0;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://tacticaltennislab.com"}/submit-video" style="background: #24432f; color: #fff; padding: 12px 20px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 14px;">Send another video</a>
    </p>`
  );
}

export function newMessageFromCustomerEmail(customerName: string, customerEmail: string, body: string) {
  return layout(
    "New message from a customer",
    `<p style="font-size: 14px; color: #6b7280;">From: <strong style="color:#12181f;">${escapeHtml(customerName)}</strong> (${escapeHtml(customerEmail)})</p>
    <blockquote style="margin: 16px 0; padding: 12px 16px; background: #f4f4f4; border-radius: 4px; font-size: 14px; white-space: pre-wrap;">${escapeHtml(body)}</blockquote>
    <p style="margin: 24px 0;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://tacticaltennislab.com"}/customers" style="background: #24432f; color: #fff; padding: 12px 20px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 14px;">Reply in dashboard</a>
    </p>`
  );
}

export function newMessageFromCoachEmail(body: string) {
  return layout(
    "New message from your coach",
    `<blockquote style="margin: 16px 0; padding: 12px 16px; background: #eceedd; border-radius: 4px; font-size: 14px; white-space: pre-wrap;">${escapeHtml(body)}</blockquote>
    <p style="margin: 24px 0;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://tacticaltennislab.com"}/account" style="background: #24432f; color: #fff; padding: 12px 20px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 14px;">Reply in your account</a>
    </p>`
  );
}

export function contactFormEmail(name: string, email: string, message: string) {
  return layout(
    "New contact form message",
    `<p style="font-size: 14px; color: #6b7280;">From: <strong style="color:#12181f;">${escapeHtml(name)}</strong> (${escapeHtml(email)})</p>
    <blockquote style="margin: 16px 0; padding: 12px 16px; background: #f4f4f4; border-radius: 4px; font-size: 14px; white-space: pre-wrap;">${escapeHtml(message)}</blockquote>`
  );
}
