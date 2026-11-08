import { useCallback, useMemo, useState } from "react";
import { other } from "../court";
import { SCORE_UI } from "../i18n";
import { uid } from "../project";
import type { PointScore } from "../score";
import { scoreSummary } from "../scoreText";
import { heatGrid, serveIsIn, type Stats } from "../stats";
import type { ChartPoint, Landing, Lang, Outcome, Pt, Scoring, Side, Who } from "../types";
import CourtSvg, { type CourtView } from "./CourtSvg";
import MatchSetupForm from "./MatchSetupForm";
import ScoreBoard from "./ScoreBoard";
import StatsPanel from "./StatsPanel";

/** The serve being charted. The server and side come from the score unless the coach overrides them for this point. */
interface Draft {
  manualServer: Who | null;
  manualSide: Side | null;
  serves: Landing[];
  rally: Pt[];
}

interface Props {
  /** The points with the server and side as they apply (see match.ts). */
  points: ChartPoint[];
  /** The score before each point; the last entry is the situation before the next point. */
  timeline: PointScore[];
  stats: Stats;
  scoring: Scoring;
  lang: Lang;
  player: string;
  opponent: string;
  videoTime: () => number | undefined;
  onAdd: (p: ChartPoint) => void;
  onRemoveLast: () => void;
  onDelete: (id: string) => void;
  onScoring: (s: Scoring) => void;
}

const OUTCOME_LABEL: Record<Outcome, string> = {
  winner: "Winner",
  forced_error: "Forced error",
  unforced_error: "Unforced error",
  ace: "Ace",
  double_fault: "Double fault",
};

const fill = (t: string, v: Record<string, string>) => t.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? "");

/** Match charting: the score, serve placement, rally shots and how each point ended, on a court drawn to scale. */
export default function ChartingPanel({ points, timeline, stats, scoring, lang, player, opponent, videoTime, onAdd, onRemoveLast, onDelete, onScoring }: Props) {
  const ui = SCORE_UI[lang];
  const next = timeline[timeline.length - 1];
  const [draft, setDraft] = useState<Draft>({ manualServer: null, manualSide: null, serves: [], rally: [] });
  const [wonBy, setWonBy] = useState<Who>("player");
  const [view, setView] = useState<CourtView>("dots");
  const [message, setMessage] = useState<string | null>(null);
  const names: Record<Who, string> = { player: player || "Player", opponent: opponent || "Opponent" };

  // Server and side: from the score, unless set by hand for this point.
  const server = draft.manualServer ?? next.server;
  const side = draft.manualSide ?? next.side;
  const serverOverridden = server !== next.server;
  const sideOverridden = side !== next.side;
  const sideName = (s: Side) => (s === "deuce" ? ui.deuceSide : ui.adSide);

  const last = draft.serves[draft.serves.length - 1];
  const serveIn = draft.serves.some((s) => s.in);
  const awaitingServe = draft.serves.length === 0 || (!serveIn && draft.serves.length < 2);
  const hint = awaitingServe
    ? draft.serves.length === 0
      ? `Click where ${names[server]}'s first serve landed (${side === "deuce" ? "deuce" : "ad"} side).`
      : "The first serve was out. Click where the second serve landed."
    : "Click where the next shot landed, or choose how the point ended.";

  // After a point the score decides again: the overrides were for that point only.
  const reset = () => setDraft({ manualServer: null, manualSide: null, serves: [], rally: [] });

  function commit(outcome: Outcome, winner: Who, serves = draft.serves, rally = draft.rally) {
    onAdd({
      id: uid(),
      server,
      side,
      serves,
      rally,
      outcome,
      winner,
      videoTime: videoTime(),
      ...(serverOverridden ? { manualServer: true } : {}),
      ...(sideOverridden ? { manualSide: true } : {}),
    });
    setMessage(null);
    reset();
  }

  function pick(p: Pt) {
    setMessage(null);
    if (awaitingServe) {
      const landing: Landing = { ...p, in: serveIsIn(p, side) };
      const serves = [...draft.serves, landing];
      if (serves.length === 2 && !serves[0].in && !landing.in) {
        // Two faults: a double fault, the receiver wins the point.
        return commit("double_fault", other(server), serves, []);
      }
      setDraft({ ...draft, serves });
      return;
    }
    setDraft({ ...draft, rally: [...draft.rally, p] });
  }

  function end(outcome: Outcome) {
    if (draft.serves.length === 0) return setMessage("Click where the serve landed first.");
    if (!serveIn) return setMessage("The serve was out. Click where the second serve landed first.");
    if (outcome === "ace") {
      if (draft.rally.length > 0) return setMessage("An ace has no shots after the serve. Undo the extra clicks first.");
      return commit("ace", server);
    }
    commit(outcome, wonBy);
  }

  const dots = useMemo(() => {
    const out: { p: Pt; fault?: boolean }[] = [];
    for (const pt of points) {
      for (const s of pt.serves) out.push({ p: s, fault: !s.in });
    }
    return out;
  }, [points]);

  const heat = view === "dots" ? undefined : heatGrid(points, view === "heat-serve" ? "serve" : "all");

  // Changing the match setup re-derives the score, server and side of every point.
  const onSetup = useCallback(
    (s: Scoring | null) => {
      if (s && JSON.stringify(s) !== JSON.stringify(scoring)) onScoring(s);
    },
    [scoring, onScoring]
  );

  const pickServer = (w: Who) => setDraft({ ...draft, manualServer: w === next.server ? null : w });
  const pickSide = (s: Side) => setDraft({ ...draft, manualSide: s === next.side ? null : s });

  return (
    <div className="charting">
      <ScoreBoard ctx={next} names={names} lang={lang} />

      <details className="setupbox">
        <summary data-testid="setup-summary">{ui.setupTitle}</summary>
        <MatchSetupForm lang={lang} scoring={scoring} names={names} onChange={onSetup} />
      </details>

      <div className="chartgrid">
        <div>
          <CourtSvg
            dots={view === "dots" ? dots : []}
            heat={heat}
            draftServes={draft.serves}
            draftRally={draft.rally}
            targetSide={awaitingServe ? side : null}
            onPick={pick}
          />
          <div className="group views" role="group" aria-label="Court view">
            {(
              [
                ["dots", "Serve dots"],
                ["heat-serve", "Heat map: serves"],
                ["heat-all", "Heat map: all shots"],
              ] as [CourtView, string][]
            ).map(([v, label]) => (
              <button key={v} type="button" className={`tbtn ${view === v ? "on" : ""}`} aria-pressed={view === v} onClick={() => setView(v)}>
                {label}
              </button>
            ))}
          </div>
          <p className="muted small">The server always stands at the bottom. Serves land in the top half.</p>
        </div>

        <div className="controls">
          <p className="hint" data-testid="chart-hint" role="status">
            {hint}
          </p>
          <fieldset disabled={draft.serves.length > 0} className={serverOverridden || sideOverridden ? "override" : ""} data-testid="server-side">
            <legend>
              {ui.server} / {ui.side}
            </legend>
            <div className="group wrap">
              {(["player", "opponent"] as Who[]).map((w) => (
                <button key={w} type="button" className={`tbtn ${server === w ? "on" : ""}`} aria-pressed={server === w} onClick={() => pickServer(w)} data-testid={`server-${w}`}>
                  {names[w]}
                </button>
              ))}
            </div>
            <div className="group wrap spaced">
              {(["deuce", "ad"] as Side[]).map((s) => (
                <button key={s} type="button" className={`tbtn ${side === s ? "on" : ""}`} aria-pressed={side === s} onClick={() => pickSide(s)} data-testid={`side-${s}`}>
                  {s === "deuce" ? ui.deuceSide : ui.adSide}
                </button>
              ))}
            </div>
            {serverOverridden || sideOverridden ? (
              <p className="override-note" data-testid="override-note">
                <span className="tag warn">{ui.manual}</span>{" "}
                {fill(ui.overrideNote, {
                  value: [serverOverridden ? names[next.server] : null, sideOverridden ? sideName(next.side) : null].filter(Boolean).join(", "),
                })}{" "}
                <button type="button" className="link" onClick={() => setDraft({ ...draft, manualServer: null, manualSide: null })}>
                  {ui.backToAuto}
                </button>
              </p>
            ) : (
              <p className="muted small" data-testid="auto-note">
                {ui.auto}
              </p>
            )}
          </fieldset>

          <fieldset>
            <legend>Point won by</legend>
            <div className="group">
              {(["player", "opponent"] as Who[]).map((w) => (
                <button key={w} type="button" className={`tbtn ${wonBy === w ? "on" : ""}`} aria-pressed={wonBy === w} onClick={() => setWonBy(w)}>
                  {names[w]}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>How the point ended</legend>
            <div className="outcomes">
              {(["winner", "forced_error", "unforced_error"] as Outcome[]).map((o) => (
                <button key={o} type="button" className="btn" data-testid={`outcome-${o}`} onClick={() => end(o)}>
                  {OUTCOME_LABEL[o]}
                </button>
              ))}
              <button type="button" className="btn" data-testid="outcome-ace" onClick={() => end("ace")}>
                Ace
              </button>
            </div>
            <p className="muted small">
              Winner and ace belong to the player who won the point. An error belongs to the other player. Two faults in a row end the point as a double
              fault.
            </p>
          </fieldset>

          <div className="group wrap">
            <button
              type="button"
              className="tbtn"
              disabled={!last}
              onClick={() => setDraft({ ...draft, serves: draft.serves.map((s, i) => (i === draft.serves.length - 1 ? { ...s, in: !s.in } : s)) })}
              title="If the automatic call was wrong"
            >
              Flip last serve in or out
            </button>
            <button
              type="button"
              className="tbtn"
              disabled={draft.rally.length === 0 && draft.serves.length === 0}
              onClick={() => (draft.rally.length > 0 ? setDraft({ ...draft, rally: draft.rally.slice(0, -1) }) : reset())}
            >
              Undo click
            </button>
            <button type="button" className="tbtn" disabled={points.length === 0} onClick={onRemoveLast} data-testid="undo-point">
              Undo last point
            </button>
          </div>
          {message && (
            <p role="alert" className="error">
              {message}
            </p>
          )}
        </div>
      </div>

      <StatsPanel stats={stats} points={points} player={player} opponent={opponent} lang={lang} />

      {points.length > 0 && (
        <details className="pointlist">
          <summary>Charted points ({points.length})</summary>
          <ol data-testid="point-list">
            {points.map((p, i) => (
              <li key={p.id}>
                <span>
                  {i + 1}. <span className="muted" data-testid="point-score">{scoreSummary(timeline[i], ui, names)}</span> · {names[p.server]} serves, {p.side} side ·{" "}
                  {OUTCOME_LABEL[p.outcome]} · won by {names[p.winner]}
                  {timeline[i].breakPoint ? <span className="tag"> {ui.breakPoint}</span> : null}
                  {(p.manualServer && p.server !== timeline[i].server) || (p.manualSide && p.side !== timeline[i].side) ? (
                    <span className="tag warn"> {ui.manual}</span>
                  ) : null}
                </span>
                <button type="button" className="link danger" onClick={() => onDelete(p.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ol>
        </details>
      )}
    </div>
  );
}
