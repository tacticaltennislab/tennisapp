import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { canReviewPlayer } from "@/lib/academy";
import { focusLabel } from "@/i18n/dictionaries/trainingOptions";
import { isFocusArea } from "@/lib/trainingOptions";
import type { Analysis, AnalysisStatus, Drill, Feedback, Observation, ObservationKind } from "@/lib/analysisTypes";

/**
 * Real analyses for the client dashboard. Access rule (one place): the player who sent a video can
 * open it, an admin can open any, and a coach or owner of an academy can open the analyses of that
 * academy's players. A player never sees another player's analysis, not even in the same academy.
 */

export interface Viewer {
  id: string;
  role?: string;
}

/** True if this viewer may open the analysis owned by `ownerId`. */
export async function canViewAnalysis(viewer: Viewer, ownerId: string): Promise<boolean> {
  if (viewer.id === ownerId) return true;
  return canReviewPlayer(viewer, ownerId);
}

export interface AnalysisListItem extends Analysis {
  ownerId: string;
  /** Set for analyses that belong to someone else the viewer coaches. */
  ownerName?: string;
}

const STATUS: Record<string, AnalysisStatus> = {
  pending: "awaiting",
  in_review: "in_review",
  reviewed: "reviewed",
  rejected: "rejected",
};

export function serviceLabel(analysisType: string | null, isFree: boolean): string {
  const base =
    analysisType === "stroke"
      ? "Stroke analysis"
      : analysisType === "match"
        ? "Match analysis"
        : analysisType === "training"
          ? "Training analysis"
          : "Analysis";
  return isFree ? `Free ${base.toLowerCase()}` : base;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatBytes(n: number): string {
  if (n >= 1024 * 1024 * 1024) return `${(n / 1024 / 1024 / 1024).toFixed(1)} GB`;
  if (n >= 1024 * 1024) return `${Math.round(n / 1024 / 1024)} MB`;
  return `${Math.max(1, Math.round(n / 1024))} KB`;
}

const full = {
  reviewedBy: { select: { name: true, email: true } },
  observations: { orderBy: { timeSec: "asc" as const } },
  report: true,
  user: { select: { name: true, email: true } },
} satisfies Prisma.VideoSubmissionInclude;

type Row = Prisma.VideoSubmissionGetPayload<{ include: typeof full }>;

function asIssues(value: Prisma.JsonValue): { title: string; detail: string }[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((v) =>
    v && typeof v === "object" && !Array.isArray(v) && typeof v.title === "string"
      ? [{ title: v.title, detail: typeof v.detail === "string" ? v.detail : "" }]
      : []
  );
}

function asDrills(value: Prisma.JsonValue): Drill[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((v) =>
    v && typeof v === "object" && !Array.isArray(v) && typeof v.name === "string"
      ? [{ name: v.name, detail: typeof v.detail === "string" ? v.detail : "" }]
      : []
  );
}

/** The structured report, or for older submissions one built from their plain text notes. */
export function feedbackOf(row: Row): Feedback | undefined {
  if (row.report) {
    const r = row.report;
    return {
      strengths: r.strengths,
      issues: asIssues(r.issues),
      tactical: r.tactical,
      priorities: r.priorities,
      drills: asDrills(r.drills),
    };
  }
  // Old submissions: tacticalNotes / technicalNotes (free analysis) or a single coachNotes text.
  if (row.tacticalNotes || row.technicalNotes) {
    return {
      strengths: [],
      issues: row.technicalNotes ? [{ title: "Technical analysis", detail: row.technicalNotes }] : [],
      tactical: row.tacticalNotes ? [row.tacticalNotes] : [],
      priorities: [],
    };
  }
  if (row.coachNotes) {
    return { strengths: [], issues: [{ title: "Coach feedback", detail: row.coachNotes }], tactical: [], priorities: [] };
  }
  return undefined;
}

export function observationsOf(row: Row): Observation[] {
  return row.observations.map((o) => ({
    id: o.id,
    t: o.timeSec,
    kind: (["strength", "issue", "tactical"].includes(o.kind) ? o.kind : "issue") as ObservationKind,
    title: o.title,
    text: o.text,
    pin: o.pinX != null && o.pinY != null ? { x: o.pinX, y: o.pinY } : undefined,
    drawing: o.drawing ?? undefined,
  }));
}

/**
 * Maps a row to what the dashboard shows. The coach's observations and summary are only included
 * once the analysis is published (status reviewed) unless `includeDraft` is set, which only the
 * coach report editor does.
 */
export function toAnalysis(row: Row, opts: { includeDraft?: boolean } = {}): Analysis {
  const status = STATUS[row.status] ?? "awaiting";
  const published = status === "reviewed" || opts.includeDraft;
  return {
    id: row.id,
    title: row.title || row.fileName,
    service: serviceLabel(row.analysisType, row.isFree),
    status,
    submittedAt: formatDate(row.createdAt),
    reviewedAt: row.reviewedAt ? formatDate(row.reviewedAt) : undefined,
    coach: status === "reviewed" ? row.reviewedBy?.name || "Tactical Tennis Lab coach" : undefined,
    durationSec: row.actualDurationSec ?? (row.declaredMinutes ? row.declaredMinutes * 60 : 0),
    fileName: row.fileName,
    fileSize: formatBytes(row.fileSize),
    focus: row.focusAreas.filter(isFocusArea).map((a) => focusLabel(a, "en")),
    playerNote: row.note ?? "",
    observations: published ? observationsOf(row) : [],
    feedback: published ? feedbackOf(row) : undefined,
  };
}

/** Everything the viewer may see in the dashboard list: their own analyses, plus those of the players of
 * academies where they are a coach or owner. Newest first. */
export async function listAnalyses(viewer: Viewer): Promise<AnalysisListItem[]> {
  const coached = await prisma.academyPlayer.findMany({
    where: { academy: { members: { some: { userId: viewer.id } } } },
    select: { userId: true },
  });
  const ownerIds = [...new Set([viewer.id, ...coached.map((p) => p.userId)])];
  const rows = await prisma.videoSubmission.findMany({
    where: { userId: { in: ownerIds } },
    include: full,
    orderBy: { createdAt: "desc" },
  });
  return rows.map((row) => ({
    ...toAnalysis(row),
    ownerId: row.userId,
    ownerName: row.userId === viewer.id ? undefined : row.user.name || row.user.email,
  }));
}

/** One analysis for the dashboard, or null if it does not exist or the viewer may not open it. */
export async function getAnalysis(viewer: Viewer, id: string): Promise<AnalysisListItem | null> {
  const row = await prisma.videoSubmission.findUnique({ where: { id }, include: full });
  if (!row || !(await canViewAnalysis(viewer, row.userId))) return null;
  return {
    ...toAnalysis(row),
    ownerId: row.userId,
    ownerName: row.userId === viewer.id ? undefined : row.user.name || row.user.email,
  };
}

/** Full data for the coach report editor (drafts included). The caller checks the reviewer's rights. */
export async function getAnalysisForEditor(id: string) {
  const row = await prisma.videoSubmission.findUnique({ where: { id }, include: full });
  if (!row) return null;
  return { row, analysis: toAnalysis(row, { includeDraft: true }) };
}
