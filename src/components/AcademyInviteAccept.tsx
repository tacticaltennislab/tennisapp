"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconArrowRight } from "@/components/icons";

export default function AcademyInviteAccept({
  token,
  academyName,
  role,
}: {
  token: string;
  academyName: string;
  role: string;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAccept() {
    setError(null);
    setSubmitting(true);
    const res = await fetch(`/api/academy-invites/${token}/accept`, { method: "POST" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setSubmitting(false);
      setError(data.error || "Could not accept this invitation.");
      return;
    }
    router.push(`/academy/${data.academyId}`);
  }

  const roleText =
    role === "owner"
      ? "manage this academy's account"
      : role === "coach"
        ? "review your academy's players' videos"
        : "join this academy so your coaches can review your videos";

  return (
    <div className="text-center">
      <p className="text-body">
        You&apos;ve been invited to {roleText} as part of <strong>{academyName}</strong>.
      </p>
      <button
        type="button"
        onClick={handleAccept}
        disabled={submitting}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold px-5 py-3 shadow-sm hover:shadow-md transition-all"
      >
        {submitting ? "Accepting..." : "Accept invitation"}
        <IconArrowRight className="w-4 h-4" />
      </button>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </div>
  );
}
