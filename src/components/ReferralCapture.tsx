"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const COOKIE_NAME = "ref_by";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const CONSENT_KEY = "cookie_consent_referral";

function setReferralCookie(ref: string) {
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(ref)}; path=/; max-age=${MAX_AGE_SECONDS}; samesite=lax`;
}

// The referral-attribution cookie isn't strictly necessary for the site to
// function (unlike the sign-in session cookie), so EU ePrivacy rules require
// opt-in consent before we set it. Rather than a generic cookie banner shown
// to everyone, we only ask the rare visitor who actually arrives via a
// referral link -- consent stays in localStorage, not a cookie, since
// remembering someone's own choice is itself exempt from consent rules.
function Capture() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const decision = window.localStorage.getItem(CONSENT_KEY);
    if (decision === "accepted") {
      setReferralCookie(ref);
    } else if (decision !== "declined") {
      // Initial read of a browser-only API that isn't available during SSR,
      // so it can't be computed during render.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowPrompt(true);
    }
  }, [ref]);

  if (!showPrompt || !ref) return null;

  function accept() {
    window.localStorage.setItem(CONSENT_KEY, "accepted");
    setReferralCookie(ref!);
    setShowPrompt(false);
  }

  function decline() {
    window.localStorage.setItem(CONSENT_KEY, "declined");
    setShowPrompt(false);
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 rounded-2xl border border-line bg-surface shadow-lg p-4">
      <p className="text-sm text-body">
        You followed a friend&apos;s referral link. Allow a cookie so we can
        credit their account if you sign up? It lasts 30 days and isn&apos;t
        used for anything else.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={accept}
          className="rounded-lg bg-brand-600 hover:bg-brand-700 text-on-brand text-sm font-semibold px-3 py-1.5 transition-colors"
        >
          Allow
        </button>
        <button
          type="button"
          onClick={decline}
          className="rounded-lg border border-line text-sm font-medium px-3 py-1.5 hover:border-brand-600 transition-colors"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}

export default function ReferralCapture() {
  return (
    <Suspense fallback={null}>
      <Capture />
    </Suspense>
  );
}
