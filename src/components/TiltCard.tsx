"use client";

import { useRef, useState } from "react";

export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  zoomScale = 1.06,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  zoomScale?: number;
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const [state, setState] = useState({ x: 0, y: 0, px: 50, py: 50, active: false });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement & HTMLLIElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setState({
      y: (x - 0.5) * maxTilt * 2,
      x: (0.5 - y) * maxTilt * 2,
      px: x * 100,
      py: y * 100,
      active: true,
    });
  }

  function reset() {
    setState((s) => ({ ...s, x: 0, y: 0, active: false }));
  }

  const scale = state.active ? zoomScale : 1;

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className={`relative overflow-hidden transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{
        transform: `perspective(900px) rotateX(${state.x}deg) rotateY(${state.y}deg) scale3d(${scale}, ${scale}, ${scale})`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 ease-out"
        style={{
          opacity: state.active ? 1 : 0,
          mixBlendMode: "overlay",
          background: `radial-gradient(500px circle at ${state.px}% ${state.py}%, rgba(255,255,255,0.55), transparent 45%)`,
        }}
      />
    </Tag>
  );
}
