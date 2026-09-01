import { TrainingPlan, goalLabel } from "@/lib/planGenerator";

export default function PlanResults({ plan }: { plan: TrainingPlan }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold">Your Weekly Plan</h2>
        <p className="text-sm text-body">
          {plan.sessions.length} sessions/week &middot; {goalLabel(plan.input.goal)} &middot;{" "}
          {plan.input.level.charAt(0).toUpperCase() + plan.input.level.slice(1)} level
        </p>
      </div>

      <div className="space-y-4">
        {plan.sessions.map((session, i) => (
          <div
            key={i}
            className="rounded-xl border border-line p-5"
          >
            <div className="flex items-baseline justify-between mb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {session.day}
                </span>
                <h3 className="text-lg font-semibold">{session.title}</h3>
              </div>
              <span className="text-sm text-muted">
                {session.totalMinutes} min
              </span>
            </div>

            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="font-medium w-24 shrink-0">
                  {session.warmup.minutes}m &mdash; {session.warmup.name}
                </span>
                <span className="text-body">
                  {session.warmup.detail}
                </span>
              </li>
              {session.drills.map((drill, j) => (
                <li key={j} className="flex gap-2">
                  <span className="font-medium w-24 shrink-0">
                    {drill.minutes}m &mdash; {drill.name}
                  </span>
                  <span className="text-body">
                    {drill.detail}
                  </span>
                </li>
              ))}
              <li className="flex gap-2">
                <span className="font-medium w-24 shrink-0">
                  {session.cooldown.minutes}m &mdash; {session.cooldown.name}
                </span>
                <span className="text-body">
                  {session.cooldown.detail}
                </span>
              </li>
            </ul>

            <p className="mt-3 text-xs italic text-muted">
              Tip: {session.tip}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
