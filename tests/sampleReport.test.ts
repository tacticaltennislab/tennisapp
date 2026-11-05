import { describe, expect, it } from "vitest";
import { fill, sampleReportDict } from "@/i18n/dictionaries/sampleReport";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import { buildClubView } from "@/lib/clubPricing";

describe("sample report notes", () => {
  it("the technique tab has its own note and the match tab keeps the original", () => {
    expect(sampleReportDict("en").note).toBe("Sample report. Names and figures are illustrative.");
    expect(sampleReportDict("en").techniqueNote).toBe("Sample analysis, shared with the player's family's permission.");
    expect(sampleReportDict("pl").note).toBe("Przykładowy raport. Nazwiska i liczby są przykładowe.");
    expect(sampleReportDict("pl").techniqueNote).toBe("Przykładowa analiza, udostępniona za zgodą rodziny zawodniczki.");
  });

  it("every other language shows the English text", () => {
    for (const lang of ["es", "it", "ru"] as const) expect(sampleReportDict(lang)).toBe(sampleReportDict("en"));
  });

  it("fills placeholders", () => {
    expect(fill("Page {n} of {total}", { n: 2, total: 5 })).toBe("Page 2 of 5");
  });
});

describe("the animated sample matches the sample report: the second serve", () => {
  it("says second serve in every language, and no longer says first serve", () => {
    const expected: Record<string, [RegExp, RegExp]> = {
      en: [/^Second serves land in the same spot/, /^Make the second serve harder to read\.$/],
      pl: [/^Drugi serwis ląduje/, /drugi serwis trudniejszym do odczytania/],
      es: [/^El segundo saque cae/, /segundo saque más difícil de leer/],
      it: [/^La seconda di servizio cade/, /seconda di servizio più difficile da leggere/],
      ru: [/^Вторая подача/, /вторую подачу менее предсказуемой/],
    };
    for (const [lang, [observed, priority]] of Object.entries(expected)) {
      const s = homeDictionaries[lang as keyof typeof homeDictionaries].sampleAnalysis;
      expect(s.observed[0], lang).toMatch(observed);
      expect(s.priority, lang).toMatch(priority);
    }
    expect(homeDictionaries.en.sampleAnalysis.badge).toBe("Illustrative example");
  });
});

describe("club packages", () => {
  it("no tier is flagged as the most popular one", () => {
    const { tiers } = buildClubView("en");
    expect(tiers.length).toBeGreaterThan(0);
    for (const t of tiers) expect(Object.keys(t)).not.toContain("popular");
  });
});
