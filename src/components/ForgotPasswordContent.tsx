"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import { authDictionaries } from "@/i18n/dictionaries/auth";
import { localizedHref, type AppLocale } from "@/i18n/locales";

export default function ForgotPasswordContent({ lang = "en" }: { lang?: AppLocale }) {
  const t = authDictionaries[lang].forgotPassword;
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setSubmitting(false);
    setSent(true);
  }

  return (
    <AuthLayout title={t.title} subtitle={t.subtitle} lang={lang}>
      {sent ? (
        <p className="text-sm text-body">{t.sent}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t.email}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-on-brand font-semibold py-2.5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            {submitting ? t.submitting : t.submit}
          </button>
        </form>
      )}

      <p className="mt-6 text-sm text-body">
        <Link href={localizedHref(lang, "/sign-in")} className="text-brand-600 font-medium">
          {t.backToSignIn}
        </Link>
      </p>
    </AuthLayout>
  );
}
