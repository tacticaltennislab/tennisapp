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
  | "fitness"
  | "mental"
  | "tactical";

export interface PlanInput {
  level: SkillLevel;
  goal: Goal;
  sessionsPerWeek: number;
  sessionMinutes: number;
  focusAreas: FocusArea[];
}

export interface Drill {
  name: string;
  minutes: number;
  detail: string;
}

export interface Session {
  day: string;
  title: string;
  warmup: Drill;
  drills: Drill[];
  cooldown: Drill;
  tip: string;
  totalMinutes: number;
}

export interface TrainingPlan {
  input: PlanInput;
  sessions: Session[];
}

const DAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const FOCUS_LABELS: Record<FocusArea, string> = {
  serve: "Serve",
  forehand: "Forehand",
  backhand: "Backhand",
  volleys: "Volleys & Net Play",
  footwork: "Footwork & Movement",
  fitness: "Fitness & Conditioning",
  mental: "Mental Game",
  tactical: "Tactical Training",
};

const GOAL_LABELS: Record<Goal, string> = {
  "general-fitness": "General Fitness",
  technique: "Technique Improvement",
  "tournament-prep": "Tournament Preparation",
  footwork: "Footwork & Movement",
};

const LEVEL_TIPS: Record<SkillLevel, string> = {
  beginner:
    "Focus on consistency over power — get the ball in the court before adding pace or spin.",
  intermediate:
    "Work on shot placement and depth. Start linking drills into point-play patterns.",
  advanced:
    "Simulate match pressure — add movement, time constraints, and shot selection under fatigue.",
};

const DRILL_LIBRARY: Record<FocusArea, Record<SkillLevel, string[]>> = {
  serve: {
    beginner: [
      "Shadow serve motion (no ball) focusing on the toss and trophy position.",
      "Serve into the box from half-court distance, 10 balls per side.",
    ],
    intermediate: [
      "Target serves to the deuce and ad corners, 10 balls each, track hit rate.",
      "First/second serve routine: hit a first serve, then a spin second serve.",
    ],
    advanced: [
      "Serve + first-ball attack: serve then close in to finish the point.",
      "Kick serve to the backhand, aiming for high bounce and depth.",
    ],
  },
  forehand: {
    beginner: [
      "Cross-court forehand rally from the service line, focus on clean contact.",
      "Forehand drop-feed and swing, 15 reps, prioritize full follow-through.",
    ],
    intermediate: [
      "Cross-court forehand rally, 10-ball consistency target from the baseline.",
      "Inside-out forehand from the ad court to the open court.",
    ],
    advanced: [
      "Forehand rally with directional changes on coach/partner call.",
      "Heavy topspin forehand under time pressure, alternating pace and spin.",
    ],
  },
  backhand: {
    beginner: [
      "Cross-court backhand rally from the service line, two hands allowed.",
      "Backhand drop-feed and swing, 15 reps, focus on balance.",
    ],
    intermediate: [
      "Backhand down-the-line drill, 10 balls, track accuracy.",
      "Slice backhand approach shot into the net-play transition.",
    ],
    advanced: [
      "Backhand rally with depth and directional changes on call.",
      "Backhand return of serve against varied spin and pace.",
    ],
  },
  volleys: {
    beginner: [
      "Volley-to-volley exchange at the net, focus on a compact swing.",
      "Feed-and-volley: partner feeds, you punch a volley into the open court.",
    ],
    intermediate: [
      "Approach shot into a first volley, then close for a put-away.",
      "Reflex volleys from a fast partner feed at close range.",
    ],
    advanced: [
      "Live points starting at the net vs. baseline groundstrokes.",
      "Half-volley pickups on low, fast balls at the service line.",
    ],
  },
  footwork: {
    beginner: [
      "Ladder drill: two-feet-in-each-box, focus on rhythm.",
      "Side-shuffle to split-step, then shadow a groundstroke.",
    ],
    intermediate: [
      "Cone sprints: sprint to a cone, split-step, recover to center.",
      "Figure-8 movement pattern combined with shadow swings.",
    ],
    advanced: [
      "Reactive movement drill: coach/partner calls direction at random.",
      "Suicide sprints between baseline, service line, and net with shadow shots.",
    ],
  },
  fitness: {
    beginner: [
      "10-minute light jog plus dynamic stretching (leg swings, lunges).",
      "Bodyweight circuit: squats, push-ups, plank — 3 rounds.",
    ],
    intermediate: [
      "Interval sprints: 30 seconds on/30 seconds rest, 10 rounds.",
      "Core circuit: Russian twists, mountain climbers, side planks.",
    ],
    advanced: [
      "Tennis-specific HIIT: shuttle sprints with direction changes, 8 rounds.",
      "Explosive power circuit: box jumps, medicine ball throws, resisted sprints.",
    ],
  },
  mental: {
    beginner: [
      "Point-by-point reset routine: bounce the ball, breathe, then serve/return.",
      "Play a practice set focusing only on staying positive after errors.",
    ],
    intermediate: [
      "Play tiebreaks under simulated pressure, track focus between points.",
      "Visualization: rehearse a big point before playing it out live.",
    ],
    advanced: [
      "Play must-win game scenarios (down 0-40, up 40-0) and track composure.",
      "Pre-match routine rehearsal: warmup, breathing, and self-talk under time pressure.",
    ],
  },
  tactical: {
    beginner: [
      "Cross-court-only points: rally cross-court until 3+ balls stay in the same direction before either player can go down the line.",
      "Traffic-light shot selection: play short balls as green lights to approach, deep balls as red lights to reset.",
    ],
    intermediate: [
      "Construct-to-neutral-to-attack: extend the rally to a neutral ball, then attack the next short one instead of forcing an early winner.",
      "Serve-plus-three: before each point, call out where your serve, return, and third shot are going, then play it out live.",
    ],
    advanced: [
      "Situational points: play from specific scores (break point, serving for the set) and review decision-making, not just the outcome.",
      "Pattern-of-three: identify a weaker side and construct three consecutive shots into it before finishing the point.",
    ],
  },
};

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function buildSession(
  dayIndex: number,
  input: PlanInput,
  sessionIndex: number
): Session {
  const { level, sessionMinutes, focusAreas } = input;
  const areas: FocusArea[] =
    focusAreas.length > 0 ? focusAreas : ["footwork", "fitness"];

  const warmupMinutes = Math.max(5, Math.round(sessionMinutes * 0.15));
  const cooldownMinutes = Math.max(5, Math.round(sessionMinutes * 0.1));
  const drillMinutesTotal = sessionMinutes - warmupMinutes - cooldownMinutes;

  const primaryFocus = pick(areas, sessionIndex);
  const secondaryFocus = pick(
    areas,
    sessionIndex + Math.max(1, Math.floor(areas.length / 2))
  );

  const focusesForSession = Array.from(
    new Set([primaryFocus, secondaryFocus])
  );

  const perDrillMinutes = Math.max(
    10,
    Math.round(drillMinutesTotal / (focusesForSession.length + 1))
  );

  const drills: Drill[] = focusesForSession.map((area, i) => {
    const options = DRILL_LIBRARY[area][level];
    const detail = pick(options, sessionIndex + i);
    return {
      name: `${FOCUS_LABELS[area]} Drill`,
      minutes: perDrillMinutes,
      detail,
    };
  });

  const pointPlayMinutes = Math.max(
    0,
    drillMinutesTotal - perDrillMinutes * focusesForSession.length
  );
  if (pointPlayMinutes >= 5) {
    drills.push({
      name: "Point Play",
      minutes: pointPlayMinutes,
      detail:
        level === "beginner"
          ? "Rally-based mini points to 7, focus on keeping the ball in play."
          : level === "intermediate"
          ? "Play out points starting with a fed ball into the focus areas above."
          : "Live points with scoring pressure (deuce/ad situations) applying today's focus.",
    });
  }

  return {
    day: DAY_NAMES[dayIndex % 7],
    title: `${FOCUS_LABELS[primaryFocus]} Focus`,
    warmup: {
      name: "Warm-up",
      minutes: warmupMinutes,
      detail:
        "Light jog, dynamic stretches, and progressive rallying from the service line to the baseline.",
    },
    drills,
    cooldown: {
      name: "Cool-down",
      minutes: cooldownMinutes,
      detail: "Static stretching and short reflection on today's session goals.",
    },
    tip: LEVEL_TIPS[level],
    totalMinutes: sessionMinutes,
  };
}

export function generatePlan(input: PlanInput): TrainingPlan {
  const sessions: Session[] = [];
  const step = Math.max(1, Math.floor(7 / input.sessionsPerWeek));

  for (let i = 0; i < input.sessionsPerWeek; i++) {
    const dayIndex = Math.min(6, i * step);
    sessions.push(buildSession(dayIndex, input, i));
  }

  return { input, sessions };
}

export function goalLabel(goal: Goal): string {
  return GOAL_LABELS[goal];
}

export function focusLabel(area: FocusArea): string {
  return FOCUS_LABELS[area];
}

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
