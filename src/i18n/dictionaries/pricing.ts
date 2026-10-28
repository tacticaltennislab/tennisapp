import type { AppLocale } from "@/i18n/locales";

import type { CreditNoun } from "@/lib/creditFormat";

/** Wording only: prices and credit numbers come from src/lib/plans.ts. */
export interface ClubTier {
  name: string;
  description: string;
  features: string[];
}

export interface ClubBenefits {
  businessTitle: string;
  businessItems: string[];
  marketingTitle: string;
  marketingItems: string[];
}

export interface PricingDict {
  pageHeader: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  noVatNote: string;
  audience: {
    players: string;
    clubs: string;
  };
  clubs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    benefits: ClubBenefits;
    tiers: ClubTier[];
    pilot: ClubTier;
    pilotPeriod: string;
    creditsPerMonth: string;
    perMonth: string;
    billing: {
      title: string;
      monthly: string;
      quarterly: string;
      semiannual: string;
      save: string;
      billed: string;
    };
    cta: string;
    popularLabel: string;
    note: string;
  };
  credits: {
    noun: CreditNoun;
    /** Placeholders: {oneCredit}, {minutes}, {maxHours}, {fullCredits}. */
    rule: string;
    /** Placeholder: {credits}. */
    included: string;
    addOnNote: string;
  };
  carousel: {
    prevAria: string;
    nextAria: string;
    freeLabel: string;
    referralDiscount: string; // "% referral discount" suffix after the number
    withdrawalPayment: string;
    withdrawalSubscription: string;
    getStarted: string;
    redirecting: string;
    agreePrefix: string;
    termsLabel: string;
    andLabel: string;
    privacyLabel: string;
    whatYouGetEyebrow: string;
    whatYouGetTitle: string; // "What {plan} actually gives you" -- {plan} placeholder
    coachNote: string;
    addOnLabel: string; // "Add {name} for {price}" -- {name} and {price} placeholders
    addOnTotal: string; // "Total {price}" -- {price} placeholder
  };
}

const en: PricingDict = {
  pageHeader: {
    eyebrow: "Pricing",
    title: "Packages for academies and players",
    subtitle:
      "Choose an academy or club package that supports your coaches, or send a single video as an individual player. Feedback from real coaches, not an algorithm.",
  },
  noVatNote: "Prices in USD. Taxes may apply depending on your location.",
  audience: {
    players: "For players",
    clubs: "For academies & clubs",
  },
  clubs: {
    eyebrow: "For academies & clubs",
    title: "Grow your academy with stronger players",
    subtitle:
      "We support your coaches with video and match analysis, so players improve faster, win more at tournaments, and your academy becomes the place families want to join.",
    benefits: {
      businessTitle: "Business benefits for your club",
      businessItems: [
        "Higher training quality: technology becomes an extra way for your academy or club to stand out",
        "More appeal to new players: a modern approach to training is a real argument when choosing a club",
        "New services you can offer: individual reports, match analyses, or premium packages for players",
        "A real competitive edge: data driven analysis becomes part of what your club offers",
        "Better player acquisition and retention: the extra value you offer supports long term commitment to the club",
        "A modern club image: using sports technology reinforces a professional, forward looking organization",
      ],
      marketingTitle: "Marketing benefits",
      marketingItems: [
        "Ready made social content: share clips from analyses, stats, and player progress",
        "Joint marketing with us: case studies, events, webinars, or educational content",
        "More appeal to sponsors: a technology partnership signals professionalism",
        "Stronger academy branding: show that your players train with data and modern tools",
      ],
    },
    tiers: [
      { name: "Starter", description: "Regular video and match analysis for smaller clubs and academies, with shared feedback for coaches and players.", features: ["Shared feedback for coaches and players", "Best for smaller clubs and academies"] },
      { name: "Academy", description: "A steady volume of analyses plus a dedicated point of contact. Built for medium sized high performance academies.", features: ["Dedicated point of contact", "Built for high performance academies"] },
      { name: "High Performance", description: "The highest monthly volume, priority support, and shared training plans for the whole group. Full high performance support.", features: ["Priority support", "Shared training plans for the group"] },
    ],
    pilot: { name: "Pilot", description: "A one time first step for academies: try the service on your own players before you subscribe.", features: ["One time payment", "A first step before a subscription"] },
    pilotPeriod: "one time",
    creditsPerMonth: "{credits} per month",
    perMonth: "/month",
    billing: { title: "Billing", monthly: "Monthly", quarterly: "Quarterly", semiannual: "Semi annual", save: "save {pct}%", billed: "billed {total}" },
    cta: "Book a demo",
    popularLabel: "Most popular",
    note: "Every club package is set up personally by Piotr Kusiewicz and Mateusz Kułakowski, get in touch and we'll tailor it to your roster.",
  },
  credits: {
    noun: { one: "credit", other: "credits" },
    rule: "{oneCredit} covers one stroke analysis or up to {minutes} minutes of match footage. A full match (up to {maxHours} hours) uses {fullCredits}.",
    included: "Includes {credits}",
    addOnNote: "No credit. Unlocks your plan.",
  },
  carousel: {
    prevAria: "Previous plan",
    nextAria: "Next plan",
    freeLabel: "Free",
    referralDiscount: "% referral discount",
    withdrawalPayment:
      "I want my analysis to begin immediately, and I understand that once a coach starts working on my video, I lose my 14 day right of withdrawal for this purchase.",
    withdrawalSubscription:
      "I want my subscription to begin immediately, and I understand this means I lose part of my 14 day right of withdrawal for value already delivered.",
    getStarted: "Get started",
    redirecting: "Redirecting...",
    agreePrefix: "By continuing, you agree to our",
    termsLabel: "Terms",
    andLabel: "and",
    privacyLabel: "Privacy Policy",
    whatYouGetEyebrow: "What you get",
    whatYouGetTitle: "What {plan} actually gives you",
    coachNote:
      "Your on court coach does the work that matters most, daily reps, technique under real pressure, knowing your game. We're not here to replace that. This is the frame by frame video and tactical analysis most coaches simply don't have the hours for, a second pair of eyes that makes their coaching even sharper.",
    addOnLabel: "Add the {name} for {price}",
    addOnTotal: "Total {price}",
  },
};

const pl: PricingDict = {
  pageHeader: {
    eyebrow: "Cennik",
    title: "Pakiety dla akademii i zawodników",
    subtitle:
      "Wybierz pakiet dla akademii lub klubu, który wesprze Twoich trenerów, albo wyślij jedno wideo jako zawodnik indywidualny. Opinie prawdziwych trenerów, nie algorytmu.",
  },
  noVatNote: "Ceny w USD. W zależności od Twojej lokalizacji mogą obowiązywać podatki.",
  audience: {
    players: "Dla zawodników",
    clubs: "Dla akademii i klubów",
  },
  clubs: {
    eyebrow: "Dla akademii i klubów",
    title: "Rozwijaj akademię dzięki mocniejszym zawodnikom",
    subtitle:
      "Wspieramy Twoich trenerów analizą wideo i meczową, dzięki czemu zawodnicy szybciej się rozwijają, wygrywają więcej na turniejach, a Twoja akademia staje się miejscem, do którego chcą dołączać rodziny.",
    benefits: {
      businessTitle: "Korzyści biznesowe dla klubu",
      businessItems: [
        "Podniesienie jakości oferowanego szkolenia: technologia jako dodatkowy element wyróżniający akademię lub klub",
        "Większa atrakcyjność dla nowych zawodników: nowoczesne podejście do treningu jako argument przy wyborze klubu",
        "Możliwość stworzenia dodatkowych usług: np. indywidualne raporty, analizy meczowe czy pakiety premium dla zawodników",
        "Budowanie przewagi konkurencyjnej: analiza danych jako element oferty klubu",
        "Pozyskiwanie i utrzymanie zawodników: dodatkowa wartość wspierająca ich długoterminowe związanie z klubem",
        "Wizerunek nowoczesnego klubu: technologie sportowe wzmacniające profesjonalny charakter organizacji",
      ],
      marketingTitle: "Korzyści marketingowe",
      marketingItems: [
        "Materiały do social mediów: fragmenty analiz, statystyki i postępy zawodników",
        "Wspólne działania marketingowe z nami: case studies, wydarzenia, webinary czy materiały edukacyjne",
        "Większa atrakcyjność dla sponsorów: współpraca technologiczna jako element profesjonalizacji klubu",
        "Budowanie marki akademii: komunikacja, że zawodnicy szkolą się w oparciu o dane i nowoczesne narzędzia",
      ],
    },
    tiers: [
      { name: "Starter", description: "Regularna analiza wideo i meczów dla mniejszych klubów i akademii, ze wspólną informacją zwrotną dla trenerów i zawodników.", features: ["Wspólna informacja zwrotna dla trenerów i zawodników", "Najlepszy dla mniejszych klubów i akademii"] },
      { name: "Academy", description: "Stała liczba analiz oraz wyznaczona osoba kontaktowa. Stworzony dla średnich akademii wysokiej wydajności.", features: ["Wyznaczona osoba kontaktowa", "Stworzony dla akademii wysokiej wydajności"] },
      { name: "High Performance", description: "Największa miesięczna pula analiz, priorytetowe wsparcie i wspólne plany treningowe dla całej grupy. Pełne wsparcie na wysokim poziomie.", features: ["Priorytetowe wsparcie", "Wspólne plany treningowe dla grupy"] },
    ],
    pilot: { name: "Pilot", description: "Jednorazowy pierwszy krok dla akademii: sprawdź usługę na własnych zawodnikach, zanim zdecydujesz się na subskrypcję.", features: ["Jednorazowa płatność", "Pierwszy krok przed subskrypcją"] },
    pilotPeriod: "jednorazowo",
    creditsPerMonth: "{credits} miesięcznie",
    perMonth: "/mies.",
    billing: { title: "Rozliczenie", monthly: "Miesięcznie", quarterly: "Kwartalnie", semiannual: "Półrocznie", save: "oszczędzasz {pct}%", billed: "płatność {total}" },
    cta: "Umów demo",
    popularLabel: "Najpopularniejszy",
    note: "Każdym pakietem klubowym zajmują się osobiście Piotr Kusiewicz i Mateusz Kułakowski, napisz do nas, a dopasujemy go do Twojego zespołu.",
  },
  credits: {
    noun: { one: "kredyt", few: "kredyty", many: "kredytów", other: "kredytu" },
    rule: "{oneCredit} to jedna analiza uderzenia albo do {minutes} minut nagrania meczu. Pełny mecz (do {maxHours} godzin) to {fullCredits}.",
    included: "W cenie: {credits}",
    addOnNote: "Bez kredytu. Odblokowuje Twój plan.",
  },
  carousel: {
    prevAria: "Poprzedni plan",
    nextAria: "Następny plan",
    freeLabel: "Za darmo",
    referralDiscount: "% zniżki za polecenie",
    withdrawalPayment:
      "Chcę, aby moja analiza rozpoczęła się natychmiast i rozumiem, że gdy trener zacznie pracę nad moim wideo, tracę prawo do odstąpienia od umowy w ciągu 14 dni dla tego zakupu.",
    withdrawalSubscription:
      "Chcę, aby moja subskrypcja rozpoczęła się natychmiast i rozumiem, że oznacza to utratę części czternastodniowego prawa do odstąpienia za już dostarczoną wartość.",
    getStarted: "Zacznij teraz",
    redirecting: "Przekierowuję...",
    agreePrefix: "Kontynuując, akceptujesz nasz",
    termsLabel: "Regulamin",
    andLabel: "i",
    privacyLabel: "Politykę prywatności",
    whatYouGetEyebrow: "Co otrzymujesz",
    whatYouGetTitle: "Co naprawdę daje Ci {plan}",
    coachNote:
      "Twój trener na korcie robi to, co najważniejsze, codzienne powtórki, technikę pod prawdziwą presją, znajomość Twojej gry. Nie jesteśmy tu po to, by go zastąpić. To analiza wideo klatka po klatce i taktyczna, na którą większość trenerów po prostu nie ma czasu, drugie oko, które czyni ich coaching jeszcze ostrzejszym.",
    addOnLabel: "Dodaj: {name} za {price}",
    addOnTotal: "Razem {price}",
  },
};

const es: PricingDict = {
  pageHeader: {
    eyebrow: "Precios",
    title: "Paquetes para academias y jugadores",
    subtitle:
      "Elige un paquete para academias o clubes que apoye a tus entrenadores, o envía un solo vídeo como jugador individual. Comentarios de entrenadores reales, no de un algoritmo.",
  },
  noVatNote: "Precios en USD. Pueden aplicarse impuestos según tu ubicación.",
  audience: {
    players: "Para jugadores",
    clubs: "Para academias y clubes",
  },
  clubs: {
    eyebrow: "Para academias y clubes",
    title: "Haz crecer tu academia con mejores jugadores",
    subtitle:
      "Apoyamos a tus entrenadores con análisis de vídeo y de partido para que tus jugadores mejoren más rápido, ganen más en torneos y tu academia sea el lugar al que quieren unirse las familias.",
    benefits: {
      businessTitle: "Beneficios para tu club",
      businessItems: [
        "Mayor calidad de formación: la tecnología se convierte en un elemento diferenciador para tu academia o club",
        "Más atractivo para nuevos jugadores: un enfoque de entrenamiento moderno es un argumento real al elegir un club",
        "Nuevos servicios que puedes ofrecer: informes individuales, análisis de partidos o paquetes premium para jugadores",
        "Una ventaja competitiva real: el análisis basado en datos pasa a formar parte de lo que ofrece tu club",
        "Mejor captación y retención de jugadores, el valor adicional que ofreces refuerza su compromiso a largo plazo",
        "Una imagen de club moderno: el uso de tecnología deportiva refuerza el carácter profesional de la organización",
      ],
      marketingTitle: "Beneficios de marketing",
      marketingItems: [
        "Contenido listo para redes sociales: comparte fragmentos de análisis, estadísticas y progreso de los jugadores",
        "Acciones de marketing conjuntas con nosotros, casos de éxito, eventos, webinars o material educativo",
        "Más atractivo para patrocinadores: una colaboración tecnológica es señal de profesionalización",
        "Una marca de academia más fuerte, comunica que tus jugadores entrenan con datos y herramientas modernas",
      ],
    },
    tiers: [
      { name: "Starter", description: "Análisis regular de vídeo y partidos para clubes y academias más pequeños, con feedback compartido para entrenadores y jugadores.", features: ["Feedback compartido para entrenadores y jugadores", "Ideal para clubes y academias más pequeños"] },
      { name: "Academy", description: "Un volumen constante de análisis y una persona de contacto dedicada. Pensado para academias de alto rendimiento de tamaño medio.", features: ["Persona de contacto dedicada", "Pensado para academias de alto rendimiento"] },
      { name: "High Performance", description: "El mayor volumen mensual, soporte prioritario y planes de entrenamiento compartidos para todo el grupo. Apoyo completo de alto rendimiento.", features: ["Soporte prioritario", "Planes de entrenamiento compartidos para el grupo"] },
    ],
    pilot: { name: "Pilot", description: "Un primer paso único para academias: prueba el servicio con tus propios jugadores antes de suscribirte.", features: ["Pago único", "Un primer paso antes de suscribirte"] },
    pilotPeriod: "pago único",
    creditsPerMonth: "{credits} al mes",
    perMonth: "/mes",
    billing: { title: "Facturación", monthly: "Mensual", quarterly: "Trimestral", semiannual: "Semestral", save: "ahorra {pct}%", billed: "se cobra {total}" },
    cta: "Reserva una demo",
    popularLabel: "Más popular",
    note: "Cada paquete para clubes lo configuran personalmente Piotr Kusiewicz y Mateusz Kułakowski, contáctanos y lo adaptaremos a tu equipo.",
  },
  credits: {
    noun: { one: "crédito", other: "créditos" },
    rule: "{oneCredit} equivale a un análisis de golpe o a hasta {minutes} minutos de vídeo de partido. Un partido completo (hasta {maxHours} horas) usa {fullCredits}.",
    included: "Incluye {credits}",
    addOnNote: "Sin crédito. Desbloquea tu plan.",
  },
  carousel: {
    prevAria: "Plan anterior",
    nextAria: "Siguiente plan",
    freeLabel: "Gratis",
    referralDiscount: "% de descuento por referido",
    withdrawalPayment:
      "Quiero que mi análisis comience de inmediato, y entiendo que en cuanto un entrenador empiece a trabajar en mi vídeo, pierdo mi derecho de desistimiento de 14 días para esta compra.",
    withdrawalSubscription:
      "Quiero que mi suscripción comience de inmediato, y entiendo que esto significa que pierdo parte de mi derecho de desistimiento de 14 días por el valor ya entregado.",
    getStarted: "Empezar",
    redirecting: "Redirigiendo...",
    agreePrefix: "Al continuar, aceptas nuestros",
    termsLabel: "Términos",
    andLabel: "y",
    privacyLabel: "Política de Privacidad",
    whatYouGetEyebrow: "Lo que obtienes",
    whatYouGetTitle: "Lo que {plan} te da realmente",
    coachNote:
      "Tu entrenador en pista hace el trabajo más importante, repeticiones diarias, técnica bajo presión real, conocer tu juego. No estamos aquí para reemplazar eso. Esto es el análisis de vídeo fotograma a fotograma y táctico para el que la mayoría de entrenadores simplemente no tiene horas, una segunda mirada que hace su coaching aún más afilado.",
    addOnLabel: "Añadir {name} por {price}",
    addOnTotal: "Total {price}",
  },
};

const it: PricingDict = {
  pageHeader: {
    eyebrow: "Prezzi",
    title: "Pacchetti per accademie e giocatori",
    subtitle:
      "Scegli un pacchetto per accademie o club che supporti i tuoi allenatori, oppure invia un singolo video come giocatore individuale. Feedback di allenatori veri, non di un algoritmo.",
  },
  noVatNote: "Prezzi in USD. Possono essere applicate imposte in base alla tua posizione.",
  audience: {
    players: "Per giocatori",
    clubs: "Per accademie e club",
  },
  clubs: {
    eyebrow: "Per accademie e club",
    title: "Fai crescere la tua accademia con giocatori più forti",
    subtitle:
      "Supportiamo i tuoi allenatori con analisi video e di partita, così i giocatori migliorano più in fretta, vincono di più nei tornei e la tua accademia diventa il posto in cui le famiglie vogliono entrare.",
    benefits: {
      businessTitle: "Vantaggi per il tuo club",
      businessItems: [
        "Maggiore qualità della formazione: la tecnologia diventa un elemento distintivo in più per la tua accademia o club",
        "Maggiore attrattiva per i nuovi giocatori, un approccio moderno all'allenamento è un vero argomento nella scelta del club",
        "Nuovi servizi da offrire: report individuali, analisi delle partite o pacchetti premium per i giocatori",
        "Un vero vantaggio competitivo: l'analisi basata sui dati diventa parte dell'offerta del tuo club",
        "Migliore acquisizione e fidelizzazione dei giocatori, il valore aggiunto offerto rafforza il legame a lungo termine",
        "Un'immagine di club moderno: l'uso di tecnologie sportive rafforza il carattere professionale dell'organizzazione",
      ],
      marketingTitle: "Vantaggi di marketing",
      marketingItems: [
        "Contenuti pronti per i social: condividi estratti di analisi, statistiche e progressi dei giocatori",
        "Azioni di marketing congiunte con noi, case study, eventi, webinar o materiali didattici",
        "Maggiore attrattiva per gli sponsor: una collaborazione tecnologica è segno di professionalizzazione",
        "Un brand accademico più forte: comunica che i tuoi giocatori si allenano con dati e strumenti moderni",
      ],
    },
    tiers: [
      { name: "Starter", description: "Analisi regolare di video e partite per club e accademie più piccoli, con feedback condiviso per allenatori e giocatori.", features: ["Feedback condiviso per allenatori e giocatori", "Ideale per club e accademie più piccoli"] },
      { name: "Academy", description: "Un volume costante di analisi e un referente dedicato. Pensato per accademie ad alte prestazioni di medie dimensioni.", features: ["Referente dedicato", "Pensato per accademie ad alte prestazioni"] },
      { name: "High Performance", description: "Il volume mensile più alto, supporto prioritario e piani di allenamento condivisi per tutto il gruppo. Supporto completo ad alte prestazioni.", features: ["Supporto prioritario", "Piani di allenamento condivisi per il gruppo"] },
    ],
    pilot: { name: "Pilot", description: "Un primo passo una tantum per le accademie: prova il servizio sui tuoi giocatori prima di abbonarti.", features: ["Pagamento una tantum", "Un primo passo prima dell'abbonamento"] },
    pilotPeriod: "una tantum",
    creditsPerMonth: "{credits} al mese",
    perMonth: "/mese",
    billing: { title: "Fatturazione", monthly: "Mensile", quarterly: "Trimestrale", semiannual: "Semestrale", save: "risparmi il {pct}%", billed: "addebito {total}" },
    cta: "Prenota una demo",
    popularLabel: "Più popolare",
    note: "Ogni pacchetto per club viene organizzato personalmente da Piotr Kusiewicz e Mateusz Kułakowski, contattaci e lo adatteremo alla tua squadra.",
  },
  credits: {
    noun: { one: "credito", other: "crediti" },
    rule: "{oneCredit} copre un'analisi del colpo o fino a {minutes} minuti di video di partita. Una partita intera (fino a {maxHours} ore) usa {fullCredits}.",
    included: "Include {credits}",
    addOnNote: "Nessun credito. Sblocca il tuo piano.",
  },
  carousel: {
    prevAria: "Piano precedente",
    nextAria: "Piano successivo",
    freeLabel: "Gratis",
    referralDiscount: "% di sconto per invito",
    withdrawalPayment:
      "Voglio che la mia analisi inizi immediatamente, e capisco che una volta che un allenatore inizia a lavorare sul mio video, perdo il diritto di recesso di 14 giorni per questo acquisto.",
    withdrawalSubscription:
      "Voglio che il mio abbonamento inizi immediatamente, e capisco che questo significa perdere parte del diritto di recesso di 14 giorni per il valore già fornito.",
    getStarted: "Inizia ora",
    redirecting: "Reindirizzamento...",
    agreePrefix: "Continuando, accetti i nostri",
    termsLabel: "Termini",
    andLabel: "e",
    privacyLabel: "Informativa sulla Privacy",
    whatYouGetEyebrow: "Cosa ottieni",
    whatYouGetTitle: "Cosa ti dà davvero {plan}",
    coachNote:
      "Il tuo allenatore in campo fa il lavoro più importante, ripetizioni quotidiane, tecnica sotto pressione reale, conoscenza del tuo gioco. Non siamo qui per sostituirlo. Questa è l'analisi video fotogramma per fotogramma e tattica per cui la maggior parte degli allenatori semplicemente non ha ore, un secondo sguardo che rende il loro coaching ancora più preciso.",
    addOnLabel: "Aggiungi {name} per {price}",
    addOnTotal: "Totale {price}",
  },
};

const ru: PricingDict = {
  pageHeader: {
    eyebrow: "Цены",
    title: "Пакеты для академий и игроков",
    subtitle:
      "Выберите пакет для академии или клуба, который поддержит ваших тренеров, или отправьте одно видео как индивидуальный игрок. Обратная связь от настоящих тренеров, а не алгоритма.",
  },
  noVatNote: "Цены в USD. В зависимости от вашего региона могут применяться налоги.",
  audience: {
    players: "Для игроков",
    clubs: "Для академий и клубов",
  },
  clubs: {
    eyebrow: "Для академий и клубов",
    title: "Развивайте академию вместе с сильными игроками",
    subtitle:
      "Мы поддерживаем ваших тренеров видеоанализом и анализом матчей, чтобы игроки быстрее прогрессировали, выигрывали больше турниров, а ваша академия стала местом, куда хотят попасть семьи.",
    benefits: {
      businessTitle: "Преимущества для бизнеса вашего клуба",
      businessItems: [
        "Повышение качества тренировок: технологии становятся дополнительным отличием вашей академии или клуба",
        "Больше привлекательности для новых игроков: современный подход к тренировкам становится реальным аргументом при выборе клуба",
        "Новые услуги, которые вы можете предложить: индивидуальные отчёты, анализ матчей или премиальные пакеты для игроков",
        "Настоящее конкурентное преимущество: анализ на основе данных становится частью предложения вашего клуба",
        "Лучшее привлечение и удержание игроков: дополнительная ценность укрепляет их долгосрочную привязанность к клубу",
        "Имидж современного клуба: использование спортивных технологий усиливает профессиональный характер организации",
      ],
      marketingTitle: "Маркетинговые преимущества",
      marketingItems: [
        "Готовый контент для соцсетей: фрагменты анализов, статистика и прогресс игроков",
        "Совместные маркетинговые активности с нами: кейсы, мероприятия, вебинары или образовательные материалы",
        "Больше привлекательности для спонсоров: технологическое партнёрство как признак профессионализации",
        "Усиление бренда академии: сообщайте, что ваши игроки тренируются на основе данных и современных инструментов",
      ],
    },
    tiers: [
      { name: "Starter", description: "Регулярный видеоанализ и разбор матчей для небольших клубов и академий, с общей обратной связью для тренеров и игроков.", features: ["Общая обратная связь для тренеров и игроков", "Лучше всего для небольших клубов и академий"] },
      { name: "Academy", description: "Стабильный объём разборов и выделенный контактный человек. Создан для академий высоких достижений среднего размера.", features: ["Выделенный контактный человек", "Создан для академий высоких достижений"] },
      { name: "High Performance", description: "Самый большой ежемесячный объём, приоритетная поддержка и общие планы тренировок для всей группы. Полная поддержка на высоком уровне.", features: ["Приоритетная поддержка", "Общие планы тренировок для группы"] },
    ],
    pilot: { name: "Pilot", description: "Разовый первый шаг для академий: попробуйте сервис на своих игроках, прежде чем оформлять подписку.", features: ["Разовый платёж", "Первый шаг перед подпиской"] },
    pilotPeriod: "разово",
    creditsPerMonth: "{credits} в месяц",
    perMonth: "/мес.",
    billing: { title: "Оплата", monthly: "Ежемесячно", quarterly: "Раз в квартал", semiannual: "Раз в полгода", save: "скидка {pct}%", billed: "списывается {total}" },
    cta: "Записаться на демо",
    popularLabel: "Самый популярный",
    note: "Каждый клубный пакет настраивается лично Пиотром Кусевичем и Матеушем Кулаковским, свяжитесь с нами, и мы подберём вариант под вашу команду.",
  },
  credits: {
    noun: { one: "кредит", few: "кредита", many: "кредитов", other: "кредита" },
    rule: "{oneCredit} покрывает один разбор удара или до {minutes} минут записи матча. Полный матч (до {maxHours} часов) использует {fullCredits}.",
    included: "Включено: {credits}",
    addOnNote: "Без кредита. Открывает ваш план.",
  },
  carousel: {
    prevAria: "Предыдущий план",
    nextAria: "Следующий план",
    freeLabel: "Бесплатно",
    referralDiscount: "% скидка за приглашение",
    withdrawalPayment:
      "Я хочу, чтобы анализ начался немедленно, и понимаю, что как только тренер начнёт работу над моим видео, я теряю право на отказ от покупки в течение 14 дней для этой покупки.",
    withdrawalSubscription:
      "Я хочу, чтобы подписка началась немедленно, и понимаю, что это означает потерю части четырнадцатидневного права на отказ за уже предоставленную ценность.",
    getStarted: "Начать",
    redirecting: "Перенаправление...",
    agreePrefix: "Продолжая, вы соглашаетесь с нашими",
    termsLabel: "Условиями",
    andLabel: "и",
    privacyLabel: "Политикой конфиденциальности",
    whatYouGetEyebrow: "Что вы получаете",
    whatYouGetTitle: "Что на самом деле даёт вам {plan}",
    coachNote:
      "Ваш тренер на корте делает самую важную работу, ежедневные повторения, технику под реальным давлением, знание вашей игры. Мы здесь не для того, чтобы его заменить. Это покадровый видеоанализ и тактический анализ, на который у большинства тренеров просто не хватает часов, второй взгляд, который делает их коучинг ещё острее.",
    addOnLabel: "Добавить: {name} за {price}",
    addOnTotal: "Итого {price}",
  },
};

export const pricingDictionaries: Record<AppLocale, PricingDict> = { en, pl, es, it, ru };
