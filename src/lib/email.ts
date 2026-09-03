import { Resend } from "resend";

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM = `Tactical Tennis Lab <hello@${process.env.RESEND_EMAIL_DOMAIN || "tacticaltennislab.com"}>`;

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping email send:", subject, "to", to);
    return;
  }

  try {
    const { error } = await resend.emails.send({ from: FROM, to, subject, html });
    if (error) {
      console.error("Failed to send email:", error);
    }
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

function layout(title: string, bodyHtml: string) {
  return `
    <div style="font-family: -apple-system, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #12181f;">
      <p style="font-size: 13px; font-weight: 700; color: #1b7a45; text-transform: uppercase; letter-spacing: 0.04em; margin: 0 0 8px;">Tactical Tennis Lab</p>
      <h1 style="font-size: 22px; margin: 0 0 16px;">${title}</h1>
      ${bodyHtml}
      <p style="margin-top: 32px; font-size: 12px; color: #6b7280;">Tactical Tennis Lab &mdash; training plans for every level.</p>
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
      <a href="${resetUrl}" style="background: #1b7a45; color: #fff; padding: 12px 20px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px;">Reset password</a>
    </p>
    <p style="font-size: 13px; color: #6b7280;">If you didn't request this, you can ignore this email.</p>`
  );
}

export function coachFeedbackEmail(title: string, coachNotes: string) {
  return layout(
    "Your video has been reviewed",
    `<p style="font-size: 15px; line-height: 1.6;">
      A coach reviewed <strong>${escapeHtml(title)}</strong> and left feedback:
    </p>
    <blockquote style="margin: 16px 0; padding: 12px 16px; background: #eaf7ef; border-radius: 10px; font-size: 14px; white-space: pre-wrap;">${escapeHtml(coachNotes)}</blockquote>
    <p style="margin: 24px 0;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://tacticaltennislab.com"}/account" style="background: #1b7a45; color: #fff; padding: 12px 20px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px;">View in your account</a>
    </p>`
  );
}

export function newMessageFromCustomerEmail(customerName: string, customerEmail: string, body: string) {
  return layout(
    "New message from a customer",
    `<p style="font-size: 14px; color: #6b7280;">From: <strong style="color:#12181f;">${escapeHtml(customerName)}</strong> (${escapeHtml(customerEmail)})</p>
    <blockquote style="margin: 16px 0; padding: 12px 16px; background: #f4f4f4; border-radius: 10px; font-size: 14px; white-space: pre-wrap;">${escapeHtml(body)}</blockquote>
    <p style="margin: 24px 0;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://tacticaltennislab.com"}/customers" style="background: #1b7a45; color: #fff; padding: 12px 20px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px;">Reply in dashboard</a>
    </p>`
  );
}

export function newMessageFromCoachEmail(body: string) {
  return layout(
    "New message from your coach",
    `<blockquote style="margin: 16px 0; padding: 12px 16px; background: #eaf7ef; border-radius: 10px; font-size: 14px; white-space: pre-wrap;">${escapeHtml(body)}</blockquote>
    <p style="margin: 24px 0;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://tacticaltennislab.com"}/account" style="background: #1b7a45; color: #fff; padding: 12px 20px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px;">Reply in your account</a>
    </p>`
  );
}

export function waitlistNotificationEmail(name: string, email: string) {
  return layout(
    "New waitlist signup",
    `<p style="font-size: 14px; color: #6b7280;">
      <strong style="color:#12181f;">${escapeHtml(name)}</strong> (${escapeHtml(email)}) just joined the waitlist.
    </p>`
  );
}

export function contactFormEmail(name: string, email: string, message: string) {
  return layout(
    "New contact form message",
    `<p style="font-size: 14px; color: #6b7280;">From: <strong style="color:#12181f;">${escapeHtml(name)}</strong> (${escapeHtml(email)})</p>
    <blockquote style="margin: 16px 0; padding: 12px 16px; background: #f4f4f4; border-radius: 10px; font-size: 14px; white-space: pre-wrap;">${escapeHtml(message)}</blockquote>`
  );
}
