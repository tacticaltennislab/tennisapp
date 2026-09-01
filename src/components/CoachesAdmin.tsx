"use client";

import { useState } from "react";

interface Coach {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  specialty: string | null;
  bio: string | null;
}

export default function CoachesAdmin({
  initialCoaches,
}: {
  initialCoaches: Coach[];
}) {
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
    <div className="grid gap-10 sm:grid-cols-2">
      <div>
        <h2 className="text-lg font-semibold mb-4">Add a coach</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Specialty (e.g. Serve technique, Junior development)"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm"
          />
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold py-2.5 transition-colors"
          >
            {submitting ? "Adding..." : "Add coach"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Coaches</h2>
        {coaches.length === 0 ? (
          <p className="text-sm text-muted">
            No coaches added yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {coaches.map((coach) => (
              <li
                key={coach.id}
                className="rounded-xl border border-line p-4"
              >
                <p className="font-semibold">{coach.name}</p>
                {coach.specialty && (
                  <p className="text-sm text-brand-600">{coach.specialty}</p>
                )}
                {coach.bio && (
                  <p className="mt-1 text-sm text-body">
                    {coach.bio}
                  </p>
                )}
                <div className="mt-2 text-xs text-muted space-x-3">
                  {coach.email && <span>{coach.email}</span>}
                  {coach.phone && <span>{coach.phone}</span>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
