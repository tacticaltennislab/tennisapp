"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InviteLinkNotice from "@/components/InviteLinkNotice";
import { LOCALE_LABELS, type AppLocale } from "@/i18n/locales";

export default function AcademyCreateForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inviteLang, setInviteLang] = useState<AppLocale>("en");
  const [result, setResult] = useState<{ name: string; inviteUrl: string; emailSent: boolean } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setSubmitting(true);
    const res = await fetch("/api/academies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, ownerEmail, lang: inviteLang }),
    });
    const data = await res.json().catch(() => ({}));
    setSubmitting(false);
    if (!res.ok) {
      setError(data.error || "Could not create academy.");
      return;
    }
    setResult({ name: data.academy.name, inviteUrl: data.inviteUrl, emailSent: Boolean(data.emailSent) });
    setName("");
    setOwnerEmail("");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          required
          placeholder="Academy name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600"
        />
        <input
          type="email"
          required
          placeholder="Owner's email address"
          value={ownerEmail}
          onChange={(e) => setOwnerEmail(e.target.value)}
          className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600"
        />
        <select
          value={inviteLang}
          onChange={(e) => setInviteLang(e.target.value as AppLocale)}
          aria-label="Invitation language"
          className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm"
        >
          {(Object.keys(LOCALE_LABELS) as AppLocale[]).map((code) => (
            <option key={code} value={code}>
              Invitation language: {LOCALE_LABELS[code]}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-on-brand text-sm font-semibold px-4 py-2 shadow-sm"
        >
          {submitting ? "Creating..." : "Create academy & send owner invite"}
        </button>
      </form>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result &&
        (result.emailSent ? (
          <div className="rounded-xl border border-line bg-surface-muted p-4 text-sm space-y-2">
            <p>
              <strong>{result.name}</strong> created. The owner has been emailed an invitation. Backup link
              (valid 14 days):
            </p>
            <p className="break-all text-xs text-muted">{result.inviteUrl}</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm">
              <strong>{result.name}</strong> created, but the invitation email could not be delivered.
            </p>
            <InviteLinkNotice
              message="Copy this link (valid 14 days) and send it to the owner yourself:"
              url={result.inviteUrl}
              copyLabel="Copy link"
              copiedLabel="Copied"
            />
          </div>
        ))}
    </div>
  );
}
