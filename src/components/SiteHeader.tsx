"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { IconClose, IconMenu } from "@/components/icons";
import PushToggle from "@/components/PushToggle";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher, { currentLocaleFromPathname } from "@/components/LanguageSwitcher";
import { localizedHref } from "@/i18n/locales";
import { navDictionaries } from "@/i18n/dictionaries/nav";

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
  const pathname = usePathname();
  const locale = currentLocaleFromPathname(pathname);
  const t = navDictionaries[locale];
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
          href={localizedHref(locale, "/")}
          className="flex items-center gap-2 font-bold text-lg text-ink shrink-0 whitespace-nowrap"
        >
          <LogoMark />
          Tactical Tennis Lab
        </Link>

        <nav className="hidden lg:flex items-center gap-4 text-sm">
          <Link href={localizedHref(locale, "/pricing")} className={linkClass}>
            {t.pricing}
          </Link>
          <Link href={localizedHref(locale, "/coaches")} className={linkClass}>
            {t.coaches}
          </Link>
          <Link href={localizedHref(locale, "/contact")} className={linkClass}>
            {t.contact}
          </Link>
          {status === "loading" ? null : session ? (
            <>
              <Link href="/submit-video" className={linkClass}>
                {t.sendVideo}
              </Link>
              {session.user?.role === "admin" && (
                <>
                  <Link href="/submissions" className={linkClass}>
                    {t.submissions}
                  </Link>
                  <Link href="/customers" className={linkClass}>
                    {t.customers}
                  </Link>
                  <Link href="/reviews/admin" className={linkClass}>
                    {t.reviews}
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
                {t.signOut}
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className={linkClass}>
                {t.signIn}
              </Link>
              <Link
                href="/sign-up"
                className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-3 py-1.5 font-medium shadow-sm hover:shadow-md transition-all whitespace-nowrap shrink-0"
              >
                {t.signUp}
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <LanguageSwitcher />
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
          <Link href={localizedHref(locale, "/pricing")} className={linkClass} onClick={closeMenu}>
            {t.pricing}
          </Link>
          <Link href={localizedHref(locale, "/coaches")} className={linkClass} onClick={closeMenu}>
            {t.coaches}
          </Link>
          <Link href={localizedHref(locale, "/contact")} className={linkClass} onClick={closeMenu}>
            {t.contact}
          </Link>
          {status === "loading" ? null : session ? (
            <>
              <Link href="/submit-video" className={linkClass} onClick={closeMenu}>
                {t.sendVideo}
              </Link>
              {session.user?.role === "admin" && (
                <>
                  <Link href="/submissions" className={linkClass} onClick={closeMenu}>
                    {t.submissions}
                  </Link>
                  <Link href="/customers" className={linkClass} onClick={closeMenu}>
                    {t.customers}
                  </Link>
                  <Link href="/reviews/admin" className={linkClass} onClick={closeMenu}>
                    {t.reviews}
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
                {t.signOut}
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className={linkClass} onClick={closeMenu}>
                {t.signIn}
              </Link>
              <Link
                href="/sign-up"
                className="mt-2 rounded-xl bg-brand-600 text-white px-3 py-2 font-medium text-center"
                onClick={closeMenu}
              >
                {t.signUp}
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
