import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { IconUsers } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/customers");
  }
  if (session.user.role !== "admin") {
    redirect("/account");
  }

  const customers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      accounts: { select: { provider: true } },
      _count: {
        select: {
          videoSubmissions: true,
          messages: { where: { sender: "customer", read: false } },
        },
      },
    },
  });

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="Admin"
        title="Customers"
        subtitle={`${customers.length} signed-up ${customers.length === 1 ? "customer" : "customers"}.`}
      />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {customers.length === 0 ? (
            <EmptyState icon={IconUsers} title="No customers yet" />
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-line shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-muted">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Sign-in</th>
                    <th className="px-4 py-3 font-medium">Videos</th>
                    <th className="px-4 py-3 font-medium">Joined</th>
                    <th className="px-4 py-3 font-medium">Messages</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => (
                    <tr key={c.id} className="border-t border-line">
                      <td className="px-4 py-3 font-medium">{c.name || "—"}</td>
                      <td className="px-4 py-3">{c.email}</td>
                      <td className="px-4 py-3 text-body">
                        {c.accounts.some((a) => a.provider === "google")
                          ? "Google"
                          : "Email"}
                        {c.role === "admin" && (
                          <span className="ml-2 text-xs rounded-full bg-brand-50 text-brand-700 px-2 py-0.5">
                            admin
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">{c._count.videoSubmissions}</td>
                      <td className="px-4 py-3 text-muted">
                        {c.createdAt.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/customers/${c.id}`}
                          className="text-brand-600 font-medium hover:underline"
                        >
                          {c._count.messages > 0 ? `Reply (${c._count.messages})` : "Message"}
                        </Link>
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
