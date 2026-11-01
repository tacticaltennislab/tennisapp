import type { AppLocale } from "@/i18n/locales";

/** Strings of the homepage "sample report" carousel. English and Polish; every other language shows English. */
export interface SampleReportDict {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** One caption per page of the report, in order. */
  captions: [string, string, string, string, string];
  note: string;
  pdf: string;
  carouselLabel: string;
  /** "Page {n} of {total}: {caption}" */
  slideLabel: string;
  /** "{n} / {total}" */
  counter: string;
  prev: string;
  next: string;
  /** "Go to page {n}" */
  goTo: string;
  /** "Open page {n} full size" */
  open: string;
  lightboxLabel: string;
  close: string;
  dots: string;
}

const en: SampleReportDict = {
  eyebrow: "Sample report",
  title: "See what you get",
  subtitle: "A real report format: 5 pages, every point logged by hand, plus a video breakdown.",
  captions: [
    "Summary and the three things to change first, with a link to your video breakdown.",
    "Every serve plotted on the court. Patterns your opponent already reads.",
    "Rally length, game situations and the pattern that wins you points.",
    "Three key moments with time codes, what happened and what to do instead.",
    "A two-week training plan with measurable targets.",
  ],
  note: "Sample report. Names and figures are illustrative.",
  pdf: "Download the full PDF",
  carouselLabel: "Sample report pages",
  slideLabel: "Page {n} of {total}: {caption}",
  counter: "{n} / {total}",
  prev: "Previous page",
  next: "Next page",
  goTo: "Go to page {n}",
  open: "Open page {n} full size",
  lightboxLabel: "Sample report, page {n} of {total}",
  close: "Close",
  dots: "Choose a page",
};

const pl: SampleReportDict = {
  eyebrow: "Przykładowy raport",
  title: "Zobacz, co dostajesz",
  subtitle: "Tak wygląda raport: 5 stron, każdy punkt oznaczony ręcznie, do tego omówienie wideo.",
  captions: [
    "Podsumowanie i trzy rzeczy do poprawy, z linkiem do omówienia wideo.",
    "Każdy serwis zaznaczony na korcie. Schematy, które rywal już czyta.",
    "Długość wymian, sytuacje w grze i schemat, który daje ci punkty.",
    "Trzy kluczowe momenty z czasem w nagraniu: co się stało i co zrobić zamiast tego.",
    "Dwutygodniowy plan treningowy z mierzalnymi celami.",
  ],
  note: "Przykładowy raport. Nazwiska i liczby są przykładowe.",
  pdf: "Pobierz pełny PDF",
  carouselLabel: "Strony przykładowego raportu",
  slideLabel: "Strona {n} z {total}: {caption}",
  counter: "{n} / {total}",
  prev: "Poprzednia strona",
  next: "Następna strona",
  goTo: "Przejdź do strony {n}",
  open: "Otwórz stronę {n} w pełnym rozmiarze",
  lightboxLabel: "Przykładowy raport, strona {n} z {total}",
  close: "Zamknij",
  dots: "Wybierz stronę",
};

export function sampleReportDict(lang: AppLocale): SampleReportDict {
  return lang === "pl" ? pl : en;
}

/** Fills {name} placeholders in a template. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? ""));
}
