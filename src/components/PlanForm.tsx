"use client";

import { useState } from "react";
import {
  ALL_FOCUS_AREAS,
  FocusArea,
  Goal,
  PlanInput,
  SkillLevel,
  focusLabel,
  generatePlan,
  TrainingPlan,
} from "@/lib/planGenerator";
import PlanResults from "@/components/PlanResults";

const LEVELS: { value: SkillLevel; label: string }[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const GOALS: { value: Goal; label: string }[] = [
  { value: "general-fitness", label: "General Fitness" },
  { value: "technique", label: "Technique Improvement" },
  { value: "tournament-prep", label: "Tournament Preparation" },
  { value: "footwork", label: "Footwork & Movement" },
];

export default function PlanForm() {
  const [level, setLevel] = useState<SkillLevel>("beginner");
  const [goal, setGoal] = useState<Goal>("general-fitness");
  const [sessionsPerWeek, setSessionsPerWeek] = useState(3);
  const [sessionMinutes, setSessionMinutes] = useState(60);
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>([
    "forehand",
    "backhand",
    "footwork",
  ]);
  const [plan, setPlan] = useState<TrainingPlan | null>(null);

  function toggleFocus(area: FocusArea) {
    setFocusAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const input: PlanInput = {
      level,
      goal,
      sessionsPerWeek,
      sessionMinutes,
      focusAreas,
    };
    setPlan(generatePlan(input));
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-line shadow-sm rounded-2xl p-6 sm:p-8 space-y-6"
      >
        <div>
          <label className="block text-sm font-semibold mb-2">
            Skill level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {LEVELS.map((l) => (
              <button
                type="button"
                key={l.value}
                onClick={() => setLevel(l.value)}
                className={`rounded-lg px-3 py-2 text-sm font-medium border transition-colors ${
                  level === l.value
                    ? "bg-brand-600 text-white border-brand-600"
                    : "border-line hover:border-brand-600"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Primary goal
          </label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value as Goal)}
            className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm"
          >
            {GOALS.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Sessions / week
            </label>
            <input
              type="number"
              min={1}
              max={7}
              value={sessionsPerWeek}
              onChange={(e) =>
                setSessionsPerWeek(
                  Math.min(7, Math.max(1, Number(e.target.value) || 1))
                )
              }
              className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Minutes / session
            </label>
            <select
              value={sessionMinutes}
              onChange={(e) => setSessionMinutes(Number(e.target.value))}
              className="w-full rounded-lg border border-line bg-transparent px-3 py-2 text-sm"
            >
              {[30, 45, 60, 90, 120].map((m) => (
                <option key={m} value={m}>
                  {m} min
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Focus areas
          </label>
          <div className="flex flex-wrap gap-2">
            {ALL_FOCUS_AREAS.map((area) => (
              <button
                type="button"
                key={area}
                onClick={() => toggleFocus(area)}
                className={`rounded-full px-3 py-1.5 text-sm border transition-colors ${
                  focusAreas.includes(area)
                    ? "bg-brand-600 text-white border-brand-600"
                    : "border-line hover:border-brand-600"
                }`}
              >
                {focusLabel(area)}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
        >
          Generate my training plan
        </button>
      </form>

      {plan && (
        <div className="mt-10">
          <PlanResults plan={plan} />
        </div>
      )}
    </div>
  );
}
