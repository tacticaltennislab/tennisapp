import type { Locale } from "@/i18n/locales";

interface SeoText {
  title: string;
  description: string;
}

export const seoTranslations: Record<string, Record<Locale, SeoText>> = {
  pricing: {
    pl: {
      title: "Cennik Treningów Tenisa dla Juniorów",
      description:
        "Plany coachingowe dla juniorów i zawodników, już od 49 USD. Jednorazowe analizy techniki, 4-tygodniowy program rozwoju, analiza meczowa i ciągły coaching PRO Tour z prawdziwym trenerem.",
    },
    es: {
      title: "Precios de Planes de Tenis para Juniors",
      description:
        "Planes de coaching para jugadores junior y competitivos, desde $49. Revisiones técnicas puntuales, un programa de desarrollo de 4 semanas, análisis de partidos y coaching PRO Tour continuo con un entrenador real.",
    },
    it: {
      title: "Prezzi dei Piani di Tennis per Junior",
      description:
        "Piani di coaching per giocatori junior e agonisti, a partire da $49. Revisioni tecniche una tantum, un programma di sviluppo di 4 settimane, analisi delle partite e coaching PRO Tour continuo con un allenatore vero.",
    },
    ru: {
      title: "Цены на Теннисные Программы для Юниоров",
      description:
        "Планы коучинга для юниоров и соревнующихся игроков от $49. Разовый разбор техники, 4-недельная программа развития, анализ матчей и постоянный коучинг PRO Tour с настоящим тренером.",
    },
  },
  home: {
    pl: {
      title: "Tactical Tennis Lab — Trener Tenisa dla Juniorów i Zawodników",
      description:
        "Niezależna analiza wideo i meczowa dla juniorów i zawodników. Osobista informacja zwrotna od byłych zawodników ATP i trenerów ITF Level 2 — drugie eksperckie zdanie obok trenera Twojego dziecka na korcie, nie klub ani akademia.",
    },
    es: {
      title: "Tactical Tennis Lab — Entrenador de Tenis para Juniors y Competidores",
      description:
        "Análisis independiente de vídeo y de partido para jugadores junior y competitivos. Feedback personal de exjugadores del ATP y entrenadores ITF Level 2 — una segunda opinión experta junto al entrenador de pista de tu hijo/a, no un club ni una academia.",
    },
    it: {
      title: "Tactical Tennis Lab — Allenatore di Tennis per Junior e Agonisti",
      description:
        "Analisi video e di partita indipendente per giocatori junior e agonisti. Feedback personale da ex giocatori ATP e allenatori ITF Level 2 — un secondo parere esperto accanto all'allenatore in campo di tuo figlio/a, non un club o un'accademia.",
    },
    ru: {
      title: "Tactical Tennis Lab — Тренер по теннису для юниоров и игроков",
      description:
        "Независимый видео- и матч-анализ для юниоров и соревнующихся игроков. Личная обратная связь от бывших игроков ATP и тренеров уровня ITF Level 2 — второе экспертное мнение в дополнение к тренеру на корте, а не клуб или академия.",
    },
  },
};
