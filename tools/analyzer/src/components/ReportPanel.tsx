import { useState } from "react";
import { draftSummary } from "../ai";
import { downloadBlob, downloadText } from "../fsStore";
import { buildReport } from "../report";
import { cleanSummary, fileName, toFile } from "../project";
import type { Settings } from "../settings";
import { SURFACES, type Lang, type Meta, type Project, type Summary } from "../types";

interface Props {
  project: Project;
  settings: Settings;
  onMeta: (patch: Partial<Meta>) => void;
  onSummary: (fn: (s: Summary) => Summary) => void;
  onLang: (l: Lang) => void;
  onOpenSettings: () => void;
}

const lines = (v: string) => v.split("\n").map((s) => s.trim()).filter(Boolean);
const hasContent = (s: Summary) => {
  const c = cleanSummary(s);
  return c.strengths.length + c.issues.length + c.tactical.length + c.priorities.length + c.drills.length > 0;
};

/** The written summary, the AI draft, and the exports: PDF for the player, JSON for the website. */
export default function ReportPanel({ project, settings, onMeta, onSummary, onLang, onOpenSettings }: Props) {
  const s = project.summary;
  const [busy, setBusy] = useState<"ai" | "pdf" | null>(null);
  const [notice, setNotice] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [pending, setPending] = useState<Summary | null>(null);

  async function draft() {
    setNotice(null);
    if (!settings.apiKey.trim()) {
      setNotice({ kind: "error", text: "Add your Anthropic API key in Settings first." });
      return;
    }
    setBusy("ai");
    try {
      const result = await draftSummary(project, settings);
      if (hasContent(s)) setPending(result);
      else {
        onSummary(() => result);
        setNotice({ kind: "ok", text: "Draft ready. Read it, edit it, then export." });
      }
    } catch (e) {
      setNotice({ kind: "error", text: e instanceof Error ? e.message : "The draft failed." });
    } finally {
      setBusy(null);
    }
  }

  async function pdf() {
    setBusy("pdf");
    setNotice(null);
    try {
      const blob = await buildReport(project);
      downloadBlob(fileName(project).replace(".analysis.json", ".report.pdf"), blob);
      setNotice({ kind: "ok", text: "PDF saved to your downloads." });
    } catch (e) {
      setNotice({ kind: "error", text: e instanceof Error ? e.message : "The PDF could not be made." });
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="report">
      <div className="row between">
        <label className="inline">
          Report language
          <select value={project.lang} onChange={(e) => onLang(e.target.value as Lang)} data-testid="report-lang">
            <option value="en">English</option>
            <option value="pl">Polski</option>
          </select>
        </label>
        <div className="group wrap">
          <button type="button" className="btn" onClick={draft} disabled={busy !== null} data-testid="ai-draft">
            {busy === "ai" ? "Drafting" : "Draft report (AI)"}
          </button>
          <button type="button" className="btn primary" onClick={pdf} disabled={busy !== null} data-testid="export-pdf">
            {busy === "pdf" ? "Making PDF" : "Export PDF"}
          </button>
          <button
            type="button"
            className="btn"
            data-testid="export-json"
            onClick={() => downloadText(fileName(project), JSON.stringify(toFile(project)))}
            title="The same file the project is saved as. Import it in the website's report editor."
          >
            Export for website (JSON)
          </button>
        </div>
      </div>

      <p className="muted small">
        The AI draft sends only your notes and the charting numbers, never the video. {settings.apiKey ? "" : <button type="button" className="link" onClick={onOpenSettings}>Add your API key</button>}
      </p>

      {notice && (
        <p role={notice.kind === "error" ? "alert" : "status"} className={notice.kind === "error" ? "error" : "ok"}>
          {notice.text}
        </p>
      )}
      {pending && (
        <div role="alertdialog" aria-label="Replace the summary" className="confirm">
          <p>Replace the summary you have written with the AI draft?</p>
          <div className="group">
            <button
              type="button"
              className="btn primary"
              onClick={() => {
                onSummary(() => pending);
                setPending(null);
                setNotice({ kind: "ok", text: "Draft ready. Read it, edit it, then export." });
              }}
            >
              Replace with draft
            </button>
            <button type="button" className="btn" onClick={() => setPending(null)}>
              Keep mine
            </button>
          </div>
        </div>
      )}

      <fieldset className="plain">
        <legend>Match details</legend>
        <div className="two">
          <label className="block">
            Player
            <input value={project.meta.player} onChange={(e) => onMeta({ player: e.target.value })} data-testid="meta-player" />
          </label>
          <label className="block">
            Opponent
            <input value={project.meta.opponent} onChange={(e) => onMeta({ opponent: e.target.value })} />
          </label>
          <label className="block">
            Date
            <input type="date" value={project.meta.date} onChange={(e) => onMeta({ date: e.target.value })} />
          </label>
          <label className="block">
            Surface
            <select value={project.meta.surface} onChange={(e) => onMeta({ surface: e.target.value })}>
              {SURFACES.map((x) => (
                <option key={x} value={x}>
                  {x[0].toUpperCase() + x.slice(1)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>

      <fieldset className="plain">
        <legend>Top 3 priorities, in order</legend>
        {[0, 1, 2].map((i) => (
          <label key={i} className="prio">
            <span className="num">{i + 1}</span>
            <input
              aria-label={`Priority ${i + 1}`}
              value={s.priorities[i] ?? ""}
              onChange={(e) =>
                onSummary((cur) => {
                  const next = [cur.priorities[0] ?? "", cur.priorities[1] ?? "", cur.priorities[2] ?? ""];
                  next[i] = e.target.value;
                  return { ...cur, priorities: next };
                })
              }
            />
          </label>
        ))}
      </fieldset>

      <label className="block">
        Strengths <span className="muted">(one per line)</span>
        <textarea rows={4} value={s.strengths.join("\n")} onChange={(e) => onSummary((cur) => ({ ...cur, strengths: e.target.value.split("\n") }))} onBlur={(e) => onSummary((cur) => ({ ...cur, strengths: lines(e.target.value) }))} />
      </label>

      <div>
        <p className="label">Technical issues</p>
        {s.issues.map((it, i) => (
          <div key={i} className="card">
            <input aria-label={`Issue ${i + 1} title`} placeholder="Issue" value={it.title} onChange={(e) => onSummary((cur) => ({ ...cur, issues: cur.issues.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)) }))} />
            <textarea aria-label={`Issue ${i + 1} detail`} rows={2} placeholder="What is happening and how to fix it" value={it.detail} onChange={(e) => onSummary((cur) => ({ ...cur, issues: cur.issues.map((x, j) => (j === i ? { ...x, detail: e.target.value } : x)) }))} />
            <button type="button" className="link danger" onClick={() => onSummary((cur) => ({ ...cur, issues: cur.issues.filter((_, j) => j !== i) }))}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" className="tbtn" onClick={() => onSummary((cur) => ({ ...cur, issues: [...cur.issues, { title: "", detail: "" }] }))}>
          Add issue
        </button>
      </div>

      <label className="block">
        Tactical patterns <span className="muted">(one per line)</span>
        <textarea rows={4} value={s.tactical.join("\n")} onChange={(e) => onSummary((cur) => ({ ...cur, tactical: e.target.value.split("\n") }))} onBlur={(e) => onSummary((cur) => ({ ...cur, tactical: lines(e.target.value) }))} />
      </label>

      <div>
        <p className="label">Recommended drills</p>
        {s.drills.map((d, i) => (
          <div key={i} className="card">
            <input aria-label={`Drill ${i + 1} name`} placeholder="Drill" value={d.name} onChange={(e) => onSummary((cur) => ({ ...cur, drills: cur.drills.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)) }))} />
            <textarea aria-label={`Drill ${i + 1} detail`} rows={2} placeholder="How to do it" value={d.detail} onChange={(e) => onSummary((cur) => ({ ...cur, drills: cur.drills.map((x, j) => (j === i ? { ...x, detail: e.target.value } : x)) }))} />
            <button type="button" className="link danger" onClick={() => onSummary((cur) => ({ ...cur, drills: cur.drills.filter((_, j) => j !== i) }))}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" className="tbtn" onClick={() => onSummary((cur) => ({ ...cur, drills: [...cur.drills, { name: "", detail: "" }] }))}>
          Add drill
        </button>
      </div>
    </div>
  );
}
