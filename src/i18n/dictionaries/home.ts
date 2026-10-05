import type { AppLocale } from "@/i18n/locales";

export interface HomeDict {
  badges: [string, string, string, string];
  hero: {
    titlePre: string;
    titleHighlight: string;
    titleSuffix: string;
    subtitle: string;
    ctaSendVideo: string;
    ctaViewPlans: string;
  };
  offersPreview: {
    cta: string;
  };
  whoThisFor: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  audiences: {
    title: string;
    hook: string;
    detail: string;
    cta: string;
  }[];
  howItWorks: {
    title: string;
    subtitle: string;
  };
  steps: {
    title: string;
    detail: string;
  }[];
  testimonials: {
    eyebrow: string;
    title: string;
    emptyText: string;
    emptyCta: string;
    filledPrefix: string;
    filledCta: string;
  };
  journey: {
    eyebrow: string;
    title: string;
    steps: {
      title: string;
      detail: string;
      cta: string;
    }[];
  };
  coachesRoom: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewProfile: string;
  };
  productScroll: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
  };
}

const en: HomeDict = {
  badges: ["Former ATP Players", "ATP Certified Coaches", "ITF Level 2 Coaches", "Worldwide Coaching"],
  hero: {
    titlePre: "Train like it's ",
    titleHighlight: "match point",
    titleSuffix: "every session.",
    subtitle:
      "Real coaches review your game on video and tell you exactly what to work on next — built for ambitious amateurs and competitive players, from your first tournament to your next ranking point.",
    ctaSendVideo: "Send your video",
    ctaViewPlans: "View coaching plans",
  },
  offersPreview: {
    cta: "See full details & get started",
  },
  whoThisFor: {
    eyebrow: "Who this is for",
    title: "Built for how you actually play",
    subtitle:
      "Independent video and match analysis for ambitious amateurs and competitive juniors — not a generic plan for everyone. Pick the lane that matches where you're at.",
  },
  audiences: [
    {
      title: "Ambitious amateur",
      hook: "One flaw is quietly costing you matches.",
      detail:
        "Send one video. We'll find the technical issue holding your game back and show you exactly how to fix it.",
      cta: "Start with Stroke Fix",
    },
    {
      title: "Competitive junior & parent",
      hook: "A second, objective pair of eyes on their game.",
      detail:
        "Their on-court coach does the work that matters most, day to day. We add the frame-by-frame video review most coaches don't have hours in the week for.",
      cta: "See development plans",
    },
    {
      title: "Advanced & tournament player",
      hook: "Win the point before you're on court.",
      detail:
        "Scout your next opponent, break down match patterns, and sharpen the tactical decisions that separate close matches.",
      cta: "See Match IQ",
    },
  ],
  howItWorks: {
    title: "How it works",
    subtitle: "Three steps from raw footage to a plan you can put on court.",
  },
  steps: [
    {
      title: "Send your video",
      detail: "Upload a practice or match clip, plus what you want feedback on.",
    },
    {
      title: "Professional analysis",
      detail: "Former ATP players and ITF-level coaches review it frame by frame.",
    },
    {
      title: "Receive your plan",
      detail: "Personalized drills, corrections, and tactical advice you can act on.",
    },
  ],
  testimonials: {
    eyebrow: "What players are saying",
    title: "Real feedback, from real customers",
    emptyText: "No reviews yet — be the first to tell other players what working with your coach has been like.",
    emptyCta: "Leave a review",
    filledPrefix: "Worked with a coach?",
    filledCta: "Leave your own review",
  },
  journey: {
    eyebrow: "Your path with us",
    title: "From first video to your next win",
    steps: [
      {
        title: "See how it works",
        detail: "Send a video, get a frame-by-frame breakdown, receive your plan.",
        cta: "How it works",
      },
      {
        title: "Meet the coaches",
        detail: "Former ATP players and ITF Level 2 certified coaches review every submission.",
        cta: "Meet the coaches",
      },
      {
        title: "Choose your plan",
        detail: "One-time analysis from $49, or the full PRO Tour coaching experience.",
        cta: "See pricing",
      },
      {
        title: "Read our story",
        detail: "Why we built a coaching platform that doesn't stop when the session ends.",
        cta: "Our story",
      },
    ],
  },
  coachesRoom: {
    eyebrow: "Real coaches, not an algorithm",
    title: "The room behind your training plan",
    subtitle:
      "Every submission is reviewed by former ATP players and ITF Level 2 certified coaches — frame-by-frame technical and tactical breakdowns, then a plan built around what you actually need to fix.",
    viewProfile: "View full profile",
  },
  productScroll: {
    eyebrow: "See it in action",
    titleLine1: "Your plan, built by real coaches,",
    titleLine2: "not generated by AI.",
  },
};

const pl: HomeDict = {
  badges: ["Byli zawodnicy ATP", "Trenerzy certyfikowani ATP", "Trenerzy ITF Level 2", "Trenerzy na całym świecie"],
  hero: {
    titlePre: "Trenuj tak, jakby to był ",
    titleHighlight: "piłka meczowa",
    titleSuffix: "na każdej sesji.",
    subtitle:
      "Prawdziwi trenerzy analizują Twoją grę na wideo i mówią dokładnie, nad czym pracować dalej — dla ambitnych amatorów i zawodników, od pierwszego turnieju po kolejny punkt rankingowy.",
    ctaSendVideo: "Wyślij swoje wideo",
    ctaViewPlans: "Zobacz plany treningowe",
  },
  offersPreview: {
    cta: "Zobacz pełne szczegóły i zacznij",
  },
  whoThisFor: {
    eyebrow: "Dla kogo to jest",
    title: "Stworzone pod to, jak naprawdę grasz",
    subtitle:
      "Niezależna analiza wideo i meczowa dla ambitnych amatorów i zawodników juniorskich — nie ogólny plan dla wszystkich. Wybierz ścieżkę dopasowaną do Twojego poziomu.",
  },
  audiences: [
    {
      title: "Ambitny amator",
      hook: "Jeden błąd po cichu kosztuje Cię mecze.",
      detail:
        "Wyślij jedno wideo. Znajdziemy techniczny problem, który hamuje Twoją grę, i pokażemy dokładnie, jak go naprawić.",
      cta: "Zacznij od Stroke Fix",
    },
    {
      title: "Zawodnik juniorski i rodzic",
      hook: "Drugie, obiektywne spojrzenie na jego grę.",
      detail:
        "Trener na korcie robi to, co najważniejsze, na co dzień. My dodajemy analizę wideo klatka po klatce, na którą większość trenerów nie ma czasu w tygodniu.",
      cta: "Zobacz plany rozwoju",
    },
    {
      title: "Zaawansowany zawodnik turniejowy",
      hook: "Wygraj punkt, zanim wejdziesz na kort.",
      detail:
        "Zwiadowaj kolejnego przeciwnika, rozłóż na czynniki pierwsze wzorce meczowe i wyostrz decyzje taktyczne, które decydują o wyrównanych meczach.",
      cta: "Zobacz Match IQ",
    },
  ],
  howItWorks: {
    title: "Jak to działa",
    subtitle: "Trzy kroki od surowego nagrania do planu, który wdrożysz na korcie.",
  },
  steps: [
    {
      title: "Wyślij swoje wideo",
      detail: "Prześlij nagranie z treningu lub meczu oraz informację, na czym Ci zależy.",
    },
    {
      title: "Profesjonalna analiza",
      detail: "Byli zawodnicy ATP i trenerzy poziomu ITF analizują je klatka po klatce.",
    },
    {
      title: "Otrzymaj swój plan",
      detail: "Spersonalizowane ćwiczenia, poprawki i wskazówki taktyczne, które możesz od razu wdrożyć.",
    },
  ],
  testimonials: {
    eyebrow: "Co mówią zawodnicy",
    title: "Prawdziwe opinie prawdziwych klientów",
    emptyText: "Brak opinii — bądź pierwszą osobą, która opowie innym, jak wygląda współpraca z Twoim trenerem.",
    emptyCta: "Zostaw opinię",
    filledPrefix: "Pracowałeś z trenerem?",
    filledCta: "Zostaw własną opinię",
  },
  journey: {
    eyebrow: "Twoja droga z nami",
    title: "Od pierwszego wideo do kolejnego zwycięstwa",
    steps: [
      {
        title: "Zobacz, jak to działa",
        detail: "Wyślij wideo, otrzymaj analizę klatka po klatce i swój plan.",
        cta: "Jak to działa",
      },
      {
        title: "Poznaj trenerów",
        detail: "Byli zawodnicy ATP i certyfikowani trenerzy ITF Level 2 analizują każde zgłoszenie.",
        cta: "Poznaj trenerów",
      },
      {
        title: "Wybierz swój plan",
        detail: "Jednorazowa analiza już od 49 USD lub pełne doświadczenie PRO Tour.",
        cta: "Zobacz cennik",
      },
      {
        title: "Przeczytaj naszą historię",
        detail: "Dlaczego stworzyliśmy platformę coachingową, która nie kończy się wraz z sesją.",
        cta: "Nasza historia",
      },
    ],
  },
  coachesRoom: {
    eyebrow: "Prawdziwi trenerzy, nie algorytm",
    title: "Zespół, który stoi za Twoim planem treningowym",
    subtitle:
      "Każde zgłoszenie jest analizowane przez byłych zawodników ATP i certyfikowanych trenerów ITF Level 2 — techniczna i taktyczna analiza klatka po klatce, a następnie plan dopasowany do tego, co naprawdę wymaga poprawy.",
    viewProfile: "Zobacz pełny profil",
  },
  productScroll: {
    eyebrow: "Zobacz to w akcji",
    titleLine1: "Twój plan, stworzony przez prawdziwych trenerów,",
    titleLine2: "a nie wygenerowany przez AI.",
  },
};

const es: HomeDict = {
  badges: ["Exjugadores del ATP", "Entrenadores certificados por la ATP", "Entrenadores ITF Level 2", "Entrenamiento en todo el mundo"],
  hero: {
    titlePre: "Entrena como si fuera ",
    titleHighlight: "punto de partido",
    titleSuffix: "en cada sesión.",
    subtitle:
      "Entrenadores reales revisan tu juego en vídeo y te dicen exactamente en qué trabajar a continuación — pensado para amateurs ambiciosos y jugadores competitivos, desde tu primer torneo hasta tu próximo punto de ranking.",
    ctaSendVideo: "Envía tu vídeo",
    ctaViewPlans: "Ver planes de entrenamiento",
  },
  offersPreview: {
    cta: "Ver todos los detalles y empezar",
  },
  whoThisFor: {
    eyebrow: "Para quién es esto",
    title: "Pensado para cómo juegas de verdad",
    subtitle:
      "Análisis independiente de vídeo y de partido para amateurs ambiciosos y juniors competitivos — no un plan genérico para todos. Elige el camino que se ajuste a tu nivel.",
  },
  audiences: [
    {
      title: "Amateur ambicioso",
      hook: "Un solo fallo te está costando partidos en silencio.",
      detail:
        "Envía un vídeo. Encontraremos el problema técnico que frena tu juego y te mostraremos exactamente cómo solucionarlo.",
      cta: "Empieza con Stroke Fix",
    },
    {
      title: "Junior competitivo y padre/madre",
      hook: "Una segunda mirada objetiva sobre su juego.",
      detail:
        "Su entrenador en pista hace el trabajo más importante, día a día. Nosotros añadimos el análisis de vídeo fotograma a fotograma para el que la mayoría de entrenadores no tiene horas en la semana.",
      cta: "Ver planes de desarrollo",
    },
    {
      title: "Jugador avanzado de torneos",
      hook: "Gana el punto antes de pisar la pista.",
      detail:
        "Estudia a tu próximo rival, analiza patrones de partido y afina las decisiones tácticas que deciden los partidos ajustados.",
      cta: "Ver Match IQ",
    },
  ],
  howItWorks: {
    title: "Cómo funciona",
    subtitle: "Tres pasos, del vídeo en bruto a un plan que puedes aplicar en pista.",
  },
  steps: [
    {
      title: "Envía tu vídeo",
      detail: "Sube un clip de entrenamiento o partido, junto con lo que quieres que se revise.",
    },
    {
      title: "Análisis profesional",
      detail: "Exjugadores del ATP y entrenadores de nivel ITF lo revisan fotograma a fotograma.",
    },
    {
      title: "Recibe tu plan",
      detail: "Ejercicios personalizados, correcciones y consejos tácticos que puedes aplicar ya.",
    },
  ],
  testimonials: {
    eyebrow: "Lo que dicen los jugadores",
    title: "Opiniones reales de clientes reales",
    emptyText: "Aún no hay opiniones — sé el primero en contar a otros jugadores cómo ha sido trabajar con tu entrenador.",
    emptyCta: "Deja una opinión",
    filledPrefix: "¿Trabajaste con un entrenador?",
    filledCta: "Deja tu propia opinión",
  },
  journey: {
    eyebrow: "Tu camino con nosotros",
    title: "Del primer vídeo a tu próxima victoria",
    steps: [
      {
        title: "Mira cómo funciona",
        detail: "Envía un vídeo, recibe un análisis fotograma a fotograma y tu plan.",
        cta: "Cómo funciona",
      },
      {
        title: "Conoce a los entrenadores",
        detail: "Exjugadores del ATP y entrenadores certificados ITF Level 2 revisan cada envío.",
        cta: "Conocer entrenadores",
      },
      {
        title: "Elige tu plan",
        detail: "Análisis puntual desde $49, o la experiencia completa de coaching PRO Tour.",
        cta: "Ver precios",
      },
      {
        title: "Lee nuestra historia",
        detail: "Por qué creamos una plataforma de coaching que no termina cuando acaba la sesión.",
        cta: "Nuestra historia",
      },
    ],
  },
  coachesRoom: {
    eyebrow: "Entrenadores reales, no un algoritmo",
    title: "El equipo detrás de tu plan de entrenamiento",
    subtitle:
      "Cada envío es revisado por exjugadores del ATP y entrenadores certificados ITF Level 2 — análisis técnico y táctico fotograma a fotograma, y después un plan construido alrededor de lo que realmente necesitas corregir.",
    viewProfile: "Ver perfil completo",
  },
  productScroll: {
    eyebrow: "Míralo en acción",
    titleLine1: "Tu plan, creado por entrenadores reales,",
    titleLine2: "no generado por IA.",
  },
};

const it: HomeDict = {
  badges: ["Ex giocatori ATP", "Allenatori certificati ATP", "Allenatori ITF Level 2", "Coaching in tutto il mondo"],
  hero: {
    titlePre: "Allenati come se fosse ",
    titleHighlight: "match point",
    titleSuffix: "ad ogni sessione.",
    subtitle:
      "Allenatori veri analizzano il tuo gioco su video e ti dicono esattamente su cosa lavorare — pensato per amatori ambiziosi e giocatori competitivi, dal tuo primo torneo al tuo prossimo punto in classifica.",
    ctaSendVideo: "Invia il tuo video",
    ctaViewPlans: "Vedi i piani di coaching",
  },
  offersPreview: {
    cta: "Vedi tutti i dettagli e inizia",
  },
  whoThisFor: {
    eyebrow: "Per chi è pensato",
    title: "Pensato per come giochi davvero",
    subtitle:
      "Analisi video e di partita indipendente per amatori ambiziosi e junior competitivi — non un piano generico per tutti. Scegli il percorso adatto al tuo livello.",
  },
  audiences: [
    {
      title: "Amatore ambizioso",
      hook: "Un solo difetto ti sta silenziosamente costando partite.",
      detail:
        "Invia un video. Troveremo il problema tecnico che frena il tuo gioco e ti mostreremo esattamente come risolverlo.",
      cta: "Inizia con Stroke Fix",
    },
    {
      title: "Junior competitivo e genitore",
      hook: "Un secondo sguardo obiettivo sul suo gioco.",
      detail:
        "Il suo allenatore in campo fa il lavoro più importante, giorno per giorno. Noi aggiungiamo l'analisi video fotogramma per fotogramma per cui la maggior parte degli allenatori non ha ore in settimana.",
      cta: "Vedi i piani di sviluppo",
    },
    {
      title: "Giocatore avanzato da torneo",
      hook: "Vinci il punto prima ancora di scendere in campo.",
      detail:
        "Studia il tuo prossimo avversario, scomponi gli schemi di gioco e affina le decisioni tattiche che decidono le partite equilibrate.",
      cta: "Vedi Match IQ",
    },
  ],
  howItWorks: {
    title: "Come funziona",
    subtitle: "Tre passaggi dal video grezzo a un piano da portare in campo.",
  },
  steps: [
    {
      title: "Invia il tuo video",
      detail: "Carica un video di allenamento o partita, con quello su cui vuoi un feedback.",
    },
    {
      title: "Analisi professionale",
      detail: "Ex giocatori ATP e allenatori di livello ITF lo rivedono fotogramma per fotogramma.",
    },
    {
      title: "Ricevi il tuo piano",
      detail: "Esercizi personalizzati, correzioni e consigli tattici che puoi mettere in pratica subito.",
    },
  ],
  testimonials: {
    eyebrow: "Cosa dicono i giocatori",
    title: "Recensioni vere da clienti veri",
    emptyText: "Ancora nessuna recensione — sii il primo a raccontare agli altri giocatori com'è lavorare con il tuo allenatore.",
    emptyCta: "Lascia una recensione",
    filledPrefix: "Hai lavorato con un allenatore?",
    filledCta: "Lascia la tua recensione",
  },
  journey: {
    eyebrow: "Il tuo percorso con noi",
    title: "Dal primo video alla tua prossima vittoria",
    steps: [
      {
        title: "Scopri come funziona",
        detail: "Invia un video, ricevi un'analisi fotogramma per fotogramma e il tuo piano.",
        cta: "Come funziona",
      },
      {
        title: "Conosci gli allenatori",
        detail: "Ex giocatori ATP e allenatori certificati ITF Level 2 rivedono ogni invio.",
        cta: "Conosci gli allenatori",
      },
      {
        title: "Scegli il tuo piano",
        detail: "Analisi singola da $49, oppure l'esperienza completa di coaching PRO Tour.",
        cta: "Vedi i prezzi",
      },
      {
        title: "Leggi la nostra storia",
        detail: "Perché abbiamo creato una piattaforma di coaching che non si ferma quando finisce la sessione.",
        cta: "La nostra storia",
      },
    ],
  },
  coachesRoom: {
    eyebrow: "Allenatori veri, non un algoritmo",
    title: "Il team dietro il tuo piano di allenamento",
    subtitle:
      "Ogni invio viene rivisto da ex giocatori ATP e allenatori certificati ITF Level 2 — analisi tecnica e tattica fotogramma per fotogramma, poi un piano costruito su ciò che devi davvero correggere.",
    viewProfile: "Vedi il profilo completo",
  },
  productScroll: {
    eyebrow: "Guardalo in azione",
    titleLine1: "Il tuo piano, creato da allenatori reali,",
    titleLine2: "non generato dall'IA.",
  },
};

const ru: HomeDict = {
  badges: ["Бывшие игроки ATP", "Тренеры с сертификатом ATP", "Тренеры уровня ITF Level 2", "Тренировки по всему миру"],
  hero: {
    titlePre: "Тренируйся так, будто это ",
    titleHighlight: "матчбол",
    titleSuffix: "на каждой сессии.",
    subtitle:
      "Настоящие тренеры разбирают вашу игру по видео и говорят точно, над чем работать дальше — для амбициозных любителей и соревнующихся игроков, от первого турнира до следующего рейтингового очка.",
    ctaSendVideo: "Отправить видео",
    ctaViewPlans: "Смотреть планы тренировок",
  },
  offersPreview: {
    cta: "Смотреть все детали и начать",
  },
  whoThisFor: {
    eyebrow: "Кому это подходит",
    title: "Создано под то, как вы играете на самом деле",
    subtitle:
      "Независимый видео- и матч-анализ для амбициозных любителей и юниоров — не общий план для всех. Выберите направление, которое соответствует вашему уровню.",
  },
  audiences: [
    {
      title: "Амбициозный любитель",
      hook: "Одна ошибка незаметно стоит вам матчей.",
      detail:
        "Отправьте одно видео. Мы найдём техническую проблему, которая тормозит вашу игру, и покажем точно, как её исправить.",
      cta: "Начать со Stroke Fix",
    },
    {
      title: "Юниор-соревнователь и родитель",
      hook: "Второй, объективный взгляд на его игру.",
      detail:
        "Тренер на корте делает самую важную работу день за днём. Мы добавляем покадровый видеоразбор, на который у большинства тренеров просто не хватает часов в неделю.",
      cta: "Смотреть планы развития",
    },
    {
      title: "Продвинутый турнирный игрок",
      hook: "Выиграй розыгрыш ещё до выхода на корт.",
      detail:
        "Изучите следующего соперника, разберите паттерны матча и отточите тактические решения, которые решают исход равных матчей.",
      cta: "Смотреть Match IQ",
    },
  ],
  howItWorks: {
    title: "Как это работает",
    subtitle: "Три шага от сырого видео до плана, который можно применить на корте.",
  },
  steps: [
    {
      title: "Отправьте видео",
      detail: "Загрузите ролик с тренировки или матча и укажите, что именно хотите разобрать.",
    },
    {
      title: "Профессиональный анализ",
      detail: "Бывшие игроки ATP и тренеры уровня ITF разбирают его покадрово.",
    },
    {
      title: "Получите свой план",
      detail: "Персональные упражнения, исправления и тактические советы, которые можно применить сразу.",
    },
  ],
  testimonials: {
    eyebrow: "Что говорят игроки",
    title: "Настоящие отзывы настоящих клиентов",
    emptyText: "Отзывов пока нет — станьте первым, кто расскажет другим игрокам, каково работать с вашим тренером.",
    emptyCta: "Оставить отзыв",
    filledPrefix: "Работали с тренером?",
    filledCta: "Оставить свой отзыв",
  },
  journey: {
    eyebrow: "Ваш путь с нами",
    title: "От первого видео до следующей победы",
    steps: [
      {
        title: "Посмотрите, как это работает",
        detail: "Отправьте видео, получите покадровый разбор и свой план.",
        cta: "Как это работает",
      },
      {
        title: "Познакомьтесь с тренерами",
        detail: "Бывшие игроки ATP и сертифицированные тренеры ITF Level 2 разбирают каждую заявку.",
        cta: "Познакомиться с тренерами",
      },
      {
        title: "Выберите свой план",
        detail: "Разовый анализ от $49 или полный опыт коучинга PRO Tour.",
        cta: "Смотреть цены",
      },
      {
        title: "Прочитайте нашу историю",
        detail: "Почему мы создали платформу коучинга, которая не заканчивается вместе с сессией.",
        cta: "Наша история",
      },
    ],
  },
  coachesRoom: {
    eyebrow: "Настоящие тренеры, а не алгоритм",
    title: "Команда, которая стоит за вашим планом тренировок",
    subtitle:
      "Каждую заявку рассматривают бывшие игроки ATP и сертифицированные тренеры ITF Level 2 — технический и тактический покадровый разбор, а затем план, построенный вокруг того, что действительно нужно исправить.",
    viewProfile: "Смотреть полный профиль",
  },
  productScroll: {
    eyebrow: "Посмотрите это в деле",
    titleLine1: "Ваш план, составленный настоящими тренерами,",
    titleLine2: "а не сгенерированный ИИ.",
  },
};

export const homeDictionaries: Record<AppLocale, HomeDict> = { en, pl, es, it, ru };
