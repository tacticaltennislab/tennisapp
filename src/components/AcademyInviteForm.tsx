"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AcademyInviteForm({ academyId }: { academyId: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"coach" | "player">("coach");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSent(null);
    setSubmitting(true);
    const res = await fetch(`/api/academies/${academyId}/invites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    });
    const data = await res.json().catch(() => ({}));
    setSubmitting(false);
    if (!res.ok) {
      setError(data.error || "Could not send invitation.");
      return;
    }
    setSent(email);
    setEmail("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "coach" | "player")}
          className="rounded-lg border border-line bg-transparent px-3 py-2 text-sm"
        >
          <option value="coach">Coach</option>
          <option value="player">Player</option>
        </select>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 shadow-sm"
        >
          {submitting ? "Sending..." : "Send invite"}
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {sent && <p className="text-sm text-brand-700">Invitation sent to {sent}.</p>}
    </form>
  );
}
