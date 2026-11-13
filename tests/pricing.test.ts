import { describe, expect, it } from "vitest";
import {
  ACADEMY_PILOT,
  ACADEMY_PLANS,
  CARD_PLANS,
  CREDIT_RULES,
  FULL_MATCH_CREDITS,
  PLANS,
  creditsForMatchMinutes,
  fillCreditVars,
  getPlan,
} from "@/lib/plans";
import { CHECKOUT_PLANS } from "@/lib/stripe";
import { creditsNeeded, isTooLongForAnalysis } from "@/lib/creditCost";
import { creditNoun, formatCredits } from "@/lib/creditFormat";
import { creditRuleText } from "@/lib/clubPricing";
import { AI_FAQ_SYSTEM_PROMPT } from "@/lib/aiFaqPrompt";
import { referralDiscountPercent } from "@/lib/referralPricing";
import { pricingDictionaries } from "@/i18n/dictionaries/pricing";
import { LOCALES, type AppLocale } from "@/i18n/locales";

// No database here: these tests pin the pricing config and the customer facing wording.

const ALL_LOCALES: AppLocale[] = ["en", ...LOCALES];
/** What must never reach a customer: credit in English, Polish, Spanish, Italian and Russian. */
const CREDIT_WORDS = /credit|kredyt|cr[eé]dit|кредит/i;

describe("the match and stroke products", () => {
  it("Match Analysis is one full match for $159, 1 analysis", () => {
    const plan = getPlan("match-analysis");
    expect(plan).toMatchObject({ name: "Match Analysis", amountCents: 15900, price: "$159", credits: 1 });
    expect(plan.features[0]).toMatch(/full match/i);
    expect(plan.features.join(" ")).not.toMatch(/\{minutes\}|60 minutes/);
  });

  it("the old Match Analysis Full plan is gone and Stroke Analysis is still $49", () => {
    expect(PLANS.map((p) => p.planId)).not.toContain("match-analysis-full");
    expect(() => getPlan("match-analysis-full")).toThrow();
    expect(getPlan("stroke-analysis")).toMatchObject({ amountCents: 4900, price: "$49", credits: 1 });
    expect(CARD_PLANS.map((p) => p.planId)).toEqual(["stroke-analysis", "match-analysis"]);
  });

  it("the Stripe checkout charges $159 for Match Analysis and $49 for Stroke Analysis", () => {
    expect(CHECKOUT_PLANS["match-analysis"]).toMatchObject({ amountCents: 15900, mode: "payment", credits: 1 });
    expect(CHECKOUT_PLANS["stroke-analysis"]).toMatchObject({ amountCents: 4900, credits: 1 });
    expect(CHECKOUT_PLANS["match-analysis-full"]).toBeUndefined();
  });

  it("the free referral reward caps Match Analysis at 50% off", () => {
    expect(referralDiscountPercent(5, "match-analysis")).toBe(50);
    expect(referralDiscountPercent(5, "stroke-analysis")).toBe(100);
  });
});

describe("one analysis per match or stroke, nothing by length", () => {
  it("a full match is 1", () => {
    expect(FULL_MATCH_CREDITS).toBe(1);
    expect(CREDIT_RULES.maxMatchMinutes).toBe(120);
    expect(creditsForMatchMinutes(1)).toBe(1);
    expect(creditsForMatchMinutes(61)).toBe(1);
    expect(creditsForMatchMinutes(120)).toBe(1);
  });

  it("a match longer than 2 hours, or an invalid length, is refused", () => {
    expect(creditsForMatchMinutes(121)).toBeNull();
    expect(creditsForMatchMinutes(0)).toBeNull();
    expect(creditsForMatchMinutes(NaN)).toBeNull();
  });

  it("costs 1 for stroke, match and training at any length", () => {
    for (const kind of ["stroke", "match", "training"] as const) {
      expect(creditsNeeded(kind)).toBe(1);
      expect(creditsNeeded(kind, 30)).toBe(1);
      expect(creditsNeeded(kind, 119)).toBe(1);
    }
  });

  it("only match and training recordings over 2 hours are too long", () => {
    expect(isTooLongForAnalysis("match", 120)).toBe(false);
    expect(isTooLongForAnalysis("match", 121)).toBe(true);
    expect(isTooLongForAnalysis("training", 300)).toBe(true);
    expect(isTooLongForAnalysis("stroke", 300)).toBe(false);
    expect(isTooLongForAnalysis("match")).toBe(false);
    expect(isTooLongForAnalysis("match", NaN)).toBe(false);
  });
});

describe("wording", () => {
  it("counts analyses with the right plural form in every language", () => {
    const noun = (l: AppLocale) => pricingDictionaries[l].credits.noun;
    expect(formatCredits("en", 1, noun("en"))).toBe("1 analysis");
    expect(formatCredits("en", 3, noun("en"))).toBe("3 analyses");
    expect([1, 2, 5, 22, 25].map((n) => formatCredits("pl", n, noun("pl")))).toEqual([
      "1 analiza",
      "2 analizy",
      "5 analiz",
      "22 analizy",
      "25 analiz",
    ]);
    expect(creditNoun("es", 2, noun("es"))).toBe("análisis");
    expect(creditNoun("it", 2, noun("it"))).toBe("analisi");
    expect([1, 2, 5].map((n) => formatCredits("ru", n, noun("ru")))).toEqual(["1 разбор", "2 разбора", "5 разборов"]);
  });

  it("the pricing page rule describes the new rule, in every language, without the 60 minute rule", () => {
    for (const lang of ALL_LOCALES) {
      const rule = creditRuleText(lang);
      expect(rule, lang).toContain("2");
      expect(rule, lang).not.toMatch(/60|\{|\}/);
      expect(rule, lang).not.toMatch(CREDIT_WORDS);
    }
    expect(creditRuleText("en")).toBe("1 analysis covers one full match recording (up to 2 hours) or one stroke analysis.");
  });

  it("the AI FAQ prompt shows $159, the new rule and no credits", () => {
    expect(AI_FAQ_SYSTEM_PROMPT).toContain("Match Analysis: $159");
    expect(AI_FAQ_SYSTEM_PROMPT).toContain("Stroke Analysis: $49");
    expect(AI_FAQ_SYSTEM_PROMPT).toContain("1 analysis covers one full match recording (up to 2 hours) or one stroke analysis");
    expect(AI_FAQ_SYSTEM_PROMPT).not.toMatch(CREDIT_WORDS);
    expect(AI_FAQ_SYSTEM_PROMPT).not.toMatch(/\$99\b|\$179\b|60 minutes/);
  });

  it("no customer facing dictionary or plan text mentions credits, in any language", () => {
    const modules = import.meta.glob("../src/i18n/dictionaries/*.ts", { eager: true }) as Record<string, Record<string, unknown>>;
    expect(Object.keys(modules).length).toBeGreaterThan(10);

    const hits: string[] = [];
    const walk = (value: unknown, path: string) => {
      if (typeof value === "string") {
        // {credits} and {oneCredit} are placeholders in the wording, never shown.
        if (CREDIT_WORDS.test(value.replace(/\{[^}]*\}/g, ""))) hits.push(`${path}: ${value.slice(0, 80)}`);
      } else if (Array.isArray(value)) {
        value.forEach((v, i) => walk(v, `${path}[${i}]`));
      } else if (value && typeof value === "object") {
        for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`);
      }
    };
    for (const [file, mod] of Object.entries(modules)) walk(mod, file.split("/").pop()!);

    for (const plan of PLANS) {
      walk({ name: plan.name, description: fillCreditVars(plan.description), features: plan.features, whatYouGet: plan.whatYouGet, period: plan.period }, `plan ${plan.planId}`);
    }
    walk(ACADEMY_PLANS.map((p) => p.name), "academy plans");
    walk(ACADEMY_PILOT.name, "pilot");

    expect(hits).toEqual([]);
  });
});
