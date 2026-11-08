import { useEffect, useMemo, useRef, useState } from "react";
import { SCORE_UI } from "../i18n";
import { checkStartScore, modeFor, parseGamePoints, parsePair, parseSets, type ScoringError } from "../score";
import { pointsText, setsInput } from "../scoreText";
import type { Lang, MatchFormat, Scoring, Who } from "../types";

interface Props {
  lang: Lang;
  scoring: Scoring;
  names: Record<Who, string>;
  /** Called with the new setup, or null while the starting score cannot be read or is not possible. */
  onChange: (s: Scoring | null) => void;
}

/** Match format, first server and an optional starting score. Used on the start screen and in the charting tab. */
export default function MatchSetupForm({ lang, scoring, names, onChange }: Props) {
  const ui = SCORE_UI[lang];
  const start = scoring.startScore;
  const [format, setFormat] = useState<MatchFormat>(scoring.format);
  const [firstServer, setFirstServer] = useState<Who>(scoring.firstServer);
  const [mid, setMid] = useState(Boolean(start));
  const [setsText, setSetsText] = useState(start ? setsInput(start.sets) : "");
  const [gamesText, setGamesText] = useState(start ? `${start.games.player}:${start.games.opponent}` : "0:0");
  const [pointsTextValue, setPointsTextValue] = useState(() => {
    if (!start) return "0:0";
    const tb = modeFor({ sets: start.sets, games: start.games }, scoring.format) !== "game";
    return pointsText(start.points, tb);
  });

  // What the fields say, as a setup, and what is wrong with it.
  const result = useMemo((): { scoring: Scoring | null; error: ScoringError | "format" | null } => {
    const base: Scoring = { format, firstServer };
    if (!mid) return { scoring: base, error: null };
    const sets = parseSets(setsText);
    const games = parsePair(gamesText);
    if (!sets) return { scoring: null, error: "sets" };
    if (!games) return { scoring: null, error: "format" };
    const tb = modeFor({ sets, games }, format) !== "game";
    const points = parseGamePoints(pointsTextValue, tb);
    if (!points) return { scoring: null, error: "points" };
    const startScore = { sets, games, points };
    const error = checkStartScore(format, startScore);
    return error ? { scoring: null, error } : { scoring: { ...base, startScore }, error: null };
  }, [format, firstServer, mid, setsText, gamesText, pointsTextValue]);

  // Tell the parent about every change, but not about its own value coming back.
  const last = useRef<string>("");
  useEffect(() => {
    const key = JSON.stringify(result.scoring);
    if (key === last.current) return;
    last.current = key;
    onChange(result.scoring);
  }, [result, onChange]);

  const box = "setup-box";
  return (
    <fieldset className="setup" aria-label={ui.setupTitle} data-testid="match-setup">
      <legend>{ui.setupTitle}</legend>

      <div className="row" role="radiogroup" aria-label={ui.bestOf}>
        {([3, 5] as const).map((n) => (
          <label key={n} className="choice">
            <input type="radio" name="bestOf" checked={format.bestOf === n} onChange={() => setFormat({ ...format, bestOf: n })} data-testid={`best-of-${n}`} />
            {n === 3 ? ui.bestOf3 : ui.bestOf5}
          </label>
        ))}
      </div>

      <label className="check">
        <input type="checkbox" checked={format.tiebreak} onChange={(e) => setFormat({ ...format, tiebreak: e.target.checked })} data-testid="opt-tiebreak" />
        {ui.tiebreak}
      </label>
      <label className="check">
        <input type="checkbox" checked={format.matchTiebreak} onChange={(e) => setFormat({ ...format, matchTiebreak: e.target.checked })} data-testid="opt-match-tiebreak" />
        {ui.matchTiebreak}
      </label>
      <label className="check">
        <input type="checkbox" checked={format.noAd} onChange={(e) => setFormat({ ...format, noAd: e.target.checked })} data-testid="opt-no-ad" />
        {ui.noAd}
      </label>

      <label className="block">
        {ui.firstServer}
        <select value={firstServer} onChange={(e) => setFirstServer(e.target.value as Who)} data-testid="first-server">
          <option value="player">{names.player}</option>
          <option value="opponent">{names.opponent}</option>
        </select>
      </label>

      <label className="check">
        <input type="checkbox" checked={mid} onChange={(e) => setMid(e.target.checked)} data-testid="opt-start-mid" />
        {ui.startMid}
      </label>
      {mid && (
        <div className={box}>
          <label className="block">
            {ui.startSets} <span className="muted">({ui.startSetsHint})</span>
            <input value={setsText} onChange={(e) => setSetsText(e.target.value)} data-testid="start-sets" inputMode="text" />
          </label>
          <label className="block">
            {ui.startGames} <span className="muted">({ui.startGamesHint})</span>
            <input value={gamesText} onChange={(e) => setGamesText(e.target.value)} data-testid="start-games" />
          </label>
          <label className="block">
            {ui.startPoints} <span className="muted">({ui.startPointsHint})</span>
            <input value={pointsTextValue} onChange={(e) => setPointsTextValue(e.target.value)} data-testid="start-points" />
          </label>
          <p className="muted small">{ui.startNote}</p>
          {result.error && (
            <p role="alert" className="error" data-testid="setup-error">
              {ui.errors[result.error]}
            </p>
          )}
        </div>
      )}
    </fieldset>
  );
}
