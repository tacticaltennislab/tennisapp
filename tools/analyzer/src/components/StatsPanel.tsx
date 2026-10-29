import { computeStats, pct, placement, type PlayerStats } from "../stats";
import type { ChartPoint } from "../types";

function Col({ s, name }: { s: PlayerStats; name: string }) {
  return (
    <div className="statcol">
      <h4>{name}</h4>
      <dl>
        <dt>Points won</dt>
        <dd>{s.pointsWon}</dd>
        {s.firstTotal > 0 && (
          <>
            <dt>1st serve in</dt>
            <dd>{pct(s.firstIn, s.firstTotal)} <span className="muted">({s.firstIn}/{s.firstTotal})</span></dd>
            <dt>Won on 1st serve</dt>
            <dd>{pct(s.firstWon, s.firstPlayed)} <span className="muted">({s.firstWon}/{s.firstPlayed})</span></dd>
          </>
        )}
        {s.secondTotal > 0 && (
          <>
            <dt>2nd serve in</dt>
            <dd>{pct(s.secondIn, s.secondTotal)} <span className="muted">({s.secondIn}/{s.secondTotal})</span></dd>
            <dt>Won on 2nd serve</dt>
            <dd>{pct(s.secondWon, s.secondPlayed)} <span className="muted">({s.secondWon}/{s.secondPlayed})</span></dd>
          </>
        )}
        <dt>Aces</dt>
        <dd>{s.aces}</dd>
        <dt>Double faults</dt>
        <dd>{s.doubleFaults}</dd>
        <dt>Winners</dt>
        <dd>{s.winners}</dd>
        <dt>Unforced errors</dt>
        <dd>{s.unforcedErrors}</dd>
        <dt>Forced errors</dt>
        <dd>{s.forcedErrors}</dd>
      </dl>
    </div>
  );
}

/** Live statistics for the charted points: both people, serve placement by zone, rally length. */
export default function StatsPanel({ points, player, opponent }: { points: ChartPoint[]; player: string; opponent: string }) {
  const st = computeStats(points);
  const pl = placement(points, "player");
  return (
    <div className="stats" data-testid="stats">
      <p className="muted">
        {st.total} {st.total === 1 ? "point" : "points"} charted · average rally {st.averageRally.toFixed(1)} shots
      </p>
      <div className="statgrid">
        <Col s={st.player} name={player || "Player"} />
        <Col s={st.opponent} name={opponent || "Opponent"} />
      </div>
      <h4>Serve placement ({player || "Player"})</h4>
      <table className="zones" data-testid="zones">
        <thead>
          <tr>
            <th />
            <th>Wide</th>
            <th>Body</th>
            <th>T</th>
          </tr>
        </thead>
        <tbody>
          {(["deuce", "ad"] as const).map((side) => (
            <tr key={side}>
              <th>{side === "deuce" ? "Deuce side" : "Ad side"}</th>
              <td>{pl[side].wide}</td>
              <td>{pl[side].body}</td>
              <td>{pl[side].t}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
