"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

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
      setError("Invalid email or password.");
      return;
    }

    router.push(callbackUrl);
  }

  return (
    <main className="flex-1 flex items-start justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">Sign in</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 text-sm"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-2.5 transition-colors"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-black/40 dark:text-white/40">
          <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
          or
          <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl })}
          className="w-full rounded-lg border border-black/10 dark:border-white/15 py-2.5 text-sm font-medium hover:border-green-600"
        >
          Sign in with Google
        </button>

        <p className="mt-6 text-sm text-black/60 dark:text-white/60">
          No account yet?{" "}
          <Link href="/sign-up" className="text-green-600 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
