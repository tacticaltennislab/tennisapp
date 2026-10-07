import type { Locale } from "@/i18n/locales";

interface SeoText {
  title: string;
  description: string;
}

export const seoTranslations: Record<string, Record<Locale, SeoText>> = {
  coaches: {
    pl: {
      title: "Poznaj Trenerów Tenisa dla Juniorów",
      description:
        "Byli zawodnicy ATP i certyfikowani trenerzy ITF Level 2, którzy osobiście analizują każde nadesłane wideo od juniorów i zawodników.",
    },
    es: {
      title: "Conoce a los Entrenadores de Tenis para Juniors",
      description:
        "Exjugadores del ATP y entrenadores certificados ITF Level 2 que revisan personalmente cada vídeo enviado por jugadores junior y competitivos.",
    },
    it: {
      title: "Conosci gli Allenatori di Tennis per Junior",
      description:
        "Ex giocatori ATP e allenatori certificati ITF Level 2 che revisionano personalmente ogni video inviato da giocatori junior e agonisti.",
    },
    ru: {
      title: "Познакомьтесь с Тренерами по Теннису для Юниоров",
      description:
        "Бывшие игроки ATP и сертифицированные тренеры ITF Level 2, которые лично разбирают каждое видео от юниоров и соревнующихся игроков.",
    },
  },
  contact: {
    pl: {
      title: "Kontakt",
      description:
        "Pytania o plany coachingowe, ceny lub sposób działania analizy wideo dla juniorów i zawodników? Skontaktuj się z Tactical Tennis Lab.",
    },
    es: {
      title: "Contacto",
      description:
        "¿Preguntas sobre planes de coaching, precios o cómo funciona el análisis de vídeo para jugadores junior y competitivos? Ponte en contacto con Tactical Tennis Lab.",
    },
    it: {
      title: "Contatti",
      description:
        "Domande sui piani di coaching, sui prezzi o su come funziona l'analisi video per giocatori junior e agonisti? Contatta Tactical Tennis Lab.",
    },
    ru: {
      title: "Контакты",
      description:
        "Вопросы о планах коучинга, ценах или о том, как работает видеоанализ для юниоров и соревнующихся игроков? Свяжитесь с Tactical Tennis Lab.",
    },
  },
  about: {
    pl: {
      title: "O Nas",
      description:
        "Dlaczego stworzyliśmy niezależną usługę analizy wideo i taktycznej dla juniorów i zawodników — drugą ekspercką opinię obok trenera na korcie, dla indywidualnych zawodników, nie klubów.",
    },
    es: {
      title: "Sobre Nosotros",
      description:
        "Por qué creamos un servicio independiente de análisis de vídeo y táctico para jugadores junior y competitivos — una segunda opinión experta junto a tu entrenador en pista, para jugadores individuales, no clubes.",
    },
    it: {
      title: "Chi Siamo",
      description:
        "Perché abbiamo creato un servizio indipendente di analisi video e tattica per giocatori junior e agonisti — un secondo parere esperto accanto al tuo allenatore in campo, per giocatori individuali, non club.",
    },
    ru: {
      title: "О Нас",
      description:
        "Почему мы создали независимый сервис видео- и тактического анализа для юниоров и соревнующихся игроков — второе экспертное мнение в дополнение к тренеру на корте, для отдельных игроков, а не клубов.",
    },
  },
  faq: {
    pl: {
      title: "Najczęściej Zadawane Pytania",
      description:
        "Częste pytania rodziców i zawodników o analizę wideo, ceny, zwroty, konta niepełnoletnich i to, jak działa coaching w Tactical Tennis Lab.",
    },
    es: {
      title: "Preguntas Frecuentes",
      description:
        "Preguntas habituales de padres y jugadores sobre el análisis de vídeo, precios, reembolsos, cuentas de menores y cómo funciona el coaching en Tactical Tennis Lab.",
    },
    it: {
      title: "Domande Frequenti",
      description:
        "Domande comuni di genitori e giocatori sull'analisi video, i prezzi, i rimborsi, gli account dei minori e come funziona il coaching su Tactical Tennis Lab.",
    },
    ru: {
      title: "Часто Задаваемые Вопросы",
      description:
        "Частые вопросы родителей и игроков о видеоанализе, ценах, возвратах, аккаунтах несовершеннолетних и о том, как работает коучинг в Tactical Tennis Lab.",
    },
  },
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
      title: "Tactical Tennis Lab — Analiza Wideo i Meczowa dla Akademii i Klubów Tenisowych",
      description:
        "Profesjonalna analiza wideo i meczowa wspierająca akademie tenisowe, kluby i ich trenerów. Taktyczna i techniczna informacja zwrotna od byłych zawodników ATP i trenerów ITF Level 2 — zawodnicy rozwijają się szybciej, a trenerzy mają więcej czasu na korcie.",
    },
    es: {
      title: "Tactical Tennis Lab — Análisis de Vídeo y de Partidos para Academias y Clubes de Tenis",
      description:
        "Análisis profesional de vídeo y de partidos que apoya a academias de tenis, clubes y sus entrenadores. Feedback táctico y técnico de exjugadores del ATP y entrenadores ITF Level 2, para que los jugadores mejoren más rápido y los entrenadores dediquen más tiempo a la pista.",
    },
    it: {
      title: "Tactical Tennis Lab — Analisi Video e di Partita per Accademie e Club di Tennis",
      description:
        "Analisi professionale di video e partite a supporto di accademie di tennis, club e dei loro allenatori. Feedback tattico e tecnico da ex giocatori ATP e allenatori ITF Level 2, così i giocatori migliorano più in fretta e gli allenatori dedicano più tempo al campo.",
    },
    ru: {
      title: "Tactical Tennis Lab — Видео- и матч-анализ для теннисных академий и клубов",
      description:
        "Профессиональный видео- и матч-анализ в поддержку теннисных академий, клубов и их тренеров. Тактическая и техническая обратная связь от бывших игроков ATP и тренеров уровня ITF Level 2 — игроки прогрессируют быстрее, а тренеры больше времени проводят на корте.",
    },
  },
};
