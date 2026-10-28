import type { AppLocale } from "@/i18n/locales";

/** Plural forms of "credit" for one language, as Intl.PluralRules categories. */
export type CreditNoun = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };

/** "1 credit", "2 credits", "5 kredytów": the noun follows the language's plural rules. */
export function formatCredits(lang: AppLocale, count: number, noun: CreditNoun): string {
  return `${count} ${creditNoun(lang, count, noun)}`;
}

/** Just the noun, in the right plural form: "credit", "kredyty". */
export function creditNoun(lang: AppLocale, count: number, noun: CreditNoun): string {
  return noun[new Intl.PluralRules(lang).select(count)] ?? noun.other;
}
