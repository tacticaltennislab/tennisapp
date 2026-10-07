import type { AppLocale } from "@/i18n/locales";

export interface CoachesDict {
  list: {
    pageHeader: { eyebrow: string; title: string; subtitle: string };
    noCoaches: string;
    checkBackSoon: string;
    viewProfile: string;
  };
  detail: {
    eyebrow: string;
    fallbackSubtitle: string;
    background: string;
    credentials: string;
    gptcaTitle: string;
    gptcaSubtitle: string;
    readyPrefix: string; // "Ready to work with " -- name is appended, then "?" via readySuffix
    readySuffix: string;
    sendVideo: string;
  };
}

const en: CoachesDict = {
  list: {
    pageHeader: {
      eyebrow: "Our staff",
      title: "Coaches",
      subtitle: "Meet the coaches behind every analysis your academy receives.",
    },
    noCoaches: "No coaches added yet",
    checkBackSoon: "Check back soon.",
    viewProfile: "View full profile",
  },
  detail: {
    eyebrow: "Coach profile",
    fallbackSubtitle: "Tactical Tennis Lab coach",
    background: "Background",
    credentials: "Credentials",
    gptcaTitle: "GPTCA Certified Coach",
    gptcaSubtitle: "View verified profile on the Global Professional Tennis Coaches Association",
    readyPrefix: "Ready to work with",
    readySuffix: "?",
    sendVideo: "Send your video",
  },
};

const pl: CoachesDict = {
  list: {
    pageHeader: {
      eyebrow: "Nasz zespół",
      title: "Trenerzy",
      subtitle: "Poznaj trenerów stojących za każdą analizą, którą otrzymuje Twoja akademia.",
    },
    noCoaches: "Nie dodano jeszcze żadnych trenerów",
    checkBackSoon: "Zajrzyj tu wkrótce.",
    viewProfile: "Zobacz pełny profil",
  },
  detail: {
    eyebrow: "Profil trenera",
    fallbackSubtitle: "Trener Tactical Tennis Lab",
    background: "Doświadczenie",
    credentials: "Kwalifikacje",
    gptcaTitle: "Trener certyfikowany przez GPTCA",
    gptcaSubtitle: "Zobacz zweryfikowany profil w Global Professional Tennis Coaches Association",
    readyPrefix: "Gotowy na współpracę z",
    readySuffix: "?",
    sendVideo: "Wyślij swoje wideo",
  },
};

const es: CoachesDict = {
  list: {
    pageHeader: {
      eyebrow: "Nuestro equipo",
      title: "Entrenadores",
      subtitle: "Conoce a los entrenadores detrás de cada análisis que recibe tu academia.",
    },
    noCoaches: "Todavía no se han añadido entrenadores",
    checkBackSoon: "Vuelve pronto.",
    viewProfile: "Ver perfil completo",
  },
  detail: {
    eyebrow: "Perfil del entrenador",
    fallbackSubtitle: "Entrenador de Tactical Tennis Lab",
    background: "Trayectoria",
    credentials: "Credenciales",
    gptcaTitle: "Entrenador certificado por GPTCA",
    gptcaSubtitle: "Ver perfil verificado en la Global Professional Tennis Coaches Association",
    readyPrefix: "¿Listo para trabajar con",
    readySuffix: "?",
    sendVideo: "Envía tu vídeo",
  },
};

const it: CoachesDict = {
  list: {
    pageHeader: {
      eyebrow: "Il nostro staff",
      title: "Allenatori",
      subtitle: "Conosci gli allenatori dietro ogni analisi che riceve la tua accademia.",
    },
    noCoaches: "Nessun allenatore ancora aggiunto",
    checkBackSoon: "Torna a trovarci presto.",
    viewProfile: "Vedi il profilo completo",
  },
  detail: {
    eyebrow: "Profilo allenatore",
    fallbackSubtitle: "Allenatore di Tactical Tennis Lab",
    background: "Esperienza",
    credentials: "Credenziali",
    gptcaTitle: "Allenatore certificato GPTCA",
    gptcaSubtitle: "Vedi il profilo verificato sulla Global Professional Tennis Coaches Association",
    readyPrefix: "Pronto a lavorare con",
    readySuffix: "?",
    sendVideo: "Invia il tuo video",
  },
};

const ru: CoachesDict = {
  list: {
    pageHeader: {
      eyebrow: "Наша команда",
      title: "Тренеры",
      subtitle: "Познакомьтесь с тренерами, которые стоят за каждым разбором, который получает ваша академия.",
    },
    noCoaches: "Тренеры пока не добавлены",
    checkBackSoon: "Загляните позже.",
    viewProfile: "Смотреть полный профиль",
  },
  detail: {
    eyebrow: "Профиль тренера",
    fallbackSubtitle: "Тренер Tactical Tennis Lab",
    background: "Опыт",
    credentials: "Квалификация",
    gptcaTitle: "Тренер, сертифицированный GPTCA",
    gptcaSubtitle: "Смотреть подтверждённый профиль в Global Professional Tennis Coaches Association",
    readyPrefix: "Готовы поработать с",
    readySuffix: "?",
    sendVideo: "Отправить видео",
  },
};

export const coachesDictionaries: Record<AppLocale, CoachesDict> = { en, pl, es, it, ru };
