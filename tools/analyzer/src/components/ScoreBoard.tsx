import { SCORE_UI } from "../i18n";
import { gameScore, type PointScore } from "../score";
import { describeGame } from "../scoreText";
import type { Lang, Who } from "../types";

interface Props {
  ctx: PointScore;
  names: Record<Who, string>;
  lang: Lang;
}

/** The score before the next point, as a small scoreboard: finished sets, games, the game, and who serves. */
export default function ScoreBoard({ ctx, names, lang }: Props) {
  const ui = SCORE_UI[lang];
  const tb = ctx.mode !== "game";
  const game = gameScore(ctx);
  const rows: Who[] = ["player", "opponent"];
  const fill = (t: string, v: Record<string, string>) => t.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? "");

  return (
    <div className="scoreboard" data-testid="scoreboard" aria-label={`${ui.sets} ${ctx.sets.length}`}>
      <table>
        <thead>
          <tr>
            <th scope="col" className="name">
              <span className="sr-only">{ui.serving}</span>
            </th>
            {ctx.sets.map((_, i) => (
              <th key={i} scope="col">
                {ui.setWord} {i + 1}
              </th>
            ))}
            {ctx.mode !== "matchTiebreak" && <th scope="col">{ui.games}</th>}
            <th scope="col">{tb ? (ctx.mode === "matchTiebreak" ? ui.matchTiebreakWord : ui.tiebreakWord) : ui.game}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((who) => (
            <tr key={who} className={ctx.server === who ? "serving" : ""}>
              <th scope="row" className="name">
                <span className="dot" aria-hidden="true">
                  {ctx.server === who ? "●" : ""}
                </span>
                {names[who]}
                {ctx.server === who && <span className="sr-only"> ({ui.serving})</span>}
              </th>
              {ctx.sets.map((s, i) => (
                <td key={i}>{s.matchTiebreak ? `[${s[who]}]` : s[who]}</td>
              ))}
              {ctx.mode !== "matchTiebreak" && <td data-testid={`games-${who}`}>{ctx.mode === "tiebreak" ? 6 : ctx.games[who]}</td>}
              <td className="game" data-testid={`game-${who}`}>
                {game[who]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="scoreline" data-testid="score-line">
        <strong>{names[ctx.server]}</strong> · {ctx.side === "deuce" ? ui.deuceSide : ui.adSide}
        {!tb && game.kind !== "points" ? ` · ${describeGame(ctx, ui, names)}` : ""}
        {ctx.breakPoint && (
          <span className="tag" data-testid="break-point">
            {ui.breakPoint}: {names[ctx.breakPoint]}
          </span>
        )}
      </p>
      {ctx.over && ctx.winner && (
        <p role="status" className="banner-note" data-testid="match-over">
          {fill(ui.matchOver, { name: names[ctx.winner] })} {ui.afterEnd}
        </p>
      )}
    </div>
  );
}
