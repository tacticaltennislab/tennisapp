import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import DashboardShell from "@/components/dashboard/DashboardShell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard (prototype)",
  robots: { index: false, follow: false },
};

/** Prototype: visible to admins only, so customers never mistake the sample
 * data for their own. Everyone else is sent to their account. */
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/sign-in?callbackUrl=/dashboard");
  if (session.user.role !== "admin") redirect("/account");

  return <DashboardShell>{children}</DashboardShell>;
}
