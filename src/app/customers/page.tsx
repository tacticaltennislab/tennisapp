import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { IconUsers } from "@/components/icons";
import CreditAdjust from "@/components/CreditAdjust";

export const dynamic = "force-dynamic";

type PurchaseSummary = {
  planName: string;
  status: string;
  mode: string;
  amount: number;
  currentPeriodEnd: Date | null;
};

function paymentStatus(purchases: PurchaseSummary[]): { label: string; tone: string } {
  if (purchases.some((p) => p.status === "active")) {
    const active = purchases.find((p) => p.status === "active")!;
    return { label: `Active: ${active.planName}`, tone: "bg-green-50 text-green-700" };
  }
  if (purchases.some((p) => p.status === "past_due" || p.status === "unpaid")) {
    return { label: "Past due", tone: "bg-amber-50 text-amber-700" };
  }
  const paid = purchases.filter((p) => p.status === "paid");
  if (paid.length > 0) {
    return {
      label: paid.length === 1 ? `Paid: ${paid[0].planName}` : `Paid: ${paid.length} plans`,
      tone: "bg-green-50 text-green-700",
    };
  }
  if (purchases.some((p) => p.status === "pending")) {
    return { label: "Pending", tone: "bg-amber-50 text-amber-700" };
  }
  if (purchases.some((p) => p.status === "canceled")) {
    return { label: "Canceled", tone: "bg-chip text-muted" };
  }
  return { label: "No purchases", tone: "bg-chip text-muted" };
}

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
      purchases: {
        select: { planName: true, status: true, mode: true, amount: true, currentPeriodEnd: true },
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: {
          videoSubmissions: true,
          messages: { where: { sender: "customer", read: false } },
        },
      },
    },
  });

  const [userSums, academySums, academies] = await Promise.all([
    prisma.creditLedger.groupBy({ by: ["userId"], where: { userId: { not: null } }, _sum: { delta: true } }),
    prisma.creditLedger.groupBy({ by: ["academyId"], where: { academyId: { not: null } }, _sum: { delta: true } }),
    prisma.academy.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        subscriptions: { orderBy: { currentPeriodEnd: "desc" }, take: 1, select: { planKey: true, status: true, currentPeriodEnd: true } },
      },
    }),
  ]);
  const userBalance = new Map(userSums.map((r) => [r.userId, r._sum.delta ?? 0]));
  const academyBalance = new Map(academySums.map((r) => [r.academyId, r._sum.delta ?? 0]));

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="Admin"
        title="Customers"
        subtitle={`${customers.length} signed up ${customers.length === 1 ? "customer" : "customers"}.`}
      />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {customers.length === 0 ? (
            <EmptyState icon={IconUsers} title="No customers yet" />
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-line shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-muted text-left text-muted">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Sign in</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Credits</th>
                    <th className="px-4 py-3 font-medium">Videos</th>
                    <th className="px-4 py-3 font-medium">Joined</th>
                    <th className="px-4 py-3 font-medium">Messages</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => {
                    const status = paymentStatus(c.purchases);
                    return (
                    <tr key={c.id} className="border-t border-line">
                      <td className="px-4 py-3 font-medium">{c.name || "No name"}</td>
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
                      <td className="px-4 py-3">
                        <span className={`text-xs rounded-full px-2 py-0.5 whitespace-nowrap ${status.tone}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <CreditAdjust userId={c.id} balance={userBalance.get(c.id) ?? 0} />
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <h2 className="mt-14 text-lg font-semibold">Academies</h2>
          {academies.length === 0 ? (
            <p className="mt-3 text-sm text-muted">No academies yet.</p>
          ) : (
            <div className="mt-4 overflow-x-auto rounded-2xl border border-line shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-muted text-left text-muted">
                    <th className="px-4 py-3 font-medium">Academy</th>
                    <th className="px-4 py-3 font-medium">Subscription</th>
                    <th className="px-4 py-3 font-medium">Renews</th>
                    <th className="px-4 py-3 font-medium">Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {academies.map((a) => {
                    const sub = a.subscriptions[0];
                    return (
                      <tr key={a.id} className="border-t border-line align-top">
                        <td className="px-4 py-3 font-medium">{a.name}</td>
                        <td className="px-4 py-3 text-body">{sub ? `${sub.planKey} (${sub.status})` : "None"}</td>
                        <td className="px-4 py-3 text-muted">
                          {sub?.currentPeriodEnd
                            ? sub.currentPeriodEnd.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                            : "No date"}
                        </td>
                        <td className="px-4 py-3">
                          <CreditAdjust academyId={a.id} balance={academyBalance.get(a.id) ?? 0} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
