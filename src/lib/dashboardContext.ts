import { redirect } from "next/navigation";
import { auth } from "@/auth";

export type DashboardSearchParams = Promise<{ demo?: string | string[] }>;

export interface DashboardContext {
  user: { id: string; name: string; email: string; role: string };
  /** Sample data for sales calls. Only ever true for admins. */
  demo: boolean;
  /** Suffix that keeps demo mode on when linking between dashboard pages. */
  q: string;
}

/** Who is looking at the dashboard, and whether it is the admin only demo. Redirects to sign in. */
export async function getDashboardContext(searchParams: DashboardSearchParams): Promise<DashboardContext> {
  const session = await auth();
  if (!session?.user) redirect("/sign-in?callbackUrl=/dashboard");
  const { demo: raw } = await searchParams;
  const demo = session.user.role === "admin" && (Array.isArray(raw) ? raw[0] : raw) === "1";
  return {
    user: {
      id: session.user.id,
      name: session.user.name || session.user.email || "",
      email: session.user.email || "",
      role: session.user.role || "customer",
    },
    demo,
    q: demo ? "?demo=1" : "",
  };
}
