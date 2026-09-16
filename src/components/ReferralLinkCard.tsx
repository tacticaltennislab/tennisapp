"use client";

import { useState } from "react";

export default function ReferralLinkCard({
  link,
  referralCount,
  statusLine,
}: {
  link: string;
  referralCount: number;
  statusLine: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-2xl border border-line p-5 shadow-sm">
      <h2 className="text-lg font-semibold">Refer a friend</h2>
      <p className="mt-1 text-sm text-body">
        Share your link. Once a friend&apos;s first purchase goes through, you
        unlock a bigger discount on every future purchase of your own.
      </p>
      <div className="mt-4 flex items-stretch gap-2">
        <input
          readOnly
          value={link}
          className="flex-1 rounded-lg border border-line bg-gray-50 px-3 py-2 text-sm text-body truncate"
        />
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <p className="mt-3 text-sm text-body">
        <span className="font-semibold">{referralCount}</span>{" "}
        {referralCount === 1 ? "friend" : "friends"} referred so far. {statusLine}
      </p>
    </div>
  );
}
