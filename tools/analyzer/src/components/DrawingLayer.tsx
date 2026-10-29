import { useEffect, useRef } from "react";
import { drawShapes } from "../frame";
import type { DrawTool, Pt, Shape } from "../types";

interface Props {
  width: number;
  height: number;
  shapes: Shape[];
  /** True while the coach is drawing: the layer takes mouse input. Otherwise it only shows the shapes. */
  editing: boolean;
  tool: DrawTool;
  color: string;
  onCommit: (shape: Shape) => void;
}

/** Transparent canvas over the video. Shapes are stored as fractions of the frame, so they fit any size. */
export default function DrawingLayer({ width, height, shapes, editing, tool, color, onCommit }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const draft = useRef<Shape | null>(null);

  const paint = () => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    drawShapes(ctx, draft.current ? [...shapes, draft.current] : shapes, c.width, c.height);
  };

  useEffect(paint);

  const at = (e: React.PointerEvent): Pt => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), y: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)) };
  };

  const down = (e: React.PointerEvent) => {
    if (!editing) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = at(e);
    draft.current = { tool, color, points: tool === "free" ? [p] : [p, p] };
    paint();
  };
  const move = (e: React.PointerEvent) => {
    const d = draft.current;
    if (!d) return;
    const p = at(e);
    d.points = d.tool === "free" ? [...d.points, p] : [d.points[0], p];
    paint();
  };
  const up = () => {
    const d = draft.current;
    draft.current = null;
    if (!d) return;
    const [a, b] = [d.points[0], d.points[d.points.length - 1]];
    // A click without a drag is not a shape.
    if (Math.hypot(b.x - a.x, b.y - a.y) < 0.004) return paint();
    onCommit(d);
  };

  return (
    <canvas
      ref={canvas}
      width={Math.max(1, Math.round(width))}
      height={Math.max(1, Math.round(height))}
      data-testid="drawing-layer"
      className={editing ? "draw-layer editing" : "draw-layer"}
      style={{ width, height }}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
    />
  );
}
