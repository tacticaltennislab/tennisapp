"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

function LogoMark() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="var(--color-brand-600)" />
      <path
        d="M1.5 12c3.2-2.5 6.8-2.5 10.5 0s7.3 2.5 10.5 0M1.5 12c3.2 2.5 6.8 2.5 10.5 0s7.3-2.5 10.5 0"
        stroke="var(--color-brand-100)"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}

export default function SiteHeader() {
  const { data: session, status } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-10 bg-background/95 backdrop-blur border-b transition-shadow ${
        scrolled ? "border-line shadow-sm" : "border-transparent"
      }`}
    >
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-ink">
          <LogoMark />
          Tactical Tennis Lab
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/coaches" className="text-body hover:text-brand-600">
            Coaches
          </Link>
          {status === "loading" ? null : session ? (
            <>
              <Link href="/submit-video" className="text-body hover:text-brand-600">
                Send Video
              </Link>
              {session.user?.role === "admin" && (
                <Link href="/submissions" className="text-body hover:text-brand-600">
                  Submissions
                </Link>
              )}
              <Link href="/account" className="text-body hover:text-brand-600">
                {session.user?.name || session.user?.email}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-lg border border-line px-3 py-1.5 text-body hover:border-brand-600 hover:text-brand-600"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-body hover:text-brand-600">
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-3 py-1.5 font-medium shadow-sm hover:shadow-md transition-all"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
