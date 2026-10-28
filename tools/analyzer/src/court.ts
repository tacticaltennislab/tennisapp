import type { Pt, Side, Who } from "./types";

/** Doubles court in feet, seen from above: x across (0 to 36), y along (0 to 78), the net at y = 39. */
export const COURT = {
  width: 36,
  length: 78,
  singlesLeft: 4.5,
  singlesRight: 31.5,
  net: 39,
  serviceNear: 60,
  serviceFar: 18,
  centre: 18,
  /** Space around the court that can still be clicked, for balls that land out. */
  margin: 8,
};

/** The charting convention: the server always stands at the bottom, so serves land in the top half. */
export interface Box {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

/** The service box a serve from this side must land in (diagonally across from the server). */
export function serviceBox(side: Side): Box {
  return side === "deuce"
    ? { x1: COURT.singlesLeft, x2: COURT.centre, y1: COURT.serviceFar, y2: COURT.net }
    : { x1: COURT.centre, x2: COURT.singlesRight, y1: COURT.serviceFar, y2: COURT.net };
}

export const inBox = (p: Pt, b: Box) => p.x >= b.x1 && p.x <= b.x2 && p.y >= b.y1 && p.y <= b.y2;

export type Zone = "wide" | "body" | "t";

/** Wide, body or T, from the server's point of view: thirds of the box, the T next to the centre line. */
export function serveZone(p: Pt, side: Side): Zone {
  const box = serviceBox(side);
  const third = (box.x2 - box.x1) / 3;
  const fromCentre = side === "deuce" ? box.x2 - p.x : p.x - box.x1;
  if (fromCentre < third) return "t";
  if (fromCentre < third * 2) return "body";
  return "wide";
}

export const other = (w: Who): Who => (w === "player" ? "opponent" : "player");
