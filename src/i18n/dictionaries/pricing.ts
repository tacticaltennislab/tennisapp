import type { AppLocale } from "@/i18n/locales";

export interface ClubTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
}

export interface PricingDict {
  pageHeader: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  noVatNote: string;
  clubs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tiers: ClubTier[];
    cta: string;
    note: string;
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
  };
}

const en: PricingDict = {
  pageHeader: {
    eyebrow: "Pricing",
    title: "Coaching plans for every goal",
    subtitle:
      "Send your video, choose the analysis that fits what you're working on, and get feedback from a real coach — not an algorithm.",
  },
  noVatNote: "All prices are in USD. No VAT or sales tax is added at checkout.",
  clubs: {
    eyebrow: "Clubs & academies",
    title: "Volume pricing for your whole roster",
    subtitle:
      "We're a support system for the coaches at your academy — handling the frame-by-frame video and match analysis they don't have the hours for, so they can spend more energy on the court instead of behind a laptop. Better analysis helps players improve faster, faster improvement means more results at tournaments, and strong results are what bring the next wave of players through your doors.",
    tiers: [
      {
        name: "Club Starter Package",
        price: "$550",
        period: "/month",
        description:
          "5–8 video or match analyses per month, with shared feedback for coaches and players. Ideal for smaller clubs and academies.",
        features: [
          "5–8 analyses per month",
          "Shared feedback for coaches and players",
          "Best for smaller clubs and academies",
        ],
      },
      {
        name: "Academy Standard Package",
        price: "$1,100",
        period: "/month",
        description:
          "10–15 analyses per month, plus a dedicated point of contact. Built for medium-sized high-performance academies.",
        features: [
          "10–15 analyses per month",
          "Dedicated point of contact",
          "Built for high-performance academies",
        ],
      },
      {
        name: "High Performance Club Package",
        price: "$1,950",
        period: "/month",
        description:
          "20+ analyses per month, priority support, and shared training plans for the whole group. Full high-performance support.",
        features: [
          "20+ analyses per month",
          "Priority support",
          "Shared training plans for the group",
        ],
      },
      {
        name: "Season Package — 3 Months",
        price: "$5,500",
        period: "one-time",
        description:
          "40–50 analyses over 3 months. Best value for academies planning a full training block or season preparation.",
        features: [
          "40–50 analyses over 3 months",
          "One-time payment",
          "Best for a full training block",
        ],
      },
      {
        name: "Season Package — 6 Months",
        price: "$9,500",
        period: "one-time",
        description:
          "80–90 analyses over 6 months. Our maximum volume discount, built for long-term academy partnerships.",
        features: [
          "80–90 analyses over 6 months",
          "One-time payment",
          "Maximum volume discount for long-term partners",
        ],
      },
    ],
    cta: "Get started",
    note: "Every club package is arranged individually — get in touch and we'll set it up around your roster.",
  },
  carousel: {
    prevAria: "Previous plan",
    nextAria: "Next plan",
    freeLabel: "Free",
    referralDiscount: "% referral discount",
    withdrawalPayment:
      "I want my analysis to begin immediately, and I understand that once a coach starts working on my video, I lose my 14-day right of withdrawal for this purchase.",
    withdrawalSubscription:
      "I want my subscription to begin immediately, and I understand this means I lose part of my 14-day right of withdrawal for value already delivered.",
    getStarted: "Get started",
    redirecting: "Redirecting...",
    agreePrefix: "By continuing, you agree to our",
    termsLabel: "Terms",
    andLabel: "and",
    privacyLabel: "Privacy Policy",
    whatYouGetEyebrow: "What you get",
    whatYouGetTitle: "What {plan} actually gives you",
    coachNote:
      "Your on-court coach does the work that matters most — daily reps, technique under real pressure, knowing your game. We're not here to replace that. This is the frame-by-frame video and tactical analysis most coaches simply don't have the hours for — a second pair of eyes that makes their coaching even sharper.",
  },
};

const pl: PricingDict = {
  pageHeader: {
    eyebrow: "Cennik",
    title: "Plany treningowe dla każdego celu",
    subtitle:
      "Wyślij swoje wideo, wybierz analizę dopasowaną do tego, nad czym pracujesz, i otrzymaj informację zwrotną od prawdziwego trenera — nie algorytmu.",
  },
  noVatNote: "Wszystkie ceny podane są w USD. Przy płatności nie doliczamy VAT ani podatku od sprzedaży.",
  clubs: {
    eyebrow: "Kluby i akademie",
    title: "Ceny hurtowe dla całego zespołu",
    subtitle:
      "Jesteśmy systemem wsparcia dla trenerów w Twojej akademii — przejmujemy analizę wideo i meczową klatka po klatce, na którą nie mają czasu, dzięki czemu mogą poświęcić więcej energii na kort, a nie na laptopa. Lepsza analiza pomaga zawodnikom szybciej się rozwijać, szybszy rozwój to więcej wyników na turniejach, a mocne wyniki to właśnie to, co przyciąga do Twojej akademii kolejnych zawodników.",
    tiers: [
      {
        name: "Club Starter Package",
        price: "550 USD",
        period: "/miesiąc",
        description:
          "5–8 analiz wideo lub meczowych miesięcznie, ze wspólną informacją zwrotną dla trenerów i zawodników. Idealne dla mniejszych klubów i akademii.",
        features: [
          "5–8 analiz miesięcznie",
          "Wspólna informacja zwrotna dla trenerów i zawodników",
          "Najlepsze dla mniejszych klubów i akademii",
        ],
      },
      {
        name: "Academy Standard Package",
        price: "1100 USD",
        period: "/miesiąc",
        description:
          "10–15 analiz miesięcznie oraz dedykowany kontakt. Stworzone dla średniej wielkości akademii high performance.",
        features: [
          "10–15 analiz miesięcznie",
          "Dedykowany kontakt",
          "Stworzone dla akademii high performance",
        ],
      },
      {
        name: "High Performance Club Package",
        price: "1950 USD",
        period: "/miesiąc",
        description:
          "20+ analiz miesięcznie, priorytetowe wsparcie i wspólne plany treningowe dla całej grupy. Pełne wsparcie high performance.",
        features: [
          "20+ analiz miesięcznie",
          "Priorytetowe wsparcie",
          "Wspólne plany treningowe dla grupy",
        ],
      },
      {
        name: "Season Package — 3 Months",
        price: "5500 USD",
        period: "jednorazowo",
        description:
          "40–50 analiz w ciągu 3 miesięcy. Najlepsza wartość dla akademii planujących pełny blok treningowy lub przygotowania sezonowe.",
        features: [
          "40–50 analiz w ciągu 3 miesięcy",
          "Płatność jednorazowa",
          "Najlepsze dla pełnego bloku treningowego",
        ],
      },
      {
        name: "Season Package — 6 Months",
        price: "9500 USD",
        period: "jednorazowo",
        description:
          "80–90 analiz w ciągu 6 miesięcy. Nasza maksymalna zniżka za wolumen, stworzona dla długoterminowych partnerstw z akademiami.",
        features: [
          "80–90 analiz w ciągu 6 miesięcy",
          "Płatność jednorazowa",
          "Maksymalna zniżka dla długoterminowych partnerów",
        ],
      },
    ],
    cta: "Zacznij teraz",
    note: "Każdy pakiet klubowy ustalamy indywidualnie — napisz do nas, a dopasujemy go do Twojego zespołu.",
  },
  carousel: {
    prevAria: "Poprzedni plan",
    nextAria: "Następny plan",
    freeLabel: "Za darmo",
    referralDiscount: "% zniżki za polecenie",
    withdrawalPayment:
      "Chcę, aby moja analiza rozpoczęła się natychmiast i rozumiem, że gdy trener zacznie pracę nad moim wideo, tracę prawo do odstąpienia od umowy w ciągu 14 dni dla tego zakupu.",
    withdrawalSubscription:
      "Chcę, aby moja subskrypcja rozpoczęła się natychmiast i rozumiem, że oznacza to utratę części 14-dniowego prawa do odstąpienia za już dostarczoną wartość.",
    getStarted: "Zacznij teraz",
    redirecting: "Przekierowuję...",
    agreePrefix: "Kontynuując, akceptujesz nasz",
    termsLabel: "Regulamin",
    andLabel: "i",
    privacyLabel: "Politykę prywatności",
    whatYouGetEyebrow: "Co otrzymujesz",
    whatYouGetTitle: "Co naprawdę daje Ci {plan}",
    coachNote:
      "Twój trener na korcie robi to, co najważniejsze — codzienne powtórki, technikę pod prawdziwą presją, znajomość Twojej gry. Nie jesteśmy tu po to, by go zastąpić. To analiza wideo klatka po klatce i taktyczna, na którą większość trenerów po prostu nie ma czasu — drugie oko, które czyni ich coaching jeszcze ostrzejszym.",
  },
};

const es: PricingDict = {
  pageHeader: {
    eyebrow: "Precios",
    title: "Planes de coaching para cada objetivo",
    subtitle:
      "Envía tu vídeo, elige el análisis que se ajuste a lo que estás trabajando, y recibe feedback de un entrenador real — no de un algoritmo.",
  },
  noVatNote: "Todos los precios están en USD. No se añade IVA ni impuesto de ventas al finalizar la compra.",
  clubs: {
    eyebrow: "Clubes y academias",
    title: "Precios por volumen para todo tu equipo",
    subtitle:
      "Somos un sistema de apoyo para los entrenadores de tu academia — nos encargamos del análisis de vídeo y de partido, fotograma a fotograma, para el que no tienen horas, para que puedan dedicar más energía a la pista y menos al portátil. Un mejor análisis ayuda a los jugadores a mejorar más rápido, una mejora más rápida significa más resultados en torneos, y esos buenos resultados son justo lo que atrae a la próxima ola de jugadores a tu academia.",
    tiers: [
      {
        name: "Club Starter Package",
        price: "$550",
        period: "/mes",
        description:
          "5–8 análisis de vídeo o de partido al mes, con feedback compartido para entrenadores y jugadores. Ideal para clubes y academias más pequeños.",
        features: [
          "5–8 análisis al mes",
          "Feedback compartido para entrenadores y jugadores",
          "Ideal para clubes y academias pequeños",
        ],
      },
      {
        name: "Academy Standard Package",
        price: "$1,100",
        period: "/mes",
        description:
          "10–15 análisis al mes, más un punto de contacto dedicado. Pensado para academias de alto rendimiento de tamaño medio.",
        features: [
          "10–15 análisis al mes",
          "Punto de contacto dedicado",
          "Pensado para academias de alto rendimiento",
        ],
      },
      {
        name: "High Performance Club Package",
        price: "$1,950",
        period: "/mes",
        description:
          "20+ análisis al mes, soporte prioritario y planes de entrenamiento compartidos para todo el grupo. Soporte completo de alto rendimiento.",
        features: [
          "20+ análisis al mes",
          "Soporte prioritario",
          "Planes de entrenamiento compartidos para el grupo",
        ],
      },
      {
        name: "Season Package — 3 Months",
        price: "$5,500",
        period: "pago único",
        description:
          "40–50 análisis en 3 meses. La mejor relación calidad-precio para academias que planifican un bloque de entrenamiento completo o la preparación de temporada.",
        features: [
          "40–50 análisis en 3 meses",
          "Pago único",
          "Ideal para un bloque de entrenamiento completo",
        ],
      },
      {
        name: "Season Package — 6 Months",
        price: "$9,500",
        period: "pago único",
        description:
          "80–90 análisis en 6 meses. Nuestro mayor descuento por volumen, pensado para colaboraciones a largo plazo con academias.",
        features: [
          "80–90 análisis en 6 meses",
          "Pago único",
          "Máximo descuento para colaboraciones a largo plazo",
        ],
      },
    ],
    cta: "Empezar",
    note: "Cada paquete para clubes se configura de forma individual — contáctanos y lo adaptaremos a tu equipo.",
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
      "Tu entrenador en pista hace el trabajo más importante — repeticiones diarias, técnica bajo presión real, conocer tu juego. No estamos aquí para reemplazar eso. Esto es el análisis de vídeo fotograma a fotograma y táctico para el que la mayoría de entrenadores simplemente no tiene horas — una segunda mirada que hace su coaching aún más afilado.",
  },
};

const it: PricingDict = {
  pageHeader: {
    eyebrow: "Prezzi",
    title: "Piani di coaching per ogni obiettivo",
    subtitle:
      "Invia il tuo video, scegli l'analisi adatta a ciò su cui stai lavorando, e ricevi un feedback da un allenatore vero — non da un algoritmo.",
  },
  noVatNote: "Tutti i prezzi sono in USD. Nessuna IVA o imposta sulle vendite viene aggiunta al checkout.",
  clubs: {
    eyebrow: "Club e accademie",
    title: "Prezzi a volume per tutta la tua squadra",
    subtitle:
      "Siamo un sistema di supporto per gli allenatori della tua accademia — ci occupiamo noi dell'analisi video e di partita, fotogramma per fotogramma, per cui loro non hanno le ore necessarie, così possono dedicare più energia al campo e meno al portatile. Un'analisi migliore aiuta i giocatori a migliorare più in fretta, un miglioramento più rapido significa più risultati nei tornei, e risultati solidi sono esattamente ciò che porta la prossima ondata di giocatori nella tua accademia.",
    tiers: [
      {
        name: "Club Starter Package",
        price: "$550",
        period: "/mese",
        description:
          "5–8 analisi video o di partita al mese, con feedback condiviso per allenatori e giocatori. Ideale per club e accademie più piccoli.",
        features: [
          "5–8 analisi al mese",
          "Feedback condiviso per allenatori e giocatori",
          "Ideale per club e accademie di piccole dimensioni",
        ],
      },
      {
        name: "Academy Standard Package",
        price: "$1.100",
        period: "/mese",
        description:
          "10–15 analisi al mese, più un punto di contatto dedicato. Pensato per accademie high performance di medie dimensioni.",
        features: [
          "10–15 analisi al mese",
          "Punto di contatto dedicato",
          "Pensato per accademie high performance",
        ],
      },
      {
        name: "High Performance Club Package",
        price: "$1.950",
        period: "/mese",
        description:
          "20+ analisi al mese, supporto prioritario e piani di allenamento condivisi per tutto il gruppo. Supporto high performance completo.",
        features: [
          "20+ analisi al mese",
          "Supporto prioritario",
          "Piani di allenamento condivisi per il gruppo",
        ],
      },
      {
        name: "Season Package — 3 Months",
        price: "$5.500",
        period: "una tantum",
        description:
          "40–50 analisi in 3 mesi. Il miglior rapporto qualità-prezzo per le accademie che pianificano un intero blocco di allenamento o la preparazione stagionale.",
        features: [
          "40–50 analisi in 3 mesi",
          "Pagamento una tantum",
          "Ideale per un intero blocco di allenamento",
        ],
      },
      {
        name: "Season Package — 6 Months",
        price: "$9.500",
        period: "una tantum",
        description:
          "80–90 analisi in 6 mesi. Il nostro massimo sconto per volume, pensato per collaborazioni a lungo termine con le accademie.",
        features: [
          "80–90 analisi in 6 mesi",
          "Pagamento una tantum",
          "Sconto massimo per collaborazioni a lungo termine",
        ],
      },
    ],
    cta: "Inizia ora",
    note: "Ogni pacchetto per club viene organizzato individualmente — contattaci e lo adatteremo alla tua squadra.",
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
      "Il tuo allenatore in campo fa il lavoro più importante — ripetizioni quotidiane, tecnica sotto pressione reale, conoscenza del tuo gioco. Non siamo qui per sostituirlo. Questa è l'analisi video fotogramma per fotogramma e tattica per cui la maggior parte degli allenatori semplicemente non ha ore — un secondo sguardo che rende il loro coaching ancora più preciso.",
  },
};

const ru: PricingDict = {
  pageHeader: {
    eyebrow: "Цены",
    title: "Планы коучинга под любую цель",
    subtitle:
      "Отправьте видео, выберите анализ, который подходит под вашу задачу, и получите обратную связь от настоящего тренера — а не от алгоритма.",
  },
  noVatNote: "Все цены указаны в USD. При оплате НДС или налог с продаж не добавляются.",
  clubs: {
    eyebrow: "Клубы и академии",
    title: "Оптовые цены для всей вашей команды",
    subtitle:
      "Мы — система поддержки для тренеров вашей академии: берём на себя покадровый видео- и матчевый анализ, на который у них просто не хватает часов, чтобы они могли уделять больше энергии корту, а не ноутбуку. Более качественный анализ помогает игрокам быстрее прогрессировать, более быстрый прогресс — это больше результатов на турнирах, а сильные результаты — это именно то, что привлекает в вашу академию новых игроков.",
    tiers: [
      {
        name: "Club Starter Package",
        price: "550 $",
        period: "/месяц",
        description:
          "5–8 видео- или матчевых разборов в месяц с общей обратной связью для тренеров и игроков. Идеально для небольших клубов и академий.",
        features: [
          "5–8 разборов в месяц",
          "Общая обратная связь для тренеров и игроков",
          "Лучший вариант для небольших клубов и академий",
        ],
      },
      {
        name: "Academy Standard Package",
        price: "1100 $",
        period: "/месяц",
        description:
          "10–15 разборов в месяц плюс выделенный контакт. Создан для академий high performance среднего размера.",
        features: [
          "10–15 разборов в месяц",
          "Выделенный контакт",
          "Создан для академий high performance",
        ],
      },
      {
        name: "High Performance Club Package",
        price: "1950 $",
        period: "/месяц",
        description:
          "20+ разборов в месяц, приоритетная поддержка и общие планы тренировок для всей группы. Полная поддержка high performance.",
        features: [
          "20+ разборов в месяц",
          "Приоритетная поддержка",
          "Общие планы тренировок для группы",
        ],
      },
      {
        name: "Season Package — 3 Months",
        price: "5500 $",
        period: "разово",
        description:
          "40–50 разборов за 3 месяца. Лучшее соотношение цены и объёма для академий, планирующих полный тренировочный блок или подготовку к сезону.",
        features: [
          "40–50 разборов за 3 месяца",
          "Разовый платёж",
          "Лучший вариант для полного тренировочного блока",
        ],
      },
      {
        name: "Season Package — 6 Months",
        price: "9500 $",
        period: "разово",
        description:
          "80–90 разборов за 6 месяцев. Наша максимальная оптовая скидка, созданная для долгосрочного партнёрства с академиями.",
        features: [
          "80–90 разборов за 6 месяцев",
          "Разовый платёж",
          "Максимальная скидка для долгосрочных партнёров",
        ],
      },
    ],
    cta: "Начать",
    note: "Каждый клубный пакет настраивается индивидуально — свяжитесь с нами, и мы подберём вариант под вашу команду.",
  },
  carousel: {
    prevAria: "Предыдущий план",
    nextAria: "Следующий план",
    freeLabel: "Бесплатно",
    referralDiscount: "% скидка за приглашение",
    withdrawalPayment:
      "Я хочу, чтобы анализ начался немедленно, и понимаю, что как только тренер начнёт работу над моим видео, я теряю право на отказ от покупки в течение 14 дней для этой покупки.",
    withdrawalSubscription:
      "Я хочу, чтобы подписка началась немедленно, и понимаю, что это означает потерю части 14-дневного права на отказ за уже предоставленную ценность.",
    getStarted: "Начать",
    redirecting: "Перенаправление...",
    agreePrefix: "Продолжая, вы соглашаетесь с нашими",
    termsLabel: "Условиями",
    andLabel: "и",
    privacyLabel: "Политикой конфиденциальности",
    whatYouGetEyebrow: "Что вы получаете",
    whatYouGetTitle: "Что на самом деле даёт вам {plan}",
    coachNote:
      "Ваш тренер на корте делает самую важную работу — ежедневные повторения, технику под реальным давлением, знание вашей игры. Мы здесь не для того, чтобы его заменить. Это покадровый видео- и тактический анализ, на который у большинства тренеров просто не хватает часов — второй взгляд, который делает их коучинг ещё острее.",
  },
};

export const pricingDictionaries: Record<AppLocale, PricingDict> = { en, pl, es, it, ru };
