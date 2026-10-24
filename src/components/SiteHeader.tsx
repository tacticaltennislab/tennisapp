"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { IconClose, IconMenu } from "@/components/icons";
import PushToggle from "@/components/PushToggle";
import AdminNavMenu from "@/components/AdminNavMenu";
import BrandLogo from "@/components/BrandLogo";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher, { currentLocaleFromPathname } from "@/components/LanguageSwitcher";
import { localizedHref } from "@/i18n/locales";
import { navDictionaries } from "@/i18n/dictionaries/nav";

export default function SiteHeader() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const locale = currentLocaleFromPathname(pathname);
  const t = navDictionaries[locale];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [fetchedLink, setFetchedLink] = useState<{ userId: string; href: string; label: string } | null>(null);

  const userId = session?.user?.id;
  const isAdmin = session?.user?.role === "admin";
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    fetch("/api/academy/mine")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { academies: { id: string }[] } | null) => {
        if (cancelled || !data) return;
        if (isAdmin) {
          setFetchedLink({ userId, href: "/academies", label: t.academies });
        } else if (data.academies.length === 1) {
          setFetchedLink({
            userId,
            href: localizedHref(locale, `/academy/${data.academies[0].id}`),
            label: t.academy,
          });
        } else if (data.academies.length > 1) {
          setFetchedLink({ userId, href: localizedHref(locale, "/academy"), label: t.academy });
        } else {
          setFetchedLink(null);
        }
      })
      .catch(() => {
        // The academy link is a convenience; never let a failed lookup break the header.
      });
    return () => {
      cancelled = true;
    };
  }, [userId, isAdmin, locale, t.academy, t.academies]);
  // Ignore a link fetched for a previous user (e.g. right after signing out and in).
  const academyLink = userId && fetchedLink?.userId === userId ? fetchedLink : null;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = "text-body hover:text-ink transition-colors py-2 lg:py-0 whitespace-nowrap";
  const closeMenu = () => setMenuOpen(false);

  // The client dashboard is a full-screen app with its own chrome.
  if (pathname.startsWith("/dashboard")) return null;

  return (
    <header
      className={`print:hidden sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b transition-colors ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-brand"
      >
        {t.skip}
      </a>
      <div className="container-x py-3 flex items-center justify-between gap-4">
        <Link
          href={localizedHref(locale, "/")}
          className="shrink-0 flex items-center"
          aria-label="Tactical Tennis Lab"
        >
          <BrandLogo className="h-8 sm:h-9" priority />
        </Link>

        <nav className="hidden lg:flex items-center gap-4 text-sm">
          <Link href={localizedHref(locale, "/pricing")} className={linkClass}>
            {t.pricing}
          </Link>
          <Link href={localizedHref(locale, "/coaches")} className={linkClass}>
            {t.coaches}
          </Link>
          <Link href={`${localizedHref(locale, "/")}#reviews`} className={linkClass}>
            {t.customerReviews}
          </Link>
          <Link href={localizedHref(locale, "/contact")} className={linkClass}>
            {t.contact}
          </Link>
          {status === "loading" ? null : session ? (
            <>
              <Link href={localizedHref(locale, "/submit-video")} className={linkClass}>
                {t.sendVideo}
              </Link>
              {isAdmin ? (
                <AdminNavMenu
                  label={t.admin}
                  linkClass={linkClass}
                  items={[
                    { href: "/submissions", label: t.submissions },
                    { href: "/customers", label: t.customers },
                    { href: "/reviews/admin", label: t.reviews },
                    { href: "/dashboard", label: "Dashboard (prototype)" },
                    ...(academyLink ? [{ href: academyLink.href, label: academyLink.label }] : []),
                  ]}
                />
              ) : (
                academyLink && (
                  <Link href={academyLink.href} className={linkClass}>
                    {academyLink.label}
                  </Link>
                )
              )}
              <Link href={localizedHref(locale, "/account")} className={`${linkClass} max-w-[10rem] truncate`}>
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
              <Link href={localizedHref(locale, "/sign-in")} className={linkClass}>
                {t.signIn}
              </Link>
              <Link
                href={localizedHref(locale, "/sign-up")}
                className="rounded-full bg-brand-600 hover:opacity-80 text-on-brand px-4 py-1.5 font-medium transition-opacity whitespace-nowrap shrink-0"
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
          <Link href={`${localizedHref(locale, "/")}#reviews`} className={linkClass} onClick={closeMenu}>
            {t.customerReviews}
          </Link>
          <Link href={localizedHref(locale, "/contact")} className={linkClass} onClick={closeMenu}>
            {t.contact}
          </Link>
          {status === "loading" ? null : session ? (
            <>
              <Link href={localizedHref(locale, "/submit-video")} className={linkClass} onClick={closeMenu}>
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
              {academyLink && (
                <Link href={academyLink.href} className={linkClass} onClick={closeMenu}>
                  {academyLink.label}
                </Link>
              )}
              <Link href={localizedHref(locale, "/account")} className={linkClass} onClick={closeMenu}>
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
              <Link href={localizedHref(locale, "/sign-in")} className={linkClass} onClick={closeMenu}>
                {t.signIn}
              </Link>
              <Link
                href={localizedHref(locale, "/sign-up")}
                className="mt-2 rounded-full bg-brand-600 text-on-brand px-4 py-2.5 font-medium text-center"
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
