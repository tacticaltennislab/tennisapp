"use client";

import { useState } from "react";

/** Shown when an invitation email couldn't be delivered, so the sender can
 * pass the link on by hand instead of the invite silently going nowhere. */
export default function InviteLinkNotice({
  message,
  url,
  copyLabel,
  copiedLabel,
}: {
  message: string;
  url: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the link is still visible to copy by hand.
    }
  }

  return (
    <div className="rounded-xl border border-amber-300 bg-amber-50 text-amber-900 p-3 text-sm space-y-2 dark:bg-amber-950/30 dark:text-amber-200 dark:border-amber-700">
      <p>{message}</p>
      <p className="break-all text-xs">{url}</p>
      <button type="button" onClick={handleCopy} className="text-xs font-semibold underline">
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  );
}
