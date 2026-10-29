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
  return rows;
}
