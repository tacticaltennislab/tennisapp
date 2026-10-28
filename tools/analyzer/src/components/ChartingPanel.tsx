import { useMemo, useState } from "react";
import { other } from "../court";
import { uid } from "../project";
import { heatGrid, serveIsIn } from "../stats";
import type { ChartPoint, Landing, Outcome, Pt, Side, Who } from "../types";
import CourtSvg, { type CourtView } from "./CourtSvg";
import StatsPanel from "./StatsPanel";

interface Draft {
  server: Who;
  side: Side;
  serves: Landing[];
  rally: Pt[];
}

interface Props {
  points: ChartPoint[];
  player: string;
  opponent: string;
  videoTime: () => number | undefined;
  onAdd: (p: ChartPoint) => void;
  onRemoveLast: () => void;
  onDelete: (id: string) => void;
}

const OUTCOME_LABEL: Record<Outcome, string> = {
  winner: "Winner",
  forced_error: "Forced error",
  unforced_error: "Unforced error",
  ace: "Ace",
  double_fault: "Double fault",
};

/** Match charting: serve placement, rally shots and how each point ended, on a court drawn to scale. */
export default function ChartingPanel({ points, player, opponent, videoTime, onAdd, onRemoveLast, onDelete }: Props) {
  const [draft, setDraft] = useState<Draft>({ server: "player", side: "deuce", serves: [], rally: [] });
  const [wonBy, setWonBy] = useState<Who>("player");
  const [view, setView] = useState<CourtView>("dots");
  const [message, setMessage] = useState<string | null>(null);
  const names: Record<Who, string> = { player: player || "Player", opponent: opponent || "Opponent" };

  const last = draft.serves[draft.serves.length - 1];
  const serveIn = draft.serves.some((s) => s.in);
  const awaitingServe = draft.serves.length === 0 || (!serveIn && draft.serves.length < 2);
  const hint = awaitingServe
    ? draft.serves.length === 0
      ? `Click where ${names[draft.server]}'s first serve landed (${draft.side === "deuce" ? "deuce" : "ad"} side).`
      : "The first serve was out. Click where the second serve landed."
    : "Click where the next shot landed, or choose how the point ended.";

  const reset = (next?: Partial<Draft>) => setDraft((d) => ({ server: d.server, side: d.side, serves: [], rally: [], ...next }));

  function commit(outcome: Outcome, winner: Who, serves = draft.serves, rally = draft.rally) {
    onAdd({ id: uid(), server: draft.server, side: draft.side, serves, rally, outcome, winner, videoTime: videoTime() });
    setMessage(null);
    // Next point: same server, the other side of the court, as in a real game.
    reset({ side: draft.side === "deuce" ? "ad" : "deuce" });
  }

  function pick(p: Pt) {
    setMessage(null);
    if (awaitingServe) {
      const landing: Landing = { ...p, in: serveIsIn(p, draft.side) };
      const serves = [...draft.serves, landing];
      if (serves.length === 2 && !serves[0].in && !landing.in) {
        // Two faults: a double fault, the receiver wins the point.
        return commit("double_fault", other(draft.server), serves, []);
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
      return commit("ace", draft.server);
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

  return (
    <div className="charting">
      <div className="chartgrid">
        <div>
          <CourtSvg
            dots={view === "dots" ? dots : []}
            heat={heat}
            draftServes={draft.serves}
            draftRally={draft.rally}
            targetSide={awaitingServe ? draft.side : null}
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
          <fieldset disabled={draft.serves.length > 0}>
            <legend>Server</legend>
            <div className="group">
              {(["player", "opponent"] as Who[]).map((w) => (
                <button key={w} type="button" className={`tbtn ${draft.server === w ? "on" : ""}`} aria-pressed={draft.server === w} onClick={() => setDraft({ ...draft, server: w })}>
                  {names[w]}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset disabled={draft.serves.length > 0}>
            <legend>Side</legend>
            <div className="group">
              {(["deuce", "ad"] as Side[]).map((s) => (
                <button key={s} type="button" className={`tbtn ${draft.side === s ? "on" : ""}`} aria-pressed={draft.side === s} onClick={() => setDraft({ ...draft, side: s })}>
                  {s === "deuce" ? "Deuce" : "Ad"}
                </button>
              ))}
            </div>
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

      <StatsPanel points={points} player={player} opponent={opponent} />

      {points.length > 0 && (
        <details className="pointlist">
          <summary>Charted points ({points.length})</summary>
          <ol>
            {points.map((p, i) => (
              <li key={p.id}>
                <span>
                  {i + 1}. {names[p.server]} serves, {p.side} side · {OUTCOME_LABEL[p.outcome]} · won by {names[p.winner]}
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
