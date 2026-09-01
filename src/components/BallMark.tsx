export default function BallMark({
  className,
  stroke = "currentColor",
  style,
}: {
  className?: string;
  stroke?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} style={style} aria-hidden="true">
      <circle cx="50" cy="50" r="46" stroke={stroke} strokeWidth="3" />
      <path
        d="M11 25c14 10 14 40 0 50M89 25c-14 10-14 40 0 50"
        stroke={stroke}
        strokeWidth="3"
      />
    </svg>
  );
}
