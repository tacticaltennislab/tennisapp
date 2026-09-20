import type { Locale } from "@/i18n/locales";

interface PlanText {
  name: string;
  period: string;
  description: string;
}

/** Translations for src/lib/plans.ts PLANS, keyed by planId then locale.
 * English isn't duplicated here -- it lives on the Plan record itself. */
export const planTranslations: Record<string, Record<Locale, PlanText>> = {
  "stroke-fix": {
    pl: {
      name: "Stroke Fix",
      period: "jednorazowo",
      description: "Profesjonalna analiza biomechaniczna jednego konkretnego problemu technicznego.",
    },
    es: {
      name: "Stroke Fix",
      period: "pago único",
      description: "Análisis biomecánico profesional de un problema técnico concreto.",
    },
    it: {
      name: "Stroke Fix",
      period: "una tantum",
      description: "Analisi biomeccanica professionale di un problema tecnico specifico.",
    },
    ru: {
      name: "Stroke Fix",
      period: "разово",
      description: "Профессиональный биомеханический анализ одной конкретной технической проблемы.",
    },
  },
  "smart-system": {
    pl: {
      name: "Smart System",
      period: "program 4-tygodniowy",
      description: "Indywidualny czterotygodniowy system rozwoju skupiony na jednym uderzeniu.",
    },
    es: {
      name: "Smart System",
      period: "programa de 4 semanas",
      description: "Sistema de desarrollo individualizado de cuatro semanas centrado en un golpe.",
    },
    it: {
      name: "Smart System",
      period: "programma di 4 settimane",
      description: "Sistema di sviluppo individuale di quattro settimane concentrato su un colpo.",
    },
    ru: {
      name: "Smart System",
      period: "4-недельная программа",
      description: "Индивидуальная четырёхнедельная система развития одного удара.",
    },
  },
  "match-iq-short": {
    pl: {
      name: "Match IQ: Short",
      period: "jednorazowo",
      description: "Skoncentrowana analiza taktyczna jednego seta lub do 60 minut gry meczowej.",
    },
    es: {
      name: "Match IQ: Short",
      period: "pago único",
      description: "Análisis táctico enfocado de un set o hasta 60 minutos de partido.",
    },
    it: {
      name: "Match IQ: Short",
      period: "una tantum",
      description: "Analisi tattica mirata di un set o fino a 60 minuti di partita.",
    },
    ru: {
      name: "Match IQ: Short",
      period: "разово",
      description: "Сфокусированный тактический анализ одного сета или до 60 минут игры.",
    },
  },
  "match-iq-full": {
    pl: {
      name: "Match IQ: Full",
      period: "jednorazowo",
      description: "Kompletna analiza taktyczna Twojego meczu, punkt po punkcie.",
    },
    es: {
      name: "Match IQ: Full",
      period: "pago único",
      description: "Análisis táctico completo de tu partido, punto por punto.",
    },
    it: {
      name: "Match IQ: Full",
      period: "una tantum",
      description: "Analisi tattica completa della tua partita, punto per punto.",
    },
    ru: {
      name: "Match IQ: Full",
      period: "разово",
      description: "Полный тактический анализ вашего матча, розыгрыш за розыгрышем.",
    },
  },
  "pro-tour": {
    pl: {
      name: "PRO Tour",
      period: "/miesiąc",
      description: "Ciągły coaching z comiesięczną analizą i bezpośrednim kontaktem z trenerem.",
    },
    es: {
      name: "PRO Tour",
      period: "/mes",
      description: "Coaching continuo con análisis mensual y acceso directo a tu entrenador.",
    },
    it: {
      name: "PRO Tour",
      period: "/mese",
      description: "Coaching continuo con analisi mensile e accesso diretto al tuo allenatore.",
    },
    ru: {
      name: "PRO Tour",
      period: "/месяц",
      description: "Постоянный коучинг с ежемесячным анализом и прямым доступом к тренеру.",
    },
  },
};
