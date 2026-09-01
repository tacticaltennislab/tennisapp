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
  const [state, setState] = useState({ x: 0, y: 0, active: false });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement & HTMLLIElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setState({
      y: (x - 0.5) * maxTilt * 2,
      x: (0.5 - y) * maxTilt * 2,
      active: true,
    });
  }

  function reset() {
    setState({ x: 0, y: 0, active: false });
  }

  const scale = state.active ? zoomScale : 1;

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{
        transform: `perspective(900px) rotateX(${state.x}deg) rotateY(${state.y}deg) scale3d(${scale}, ${scale}, ${scale})`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </Tag>
  );
}
