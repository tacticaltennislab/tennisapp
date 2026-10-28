import AnalysesList from "@/components/dashboard/AnalysesList";
import EmptyAnalyses from "@/components/dashboard/EmptyAnalyses";
import { ANALYSES } from "@/lib/dashboardSample";
import { listAnalyses } from "@/lib/analyses";
import { getBalance } from "@/lib/credits";
import { getDashboardContext, type DashboardSearchParams } from "@/lib/dashboardContext";

export default async function AnalysesPage({ searchParams }: { searchParams: DashboardSearchParams }) {
  const { user, demo, q } = await getDashboardContext(searchParams);
  const items = demo ? ANALYSES : await listAnalyses(user);
  const balance = demo || items.length > 0 ? 0 : await getBalance({ userId: user.id });
  const coaching = items.some((a) => "ownerName" in a && a.ownerName);

  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-sm text-muted">
        {coaching
          ? "Every video you and your academy's players have sent, with the coach's review once it is ready."
          : "Every video you have sent, with the coach's review once it is ready. Open an analysis to watch it with the coach's notes on the timeline."}
      </p>
      {items.length === 0 ? <EmptyAnalyses freeCredit={balance > 0} /> : <AnalysesList items={items} q={q} />}
    </div>
  );
}
