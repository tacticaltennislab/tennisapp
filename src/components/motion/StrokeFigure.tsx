import { POSES, TOSS_IDEAL, type Pose, type Pt } from "@/components/motion/strokePoses";

function line(a: Pt, b: Pt) {
  return `M${a[0]} ${a[1]}L${b[0]} ${b[1]}`;
}

/** One pose drawn as a stick figure with a racquet and a ball. */
export function Figure({ pose }: { pose: Pose }) {
  const dx = pose.tip[0] - pose.handR[0];
  const dy = pose.tip[1] - pose.handR[1];
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const frame: Pt = [pose.tip[0] + ux * 22, pose.tip[1] + uy * 22];
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI - 90;

  const body = [
    line(pose.shoulder, pose.elbowL) + line(pose.elbowL, pose.handL),
    line(pose.shoulder, pose.elbowR) + line(pose.elbowR, pose.handR),
    line(pose.hip, pose.kneeL) + line(pose.kneeL, pose.footL),
    line(pose.hip, pose.kneeR) + line(pose.kneeR, pose.footR),
  ].join("");

  return (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d={line(pose.neck, pose.hip)} strokeWidth="12" />
      <path d={body} strokeWidth="7" />
      <circle cx={pose.head[0]} cy={pose.head[1]} r="17" strokeWidth="6" />
      <path d={line(pose.handR, pose.tip)} strokeWidth="5" />
      <ellipse
        cx={frame[0]}
        cy={frame[1]}
        rx="14"
        ry="23"
        strokeWidth="4"
        transform={`rotate(${angle} ${frame[0]} ${frame[1]})`}
      />
      {pose.ball && <circle cx={pose.ball[0]} cy={pose.ball[1]} r="8" fill="var(--color-accent)" stroke="none" />}
    </g>
  );
}

/** The coach's marks for each phase, in the accent colour. */
function Marks({ step }: { step: number }) {
  const common = { fill: "none", stroke: "var(--color-accent)", strokeWidth: 3, strokeLinecap: "round" as const };
  if (step === 0) {
    return (
      <g {...common}>
        <path d="M206 120V486" strokeDasharray="2 9" />
        <path d="M180 508h54M180 502v12M234 502v12" />
      </g>
    );
  }
  if (step === 1) {
    return (
      <g {...common}>
        <circle cx={TOSS_IDEAL.ball![0]} cy={TOSS_IDEAL.ball![1]} r="20" strokeDasharray="5 6" />
        <path d="M188 44H236" strokeDasharray="2 8" />
        <path d="m230 36 10 8-10 8" />
      </g>
    );
  }
  if (step === 2) {
    return (
      <g {...common}>
        <path d="M110 234H250" strokeDasharray="6 7" />
        <path d="M160 258V240M153 247l7-8 7 8" />
      </g>
    );
  }
  return (
    <g {...common}>
      <circle cx="288" cy="30" r="20" strokeDasharray="5 6" />
      <path d="M268 52V160" strokeDasharray="2 9" />
    </g>
  );
}

/** A single phase of the illustrated serve, with or without the coach's marks. */
export default function StrokeFigure({
  step,
  marks = true,
  variant = "actual",
  reference = false,
  className = "",
  label,
}: {
  step: 0 | 1 | 2 | 3;
  marks?: boolean;
  variant?: "actual" | "ideal";
  /** Draws a fixed dashed vertical at the centre, to judge whether the ball is in front of or behind the head. */
  reference?: boolean;
  className?: string;
  label?: string;
}) {
  const pose = step === 1 && variant === "ideal" ? TOSS_IDEAL : POSES[step];
  return (
    <svg
      viewBox="0 0 400 520"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
    >
      <path d="M50 492H350" stroke="var(--color-line-strong)" strokeWidth="2" strokeLinecap="round" fill="none" />
      {marks && <Marks step={step} />}
      {reference && (
        <path
          d="M200 20V486"
          stroke="var(--color-accent)"
          strokeWidth="3"
          strokeDasharray="2 9"
          strokeLinecap="round"
          fill="none"
        />
      )}
      <Figure pose={pose} />
    </svg>
  );
}
