"use client";

import { Fragment, useState, type ReactNode } from "react";
import type { Audience } from "@/lib/pricingAudience";

export default function PricingAudienceSwitch({
  playersLabel,
  clubsLabel,
  players,
  clubs,
  initialAudience = "clubs",
}: {
  playersLabel: string;
  clubsLabel: string;
  players: ReactNode;
  clubs: ReactNode;
  initialAudience?: Audience;
}) {
  const [audience, setAudience] = useState<Audience>(initialAudience);

  function select(next: Audience) {
    setAudience(next);
    // Keep the address bar shareable (e.g. /pricing?audience=players) without
    // triggering a navigation or re-fetching the page.
    const url = new URL(window.location.href);
    if (next === "players") {
      url.searchParams.set("audience", "players");
    } else {
      url.searchParams.delete("audience");
    }
    window.history.replaceState(window.history.state, "", url);
  }

  const options: { value: Audience; label: string }[] = [
    { value: "clubs", label: clubsLabel },
    { value: "players", label: playersLabel },
  ];

  return (
    <div>
      <div className="flex justify-center mb-10">
        <div className="inline-flex rounded-full border border-line bg-surface p-1 shadow-sm">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              aria-pressed={audience === o.value}
              onClick={() => select(o.value)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                audience === o.value ? "bg-brand-600 text-on-brand shadow-sm" : "text-body hover:text-brand-600"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Keyed so React treats the two views as separate subtrees when toggling. */}
      <Fragment key={audience}>{audience === "players" ? players : clubs}</Fragment>
    </div>
  );
}
