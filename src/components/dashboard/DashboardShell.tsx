"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DIcons } from "@/components/dashboard/icons";
import { PLAYER } from "@/lib/dashboardSample";

const NAV: { href: string; label: string; short?: string; icon: (typeof DIcons)[keyof typeof DIcons]; exact?: boolean }[] = [
  { href: "/dashboard", label: "Overview", icon: DIcons.overview, exact: true },
  { href: "/dashboard/analyses", label: "Analyses", icon: DIcons.analyses },
  { href: "/dashboard/upload", label: "Upload", icon: DIcons.upload },
  { href: "/dashboard/plan", label: "Training plan", short: "Plan", icon: DIcons.plan },
  { href: "/dashboard/messages", label: "Messages", icon: DIcons.messages },
  { href: "/dashboard/orders", label: "Orders", icon: DIcons.orders },
  { href: "/dashboard/settings", label: "Settings", icon: DIcons.settings },
];

const TITLES: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/analyses": "Analyses",
  "/dashboard/upload": "Upload a video",
  "/dashboard/plan": "Training plan",
  "/dashboard/messages": "Messages",
  "/dashboard/orders": "Order history",
  "/dashboard/settings": "Settings",
};

function isActive(pathname: string, item: { href: string; exact?: boolean }) {
  return item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(item.href + "/");
}

export interface ShellUser {
  name: string;
  initials: string;
  isAdmin: boolean;
  /** Unread messages from the coach. */
  unread: number;
}

export default function DashboardShell({ children, user }: { children: React.ReactNode; user: ShellUser }) {
  const pathname = usePathname();
  // Demo mode (sample data for sales calls) is for admins only; the pages check this again on the server.
  const searchParams = useSearchParams();
  const demo = user.isAdmin && searchParams.get("demo") === "1";
  const suffix = demo ? "?demo=1" : "";
  const person = demo ? { name: PLAYER.name, initials: PLAYER.initials } : user;
  const unread = demo ? 1 : user.unread;
  const [moreOpen, setMoreOpen] = useState(false);
  const title = pathname.startsWith("/dashboard/analyses/") ? "Analysis" : TITLES[pathname] ?? "Dashboard";

  const badgeOf = (item: { href: string }) => (item.href === "/dashboard/messages" ? unread : 0);

  const link = (active: boolean) =>
    `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
      active ? "bg-brand-100 text-ink" : "text-muted hover:bg-brand-50 hover:text-ink"
    }`;

  return (
    <div className="theme-dashboard min-h-screen">
      <a
        href="#dashboard-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-brand"
      >
        Skip to content
      </a>

      {demo && (
        <div className="flex items-center justify-center gap-2 border-b border-line bg-brand-900 px-4 py-2 text-center text-xs text-muted">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-ink">Demo mode.</strong> Sample data only. Nothing here is saved, sent or uploaded.{" "}
            <Link href="/dashboard" className="font-medium text-brand-600 underline underline-offset-4">
              Open my real dashboard
            </Link>
          </span>
        </div>
      )}

      <div className="flex">
        {/* Desktop rail: icons plus labels from xl, icons alone from md. */}
        <div className="sticky top-0 hidden h-screen shrink-0 flex-col border-r border-line bg-surface-muted md:flex md:w-[4.5rem] xl:w-60">
          <Link href={`/dashboard${suffix}`} className="flex h-16 items-center gap-2.5 px-4 xl:px-5" aria-label="Dashboard home">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-sm font-black text-on-brand">T</span>
            <span className="hidden text-sm font-semibold tracking-tight text-ink xl:block">Tactical Tennis Lab</span>
          </Link>
          <nav aria-label="Dashboard" className="flex-1 space-y-1 px-2.5 py-2 xl:px-3">
            {NAV.map((item) => {
              const active = isActive(pathname, item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href + suffix}
                  aria-current={active ? "page" : undefined}
                  title={item.label}
                  className={`${link(active)} md:justify-center xl:justify-start`}
                >
                  <span className={`relative ${active ? "text-brand-600" : ""}`}>
                    <Icon />
                    {badgeOf(item) ? (
                      <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-brand-600 ring-2 ring-surface-muted xl:hidden" />
                    ) : null}
                  </span>
                  <span className="hidden xl:inline">{item.label}</span>
                  {badgeOf(item) ? (
                    <span className="ml-auto hidden rounded-full bg-brand-600 px-1.5 text-[0.6875rem] font-bold text-on-brand xl:inline">
                      {badgeOf(item)}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-line p-3">
            <Link href="/" className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs text-muted transition-colors hover:text-ink xl:justify-start">
              <DIcons.arrow className="h-4 w-4 rotate-180" />
              <span className="hidden xl:inline">Back to website</span>
            </Link>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-line bg-background/90 px-4 backdrop-blur md:h-16 md:px-8">
            <h1 className="truncate text-base font-semibold tracking-tight text-ink md:text-lg">{title}</h1>
            <div className="flex items-center gap-3">
              <Link href={`/dashboard/upload${suffix}`} className="btn btn-primary !min-h-9 !px-4 !text-sm">
                <DIcons.upload className="h-4 w-4" />
                <span className="hidden sm:inline">Upload video</span>
                <span className="sm:hidden">Upload</span>
              </Link>
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full bg-chip text-xs font-semibold text-ink"
                title={person.name}
                aria-label={`Signed in as ${person.name}${demo ? " (sample)" : ""}`}
              >
                {person.initials}
              </span>
            </div>
          </header>

          <main id="dashboard-main" tabIndex={-1} className="mx-auto w-full max-w-[96rem] px-4 pb-28 pt-6 outline-none md:px-8 md:pb-12 md:pt-8">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile bottom bar: five core destinations plus More. */}
      <nav
        aria-label="Dashboard"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface-muted/95 backdrop-blur md:hidden"
      >
        <ul className="grid grid-cols-6">
          {NAV.slice(0, 5).map((item) => {
            const active = isActive(pathname, item);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href + suffix}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex flex-col items-center gap-0.5 py-2.5 text-[0.6875rem] font-medium ${
                    active ? "text-brand-600" : "text-muted"
                  }`}
                >
                  <Icon className="h-[1.375rem] w-[1.375rem]" />
                  {item.short ?? item.label}
                  {badgeOf(item) ? <span className="absolute right-[1.25rem] top-1.5 h-2 w-2 rounded-full bg-brand-600" /> : null}
                </Link>
              </li>
            );
          })}
          <li className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              className="flex w-full flex-col items-center gap-0.5 py-2.5 text-[0.6875rem] font-medium text-muted"
            >
              <DIcons.more className="h-[1.375rem] w-[1.375rem]" />
              More
            </button>
            {moreOpen && (
              <>
                <button type="button" aria-hidden="true" tabIndex={-1} className="fixed inset-0 z-10 cursor-default" onClick={() => setMoreOpen(false)} />
                <div role="menu" className="absolute bottom-full right-2 z-20 mb-2 w-48 rounded-xl border border-line bg-surface p-1 shadow-lg">
                  {NAV.slice(5).map((item) => (
                    <Link key={item.href} href={item.href + suffix} role="menuitem" onClick={() => setMoreOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-body hover:bg-brand-50 hover:text-ink">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ))}
                  <Link href="/" role="menuitem" onClick={() => setMoreOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-brand-50 hover:text-ink">
                    <DIcons.arrow className="h-4 w-4 rotate-180" />
                    Back to website
                  </Link>
                </div>
              </>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
