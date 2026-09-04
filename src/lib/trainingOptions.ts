export type SkillLevel = "beginner" | "intermediate" | "advanced";

export type Goal =
  | "general-fitness"
  | "technique"
  | "tournament-prep"
  | "footwork";

export type FocusArea =
  | "serve"
  | "forehand"
  | "backhand"
  | "volleys"
  | "footwork"
  | "tactical"
  | "fitness"
  | "mental";

export const LEVELS: { value: SkillLevel; label: string }[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export const GOALS: { value: Goal; label: string }[] = [
  { value: "general-fitness", label: "General Fitness" },
  { value: "technique", label: "Technique Improvement" },
  { value: "tournament-prep", label: "Tournament Preparation" },
  { value: "footwork", label: "Footwork & Movement" },
];

const FOCUS_LABELS: Record<FocusArea, string> = {
  serve: "Serve",
  forehand: "Forehand",
  backhand: "Backhand",
  volleys: "Volleys & Net Play",
  footwork: "Footwork & Movement",
  tactical: "Tactical Training",
  fitness: "Fitness & Conditioning",
  mental: "Mental Game",
};

const GOAL_LABELS: Record<Goal, string> = {
  "general-fitness": "General Fitness",
  technique: "Technique Improvement",
  "tournament-prep": "Tournament Preparation",
  footwork: "Footwork & Movement",
};

const LEVEL_LABELS: Record<SkillLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const ALL_FOCUS_AREAS: FocusArea[] = [
  "serve",
  "forehand",
  "backhand",
  "volleys",
  "footwork",
  "tactical",
  "fitness",
  "mental",
];

export function focusLabel(area: FocusArea): string {
  return FOCUS_LABELS[area];
}

export function goalLabel(goal: Goal): string {
  return GOAL_LABELS[goal];
}

export function levelLabel(level: SkillLevel): string {
  return LEVEL_LABELS[level];
}

export function isFocusArea(value: string): value is FocusArea {
  return (ALL_FOCUS_AREAS as string[]).includes(value);
}

export function isSkillLevel(value: string): value is SkillLevel {
  return value === "beginner" || value === "intermediate" || value === "advanced";
}

export function isGoal(value: string): value is Goal {
  return value in GOAL_LABELS;
}
