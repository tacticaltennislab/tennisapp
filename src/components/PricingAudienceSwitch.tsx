"use client";

import { useState, type ReactNode } from "react";

type Audience = "players" | "clubs";

export default function PricingAudienceSwitch({
  playersLabel,
  clubsLabel,
  players,
  clubs,
}: {
  playersLabel: string;
  clubsLabel: string;
  players: ReactNode;
  clubs: ReactNode;
}) {
  const [audience, setAudience] = useState<Audience>("players");

  const options: { value: Audience; label: string }[] = [
    { value: "players", label: playersLabel },
    { value: "clubs", label: clubsLabel },
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
              onClick={() => setAudience(o.value)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                audience === o.value ? "bg-brand-600 text-white shadow-sm" : "text-body hover:text-brand-600"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {audience === "players" ? players : clubs}
    </div>
  );
}
