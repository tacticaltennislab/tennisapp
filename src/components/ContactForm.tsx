"use client";

import { useState } from "react";
import { contactDictionaries } from "@/i18n/dictionaries/contact";
import type { AppLocale } from "@/i18n/locales";

export default function ContactForm({ lang = "en" }: { lang?: AppLocale }) {
  const t = contactDictionaries[lang].form;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || t.error);
      return;
    }

    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 text-center shadow-sm">
        <p className="font-semibold text-lg">{t.sentTitle}</p>
        <p className="mt-1 text-sm text-body">{t.sentBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-surface border border-line shadow-sm rounded-2xl p-6 sm:p-8"
    >
      <div>
        <label htmlFor="contactform-1" className="block text-sm font-medium mb-1">{t.name}</label>
        <input id="contactform-1"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
        />
      </div>
      <div>
        <label htmlFor="contactform-2" className="block text-sm font-medium mb-1">{t.email}</label>
        <input id="contactform-2"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
        />
      </div>
      <div>
        <label htmlFor="contactform-3" className="block text-sm font-medium mb-1">{t.message}</label>
        <textarea id="contactform-3"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-on-brand font-semibold py-2.5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
      >
        {submitting ? t.sending : t.send}
      </button>
    </form>
  );
}
