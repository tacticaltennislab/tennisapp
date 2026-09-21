"use client";

import { useState } from "react";
import Link from "next/link";
import EmptyState from "@/components/EmptyState";
import TiltCard from "@/components/TiltCard";
import { IconUsers, IconArrowRight } from "@/components/icons";
import { coachesDictionaries } from "@/i18n/dictionaries/coaches";
import { localizedHref, type AppLocale } from "@/i18n/locales";

interface Coach {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  specialty: string | null;
  bio: string | null;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function CoachesAdmin({
  initialCoaches,
  isAdmin,
  lang = "en",
}: {
  initialCoaches: Coach[];
  isAdmin: boolean;
  lang?: AppLocale;
}) {
  const t = coachesDictionaries[lang].list;
  const [coaches, setCoaches] = useState<Coach[]>(initialCoaches);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [bio, setBio] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await fetch("/api/coaches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, specialty, bio }),
    });

    const data = await res.json().catch(() => ({}));
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }

    setCoaches((prev) => [data.coach, ...prev]);
    setName("");
    setEmail("");
    setPhone("");
    setSpecialty("");
    setBio("");
  }

  return (
    <div className={isAdmin ? "grid gap-10 sm:grid-cols-2" : ""}>
      {isAdmin && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Add a coach</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
            />
            <input
              type="text"
              placeholder="Specialty (e.g. Serve technique, Junior development)"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
            />
            <textarea
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-600 transition-shadow"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 disabled:translate-y-0 text-white font-semibold py-2.5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              {submitting ? "Adding..." : "Add coach"}
            </button>
          </form>
        </div>
      )}

      <div>
        {isAdmin && <h2 className="text-lg font-semibold mb-4">Coaches</h2>}
        {coaches.length === 0 ? (
          <EmptyState
            icon={IconUsers}
            title={t.noCoaches}
            detail={isAdmin ? "Add your first coach using the form." : t.checkBackSoon}
          />
        ) : (
          <ul className={isAdmin ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
            {coaches.map((coach) => (
              <TiltCard
                key={coach.id}
                as="li"
                maxTilt={6}
                className="rounded-2xl border border-line p-5 shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 font-semibold flex items-center justify-center">
                  {initials(coach.name)}
                </div>
                <p className="mt-4 font-semibold">{coach.name}</p>
                {coach.specialty && (
                  <p className="text-sm text-brand-600">{coach.specialty}</p>
                )}
                {coach.bio && (
                  <p className="mt-1 text-sm text-body">
                    {coach.bio}
                  </p>
                )}
                {isAdmin && (
                  <div className="mt-2 text-xs text-muted space-x-3">
                    {coach.email && <span>{coach.email}</span>}
                    {coach.phone && <span>{coach.phone}</span>}
                  </div>
                )}
                {!isAdmin && (
                  <Link
                    href={localizedHref(lang, `/coaches/${coach.id}`)}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline"
                  >
                    {t.viewProfile}
                    <IconArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </TiltCard>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
