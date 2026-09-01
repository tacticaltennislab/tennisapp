import PlanForm from "@/components/PlanForm";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-black/10 dark:border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
          <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">
            Tennis App
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mt-1">
            Build your tennis training plan
          </h1>
          <p className="mt-2 text-black/60 dark:text-white/60 max-w-2xl">
            For amateurs and everyone who plays &mdash; tell us your level,
            goals, and schedule, and we&apos;ll put together a weekly plan.
          </p>
        </div>
      </div>

      <main className="flex-1 px-4 py-10">
        <PlanForm />
      </main>

      <footer className="border-t border-black/10 dark:border-white/10 py-6">
        <p className="text-center text-xs text-black/40 dark:text-white/40">
          Tennis App &mdash; training plans for every level.
        </p>
      </footer>
    </div>
  );
}
