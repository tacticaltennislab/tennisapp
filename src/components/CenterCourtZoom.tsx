export default function CenterCourtZoom({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="courtLightFade" cx="50%" cy="46%" r="65%">
          <stop offset="0%" stopColor="var(--background)" stopOpacity="0" />
          <stop offset="65%" stopColor="var(--background)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--background)" stopOpacity="1" />
        </radialGradient>
        <linearGradient id="courtLightWash" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-50)" />
          <stop offset="100%" stopColor="var(--background)" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="800" height="400" fill="url(#courtLightWash)" />

      <g stroke="var(--color-brand-100)" strokeWidth="3" fill="none">
        <line x1="120" y1="0" x2="120" y2="400" />
        <line x1="680" y1="0" x2="680" y2="400" />
        <line x1="60" y1="200" x2="740" y2="200" />
      </g>

      <line
        x1="400"
        y1="-40"
        x2="400"
        y2="440"
        stroke="var(--color-brand-500)"
        strokeWidth="10"
        opacity="0.35"
      />
      <line
        x1="400"
        y1="-40"
        x2="400"
        y2="440"
        stroke="var(--color-brand-600)"
        strokeWidth="2"
        opacity="0.5"
      />

      <circle cx="400" cy="200" r="5" fill="var(--color-brand-600)" opacity="0.4" />

      <rect x="0" y="0" width="800" height="400" fill="url(#courtLightFade)" />
    </svg>
  );
}
