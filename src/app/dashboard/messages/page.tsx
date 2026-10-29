import { prisma } from "@/lib/prisma";
import MessagesDemo from "@/components/dashboard/MessagesDemo";
import MessagesPanel from "@/components/dashboard/MessagesPanel";
import { getDashboardContext, type DashboardSearchParams } from "@/lib/dashboardContext";

export default async function MessagesPage({ searchParams }: { searchParams: DashboardSearchParams }) {
  const { user, demo } = await getDashboardContext(searchParams);
  if (demo) return <MessagesDemo />;

  const rows = await prisma.message.findMany({ where: { userId: user.id }, orderBy: { createdAt: "asc" } });
  return (
    <MessagesPanel
      initial={rows.map((m) => ({
        id: m.id,
        from: m.sender === "admin" ? "coach" : "player",
        body: m.body,
        at: m.createdAt.toISOString(),
      }))}
      hadUnread={rows.some((m) => m.sender === "admin" && !m.read)}
    />
  );
}
