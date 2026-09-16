import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { IconUsers } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function WaitlistAdminPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/waitlist/admin");
  }
  if (session.user.role !== "admin") {
    redirect("/account");
  }

  const entries = await prisma.waitlistEntry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="Admin"
        title="Waitlist"
        subtitle={`${entries.length} ${entries.length === 1 ? "person" : "people"} waiting.`}
      />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {entries.length === 0 ? (
            <EmptyState icon={IconUsers} title="No one on the waitlist yet" />
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-line shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-muted text-left text-muted">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id} className="border-t border-line">
                      <td className="px-4 py-3 font-medium">{entry.name}</td>
                      <td className="px-4 py-3">{entry.email}</td>
                      <td className="px-4 py-3 text-muted">
                        {entry.createdAt.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
