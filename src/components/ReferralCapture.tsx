"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const COOKIE_NAME = "ref_by";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function Capture() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  useEffect(() => {
    if (!ref) return;
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(ref)}; path=/; max-age=${MAX_AGE_SECONDS}; samesite=lax`;
  }, [ref]);

  return null;
}

export default function ReferralCapture() {
  return (
    <Suspense fallback={null}>
      <Capture />
    </Suspense>
  );
}
