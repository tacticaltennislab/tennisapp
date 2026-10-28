import type { AppLocale } from "@/i18n/locales";

/** Plural forms of "credit" for one language, as Intl.PluralRules categories. */
export type CreditNoun = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };

/** "1 credit", "2 credits", "5 kredytów": the noun follows the language's plural rules. */
export function formatCredits(lang: AppLocale, count: number, noun: CreditNoun): string {
  const form = noun[new Intl.PluralRules(lang).select(count)] ?? noun.other;
  return `${count} ${form}`;
}
