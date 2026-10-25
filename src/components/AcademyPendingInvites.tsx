"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InviteLinkNotice from "@/components/InviteLinkNotice";
import { academyDictionaries, fill } from "@/i18n/dictionaries/academy";
import type { AppLocale } from "@/i18n/locales";

interface PendingInvite {
  id: string;
  email: string;
  role: string;
}

export default function AcademyPendingInvites({
  academyId,
  invites,
  lang = "en",
}: {
  academyId: string;
  invites: PendingInvite[];
  lang?: AppLocale;
}) {
  const t = academyDictionaries[lang];
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  function roleLabel(role: string) {
    return role === "owner" ? t.roles.owner : role === "coach" ? t.roles.coach : t.roles.player;
  }

  async function handleCancel(invite: PendingInvite) {
    if (!window.confirm(fill(t.pending.cancelConfirm, { email: invite.email }))) return;
    setBusy(invite.id);
    setNotice(null);
    setError(null);
    setFallbackUrl(null);
    const res = await fetch(`/api/academies/${academyId}/invites/${invite.id}`, { method: "DELETE" });
    setBusy(null);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || t.pending.cancelError);
      return;
    }
    router.refresh();
  }

  async function handleResend(invite: PendingInvite) {
    setBusy(invite.id);
    setNotice(null);
    setError(null);
    setFallbackUrl(null);
    const res = await fetch(`/api/academies/${academyId}/invites/${invite.id}/resend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(null);
    if (!res.ok) {
      setError(data.error || t.pending.resendError);
      return;
    }
    if (data.emailSent) {
      setNotice(fill(t.pending.resent, { email: invite.email }));
    } else {
      setFallbackUrl(data.inviteUrl);
    }
    router.refresh();
  }

  if (invites.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="text-xs text-muted mb-2">{t.pending.title}</p>
      <ul className="divide-y divide-line rounded-2xl border border-line text-sm">
        {invites.map((inv) => (
          <li key={inv.id} className="flex flex-wrap items-center justify-between gap-2 p-3">
            <span className="min-w-0 break-all">
              {inv.email} <span className="text-muted">({roleLabel(inv.role)})</span>
            </span>
            <span className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleResend(inv)}
                disabled={busy !== null}
                className="text-xs text-brand-600 hover:text-brand-700 disabled:opacity-60"
              >
                {busy === inv.id ? t.pending.resending : t.pending.resend}
              </button>
              <button
                type="button"
                onClick={() => handleCancel(inv)}
                disabled={busy !== null}
                className="text-xs text-red-600 hover:text-red-700 disabled:opacity-60"
              >
                {t.pending.cancel}
              </button>
            </span>
          </li>
        ))}
      </ul>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {notice && <p className="mt-2 text-sm text-brand-700">{notice}</p>}
      {fallbackUrl && (
        <div className="mt-2">
          <InviteLinkNotice
            message={t.pending.emailFailed}
            url={fallbackUrl}
            copyLabel={t.invite.copyLink}
            copiedLabel={t.invite.copied}
          />
        </div>
      )}
    </div>
  );
}
