export default function RacquetMark({
  className,
  stroke = "currentColor",
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <svg viewBox="0 0 200 400" fill="none" className={className} aria-hidden="true">
      <ellipse cx="100" cy="110" rx="78" ry="98" stroke={stroke} strokeWidth="7" />
      <ellipse cx="100" cy="110" rx="62" ry="82" stroke={stroke} strokeWidth="1.4" opacity="0.6" />
      {[-48, -24, 0, 24, 48].map((x) => (
        <line
          key={`v${x}`}
          x1={100 + x}
          y1="34"
          x2={100 + x}
          y2="186"
          stroke={stroke}
          strokeWidth="1"
          opacity="0.5"
        />
      ))}
      {[-64, -32, 0, 32, 64, 96].map((y) => (
        <line
          key={`h${y}`}
          x1="26"
          y1={110 + y}
          x2="174"
          y2={110 + y}
          stroke={stroke}
          strokeWidth="1"
          opacity="0.5"
        />
      ))}
      <line x1="100" y1="205" x2="100" y2="360" stroke={stroke} strokeWidth="7" strokeLinecap="round" />
      <rect x="86" y="352" width="28" height="34" rx="8" stroke={stroke} strokeWidth="6" />
    </svg>
  );
}
