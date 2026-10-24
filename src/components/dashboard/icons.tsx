type P = { className?: string };

function Svg({ className, children }: P & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-5 w-5"}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const DIcons = {
  overview: (p: P) => (
    <Svg {...p}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </Svg>
  ),
  analyses: (p: P) => (
    <Svg {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m10 9 5 3-5 3z" />
    </Svg>
  ),
  upload: (p: P) => (
    <Svg {...p}>
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
    </Svg>
  ),
  plan: (p: P) => (
    <Svg {...p}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4v2h6V4" />
      <path d="m9 13 2 2 4-4" />
    </Svg>
  ),
  messages: (p: P) => (
    <Svg {...p}>
      <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-8l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
    </Svg>
  ),
  orders: (p: P) => (
    <Svg {...p}>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
      <path d="M9 8h6M9 12h6" />
    </Svg>
  ),
  settings: (p: P) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2-1.2L14 3h-4l-.6 2.6a7 7 0 0 0-2 1.2l-2.3-.9-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.9a7 7 0 0 0 2 1.2L10 21h4l.6-2.6a7 7 0 0 0 2-1.2l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z" />
    </Svg>
  ),
  more: (p: P) => (
    <Svg {...p}>
      <circle cx="5" cy="12" r="1.2" />
      <circle cx="12" cy="12" r="1.2" />
      <circle cx="19" cy="12" r="1.2" />
    </Svg>
  ),
  play: (p: P) => (
    <Svg {...p}>
      <path d="M7 5v14l12-7z" fill="currentColor" />
    </Svg>
  ),
  pause: (p: P) => (
    <Svg {...p}>
      <path d="M8 5v14M16 5v14" strokeWidth="3" />
    </Svg>
  ),
  stepBack: (p: P) => (
    <Svg {...p}>
      <path d="M6 5v14" />
      <path d="m18 5-9 7 9 7z" fill="currentColor" />
    </Svg>
  ),
  stepForward: (p: P) => (
    <Svg {...p}>
      <path d="M18 5v14" />
      <path d="m6 5 9 7-9 7z" fill="currentColor" />
    </Svg>
  ),
  back5: (p: P) => (
    <Svg {...p}>
      <path d="M4 12a8 8 0 1 0 3-6.2" />
      <path d="M4 4v4h4" />
    </Svg>
  ),
  forward5: (p: P) => (
    <Svg {...p}>
      <path d="M20 12a8 8 0 1 1-3-6.2" />
      <path d="M20 4v4h-4" />
    </Svg>
  ),
  check: (p: P) => (
    <Svg {...p}>
      <path d="m5 12 4 4 10-10" strokeWidth="2.25" />
    </Svg>
  ),
  arrow: (p: P) => (
    <Svg {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  ),
  file: (p: P) => (
    <Svg {...p}>
      <path d="M6 3h8l5 5v13H6z" />
      <path d="M14 3v5h5" />
    </Svg>
  ),
  send: (p: P) => (
    <Svg {...p}>
      <path d="M4 12 20 4l-4 16-4-6z" />
      <path d="m12 14 8-10" />
    </Svg>
  ),
};
