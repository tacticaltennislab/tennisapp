/**
 * Court geometry and perspective. Positions are in metres on a doubles court:
 * x runs along the length (0 = the near baseline, 23.77 = the far baseline)
 * and y across the width (0 to 10.97, left to right as the camera sees it).
 * `makeCamera` maps those metres onto a frame given the four court corners as
 * fractions of the frame, so markings follow the real court perspective. To
 * use a real frame, measure its four corners once and every mark lines up.
 */
export const COURT = {
  length: 23.77,
  width: 10.97,
  net: 11.885,
  singlesInset: 1.37,
  serviceLine: 6.4,
  netHeight: 0.914,
} as const;

export type Pt = [number, number];

export interface Corners {
  nearLeft: Pt;
  nearRight: Pt;
  farRight: Pt;
  farLeft: Pt;
}

export interface Camera {
  /** Court metres to frame coordinates (fractions of width and height). */
  project: (x: number, y: number) => Pt;
  /** Frame fraction occupied by one metre across the court at this spot. */
  metre: (x: number, y: number) => number;
}

// Unit square to quadrilateral (Heckbert, "Fundamentals of Texture Mapping").
export function makeCamera(c: Corners): Camera {
  const [x0, y0] = c.nearLeft;
  const [x1, y1] = c.farLeft;
  const [x2, y2] = c.farRight;
  const [x3, y3] = c.nearRight;
  const dx1 = x1 - x2;
  const dx2 = x3 - x2;
  const dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2;
  const dy2 = y3 - y2;
  const dy3 = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dy1 * dx2;
  const g = (dx3 * dy2 - dy3 * dx2) / den;
  const h = (dx1 * dy3 - dy1 * dx3) / den;
  const a = x1 - x0 + g * x1;
  const b = x3 - x0 + h * x3;
  const d = y1 - y0 + g * y1;
  const e = y3 - y0 + h * y3;

  const project = (x: number, y: number): Pt => {
    const u = x / COURT.length;
    const v = y / COURT.width;
    const w = g * u + h * v + 1;
    return [(a * u + b * v + x0) / w, (d * u + e * v + y0) / w];
  };
  const metre = (x: number, y: number) => {
    const [px, py] = project(x, y);
    const [qx, qy] = project(x, y + 1);
    return Math.hypot(qx - px, qy - py);
  };
  return { project, metre };
}

/** The painted lines of a doubles court, as polylines in metres. */
export function courtLines(): Pt[][] {
  const { length: L, width: W, net, singlesInset: s, serviceLine: sl } = COURT;
  return [
    [[0, 0], [L, 0], [L, W], [0, W], [0, 0]],
    [[0, s], [L, s]],
    [[0, W - s], [L, W - s]],
    [[net - sl, s], [net - sl, W - s]],
    [[net + sl, s], [net + sl, W - s]],
    [[net - sl, W / 2], [net + sl, W / 2]],
    [[0, W / 2 - 0.15], [0, W / 2 + 0.15]],
    [[L, W / 2 - 0.15], [L, W / 2 + 0.15]],
  ];
}
