import type { Locale } from "@/i18n/locales";

interface SeoText {
  title: string;
  description: string;
}

export const seoTranslations: Record<string, Record<Locale, SeoText>> = {
  coaches: {
    pl: {
      title: "Poznaj Trenerów Stojących za Analizą Twojej Akademii",
      description:
        "Zawodnicy ATP, certyfikowani trenerzy ATP i ITF, którzy osobiście analizują każde wideo i każdy mecz przesłany przez Twoją akademię.",
    },
    es: {
      title: "Conoce a los Entrenadores Detrás del Análisis de Tu Academia",
      description:
        "Jugadores del ATP, entrenadores certificados ATP e ITF que revisan personalmente cada vídeo y partido enviado a través de tu academia.",
    },
    it: {
      title: "Conosci gli Allenatori Dietro l'Analisi della Tua Accademia",
      description:
        "Giocatori ATP, allenatori certificati ATP e ITF che esaminano personalmente ogni video e partita inviati tramite la tua accademia.",
    },
    ru: {
      title: "Познакомьтесь с Тренерами, Стоящими за Анализом Вашей Академии",
      description:
        "Игроки ATP, сертифицированные тренеры ATP и ITF, которые лично разбирают каждое видео и каждый матч, присланные через вашу академию.",
    },
  },
  contact: {
    pl: {
      title: "Kontakt",
      description:
        "Chcesz zostać naszym partnerem lub masz pytanie o pakiety dla akademii, ceny albo działanie analizy wideo? Skontaktuj się z Tactical Tennis Lab.",
    },
    es: {
      title: "Contacto",
      description:
        "¿Quieres colaborar con nosotros o tienes preguntas sobre paquetes para academias, precios o cómo funciona el análisis de vídeo? Ponte en contacto con Tactical Tennis Lab.",
    },
    it: {
      title: "Contatti",
      description:
        "Vuoi collaborare con noi o hai domande sui pacchetti per accademie, sui prezzi o su come funziona l'analisi video? Contatta Tactical Tennis Lab.",
    },
    ru: {
      title: "Контакты",
      description:
        "Хотите стать партнёром или есть вопросы о пакетах для академий, ценах или о том, как работает видеоанализ? Свяжитесь с Tactical Tennis Lab.",
    },
  },
  about: {
    pl: {
      title: "O Nas",
      description:
        "Dlaczego stworzyliśmy usługę analizy wideo i taktycznej, która wspiera akademie tenisowe, kluby i ich trenerów, więcej czasu na korcie dla trenerów, jaśniejsza informacja zwrotna dla zawodników.",
    },
    es: {
      title: "Sobre Nosotros",
      description:
        "Por qué creamos un servicio de análisis de vídeo y táctico que apoya a academias de tenis, clubes y sus entrenadores: más tiempo en pista para los entrenadores y feedback más claro para los jugadores.",
    },
    it: {
      title: "Chi Siamo",
      description:
        "Perché abbiamo creato un servizio di analisi video e tattica che supporta accademie di tennis, club e i loro allenatori: più tempo in campo per gli allenatori e feedback più chiaro per i giocatori.",
    },
    ru: {
      title: "О Нас",
      description:
        "Почему мы создали сервис видеоанализа и тактического анализа в поддержку теннисных академий, клубов и их тренеров: больше времени на корте для тренеров и более ясная обратная связь для игроков.",
    },
  },
  faq: {
    pl: {
      title: "Najczęściej Zadawane Pytania",
      description:
        "Częste pytania akademii, rodziców i zawodników o konta akademii, pakiety, analizę wideo, ceny, zwroty i konta osób niepełnoletnich.",
    },
    es: {
      title: "Preguntas Frecuentes",
      description:
        "Preguntas habituales de academias, padres y jugadores sobre cuentas de academia, paquetes, análisis de vídeo, precios, reembolsos y cuentas de menores.",
    },
    it: {
      title: "Domande Frequenti",
      description:
        "Domande comuni di accademie, genitori e giocatori su account delle accademie, pacchetti, analisi video, prezzi, rimborsi e account dei minori.",
    },
    ru: {
      title: "Часто Задаваемые Вопросы",
      description:
        "Частые вопросы академий, родителей и игроков об аккаунтах академий, пакетах, видеоанализе, ценах, возвратах и аккаунтах несовершеннолетних.",
    },
  },
  pricing: {
    pl: {
      title: "Pakiety i Cennik dla Akademii i Klubów Tenisowych",
      description:
        "Pakiety analizy wideo i meczowej dla akademii i klubów tenisowych od 550 USD miesięcznie oraz plany indywidualne od 49 USD. Prawdziwi trenerzy, wspólna informacja zwrotna dla trenerów i zawodników.",
    },
    es: {
      title: "Paquetes y Precios para Academias y Clubes de Tenis",
      description:
        "Paquetes de análisis de vídeo y de partidos para academias y clubes de tenis desde 550 USD al mes, además de planes individuales desde 49 USD. Entrenadores reales y feedback compartido para entrenadores y jugadores.",
    },
    it: {
      title: "Pacchetti e Prezzi per Accademie e Club di Tennis",
      description:
        "Pacchetti di analisi video e di partita per accademie e club di tennis da 550 USD al mese, più piani individuali da 49 USD. Allenatori veri e feedback condiviso per allenatori e giocatori.",
    },
    ru: {
      title: "Пакеты и цены для теннисных академий и клубов",
      description:
        "Пакеты видеоанализа и анализа матчей для теннисных академий и клубов от 550 USD в месяц, а также индивидуальные планы от 49 USD. Настоящие тренеры и общая обратная связь для тренеров и игроков.",
    },
  },
  home: {
    pl: {
      title: "Tactical Tennis Lab: Analiza Wideo i Meczowa dla Akademii i Klubów Tenisowych",
      description:
        "Profesjonalna analiza wideo i meczowa wspierająca akademie tenisowe, kluby i ich trenerów. Taktyczna i techniczna informacja zwrotna od zawodników ATP, certyfikowanych trenerów ATP i ITF, zawodnicy rozwijają się szybciej, a trenerzy mają więcej czasu na korcie.",
    },
    es: {
      title: "Tactical Tennis Lab: Análisis de Vídeo y de Partidos para Academias y Clubes de Tenis",
      description:
        "Análisis profesional de vídeo y de partidos que apoya a academias de tenis, clubes y sus entrenadores. Feedback táctico y técnico de jugadores del ATP, entrenadores certificados ATP e ITF, para que los jugadores mejoren más rápido y los entrenadores dediquen más tiempo a la pista.",
    },
    it: {
      title: "Tactical Tennis Lab: Analisi Video e di Partita per Accademie e Club di Tennis",
      description:
        "Analisi professionale di video e partite a supporto di accademie di tennis, club e dei loro allenatori. Feedback tattico e tecnico da giocatori ATP, allenatori certificati ATP e ITF, così i giocatori migliorano più in fretta e gli allenatori dedicano più tempo al campo.",
    },
    ru: {
      title: "Tactical Tennis Lab: Видеоанализ и анализ матчей для теннисных академий и клубов",
      description:
        "Профессиональный видеоанализ и анализ матчей в поддержку теннисных академий, клубов и их тренеров. Тактическая и техническая обратная связь от игроков ATP, сертифицированных тренеров ATP и ITF, игроки прогрессируют быстрее, а тренеры больше времени проводят на корте.",
    },
  },
};
