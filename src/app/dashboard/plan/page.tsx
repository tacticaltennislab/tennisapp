import Link from "next/link";
import PlanTracker from "@/components/dashboard/PlanTracker";
import { Panel } from "@/components/dashboard/ui";
import { getDashboardContext, type DashboardSearchParams } from "@/lib/dashboardContext";

export default async function PlanPage({ searchParams }: { searchParams: DashboardSearchParams }) {
  const { demo } = await getDashboardContext(searchParams);
  if (demo) return <PlanTracker />;

  return (
    <div className="mx-auto max-w-3xl">
      <Panel>
        <div className="px-6 py-12 text-center">
          <h2 className="text-lg font-semibold text-ink">No training plan yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            The 4 Week Training Program is built from your Stroke Analysis. Your coach writes the sessions and they
            appear here once the plan is ready.
          </p>
          <Link href="/pricing" className="btn btn-primary mt-6 inline-flex">
            See the plans
          </Link>
        </div>
      </Panel>
    </div>
  );
}
