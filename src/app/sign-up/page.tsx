"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
  const router = useRouter();

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
      setError(data.error || "Something went wrong.");
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
      setError("Account created, but sign-in failed. Try signing in.");
      return;
    }

    router.push("/");
  }

  return (
    <main className="flex-1 flex items-start justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">Create your account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 text-sm"
            />
          </div>
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
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-3 py-2 text-sm"
            />
            <p className="mt-1 text-xs text-black/40 dark:text-white/40">
              At least 8 characters.
            </p>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-2.5 transition-colors"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-black/40 dark:text-white/40">
          <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
          or
          <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full rounded-lg border border-black/10 dark:border-white/15 py-2.5 text-sm font-medium hover:border-green-600"
        >
          Sign up with Google
        </button>

        <p className="mt-6 text-sm text-black/60 dark:text-white/60">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-green-600 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
