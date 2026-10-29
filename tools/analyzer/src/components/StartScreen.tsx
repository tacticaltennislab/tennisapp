import { useEffect, useState } from "react";
import { canUseFolders, createProjectFile, listRecent, openRecent, pickProjectFile, removeRecent, type RecentEntry } from "../fsStore";
import { newProject } from "../project";
import type { Settings } from "../settings";
import { SURFACES, type Lang, type Project } from "../types";

export interface Session {
  project: Project;
  file?: FileSystemFileHandle;
  videoFile?: File;
}

export default function StartScreen({ settings, onStart, onSettings }: { settings: Settings; onStart: (s: Session) => void; onSettings: () => void }) {
  const [recent, setRecent] = useState<RecentEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ player: "", opponent: "", date: new Date().toISOString().slice(0, 10), surface: "hard", lang: settings.lang as Lang });
  const [video, setVideo] = useState<File | null>(null);

  useEffect(() => {
    void listRecent().then(setRecent);
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const project = newProject({ player: form.player.trim(), opponent: form.opponent.trim(), date: form.date, surface: form.surface }, form.lang);
    if (video) project.video.fileName = video.name;
    // The folder picker needs the click that submitted this form, so it comes before anything async.
    const file = await createProjectFile(project);
    onStart({ project, file: file ?? undefined, videoFile: video ?? undefined });
  }

  async function open() {
    setError(null);
    try {
      const r = await pickProjectFile();
      if (r) onStart(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : "That file could not be opened.");
    }
  }

  async function reopen(entry: RecentEntry) {
    setError(null);
    try {
      onStart(await openRecent(entry));
    } catch (e) {
      setError(e instanceof Error ? e.message : "That project could not be opened.");
    }
  }

  return (
    <main className="start">
      <header>
        <h1>TTL Analyzer</h1>
        <p className="muted">Video notes, drawings, match charting and a report, on your own computer.</p>
        <button type="button" className="link" onClick={onSettings}>
          Settings
        </button>
      </header>

      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}

      <div className="startgrid">
        <section aria-labelledby="new-h">
          <h2 id="new-h">New analysis</h2>
          <form onSubmit={create} data-testid="new-form">
            <label className="block">
              Player
              <input required value={form.player} onChange={(e) => setForm({ ...form, player: e.target.value })} data-testid="player" />
            </label>
            <label className="block">
              Opponent
              <input value={form.opponent} onChange={(e) => setForm({ ...form, opponent: e.target.value })} data-testid="opponent" />
            </label>
            <div className="two">
              <label className="block">
                Date
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </label>
              <label className="block">
                Surface
                <select value={form.surface} onChange={(e) => setForm({ ...form, surface: e.target.value })}>
                  {SURFACES.map((s) => (
                    <option key={s} value={s}>
                      {s[0].toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="block">
              Report language
              <select value={form.lang} onChange={(e) => setForm({ ...form, lang: e.target.value as Lang })}>
                <option value="en">English</option>
                <option value="pl">Polski</option>
              </select>
            </label>
            <label className="block">
              Video <span className="muted">(mp4 or mov, stays on this computer)</span>
              <input type="file" accept="video/*,.mp4,.mov" data-testid="start-video" onChange={(e) => setVideo(e.target.files?.[0] ?? null)} />
            </label>
            <button type="submit" className="btn primary" data-testid="create">
              {canUseFolders ? "Create and choose a project folder" : "Create analysis"}
            </button>
            {!canUseFolders && <p className="muted small">This browser cannot save into a folder. Work is kept in the browser and you can download the project file. Chrome or Edge can save to a folder.</p>}
          </form>
        </section>

        <section aria-labelledby="recent-h">
          <h2 id="recent-h">Recent projects</h2>
          {recent.length === 0 ? (
            <p className="muted">Nothing yet. Your projects appear here.</p>
          ) : (
            <ul className="recent" data-testid="recent">
              {recent.map((r) => (
                <li key={r.id}>
                  <button type="button" className="recentbtn" onClick={() => reopen(r)}>
                    <strong>{r.player || "Untitled"}</strong>
                    <span className="muted">
                      {r.opponent ? `vs ${r.opponent} · ` : ""}
                      {r.date} · saved {new Date(r.updatedAt).toLocaleString()}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="link danger"
                    onClick={async () => {
                      await removeRecent(r.id);
                      setRecent((cur) => cur.filter((x) => x.id !== r.id));
                    }}
                  >
                    Remove from list
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button type="button" className="btn" onClick={open} data-testid="open-file">
            Open a project file
          </button>
        </section>
      </div>
    </main>
  );
}
