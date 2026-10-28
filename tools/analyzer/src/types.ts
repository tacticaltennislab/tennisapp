export type NoteType = "strength" | "issue" | "tactical";
export type DrawTool = "arrow" | "line" | "circle" | "free" | "zone";
export type Lang = "en" | "pl";

export interface Pt {
  x: number;
  y: number;
}

/** A drawn shape. Coordinates are fractions (0 to 1) of the video frame, so they survive any window size. */
export interface Shape {
  tool: DrawTool;
  color: string;
  /** arrow, line, circle (centre then a point on the edge) and zone (two opposite corners) use two points. */
  points: Pt[];
}

export interface Note {
  id: string;
  /** Seconds from the start of the video. */
  time: number;
  type: NoteType;
  title: string;
  text: string;
  shapes: Shape[];
  /** The annotated frame as a PNG data URL, made when the drawing is finished. */
  drawing?: string;
}

export type Outcome = "winner" | "forced_error" | "unforced_error" | "ace" | "double_fault";
export type Who = "player" | "opponent";
export type Side = "deuce" | "ad";

export interface Landing extends Pt {
  /** For serves: did it land in the correct service box? */
  in?: boolean;
}

/** One charted point. Coordinates are in feet on the doubles court, the server's end at the bottom. */
export interface ChartPoint {
  id: string;
  server: Who;
  side: Side;
  /** One or two serves in the order they were hit. */
  serves: Landing[];
  /** Where the shots after the serve landed. */
  rally: Pt[];
  outcome: Outcome;
  winner: Who;
  /** Video time when the point was charted, if a video was open. */
  videoTime?: number;
}

export interface Summary {
  strengths: string[];
  issues: { title: string; detail: string }[];
  tactical: string[];
  priorities: string[];
  drills: { name: string; detail: string }[];
}

export interface Meta {
  player: string;
  opponent: string;
  date: string;
  surface: string;
}

export interface Project {
  id: string;
  meta: Meta;
  video: { fileName: string; durationSec: number; fps: number };
  notes: Note[];
  points: ChartPoint[];
  summary: Summary;
  /** The language of the report and of the AI draft. */
  lang: Lang;
  updatedAt: string;
}

export const emptySummary = (): Summary => ({ strengths: [], issues: [], tactical: [], priorities: [], drills: [] });

export const NOTE_TYPES: NoteType[] = ["strength", "issue", "tactical"];
export const DRAW_COLORS = ["#c6f24e", "#ff5a4d", "#ffd23f", "#4da3ff"];
export const SURFACES = ["hard", "clay", "grass", "indoor", "other"];
