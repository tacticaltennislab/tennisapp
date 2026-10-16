"use client";

import Link from "next/link";
import { useState } from "react";

/** Desktop dropdown that groups the admin-only links, so the header doesn't
 * overflow for admins on laptop-width screens. */
export default function AdminNavMenu({
  label,
  items,
  linkClass,
}: {
  label: string;
  items: { href: string; label: string }[];
  linkClass: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`${linkClass} inline-flex items-center gap-1`}
      >
        {label}
        <svg viewBox="0 0 20 20" className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} fill="currentColor" aria-hidden="true">
          <path d="M5.5 7.5 10 12l4.5-4.5-1-1L10 10 6.5 6.5z" />
        </svg>
      </button>
      {open && (
        <>
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div role="menu" className="absolute right-0 mt-2 min-w-44 rounded-xl border border-line bg-surface shadow-lg py-1 z-20">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-sm text-body hover:bg-surface-muted hover:text-brand-600 whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
