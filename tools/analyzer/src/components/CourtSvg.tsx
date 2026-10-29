import { COURT, serviceBox, type Box } from "../court";
import type { Landing, Pt, Side } from "../types";

export type CourtView = "dots" | "heat-serve" | "heat-all";

interface Props {
  /** Landing spots of charted points to show as dots. */
  dots?: { p: Pt; fault?: boolean }[];
  heat?: number[][];
  /** The serve in progress. */
  draftServes?: Landing[];
  draftRally?: Pt[];
  targetSide?: Side | null;
  onPick?: (p: Pt) => void;
}

/** Top down doubles court, to scale, in feet. Clicks come back in feet, the server's end at the bottom. */
export default function CourtSvg({ dots = [], heat, draftServes = [], draftRally = [], targetSide, onPick }: Props) {
  const m = COURT.margin;
  const box: Box | null = targetSide ? serviceBox(targetSide) : null;
  const max = heat ? Math.max(1, ...heat.flat()) : 1;

  const pick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!onPick) return;
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const local = pt.matrixTransform(ctm.inverse());
    onPick({ x: Math.round(local.x * 10) / 10, y: Math.round(local.y * 10) / 10 });
  };

  return (
    <svg
      viewBox={`${-m} ${-m} ${COURT.width + m * 2} ${COURT.length + m * 2}`}
      className={onPick ? "court clickable" : "court"}
      role="img"
      aria-label="Tennis court seen from above. The server stands at the bottom."
      data-testid="court"
      onClick={pick}
    >
      <rect x={-m} y={-m} width={COURT.width + m * 2} height={COURT.length + m * 2} fill="#1b2a1d" />
      <rect x={0} y={0} width={COURT.width} height={COURT.length} fill="#2f5d3a" />
      {heat &&
        heat.map((row, r) =>
          row.map((count, c) =>
            count ? (
              <rect
                key={`${r}-${c}`}
                x={(c * COURT.width) / row.length}
                y={(r * COURT.length) / heat.length}
                width={COURT.width / row.length}
                height={COURT.length / heat.length}
                fill="#c6f24e"
                opacity={0.15 + 0.8 * (count / max)}
              />
            ) : null
          )
        )}
      <g stroke="#f4f6f7" strokeWidth={0.3} fill="none">
        <rect x={0} y={0} width={COURT.width} height={COURT.length} />
        <line x1={COURT.singlesLeft} y1={0} x2={COURT.singlesLeft} y2={COURT.length} />
        <line x1={COURT.singlesRight} y1={0} x2={COURT.singlesRight} y2={COURT.length} />
        <line x1={COURT.singlesLeft} y1={COURT.serviceFar} x2={COURT.singlesRight} y2={COURT.serviceFar} />
        <line x1={COURT.singlesLeft} y1={COURT.serviceNear} x2={COURT.singlesRight} y2={COURT.serviceNear} />
        <line x1={COURT.centre} y1={COURT.serviceFar} x2={COURT.centre} y2={COURT.serviceNear} />
      </g>
      <line x1={-3} y1={COURT.net} x2={COURT.width + 3} y2={COURT.net} stroke="#f4f6f7" strokeWidth={0.7} strokeDasharray="1.2 0.8" />
      {box && (
        <rect x={box.x1} y={box.y1} width={box.x2 - box.x1} height={box.y2 - box.y1} fill="#c6f24e" opacity={0.18} stroke="#c6f24e" strokeWidth={0.4} strokeDasharray="1 0.6" pointerEvents="none" />
      )}
      {dots.map((d, i) => (
        <circle key={i} cx={d.p.x} cy={d.p.y} r={0.9} fill={d.fault ? "#ff5a4d" : "#c6f24e"} stroke="#121417" strokeWidth={0.2} opacity={0.9} pointerEvents="none" />
      ))}
      {draftServes.map((s, i) => (
        <g key={`s${i}`} pointerEvents="none">
          <circle cx={s.x} cy={s.y} r={1.7} fill={s.in ? "#c6f24e" : "#ff5a4d"} stroke="#121417" strokeWidth={0.3} />
          <text x={s.x} y={s.y + 0.8} fontSize={2.2} fontWeight={700} textAnchor="middle" fill="#121417">
            {i + 1}
          </text>
        </g>
      ))}
      {draftRally.map((s, i) => (
        <g key={`r${i}`} pointerEvents="none">
          <circle cx={s.x} cy={s.y} r={1.5} fill="#8fb2ff" stroke="#121417" strokeWidth={0.3} />
          <text x={s.x} y={s.y + 0.75} fontSize={2} fontWeight={700} textAnchor="middle" fill="#121417">
            {i + 2}
          </text>
        </g>
      ))}
    </svg>
  );
}
