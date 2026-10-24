"use client";

import Link from "next/link";
import { useState } from "react";
import { Panel } from "@/components/dashboard/ui";
import { PLAYER } from "@/lib/dashboardSample";

export default function SettingsDemo() {
  const [name, setName] = useState(PLAYER.name);
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto grid max-w-3xl gap-6">
      <Panel title="Profile">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSaved(true);
          }}
          className="space-y-5 p-5"
        >
          <div>
            <label htmlFor="set-name" className="mb-1.5 block text-sm font-medium text-ink">
              Name
            </label>
            <input
              id="set-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSaved(false);
              }}
              className="field"
            />
          </div>
          <div>
            <label htmlFor="set-email" className="mb-1.5 block text-sm font-medium text-ink">
              Email
            </label>
            <input id="set-email" type="email" value={PLAYER.email} readOnly aria-describedby="set-email-help" className="field opacity-70" />
            <p id="set-email-help" className="mt-1.5 text-xs text-muted">
              Feedback and messages are sent to this address.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button type="submit" className="btn btn-primary !min-h-10 !text-sm">
              Save changes (demo)
            </button>
            {saved && (
              <p role="status" className="text-sm text-brand-600">
                Saved for this preview only.
              </p>
            )}
          </div>
        </form>
      </Panel>

      <Panel title="Password">
        <div className="flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-md text-sm text-body">To change your password, we email you a link that is valid for one hour.</p>
          <Link href="/forgot-password" className="btn btn-secondary !min-h-10 !text-sm">
            Email me a reset link
          </Link>
        </div>
      </Panel>

      <Panel title="Notifications">
        <ul className="divide-y divide-line text-sm">
          {[
            ["Feedback ready", "Email, whenever a coach finishes reviewing a video."],
            ["New message from a coach", "Email, and a browser notification if you turn it on."],
          ].map(([k, v]) => (
            <li key={k} className="flex flex-wrap items-start justify-between gap-x-6 gap-y-1 px-5 py-4">
              <div>
                <p className="font-medium text-ink">{k}</p>
                <p className="mt-0.5 text-muted">{v}</p>
              </div>
              <span className="rounded-full bg-chip px-2.5 py-1 text-xs font-semibold text-body">On</span>
            </li>
          ))}
        </ul>
        <p className="border-t border-line px-5 py-4 text-xs text-muted">
          Browser notifications are switched on or off with the bell in the site header.
        </p>
      </Panel>

      <Panel title="Referral link">
        <div className="p-5 text-sm leading-relaxed text-body">
          <p>
            Share your personal link. Once a friend&apos;s first purchase goes through, you unlock a bigger discount
            on every future purchase of your own.
          </p>
          <p className="t-mono mt-3 break-all rounded-lg bg-chip px-3 py-2.5 text-xs text-muted">
            https://tacticaltennislab.com/?ref=your-id
          </p>
          <p className="mt-2 text-xs text-muted">Your real link is on your account page.</p>
        </div>
      </Panel>
    </div>
  );
}
