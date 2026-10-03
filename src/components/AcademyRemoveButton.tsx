"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AcademyRemoveButton({ url, label }: { url: string; label: string }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRemove() {
    if (!window.confirm(`Remove ${label} from this academy?`)) return;
    setError(null);
    setSubmitting(true);
    const res = await fetch(url, { method: "DELETE" });
    if (!res.ok) {
      setSubmitting(false);
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Could not remove.");
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex flex-col items-end">
      <button
        type="button"
        onClick={handleRemove}
        disabled={submitting}
        className="text-xs text-red-600 hover:text-red-700 disabled:opacity-60"
      >
        {submitting ? "Removing..." : "Remove"}
      </button>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
