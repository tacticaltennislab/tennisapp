import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import DashboardShell from "@/components/dashboard/DashboardShell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

function initialsOf(name: string): string {
  const parts = name.split(/[\s@.]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[1][0] : "")).toUpperCase() || "?";
}

/** The client dashboard for every signed in user. Admins can also open `?demo=1`, sample data for sales calls. */
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/sign-in?callbackUrl=/dashboard");

  const unread = await prisma.message.count({
    where: { userId: session.user.id, sender: "admin", read: false },
  });
  const name = session.user.name || session.user.email || "You";

  return (
    <DashboardShell
      user={{ name, initials: initialsOf(name), isAdmin: session.user.role === "admin", unread }}
    >
      {children}
    </DashboardShell>
  );
}
