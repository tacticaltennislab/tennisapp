/** Shapes shared by the real dashboard, the coach report editor and the sample (demo) data. */

export type ObservationKind = "strength" | "issue" | "tactical";

export interface Observation {
  id: string;
  /** Seconds from the start of the video. */
  t: number;
  kind: ObservationKind;
  title: string;
  text: string;
  /** Where the coach pointed, as a percentage of the frame. */
  pin?: { x: number; y: number };
  /** The annotated frame, a PNG data URL (from the local analysis tool). */
  drawing?: string;
}

export interface Drill {
  name: string;
  detail: string;
}

export interface Feedback {
  strengths: string[];
  issues: { title: string; detail: string }[];
  tactical: string[];
  priorities: string[];
  drills?: Drill[];
}

/** awaiting = sent, no coach yet; in_review = a coach has started; reviewed = published to the client. */
export type AnalysisStatus = "awaiting" | "in_review" | "reviewed" | "rejected";

export interface Analysis {
  id: string;
  title: string;
  service: string;
  status: AnalysisStatus;
  submittedAt: string;
  reviewedAt?: string;
  coach?: string;
  durationSec: number;
  fileName: string;
  fileSize: string;
  focus: string[];
  playerNote: string;
  observations: Observation[];
  feedback?: Feedback;
}

export function formatClock(seconds: number): string {
  const s = Math.max(0, seconds);
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}
