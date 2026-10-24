type Pt = [number, number];

/**
 * Top-down tennis court (doubles, drawn to scale: 23.77 m by 10.97 m) with
 * the server on the left and the far service boxes on the right. Dots mark
 * where a serve landed; faint curves are the flight paths. Purely
 * illustrative: callers choose the landing spots.
 */
const S = 600 / 23.77; // px per metre
const X0 = 20;
const NET = X0 + 11.885 * S; // 320
const Y_TOP = 26.5;
const Y_BOT = Y_TOP + 10.97 * S;
const MID = (Y_TOP + Y_BOT) / 2;
const SINGLES_IN = 1.37 * S;
const SERVICE = 6.4 * S;

export const SERVER: Pt = [14, MID + 52];

export default function CourtDiagram({
  landings,
  zone,
  className = "",
  label,
}: {
  landings: Pt[];
  /** Optional soft highlight behind a cluster of landings. */
  zone?: { cx: number; cy: number; rx: number; ry: number };
  className?: string;
  label?: string;
}) {
  const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, opacity: 0.5 } as const;
  return (
    <svg
      viewBox="0 0 640 330"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
    >
      <g {...line}>
        <rect x={X0} y={Y_TOP} width={600} height={Y_BOT - Y_TOP} />
        <path d={`M${X0} ${Y_TOP + SINGLES_IN}H${X0 + 600}M${X0} ${Y_BOT - SINGLES_IN}H${X0 + 600}`} />
        <path d={`M${NET - SERVICE} ${Y_TOP + SINGLES_IN}V${Y_BOT - SINGLES_IN}M${NET + SERVICE} ${Y_TOP + SINGLES_IN}V${Y_BOT - SINGLES_IN}`} />
        <path d={`M${NET - SERVICE} ${MID}H${NET + SERVICE}`} />
        <path d={`M${X0} ${MID - 6}v12M${X0 + 600} ${MID - 6}v12`} />
      </g>
      <path d={`M${NET} ${Y_TOP - 8}V${Y_BOT + 8}`} stroke="currentColor" strokeWidth="3" strokeDasharray="3 5" opacity="0.7" fill="none" />

      {zone && (
        <ellipse cx={zone.cx} cy={zone.cy} rx={zone.rx} ry={zone.ry} fill="var(--color-accent)" opacity="0.18" />
      )}

      <g fill="none" stroke="var(--color-accent)" strokeWidth="1.8" strokeLinecap="round" opacity="0.65">
        {landings.map(([x, y], i) => {
          const mx = (SERVER[0] + x) / 2;
          const my = Math.min(SERVER[1], y) - 70;
          return <path key={i} d={`M${SERVER[0]} ${SERVER[1]}Q${mx} ${my} ${x} ${y}`} strokeDasharray="1 7" />;
        })}
      </g>
      <g fill="var(--color-accent)">
        {landings.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="7" />
        ))}
      </g>

      <circle cx={SERVER[0]} cy={SERVER[1]} r="9" fill="currentColor" />
      <circle cx={628} cy={MID - 60} r="9" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

/** The same serve pattern, before and after a coach's recommendation. */
export const BEFORE_LANDINGS: Pt[] = [
  [452, 102],
  [447, 108],
  [458, 97],
  [449, 94],
  [455, 107],
];
export const BEFORE_ZONE = { cx: 452, cy: 101, rx: 34, ry: 24 };
export const AFTER_LANDINGS: Pt[] = [
  [470, 156],
  [456, 148],
  [440, 117],
  [433, 72],
  [449, 86],
];
