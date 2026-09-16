"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { IconClose, IconMenu } from "@/components/icons";
import PushToggle from "@/components/PushToggle";
import ThemeToggle from "@/components/ThemeToggle";

function LogoMark() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" aria-hidden="true">
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = "text-body hover:text-brand-600 py-2 lg:py-0 whitespace-nowrap";
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-20 bg-background/95 backdrop-blur border-b transition-shadow ${
        scrolled ? "border-line shadow-sm" : "border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-ink shrink-0 whitespace-nowrap"
        >
          <LogoMark />
          Tactical Tennis Lab
        </Link>

        <nav className="hidden lg:flex items-center gap-4 text-sm">
          <Link href="/pricing" className={linkClass}>
            Pricing
          </Link>
          <Link href="/coaches" className={linkClass}>
            Coaches
          </Link>
          <Link href="/contact" className={linkClass}>
            Contact
          </Link>
          {status === "loading" ? null : session ? (
            <>
              <Link href="/submit-video" className={linkClass}>
                Send Video
              </Link>
              {session.user?.role === "admin" && (
                <>
                  <Link href="/submissions" className={linkClass}>
                    Submissions
                  </Link>
                  <Link href="/customers" className={linkClass}>
                    Customers
                  </Link>
                  <Link href="/waitlist/admin" className={linkClass}>
                    Waitlist
                  </Link>
                </>
              )}
              <Link href="/account" className={linkClass}>
                {session.user?.name || session.user?.email}
              </Link>
              <PushToggle />
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-lg border border-line px-3 py-1.5 text-body hover:border-brand-600 hover:text-brand-600 whitespace-nowrap shrink-0"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/waitlist" className={linkClass}>
                Waitlist
              </Link>
              <Link href="/sign-in" className={linkClass}>
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-3 py-1.5 font-medium shadow-sm hover:shadow-md transition-all whitespace-nowrap shrink-0"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden p-2 -mr-2 text-ink"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <IconClose className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden border-t border-line px-4 py-3 flex flex-col text-sm animate-fade-up">
          <Link href="/pricing" className={linkClass} onClick={closeMenu}>
            Pricing
          </Link>
          <Link href="/coaches" className={linkClass} onClick={closeMenu}>
            Coaches
          </Link>
          <Link href="/contact" className={linkClass} onClick={closeMenu}>
            Contact
          </Link>
          {status === "loading" ? null : session ? (
            <>
              <Link href="/submit-video" className={linkClass} onClick={closeMenu}>
                Send Video
              </Link>
              {session.user?.role === "admin" && (
                <>
                  <Link href="/submissions" className={linkClass} onClick={closeMenu}>
                    Submissions
                  </Link>
                  <Link href="/customers" className={linkClass} onClick={closeMenu}>
                    Customers
                  </Link>
                  <Link href="/waitlist/admin" className={linkClass} onClick={closeMenu}>
                    Waitlist
                  </Link>
                </>
              )}
              <Link href="/account" className={linkClass} onClick={closeMenu}>
                {session.user?.name || session.user?.email}
              </Link>
              <PushToggle showLabel />
              <button
                onClick={() => {
                  closeMenu();
                  signOut({ callbackUrl: "/" });
                }}
                className="mt-2 rounded-lg border border-line px-3 py-2 text-body text-left"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/waitlist" className={linkClass} onClick={closeMenu}>
                Waitlist
              </Link>
              <Link href="/sign-in" className={linkClass} onClick={closeMenu}>
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="mt-2 rounded-xl bg-brand-600 text-white px-3 py-2 font-medium text-center"
                onClick={closeMenu}
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
