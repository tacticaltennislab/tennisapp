import type { AppLocale } from "@/i18n/locales";

/** Wording for the credit balance (header, account page) and the cost line in the upload form. */
export interface CreditsUiDict {
  header: { label: string; aria: string };
  account: { title: string; yours: string; renews: string; noRenewal: string; buy: string };
  form: {
    kindLabel: string;
    kindStroke: string;
    kindMatch: string;
    kindTraining: string;
    lengthLabel: string;
    lengthHint: string;
    /** {credits}, e.g. "2 credits" */
    cost: string;
    have: string;
    /** {n} and {noun}, or only {n} */
    needMore: string;
    payWith: string;
    payMine: string;
    /** {name} */
    payAcademy: string;
    notEnough: string;
  };
}

const en: CreditsUiDict = {
  header: { label: "Credits: {n}", aria: "Your credits" },
  account: { title: "Credits", yours: "Your credits", renews: "Renews {date}", noRenewal: "No renewal date", buy: "Buy credits" },
  form: {
    kindLabel: "What are you sending?",
    kindStroke: "A stroke (one technical issue)",
    kindMatch: "A match",
    kindTraining: "A training session",
    lengthLabel: "Length in minutes",
    lengthHint: "Filled in from the video. It sets how many credits this uses.",
    cost: "This uses {credits}.",
    have: "You have {credits}.",
    needMore: "You need {n} more {noun}",
    payWith: "Pay with",
    payMine: "My credits",
    payAcademy: "{name}",
    notEnough: "Not enough credits",
  },
};

const pl: CreditsUiDict = {
  header: { label: "Kredyty: {n}", aria: "Twoje kredyty" },
  account: { title: "Kredyty", yours: "Twoje kredyty", renews: "Odnowienie: {date}", noRenewal: "Brak daty odnowienia", buy: "Kup kredyty" },
  form: {
    kindLabel: "Co wysyłasz?",
    kindStroke: "Uderzenie (jeden problem techniczny)",
    kindMatch: "Mecz",
    kindTraining: "Trening",
    lengthLabel: "Długość w minutach",
    lengthHint: "Uzupełniona z nagrania. Określa, ile kredytów to zużyje.",
    cost: "To zużyje {credits}.",
    have: "Masz {credits}.",
    needMore: "Brakuje kredytów: {n}",
    payWith: "Płać z",
    payMine: "Moje kredyty",
    payAcademy: "{name}",
    notEnough: "Za mało kredytów",
  },
};

const es: CreditsUiDict = {
  header: { label: "Créditos: {n}", aria: "Tus créditos" },
  account: { title: "Créditos", yours: "Tus créditos", renews: "Se renueva el {date}", noRenewal: "Sin fecha de renovación", buy: "Comprar créditos" },
  form: {
    kindLabel: "¿Qué envías?",
    kindStroke: "Un golpe (un problema técnico)",
    kindMatch: "Un partido",
    kindTraining: "Un entrenamiento",
    lengthLabel: "Duración en minutos",
    lengthHint: "Se rellena a partir del vídeo. Determina cuántos créditos usa.",
    cost: "Esto usa {credits}.",
    have: "Tienes {credits}.",
    needMore: "Necesitas {n} {noun} más",
    payWith: "Pagar con",
    payMine: "Mis créditos",
    payAcademy: "{name}",
    notEnough: "Créditos insuficientes",
  },
};

const it: CreditsUiDict = {
  header: { label: "Crediti: {n}", aria: "I tuoi crediti" },
  account: { title: "Crediti", yours: "I tuoi crediti", renews: "Si rinnova il {date}", noRenewal: "Nessuna data di rinnovo", buy: "Acquista crediti" },
  form: {
    kindLabel: "Cosa stai inviando?",
    kindStroke: "Un colpo (un problema tecnico)",
    kindMatch: "Una partita",
    kindTraining: "Un allenamento",
    lengthLabel: "Durata in minuti",
    lengthHint: "Compilata dal video. Determina quanti crediti usa.",
    cost: "Questo usa {credits}.",
    have: "Hai {credits}.",
    needMore: "Ti servono ancora {n} {noun}",
    payWith: "Paga con",
    payMine: "I miei crediti",
    payAcademy: "{name}",
    notEnough: "Crediti insufficienti",
  },
};

const ru: CreditsUiDict = {
  header: { label: "Кредиты: {n}", aria: "Ваши кредиты" },
  account: { title: "Кредиты", yours: "Ваши кредиты", renews: "Продление: {date}", noRenewal: "Нет даты продления", buy: "Купить кредиты" },
  form: {
    kindLabel: "Что вы отправляете?",
    kindStroke: "Удар (одна техническая проблема)",
    kindMatch: "Матч",
    kindTraining: "Тренировка",
    lengthLabel: "Длительность в минутах",
    lengthHint: "Заполняется по видео. Определяет, сколько кредитов будет использовано.",
    cost: "Будет использовано: {credits}.",
    have: "У вас: {credits}.",
    needMore: "Не хватает кредитов: {n}",
    payWith: "Оплатить из",
    payMine: "Мои кредиты",
    payAcademy: "{name}",
    notEnough: "Недостаточно кредитов",
  },
};

export const creditsUiDictionaries: Record<AppLocale, CreditsUiDict> = { en, pl, es, it, ru };
