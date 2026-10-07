import type { AppLocale } from "@/i18n/locales";

export interface FooterDict {
  tagline: string;
  about: string;
  faq: string;
  leaveReview: string;
  contact: string;
  terms: string;
  privacy: string;
}

const en: FooterDict = {
  tagline: "Tactical Tennis Lab — video and match analysis for tennis academies and clubs.",
  about: "About",
  faq: "FAQ",
  leaveReview: "Leave a review",
  contact: "Contact",
  terms: "Terms",
  privacy: "Privacy",
};

const pl: FooterDict = {
  tagline: "Tactical Tennis Lab — analiza wideo i meczowa dla akademii i klubów tenisowych.",
  about: "O nas",
  faq: "FAQ",
  leaveReview: "Zostaw opinię",
  contact: "Kontakt",
  terms: "Regulamin",
  privacy: "Prywatność",
};

const es: FooterDict = {
  tagline: "Tactical Tennis Lab — análisis de vídeo y de partidos para academias y clubes de tenis.",
  about: "Sobre nosotros",
  faq: "Preguntas frecuentes",
  leaveReview: "Deja una opinión",
  contact: "Contacto",
  terms: "Términos",
  privacy: "Privacidad",
};

const it: FooterDict = {
  tagline: "Tactical Tennis Lab — analisi video e di partita per accademie e club di tennis.",
  about: "Chi siamo",
  faq: "Domande frequenti",
  leaveReview: "Lascia una recensione",
  contact: "Contatti",
  terms: "Termini",
  privacy: "Privacy",
};

const ru: FooterDict = {
  tagline: "Tactical Tennis Lab — видео- и матч-анализ для теннисных академий и клубов.",
  about: "О нас",
  faq: "Вопросы и ответы",
  leaveReview: "Оставить отзыв",
  contact: "Контакты",
  terms: "Условия",
  privacy: "Конфиденциальность",
};

export const footerDictionaries: Record<AppLocale, FooterDict> = { en, pl, es, it, ru };
