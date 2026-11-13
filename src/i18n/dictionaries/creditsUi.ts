import type { AppLocale } from "@/i18n/locales";

/** Wording for the analyses balance (header, account page) and the cost line in the upload form. */
export interface CreditsUiDict {
  /** header.label: {credits}, e.g. "3 analyses" */
  header: { label: string; aria: string };
  account: { title: string; yours: string; renews: string; noRenewal: string; buy: string };
  form: {
    kindLabel: string;
    kindStroke: string;
    kindMatch: string;
    kindTraining: string;
    lengthLabel: string;
    lengthHint: string;
    /** {maxHours}: shown when a match or training video is longer than one analysis covers. */
    tooLong: string;
    /** {credits}, e.g. "1 analysis" */
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
  header: { label: "{credits} left", aria: "Your analyses" },
  account: { title: "Analyses", yours: "Your analyses", renews: "Renews {date}", noRenewal: "No renewal date", buy: "Buy analyses" },
  form: {
    kindLabel: "What are you sending?",
    kindStroke: "A stroke (one technical issue)",
    kindMatch: "A match",
    kindTraining: "A training session",
    lengthLabel: "Length in minutes",
    lengthHint: "Filled in from the video. One analysis covers a match or training session of up to {maxHours} hours.",
    tooLong: "This video is longer than {maxHours} hours, which is the most one analysis covers. Please trim it or send it in parts.",
    cost: "This uses {credits}.",
    have: "You have {credits}.",
    needMore: "You need {n} more {noun}",
    payWith: "Pay with",
    payMine: "My analyses",
    payAcademy: "{name}",
    notEnough: "Not enough analyses",
  },
};

const pl: CreditsUiDict = {
  header: { label: "Pozostało: {credits}", aria: "Twoje analizy" },
  account: { title: "Analizy", yours: "Twoje analizy", renews: "Odnowienie: {date}", noRenewal: "Brak daty odnowienia", buy: "Kup analizy" },
  form: {
    kindLabel: "Co wysyłasz?",
    kindStroke: "Uderzenie (jeden problem techniczny)",
    kindMatch: "Mecz",
    kindTraining: "Trening",
    lengthLabel: "Długość w minutach",
    lengthHint: "Uzupełniona z nagrania. Jedna analiza obejmuje mecz lub trening do {maxHours} godzin.",
    tooLong: "To nagranie trwa dłużej niż {maxHours} godziny, czyli maksimum objęte jedną analizą. Przytnij je lub wyślij w częściach.",
    cost: "To zużyje {credits}.",
    have: "Masz {credits}.",
    needMore: "Brakuje analiz: {n}",
    payWith: "Płać z",
    payMine: "Moje analizy",
    payAcademy: "{name}",
    notEnough: "Za mało analiz",
  },
};

const es: CreditsUiDict = {
  header: { label: "Restantes: {credits}", aria: "Tus análisis" },
  account: { title: "Análisis", yours: "Tus análisis", renews: "Se renueva el {date}", noRenewal: "Sin fecha de renovación", buy: "Comprar análisis" },
  form: {
    kindLabel: "¿Qué envías?",
    kindStroke: "Un golpe (un problema técnico)",
    kindMatch: "Un partido",
    kindTraining: "Un entrenamiento",
    lengthLabel: "Duración en minutos",
    lengthHint: "Se rellena a partir del vídeo. Un análisis cubre un partido o entrenamiento de hasta {maxHours} horas.",
    tooLong: "Este vídeo dura más de {maxHours} horas, el máximo que cubre un análisis. Recórtalo o envíalo en partes.",
    cost: "Esto usa {credits}.",
    have: "Tienes {credits}.",
    needMore: "Necesitas {n} {noun} más",
    payWith: "Pagar con",
    payMine: "Mis análisis",
    payAcademy: "{name}",
    notEnough: "Análisis insuficientes",
  },
};

const it: CreditsUiDict = {
  header: { label: "Rimanenti: {credits}", aria: "Le tue analisi" },
  account: { title: "Analisi", yours: "Le tue analisi", renews: "Si rinnova il {date}", noRenewal: "Nessuna data di rinnovo", buy: "Acquista analisi" },
  form: {
    kindLabel: "Cosa stai inviando?",
    kindStroke: "Un colpo (un problema tecnico)",
    kindMatch: "Una partita",
    kindTraining: "Un allenamento",
    lengthLabel: "Durata in minuti",
    lengthHint: "Compilata dal video. Un'analisi copre una partita o un allenamento fino a {maxHours} ore.",
    tooLong: "Questo video dura più di {maxHours} ore, il massimo coperto da un'analisi. Taglialo o invialo in parti.",
    cost: "Questo usa {credits}.",
    have: "Hai {credits}.",
    needMore: "Ti servono ancora {n} {noun}",
    payWith: "Paga con",
    payMine: "Le mie analisi",
    payAcademy: "{name}",
    notEnough: "Analisi insufficienti",
  },
};

const ru: CreditsUiDict = {
  header: { label: "Осталось: {credits}", aria: "Ваши разборы" },
  account: { title: "Разборы", yours: "Ваши разборы", renews: "Продление: {date}", noRenewal: "Нет даты продления", buy: "Купить разборы" },
  form: {
    kindLabel: "Что вы отправляете?",
    kindStroke: "Удар (одна техническая проблема)",
    kindMatch: "Матч",
    kindTraining: "Тренировка",
    lengthLabel: "Длительность в минутах",
    lengthHint: "Заполняется по видео. Один разбор покрывает матч или тренировку до {maxHours} часов.",
    tooLong: "Это видео длиннее {maxHours} часов, максимума, который покрывает один разбор. Обрежьте его или отправьте частями.",
    cost: "Будет использовано: {credits}.",
    have: "У вас: {credits}.",
    needMore: "Не хватает разборов: {n}",
    payWith: "Оплатить из",
    payMine: "Мои разборы",
    payAcademy: "{name}",
    notEnough: "Недостаточно разборов",
  },
};

export const creditsUiDictionaries: Record<AppLocale, CreditsUiDict> = { en, pl, es, it, ru };
