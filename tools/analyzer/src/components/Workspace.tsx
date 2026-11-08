import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { captureFrame } from "../frame";
import { downloadBlob, saveProject } from "../fsStore";
import { resolveProject } from "../match";
import { clock, uid } from "../project";
import type { Settings } from "../settings";
import type { ChartPoint, DrawTool, Meta, Note, Project, Scoring, Shape, Summary } from "../types";
import { DRAW_COLORS } from "../types";
import { usePlayer } from "../usePlayer";
import ChartingPanel from "./ChartingPanel";
import { ShortcutSheet } from "./Dialogs";
import NotesPanel from "./NotesPanel";
import Player from "./Player";
import ReportPanel from "./ReportPanel";
import type { Session } from "./StartScreen";

type Tab = "notes" | "chart" | "report";
type Status = { kind: "idle" } | { kind: "saving" } | { kind: "saved"; at: Date; where: "folder" | "browser" } | { kind: "error"; text: string };

const isTyping = (el: HTMLElement) =>
  el.tagName === "TEXTAREA" ||
  el.tagName === "SELECT" ||
  el.isContentEditable ||
  (el.tagName === "INPUT" && (el as HTMLInputElement).type !== "range");

interface Props {
  session: Session;
  settings: Settings;
  onSettings: () => void;
  onClose: () => void;
}

export default function Workspace({ session, settings, onSettings, onClose }: Props) {
  const [project, setProject] = useState<Project>(session.project);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("notes");
  const [selected, setSelected] = useState<string | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [drawNote, setDrawNote] = useState<string | null>(null);
  const [tool, setTool] = useState<DrawTool>("arrow");
  const [color, setColor] = useState(DRAW_COLORS[0]);
  const [sheet, setSheet] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [banner, setBanner] = useState<string | null>(null);

  const dirty = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const file = useRef(session.file);
  const player = usePlayer(project.video.fps, videoSrc);

  const update = useCallback((fn: (p: Project) => Project) => {
    dirty.current = true;
    setProject((p) => ({ ...fn(p), updatedAt: new Date().toISOString() }));
  }, []);

  // ---- video ------------------------------------------------------------------------------------------
  const openVideo = useCallback(
    (f: File) => {
      setBanner(null);
      setVideoSrc((old) => {
        if (old) URL.revokeObjectURL(old);
        return URL.createObjectURL(f);
      });
      if (f.name !== project.video.fileName) update((p) => ({ ...p, video: { ...p.video, fileName: f.name } }));
    },
    [project.video.fileName, update]
  );

  useEffect(() => {
    if (session.videoFile) openVideo(session.videoFile);
    return () => setVideoSrc((old) => {
      if (old) URL.revokeObjectURL(old);
      return null;
    });
    // Only when the session starts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The real length, read by the player, goes into the project (the website shows it next to the declared one).
  useEffect(() => {
    if (player.duration > 0 && Number.isFinite(player.duration) && Math.abs(player.duration - project.video.durationSec) > 0.05) {
      update((p) => ({ ...p, video: { ...p.video, durationSec: Math.round(player.duration * 100) / 100 } }));
    }
  }, [player.duration, project.video.durationSec, update]);

  // ---- saving -----------------------------------------------------------------------------------------
  const latest = useRef(project);
  latest.current = project;

  const saveNow = useCallback(async () => {
    if (timer.current) clearTimeout(timer.current);
    setStatus({ kind: "saving" });
    const result = await saveProject(latest.current, file.current);
    if (result.ok) {
      dirty.current = false;
      setStatus({ kind: "saved", at: new Date(), where: result.where });
    } else {
      setStatus({ kind: "error", text: result.error });
    }
  }, []);

  // Autosave shortly after every change.
  useEffect(() => {
    if (!dirty.current) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => void saveNow(), 1200);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [project, saveNow]);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty.current) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  // ---- notes ------------------------------------------------------------------------------------------
  const NEED_VIDEO = "Open a video first. Notes and drawings are tied to a moment in the video, so there is nothing to mark yet.";

  const addNote = useCallback((focusTitle = true) => {
    if (!videoSrc) {
      setBanner(NEED_VIDEO);
      return null;
    }
    const id = uid();
    const time = Math.round(player.time * 100) / 100;
    const note: Note = { id, time, type: "issue", title: "", text: "", shapes: [] };
    player.pause();
    update((p) => ({ ...p, notes: [...p.notes, note] }));
    setSelected(id);
    setTab("notes");
    // Typing starts in the title of a note added with N, but not for the note that drawing creates.
    if (focusTitle) setFocusId(id);
    return id;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player, update, videoSrc]);

  const changeNote = (id: string, patch: Partial<Note>) => update((p) => ({ ...p, notes: p.notes.map((n) => (n.id === id ? { ...n, ...patch } : n)) }));

  const deleteNote = (id: string) => {
    update((p) => ({ ...p, notes: p.notes.filter((n) => n.id !== id) }));
    if (selected === id) setSelected(null);
    if (drawNote === id) setDrawNote(null);
  };

  // ---- drawing ----------------------------------------------------------------------------------------
  const drawing = drawNote !== null;
  const activeNote = project.notes.find((n) => n.id === drawNote) ?? null;

  const startDrawing = useCallback(
    (noteId?: string) => {
      if (!videoSrc) {
        setBanner(NEED_VIDEO);
        return;
      }
      player.pause();
      let id: string | null | undefined = noteId;
      if (id) {
        const n = project.notes.find((x) => x.id === id);
        if (n) player.seek(n.time);
      } else {
        // Draw on the selected note if the video rests on its moment, otherwise start a new note here.
        const sel = project.notes.find((n) => n.id === selected);
        id = sel && Math.abs(sel.time - player.time) < 0.5 ? sel.id : addNote(false);
      }
      if (!id) return;
      setSelected(id);
      setDrawNote(id);
    },
    [videoSrc, player, project.notes, selected, addNote]
  );

  const finishDrawing = useCallback(() => {
    const id = drawNote;
    setDrawNote(null);
    const v = player.ref.current;
    const n = latest.current.notes.find((x) => x.id === id);
    if (!id || !n || !v) return;
    if (n.shapes.length === 0) return changeNote(id, { drawing: undefined });
    const png = captureFrame(v, n.shapes);
    if (!png) setBanner("The drawing is saved, but the frame was too large to include as a picture in the exports.");
    // The picture belongs to the frame that was drawn on, so the note moves to that moment.
    changeNote(id, { drawing: png ?? undefined, time: Math.round(player.time * 100) / 100 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawNote, player]);

  const toggleDraw = useCallback(() => (drawing ? finishDrawing() : startDrawing()), [drawing, finishDrawing, startDrawing]);

  const commitShape = (s: Shape) => drawNote && changeNote(drawNote, { shapes: [...(activeNote?.shapes ?? []), s] });
  const undoShape = useCallback(() => {
    if (drawNote) changeNote(drawNote, { shapes: (latest.current.notes.find((n) => n.id === drawNote)?.shapes ?? []).slice(0, -1) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawNote]);

  const exportPng = () => {
    const v = player.ref.current;
    if (!v || !activeNote) return;
    const png = captureFrame(v, activeNote.shapes, Infinity, [1920]);
    if (!png) return;
    const bytes = Uint8Array.from(atob(png.split(",")[1]), (c) => c.charCodeAt(0));
    downloadBlob(`frame-${clock(player.time).replace(":", "m")}s.png`, new Blob([bytes], { type: "image/png" }));
  };

  // ---- charting ---------------------------------------------------------------------------------------
  // Score, server, side and the statistics are worked out from the points every time, never stored.
  const resolved = useMemo(() => resolveProject({ points: project.points, scoring: project.scoring }), [project.points, project.scoring]);
  const addPoint = (p: ChartPoint) => update((pr) => ({ ...pr, points: [...pr.points, p] }));
  const removeLastPoint = useCallback(() => update((p) => ({ ...p, points: p.points.slice(0, -1) })), [update]);

  // ---- keyboard ---------------------------------------------------------------------------------------
  // Keys are matched by physical key (e.code), so Caps Lock, Shift and keyboard layout do not matter.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.code === "KeyS") {
        e.preventDefault();
        void saveNow();
        return;
      }
      if (isTyping(el)) {
        // Escape leaves the text field, so the shortcuts work again without reaching for the mouse.
        if (e.code === "Escape") el.blur();
        return;
      }
      if (e.altKey) return;
      if (mod) {
        if (e.code === "KeyZ") {
          e.preventDefault();
          if (drawing) undoShape();
          else if (tab === "chart") removeLastPoint();
        }
        return;
      }
      if (sheet) return;
      // "?" is on a different physical key in other layouts, so it is matched by what it types.
      if (e.key === "?") {
        setSheet(true);
        return;
      }
      switch (e.code) {
        case "Space":
          if (el.tagName === "BUTTON") return;
          e.preventDefault();
          player.toggle();
          break;
        case "ArrowLeft":
          e.preventDefault();
          player.step(-1);
          break;
        case "ArrowRight":
          e.preventDefault();
          player.step(1);
          break;
        case "KeyJ":
          player.jump(-5);
          break;
        case "KeyL":
          player.jump(5);
          break;
        case "KeyN":
          e.preventDefault();
          addNote(true);
          break;
        case "KeyD":
          e.preventDefault();
          toggleDraw();
          break;
        case "KeyC":
          setTab("chart");
          break;
        case "KeyS":
          void saveNow();
          break;
        case "Escape":
          if (drawing) finishDrawing();
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [player, drawing, tab, sheet, addNote, toggleDraw, finishDrawing, undoShape, removeLastPoint, saveNow]);

  const title = useMemo(() => [project.meta.player || "Untitled", project.meta.opponent && `vs ${project.meta.opponent}`, project.meta.date].filter(Boolean).join(" · "), [project.meta]);

  return (
    <div className="workspace">
      <header className="topbar">
        <button type="button" className="link" onClick={async () => { if (dirty.current) await saveNow(); onClose(); }}>
          All projects
        </button>
        <h1 title={title}>{title}</h1>
        <span className="status" role="status" data-testid="save-status">
          {status.kind === "saving" && "Saving"}
          {status.kind === "saved" && `Saved ${status.at.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}${status.where === "folder" ? "" : " (in this browser)"}`}
          {status.kind === "error" && <span className="error">{status.text}</span>}
        </span>
        <button type="button" className="tbtn" onClick={() => void saveNow()} data-testid="save">
          Save <kbd>S</kbd>
        </button>
        <button type="button" className="tbtn" onClick={onSettings}>
          Settings
        </button>
        <button type="button" className="tbtn" onClick={() => setSheet(true)} aria-label="Keyboard shortcuts" data-testid="help">
          ?
        </button>
      </header>

      {banner && (
        <p className="banner" role="status">
          {banner}{" "}
          <button type="button" className="link" onClick={() => setBanner(null)}>
            Dismiss
          </button>
        </p>
      )}

      <div className={tab === "chart" ? "layout wide" : "layout"}>
        <Player
          player={player}
          src={videoSrc}
          fileName={project.video.fileName}
          fps={project.video.fps}
          onFps={(fps) => update((p) => ({ ...p, video: { ...p.video, fps } }))}
          notes={project.notes}
          selectedId={selected}
          onSelect={setSelected}
          onAddNote={() => addNote(true)}
          onOpenVideo={openVideo}
          drawing={drawing}
          drawShapesList={activeNote?.shapes ?? []}
          tool={tool}
          color={color}
          onTool={setTool}
          onColor={setColor}
          onToggleDraw={toggleDraw}
          onCommitShape={commitShape}
          onUndoShape={undoShape}
          onExportPng={exportPng}
        />

        <aside className="side">
          <div role="tablist" aria-label="Panels" className="tabs">
            {([["notes", `Notes (${project.notes.length})`], ["chart", `Charting (${project.points.length})`], ["report", "Report"]] as [Tab, string][]).map(([t, label]) => (
              <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? "on" : ""} onClick={() => setTab(t)} data-testid={`tab-${t}`}>
                {label}
              </button>
            ))}
          </div>
          <div className="panel" role="tabpanel">
            {tab === "notes" && (
              <NotesPanel
                notes={project.notes}
                selectedId={selected}
                focusId={focusId}
                onFocused={() => setFocusId(null)}
                onSelect={setSelected}
                onJump={(t) => {
                  player.pause();
                  player.seek(t);
                }}
                onChange={changeNote}
                onDelete={deleteNote}
                onDraw={startDrawing}
              />
            )}
            {tab === "chart" && (
              <ChartingPanel
                points={resolved.points}
                timeline={resolved.timeline}
                stats={resolved.stats}
                scoring={project.scoring}
                lang={project.lang}
                onScoring={(scoring: Scoring) => update((p) => ({ ...p, scoring }))}
                player={project.meta.player}
                opponent={project.meta.opponent}
                videoTime={() => (videoSrc ? Math.round(player.time * 100) / 100 : undefined)}
                onAdd={addPoint}
                onRemoveLast={removeLastPoint}
                onDelete={(id) => update((p) => ({ ...p, points: p.points.filter((x) => x.id !== id) }))}
              />
            )}
            {tab === "report" && (
              <ReportPanel
                project={project}
                settings={settings}
                onMeta={(patch: Partial<Meta>) => update((p) => ({ ...p, meta: { ...p.meta, ...patch } }))}
                onSummary={(fn: (s: Summary) => Summary) => update((p) => ({ ...p, summary: fn(p.summary) }))}
                onLang={(lang) => update((p) => ({ ...p, lang }))}
                onOpenSettings={onSettings}
              />
            )}
          </div>
        </aside>
      </div>
      {sheet && <ShortcutSheet onClose={() => setSheet(false)} />}
    </div>
  );
}
