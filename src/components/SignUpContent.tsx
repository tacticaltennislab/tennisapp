"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import AuthLayout from "@/components/AuthLayout";
import { authDictionaries } from "@/i18n/dictionaries/auth";
import { localizedHref, type AppLocale } from "@/i18n/locales";

export default function SignUpContent({ lang = "en" }: { lang?: AppLocale }) {
  return (
    <Suspense fallback={null}>
      <SignUpForm lang={lang} />
    </Suspense>
  );
}

function SignUpForm({ lang }: { lang: AppLocale }) {
  const t = authDictionaries[lang];
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || localizedHref(lang, "/");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || t.signUp.genericError);
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(t.signUp.partialError);
      return;
    }

    router.push(callbackUrl);
  }

  return (
    <AuthLayout title={t.signUp.title} subtitle={t.signUp.subtitle} lang={lang}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t.signUp.name}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t.signUp.email}</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">{t.signUp.password}</label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
          />
          <p className="mt-1 text-xs text-muted">{t.signUp.passwordHint}</p>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 disabled:translate-y-0 text-white font-semibold py-2.5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
        >
          {loading ? t.signUp.submitting : t.signUp.submit}
        </button>
      </form>

      <p className="mt-4 text-xs text-muted">
        {t.signUp.agreePrefix}{" "}
        <Link href={localizedHref(lang, "/terms")} className="text-brand-600 hover:underline">
          {t.signUp.termsLabel}
        </Link>{" "}
        {t.signUp.andLabel}{" "}
        <Link href={localizedHref(lang, "/privacy")} className="text-brand-600 hover:underline">
          {t.signUp.privacyLabel}
        </Link>
        .
      </p>

      <div className="my-6 flex items-center gap-3 text-xs text-muted">
        <div className="h-px flex-1 bg-line" />
        {t.or}
        <div className="h-px flex-1 bg-line" />
      </div>

      <button
        onClick={() => signIn("google", { callbackUrl })}
        className="w-full rounded-xl border border-line py-2.5 text-sm font-medium hover:border-brand-600 hover:shadow-sm transition-all"
      >
        {t.signUp.google}
      </button>

      <p className="mt-6 text-sm text-body">
        {t.signUp.haveAccount}{" "}
        <Link
          href={`${localizedHref(lang, "/sign-in")}${callbackUrl !== localizedHref(lang, "/") ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
          className="text-brand-600 font-medium"
        >
          {t.signUp.signInLink}
        </Link>
      </p>
    </AuthLayout>
  );
}
