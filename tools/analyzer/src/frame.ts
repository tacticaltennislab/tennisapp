import type { Shape } from "./types";

/** The website accepts at most 1,000,000 base64 characters per drawing; stay a little under it. */
export const MAX_DRAWING_CHARS = 950_000;

/** Draw shapes (fractions of the frame) onto a canvas context of size w by h. Used on screen and for export. */
export function drawShapes(ctx: CanvasRenderingContext2D, shapes: Shape[], w: number, h: number): void {
  const lw = Math.max(3, w / 260);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const s of shapes) {
    ctx.strokeStyle = s.color;
    ctx.fillStyle = s.color;
    ctx.lineWidth = lw;
    const p = s.points.map((q) => ({ x: q.x * w, y: q.y * h }));
    if (p.length === 0) continue;
    if (s.tool === "free") {
      ctx.beginPath();
      ctx.moveTo(p[0].x, p[0].y);
      for (const q of p.slice(1)) ctx.lineTo(q.x, q.y);
      ctx.stroke();
      continue;
    }
    if (p.length < 2) continue;
    const [a, b] = p;
    if (s.tool === "line" || s.tool === "arrow") {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      if (s.tool === "arrow") {
        const angle = Math.atan2(b.y - a.y, b.x - a.x);
        const head = lw * 5;
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x - head * Math.cos(angle - 0.45), b.y - head * Math.sin(angle - 0.45));
        ctx.lineTo(b.x - head * Math.cos(angle + 0.45), b.y - head * Math.sin(angle + 0.45));
        ctx.closePath();
        ctx.fill();
      }
    } else if (s.tool === "circle") {
      ctx.beginPath();
      ctx.arc(a.x, a.y, Math.hypot(b.x - a.x, b.y - a.y), 0, Math.PI * 2);
      ctx.stroke();
    } else if (s.tool === "zone") {
      const x = Math.min(a.x, b.x);
      const y = Math.min(a.y, b.y);
      ctx.globalAlpha = 0.3;
      ctx.fillRect(x, y, Math.abs(b.x - a.x), Math.abs(b.y - a.y));
      ctx.globalAlpha = 1;
      ctx.strokeRect(x, y, Math.abs(b.x - a.x), Math.abs(b.y - a.y));
    }
  }
}

/**
 * The current video frame with the shapes on top, as a PNG data URL. PNG of a photo can be big, so the
 * width steps down from 960 px until it fits what the website accepts. Null if the frame is not ready.
 */
export function captureFrame(
  video: HTMLVideoElement,
  shapes: Shape[],
  maxChars = MAX_DRAWING_CHARS,
  widths: number[] = [960, 800, 640, 480, 360]
): string | null {
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  if (!vw || !vh) return null;
  let last: string | null = null;
  for (const target of widths) {
    const w = Math.min(target, vw);
    const h = Math.round((w * vh) / vw);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0, w, h);
    drawShapes(ctx, shapes, w, h);
    last = canvas.toDataURL("image/png");
    if (last.length <= maxChars) return last;
  }
  return last && last.length <= maxChars ? last : null;
}
