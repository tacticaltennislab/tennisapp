export default function CourtBackdrop() {
  return (
    <svg
      viewBox="0 0 780 360"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="courtFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#173f2a" />
          <stop offset="100%" stopColor="#0f2e1e" />
        </linearGradient>
        <radialGradient id="courtVignette" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="60%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="780" height="360" fill="url(#courtFill)" />
      <rect x="0" y="0" width="780" height="12" fill="#3d2064" opacity="0.6" />
      <rect x="0" y="348" width="780" height="12" fill="#3d2064" opacity="0.6" />

      <g stroke="#eef7f0" strokeWidth="3" fill="none" opacity="0.85">
        <rect x="4" y="4" width="772" height="352" />
        <rect x="4" y="49" width="772" height="262" />
        <line x1="180" y1="49" x2="180" y2="311" />
        <line x1="600" y1="49" x2="600" y2="311" />
        <line x1="180" y1="180" x2="600" y2="180" />
        <line x1="390" y1="4" x2="390" y2="356" strokeWidth="4" stroke="#d3f234" opacity="0.9" />
        <line x1="4" y1="180" x2="16" y2="180" />
        <line x1="764" y1="180" x2="776" y2="180" />
      </g>

      <rect x="0" y="0" width="780" height="360" fill="url(#courtVignette)" />
    </svg>
  );
}
