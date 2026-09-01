import PlanForm from "@/components/PlanForm";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-line bg-brand-50/40">
        <div className="max-w-3xl mx-auto px-4 py-10 sm:py-14">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">
            Tactical Tennis Lab
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mt-1 text-ink">
            Build your tennis training plan
          </h1>
          <p className="mt-2 text-body max-w-2xl">
            For amateurs and everyone who plays &mdash; tell us your level,
            goals, and schedule, and we&apos;ll put together a weekly plan.
          </p>
        </div>
      </div>

      <main className="flex-1 px-4 py-10">
        <PlanForm />
      </main>

      <footer className="border-t border-line py-6">
        <p className="text-center text-xs text-muted">
          Tactical Tennis Lab &mdash; training plans for every level.
        </p>
      </footer>
    </div>
  );
}
