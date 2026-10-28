import { useEffect, useMemo, useRef, useState } from "react";
import { clock } from "../project";
import type { DrawTool, Note, Shape } from "../types";
import { DRAW_COLORS } from "../types";
import type { PlayerApi } from "../usePlayer";
import DrawingLayer from "./DrawingLayer";

const RATES = [0.25, 0.5, 1];
const FPS = [24, 25, 30, 50, 60];
const TOOLS: { id: DrawTool; label: string }[] = [
  { id: "arrow", label: "Arrow" },
  { id: "line", label: "Line" },
  { id: "circle", label: "Circle" },
  { id: "free", label: "Freehand" },
  { id: "zone", label: "Zone" },
];

export const NOTE_COLORS: Record<Note["type"], string> = { strength: "#c6f24e", issue: "#ffb020", tactical: "#8fb2ff" };

interface Props {
  player: PlayerApi;
  src: string | null;
  fileName: string;
  fps: number;
  onFps: (fps: number) => void;
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAddNote: () => void;
  onOpenVideo: (file: File) => void;
  // drawing
  drawing: boolean;
  drawShapesList: Shape[];
  tool: DrawTool;
  color: string;
  onTool: (t: DrawTool) => void;
  onColor: (c: string) => void;
  onToggleDraw: () => void;
  onCommitShape: (s: Shape) => void;
  onUndoShape: () => void;
  onExportPng: () => void;
}

/** Video, drawing layer, timeline with a marker for every note, and transport controls. */
export default function Player(p: Props) {
  const { player } = p;
  const stage = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 640, h: 360 });
  const [dragging, setDragging] = useState(false);

  // Fit the frame inside the available space at the video's own proportions.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const fit = () => {
      const maxW = el.clientWidth;
      const maxH = Math.max(240, window.innerHeight * 0.58);
      const ar = player.size.w / player.size.h;
      const w = Math.min(maxW, maxH * ar);
      setBox({ w, h: w / ar });
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [player.size.w, player.size.h]);

  // Release the video before the element goes away, so the browser lets go of the file cleanly.
  useEffect(() => {
    const v = player.ref.current;
    return () => {
      if (!v) return;
      v.pause();
      v.removeAttribute("src");
      v.load();
    };
  }, [player.ref, p.src]);

  const shapesShown = useMemo(() => {
    if (p.drawing) return p.drawShapesList;
    const sel = p.notes.find((n) => n.id === p.selectedId);
    // A saved drawing shows while the video rests on its moment.
    if (sel && !player.playing && Math.abs(player.time - sel.time) < 0.3) return sel.shapes;
    return [];
  }, [p.drawing, p.drawShapesList, p.notes, p.selectedId, player.playing, player.time]);

  const duration = player.duration || 1;
  const btn = "tbtn";

  return (
    <section aria-label="Video" className="player">
      <div
        ref={stage}
        className={`stage ${dragging ? "dragover" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files[0];
          if (f) p.onOpenVideo(f);
        }}
      >
        {p.src ? (
          <div className="frame" style={{ width: box.w, height: box.h }}>
            <video
              ref={player.ref}
              src={p.src}
              playsInline
              preload="auto"
              data-testid="video"
              style={{ width: box.w, height: box.h }}
              {...player.handlers}
            />
            <DrawingLayer
              width={box.w}
              height={box.h}
              shapes={shapesShown}
              editing={p.drawing}
              tool={p.tool}
              color={p.color}
              onCommit={p.onCommitShape}
            />
          </div>
        ) : (
          <div className="dropzone" data-testid="dropzone">
            <p className="big">Open a video from your computer</p>
            <p className="muted">
              Drag an MP4 or MOV here{p.fileName ? <>, or choose <strong>{p.fileName}</strong> again to continue this project</> : ""}.
            </p>
            <label className="btn primary">
              Choose video
              <input
                type="file"
                accept="video/*,.mp4,.mov"
                data-testid="video-input"
                hidden
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  e.target.value = "";
                  if (f) p.onOpenVideo(f);
                }}
              />
            </label>
          </div>
        )}
      </div>

      <div className="timeline">
        <input
          type="range"
          min={0}
          max={duration}
          step={0.01}
          value={Math.min(player.time, duration)}
          disabled={!p.src}
          onChange={(e) => player.seek(Number(e.target.value))}
          aria-label="Seek"
        />
        <div className="markers" role="group" aria-label="Notes on the timeline">
          {p.notes.map((n) => (
            <button
              key={n.id}
              type="button"
              className={`marker ${p.selectedId === n.id ? "on" : ""}`}
              style={{ left: `${(n.time / duration) * 100}%`, background: NOTE_COLORS[n.type] }}
              title={`${clock(n.time)} ${n.title}`}
              aria-label={`${n.type} at ${clock(n.time)}: ${n.title || "no title"}`}
              onClick={() => {
                p.onSelect(n.id);
                player.pause();
                player.seek(n.time);
              }}
            />
          ))}
        </div>
      </div>

      <div className="transport">
        <div className="group">
          <button type="button" className={btn} disabled={!p.src} onClick={() => player.jump(-5)} title="Back 5 seconds (J)" aria-label="Back 5 seconds">
            −5s
          </button>
          <button type="button" className={btn} disabled={!p.src} onClick={() => player.step(-1)} title="Previous frame (←)" aria-label="Previous frame">
            ←
          </button>
          <button type="button" className={`${btn} play`} disabled={!p.src} onClick={player.toggle} title="Play or pause (Space)" aria-label={player.playing ? "Pause" : "Play"}>
            {player.playing ? "Pause" : "Play"}
          </button>
          <button type="button" className={btn} disabled={!p.src} onClick={() => player.step(1)} title="Next frame (→)" aria-label="Next frame">
            →
          </button>
          <button type="button" className={btn} disabled={!p.src} onClick={() => player.jump(5)} title="Forward 5 seconds (L)" aria-label="Forward 5 seconds">
            +5s
          </button>
        </div>
        <p className="clock" data-testid="clock">
          <strong>{clock(player.time)}.{String(Math.floor((player.time % 1) * 100)).padStart(2, "0")}</strong> / {clock(player.duration)}
          <span className="muted"> · frame {Math.round(player.time * p.fps)}</span>
        </p>
        <div className="group">
          {RATES.map((r) => (
            <button key={r} type="button" className={`${btn} ${player.rate === r ? "on" : ""}`} aria-pressed={player.rate === r} disabled={!p.src} onClick={() => player.setRate(r)}>
              {r}x
            </button>
          ))}
          <label className="inline muted" title="Frame stepping assumes this frame rate. Match it to your camera.">
            Step at
            <select value={p.fps} onChange={(e) => p.onFps(Number(e.target.value))}>
              {FPS.map((f) => (
                <option key={f} value={f}>
                  {f} fps
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="toolbar">
        <button type="button" className="btn primary" disabled={!p.src} onClick={p.onAddNote} data-testid="add-note">
          Add note <kbd>N</kbd>
        </button>
        <button type="button" className={`btn ${p.drawing ? "on" : ""}`} disabled={!p.src} aria-pressed={p.drawing} onClick={p.onToggleDraw} data-testid="toggle-draw">
          {p.drawing ? "Finish drawing" : "Draw on frame"} <kbd>D</kbd>
        </button>
        {p.drawing && (
          <>
            <div className="group" role="group" aria-label="Drawing tool">
              {TOOLS.map((t) => (
                <button key={t.id} type="button" className={`${btn} ${p.tool === t.id ? "on" : ""}`} aria-pressed={p.tool === t.id} onClick={() => p.onTool(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="group" role="group" aria-label="Colour">
              {DRAW_COLORS.map((c) => (
                <button key={c} type="button" className={`swatch ${p.color === c ? "on" : ""}`} style={{ background: c }} aria-label={`Colour ${c}`} aria-pressed={p.color === c} onClick={() => p.onColor(c)} />
              ))}
            </div>
            <button type="button" className={btn} onClick={p.onUndoShape} disabled={p.drawShapesList.length === 0} data-testid="undo-shape">
              Undo
            </button>
            <button type="button" className={btn} onClick={p.onExportPng} disabled={p.drawShapesList.length === 0}>
              Export PNG
            </button>
          </>
        )}
      </div>
    </section>
  );
}
