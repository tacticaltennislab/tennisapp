import type { AppLocale } from "@/i18n/locales";

/** Plural forms of "analysis" (a credit in the ledger) for one language, as Intl.PluralRules categories. */
export type CreditNoun = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };

/** "1 analysis", "2 analyses", "5 analiz": the noun follows the language's plural rules. */
export function formatCredits(lang: AppLocale, count: number, noun: CreditNoun): string {
  return `${count} ${creditNoun(lang, count, noun)}`;
}

/** Just the noun, in the right plural form: "analysis", "analizy". */
export function creditNoun(lang: AppLocale, count: number, noun: CreditNoun): string {
  return noun[new Intl.PluralRules(lang).select(count)] ?? noun.other;
}
