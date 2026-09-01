import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/account");
  }

  const submissions = await prisma.videoSubmission.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="flex-1 px-4 py-16">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your account</h1>
        <dl className="space-y-3 text-sm mb-10">
          <div>
            <dt className="text-black/50 dark:text-white/50">Name</dt>
            <dd>{session.user.name || "—"}</dd>
          </div>
          <div>
            <dt className="text-black/50 dark:text-white/50">Email</dt>
            <dd>{session.user.email}</dd>
          </div>
        </dl>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Your videos</h2>
          <Link
            href="/submit-video"
            className="text-sm rounded-lg bg-green-600 hover:bg-green-700 text-white px-3 py-1.5"
          >
            Send a video
          </Link>
        </div>

        {submissions.length === 0 ? (
          <p className="text-sm text-black/50 dark:text-white/50">
            You haven&apos;t sent any videos yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {submissions.map((s) => (
              <li
                key={s.id}
                className="rounded-xl border border-black/10 dark:border-white/10 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{s.title || s.fileName}</p>
                  <span
                    className={`text-xs rounded-full px-2 py-0.5 ${
                      s.status === "reviewed"
                        ? "bg-green-600/10 text-green-600"
                        : "bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
                {s.note && (
                  <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                    {s.note}
                  </p>
                )}
                <a
                  href={`/api/videos/${s.id}/file`}
                  className="mt-2 inline-block text-sm text-green-600"
                >
                  View video
                </a>
                {s.coachNotes && (
                  <div className="mt-3 rounded-lg bg-black/5 dark:bg-white/5 p-3 text-sm">
                    <p className="font-medium mb-1">Coach feedback</p>
                    <p className="text-black/70 dark:text-white/70">{s.coachNotes}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
