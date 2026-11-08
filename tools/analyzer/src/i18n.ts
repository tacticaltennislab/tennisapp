import { pct, type Stats } from "./stats";
import type { Lang, NoteType } from "./types";

/** Labels for the PDF report and the lines handed to the AI draft. The tool's own screens are in English. */
export interface Labels {
  reportTitle: string;
  player: string;
  opponent: string;
  date: string;
  surface: string;
  keyStats: string;
  priorities: string;
  strengths: string;
  issues: string;
  tactical: string;
  notes: string;
  drills: string;
  servePlacement: string;
  landingHeat: string;
  deuce: string;
  ad: string;
  wide: string;
  body: string;
  t: string;
  page: string;
  of: string;
  types: Record<NoteType, string>;
  surfaces: Record<string, string>;
  stat: {
    points: string;
    firstIn: string;
    firstWon: string;
    secondIn: string;
    secondWon: string;
    aces: string;
    doubleFaults: string;
    winners: string;
    unforced: string;
    forced: string;
    rally: string;
    shots: string;
    breakFaced: string;
    breakSaved: string;
    breakWon: string;
    pressure: string;
  };
  noStats: string;
}

export const LABELS: Record<Lang, Labels> = {
  en: {
    reportTitle: "Match analysis report",
    player: "Player",
    opponent: "Opponent",
    date: "Date",
    surface: "Surface",
    keyStats: "Key statistics",
    priorities: "Your 3 priorities",
    strengths: "Strengths",
    issues: "Technical issues",
    tactical: "Tactical patterns",
    notes: "Observations on the video",
    drills: "Recommended drills",
    servePlacement: "Serve placement",
    landingHeat: "Where the shots landed",
    deuce: "Deuce side",
    ad: "Ad side",
    wide: "Wide",
    body: "Body",
    t: "T",
    page: "Page",
    of: "of",
    types: { strength: "Strength", issue: "Issue", tactical: "Tactical" },
    surfaces: { hard: "Hard", clay: "Clay", grass: "Grass", indoor: "Indoor", other: "Other" },
    stat: {
      points: "Points charted",
      firstIn: "First serve in",
      firstWon: "Points won on first serve",
      secondIn: "Second serve in",
      secondWon: "Points won on second serve",
      aces: "Aces",
      doubleFaults: "Double faults",
      winners: "Winners",
      unforced: "Unforced errors",
      forced: "Forced errors",
      rally: "Average rally length",
      shots: "shots",
      breakFaced: "Break points faced",
      breakSaved: "Break points saved",
      breakWon: "Break points won",
      pressure: "Points won at 30:30 or deuce",
    },
    noStats: "No match charting for this analysis.",
  },
  pl: {
    reportTitle: "Raport z analizy meczu",
    player: "Zawodnik",
    opponent: "Przeciwnik",
    date: "Data",
    surface: "Nawierzchnia",
    keyStats: "Najważniejsze statystyki",
    priorities: "Twoje 3 priorytety",
    strengths: "Mocne strony",
    issues: "Problemy techniczne",
    tactical: "Wzorce taktyczne",
    notes: "Obserwacje z nagrania",
    drills: "Zalecane ćwiczenia",
    servePlacement: "Rozmieszczenie serwisów",
    landingHeat: "Gdzie lądowały piłki",
    deuce: "Strona deuce",
    ad: "Strona ad",
    wide: "Na zewnątrz",
    body: "W ciało",
    t: "T",
    page: "Strona",
    of: "z",
    types: { strength: "Mocna strona", issue: "Problem", tactical: "Taktyka" },
    surfaces: { hard: "Twarda", clay: "Mączka", grass: "Trawa", indoor: "Hala", other: "Inna" },
    stat: {
      points: "Punkty w analizie",
      firstIn: "Pierwszy serwis w korcie",
      firstWon: "Punkty wygrane po pierwszym serwisie",
      secondIn: "Drugi serwis w korcie",
      secondWon: "Punkty wygrane po drugim serwisie",
      aces: "Asy",
      doubleFaults: "Podwójne błędy serwisowe",
      winners: "Uderzenia wygrywające",
      unforced: "Błędy własne",
      forced: "Błędy wymuszone",
      rally: "Średnia długość wymiany",
      shots: "uderzeń",
      breakFaced: "Break pointy przeciwko zawodnikowi",
      breakSaved: "Obronione break pointy",
      breakWon: "Wykorzystane break pointy",
      pressure: "Wygrane punkty przy 30:30 lub deuce",
    },
    noStats: "Brak statystyk meczowych w tej analizie.",
  },
};

export interface StatRow {
  label: string;
  value: string;
}

/** The key statistics for the analysed player, as label and value pairs (the PDF table and the AI prompt). */
export function statRows(stats: Stats, lang: Lang): StatRow[] {
  const l = LABELS[lang].stat;
  const me = stats.player;
  if (stats.total === 0) return [];
  const rows: StatRow[] = [{ label: l.points, value: String(stats.total) }];
  if (me.firstTotal > 0) {
    rows.push({ label: l.firstIn, value: `${pct(me.firstIn, me.firstTotal)} (${me.firstIn}/${me.firstTotal})` });
    rows.push({ label: l.firstWon, value: `${pct(me.firstWon, me.firstPlayed)} (${me.firstWon}/${me.firstPlayed})` });
  }
  if (me.secondTotal > 0) {
    rows.push({ label: l.secondIn, value: `${pct(me.secondIn, me.secondTotal)} (${me.secondIn}/${me.secondTotal})` });
    rows.push({ label: l.secondWon, value: `${pct(me.secondWon, me.secondPlayed)} (${me.secondWon}/${me.secondPlayed})` });
  }
  rows.push(
    { label: l.aces, value: String(me.aces) },
    { label: l.doubleFaults, value: String(me.doubleFaults) },
    { label: l.winners, value: String(me.winners) },
    { label: l.unforced, value: String(me.unforcedErrors) },
    { label: l.forced, value: String(me.forcedErrors) },
    { label: l.rally, value: `${stats.averageRally.toFixed(1)} ${l.shots}` }
  );
  const pr = stats.pressure?.player;
  if (pr) {
    if (pr.breakPointsFaced > 0) {
      rows.push({ label: l.breakFaced, value: String(pr.breakPointsFaced) });
      rows.push({ label: l.breakSaved, value: `${pct(pr.breakPointsSaved, pr.breakPointsFaced)} (${pr.breakPointsSaved}/${pr.breakPointsFaced})` });
    }
    if (pr.breakPointChances > 0) {
      rows.push({ label: l.breakWon, value: `${pct(pr.breakPointsWon, pr.breakPointChances)} (${pr.breakPointsWon}/${pr.breakPointChances})` });
    }
    if (pr.pressurePlayed > 0) {
      rows.push({ label: l.pressure, value: `${pct(pr.pressureWon, pr.pressurePlayed)} (${pr.pressureWon}/${pr.pressurePlayed})` });
    }
  }
  return rows;
}

/** Text of the score tracking screens (match setup, the scoreboard, charting and the pressure statistics). */
export interface ScoreUi {
  setupTitle: string;
  bestOf: string;
  bestOf3: string;
  bestOf5: string;
  tiebreak: string;
  matchTiebreak: string;
  noAd: string;
  firstServer: string;
  startMid: string;
  startSets: string;
  startSetsHint: string;
  startGames: string;
  startGamesHint: string;
  startPoints: string;
  startPointsHint: string;
  startNote: string;
  errors: { sets: string; games: string; points: string; over: string; format: string };
  apply: string;
  // scoreboard
  sets: string;
  games: string;
  game: string;
  serving: string;
  server: string;
  side: string;
  deuceSide: string;
  adSide: string;
  deuceWord: string;
  advantage: string;
  tiebreakWord: string;
  matchTiebreakWord: string;
  setWord: string;
  breakPoint: string;
  matchOver: string;
  afterEnd: string;
  // overrides
  auto: string;
  manual: string;
  backToAuto: string;
  overrideNote: string;
  // stats
  pressureTitle: string;
  breakFacedSaved: string;
  breakWon: string;
  pressurePoints: string;
  none: string;
}

export const SCORE_UI: Record<Lang, ScoreUi> = {
  en: {
    setupTitle: "Match format and score",
    bestOf: "Match length",
    bestOf3: "Best of 3 sets",
    bestOf5: "Best of 5 sets",
    tiebreak: "Tiebreak at 6:6",
    matchTiebreak: "Deciding set is a match tiebreak to 10",
    noAd: "No-ad scoring",
    firstServer: "Who serves first",
    startMid: "Start from a score in the middle of the match",
    startSets: "Finished sets",
    startSetsHint: "for example 6:4, 3:6",
    startGames: "Games in the current set",
    startGamesHint: "for example 3:2",
    startPoints: "Points in the current game",
    startPointsHint: "for example 30:15 or 40:AD (in a tiebreak: 5:3)",
    startNote: "The first server is the player who serves the first point you chart.",
    errors: {
      sets: "The finished sets are not possible. Write them like 6:4, 3:6.",
      games: "The games in the current set are not possible.",
      points: "The points in the current game are not possible.",
      over: "That score already ends the match.",
      format: "Use the form 3:2 (two numbers with a colon).",
    },
    apply: "Apply",
    sets: "Sets",
    games: "Games",
    game: "Game",
    serving: "Serving",
    server: "Server",
    side: "Side",
    deuceSide: "Deuce side",
    adSide: "Ad side",
    deuceWord: "Deuce",
    advantage: "Ad {name}",
    tiebreakWord: "Tiebreak",
    matchTiebreakWord: "Match tiebreak",
    setWord: "Set",
    breakPoint: "Break point",
    matchOver: "Match over. Winner: {name}.",
    afterEnd: "The match is already decided. Points after the end are charted but do not change the score.",
    auto: "automatic",
    manual: "Manual",
    backToAuto: "Back to automatic",
    overrideNote: "Set by hand for this point only. Automatic: {value}.",
    pressureTitle: "Pressure points",
    breakFacedSaved: "Break points saved",
    breakWon: "Break points won",
    pressurePoints: "Points won at 30:30 or deuce",
    none: "none yet",
  },
  pl: {
    setupTitle: "Format meczu i wynik",
    bestOf: "Długość meczu",
    bestOf3: "Do 2 wygranych setów",
    bestOf5: "Do 3 wygranych setów",
    tiebreak: "Tiebreak przy 6:6",
    matchTiebreak: "Decydujący set to super tiebreak do 10",
    noAd: "Gra bez przewag (no-ad)",
    firstServer: "Kto serwuje pierwszy",
    startMid: "Zacznij od wyniku w środku meczu",
    startSets: "Zakończone sety",
    startSetsHint: "na przykład 6:4, 3:6",
    startGames: "Gemy w bieżącym secie",
    startGamesHint: "na przykład 3:2",
    startPoints: "Punkty w bieżącym gemie",
    startPointsHint: "na przykład 30:15 lub 40:AD (w tiebreaku: 5:3)",
    startNote: "Pierwszy serwujący to zawodnik, który serwuje pierwszy oznaczany przez Ciebie punkt.",
    errors: {
      sets: "Takie zakończone sety są niemożliwe. Zapisz je tak: 6:4, 3:6.",
      games: "Taki wynik gemów w bieżącym secie jest niemożliwy.",
      points: "Taki wynik punktów w bieżącym gemie jest niemożliwy.",
      over: "Ten wynik oznacza już koniec meczu.",
      format: "Użyj zapisu 3:2 (dwie liczby z dwukropkiem).",
    },
    apply: "Zastosuj",
    sets: "Sety",
    games: "Gemy",
    game: "Gem",
    serving: "Serwuje",
    server: "Serwujący",
    side: "Strona",
    deuceSide: "Strona deuce",
    adSide: "Strona ad",
    deuceWord: "Deuce",
    advantage: "Przewaga {name}",
    tiebreakWord: "Tiebreak",
    matchTiebreakWord: "Super tiebreak",
    setWord: "Set",
    breakPoint: "Break point",
    matchOver: "Koniec meczu. Zwycięzca: {name}.",
    afterEnd: "Mecz jest już rozstrzygnięty. Punkty po końcu są zapisywane, ale nie zmieniają wyniku.",
    auto: "automatycznie",
    manual: "Ręcznie",
    backToAuto: "Wróć do automatycznego",
    overrideNote: "Ustawione ręcznie tylko dla tego punktu. Automatycznie: {value}.",
    pressureTitle: "Punkty pod presją",
    breakFacedSaved: "Obronione break pointy",
    breakWon: "Wykorzystane break pointy",
    pressurePoints: "Wygrane punkty przy 30:30 lub deuce",
    none: "jeszcze brak",
  },
};
