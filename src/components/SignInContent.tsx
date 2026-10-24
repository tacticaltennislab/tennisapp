"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import AuthLayout from "@/components/AuthLayout";
import { authDictionaries } from "@/i18n/dictionaries/auth";
import { localizedHref, type AppLocale } from "@/i18n/locales";
import { safeCallbackUrl } from "@/lib/utils";

export default function SignInContent({ lang = "en" }: { lang?: AppLocale }) {
  return (
    <Suspense fallback={null}>
      <SignInForm lang={lang} />
    </Suspense>
  );
}

function SignInForm({ lang }: { lang: AppLocale }) {
  const t = authDictionaries[lang];
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = safeCallbackUrl(searchParams.get("callbackUrl"), localizedHref(lang, "/"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError(t.signIn.invalidCredentials);
      return;
    }

    router.push(callbackUrl);
  }

  return (
    <AuthLayout title={t.signIn.title} subtitle={t.signIn.subtitle} lang={lang}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t.signIn.email}</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium">{t.signIn.password}</label>
            <Link href={localizedHref(lang, "/forgot-password")} className="text-xs text-brand-600 font-medium">
              {t.signIn.forgotPassword}
            </Link>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 disabled:translate-y-0 text-on-brand font-semibold py-2.5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
        >
          {loading ? t.signIn.submitting : t.signIn.submit}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted">
        <div className="h-px flex-1 bg-line" />
        {t.or}
        <div className="h-px flex-1 bg-line" />
      </div>

      <button
        onClick={() => signIn("google", { callbackUrl })}
        className="w-full rounded-xl border border-line py-2.5 text-sm font-medium hover:border-brand-600 hover:shadow-sm transition-all"
      >
        {t.signIn.google}
      </button>

      <p className="mt-6 text-sm text-body">
        {t.signIn.noAccount}{" "}
        <Link
          href={`${localizedHref(lang, "/sign-up")}${callbackUrl !== localizedHref(lang, "/") ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
          className="text-brand-600 font-medium"
        >
          {t.signIn.signUpLink}
        </Link>
      </p>
    </AuthLayout>
  );
}
