"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import { authDictionaries } from "@/i18n/dictionaries/auth";
import { localizedHref, type AppLocale } from "@/i18n/locales";

export default function ResetPasswordContent({ lang = "en" }: { lang?: AppLocale }) {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm lang={lang} />
    </Suspense>
  );
}

function ResetPasswordForm({ lang }: { lang: AppLocale }) {
  const t = authDictionaries[lang].resetPassword;
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, email, password }),
    });

    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || t.genericError);
      return;
    }

    setDone(true);
    setTimeout(() => router.push(localizedHref(lang, "/sign-in")), 1500);
  }

  if (!token || !email) {
    return (
      <AuthLayout title={t.invalidTitle} subtitle={t.invalidSubtitle} lang={lang}>
        <p className="text-sm text-body">
          <Link href={localizedHref(lang, "/forgot-password")} className="text-brand-600 font-medium">
            {t.requestNewLink}
          </Link>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title={t.title} subtitle={`${t.subtitlePrefix} ${email}.`} lang={lang}>
      {done ? (
        <p className="text-sm text-body">{t.done}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="resetpassword-1" className="block text-sm font-medium mb-1">{t.newPassword}</label>
            <input id="resetpassword-1"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
            />
            <p className="mt-1 text-xs text-muted">{t.passwordHint}</p>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-on-brand font-semibold py-2.5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            {submitting ? t.submitting : t.submit}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
