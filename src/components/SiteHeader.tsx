"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function SiteHeader() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Tennis App
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/coaches" className="hover:underline">
            Coaches
          </Link>
          {status === "loading" ? null : session ? (
            <>
              <Link href="/submit-video" className="hover:underline">
                Send Video
              </Link>
              {session.user?.role === "admin" && (
                <Link href="/submissions" className="hover:underline">
                  Submissions
                </Link>
              )}
              <Link href="/account" className="hover:underline">
                {session.user?.name || session.user?.email}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-lg border border-black/10 dark:border-white/15 px-3 py-1.5 hover:border-green-600"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="hover:underline">
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="rounded-lg bg-green-600 hover:bg-green-700 text-white px-3 py-1.5"
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
