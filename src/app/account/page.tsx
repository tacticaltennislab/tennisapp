import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/account");
  }

  return (
    <main className="flex-1 px-4 py-16">
      <div className="max-w-sm mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your account</h1>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-black/50 dark:text-white/50">Name</dt>
            <dd>{session.user.name || "—"}</dd>
          </div>
          <div>
            <dt className="text-black/50 dark:text-white/50">Email</dt>
            <dd>{session.user.email}</dd>
          </div>
        </dl>
      </div>
    </main>
  );
}
