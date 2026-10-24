"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InviteLinkNotice from "@/components/InviteLinkNotice";
import { academyDictionaries, fill } from "@/i18n/dictionaries/academy";
import { LOCALE_LABELS, type AppLocale } from "@/i18n/locales";

export default function AcademyInviteForm({
  academyId,
  lang = "en",
}: {
  academyId: string;
  lang?: AppLocale;
}) {
  const t = academyDictionaries[lang];
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"coach" | "player">("coach");
  const [inviteLang, setInviteLang] = useState<AppLocale>(lang);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSent(null);
    setFallbackUrl(null);
    setSubmitting(true);
    const res = await fetch(`/api/academies/${academyId}/invites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role, lang: inviteLang }),
    });
    const data = await res.json().catch(() => ({}));
    setSubmitting(false);
    if (!res.ok) {
      setError(data.error || t.invite.error);
      return;
    }
    if (data.emailSent) {
      setSent(email);
    } else {
      setFallbackUrl(data.inviteUrl);
    }
    setEmail("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          placeholder={t.invite.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "coach" | "player")}
          aria-label={t.roles.coach + " / " + t.roles.player}
          className="rounded-lg border border-line bg-transparent px-3 py-2 text-sm"
        >
          <option value="coach">{t.roles.coach}</option>
          <option value="player">{t.roles.player}</option>
        </select>
        <select
          value={inviteLang}
          onChange={(e) => setInviteLang(e.target.value as AppLocale)}
          aria-label={t.invite.language}
          title={t.invite.language}
          className="rounded-lg border border-line bg-transparent px-3 py-2 text-sm"
        >
          {(Object.keys(LOCALE_LABELS) as AppLocale[]).map((code) => (
            <option key={code} value={code}>
              {LOCALE_LABELS[code]}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-on-brand text-sm font-semibold px-4 py-2 shadow-sm"
        >
          {submitting ? t.invite.sending : t.invite.send}
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {sent && <p className="text-sm text-brand-700">{fill(t.invite.sent, { email: sent })}</p>}
      {fallbackUrl && (
        <InviteLinkNotice
          message={t.invite.emailFailed}
          url={fallbackUrl}
          copyLabel={t.invite.copyLink}
          copiedLabel={t.invite.copied}
        />
      )}
    </form>
  );
}
