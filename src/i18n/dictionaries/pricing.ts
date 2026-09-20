import type { AppLocale } from "@/i18n/locales";

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
    cta: string;
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
    title: "Coaching for your whole team",
    subtitle:
      "Running a club, academy, or team? We put together custom group coaching packages — volume pricing on video analysis, shared training plans, and a dedicated point of contact.",
    cta: "Ask about club pricing",
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
    title: "Coaching dla całego zespołu",
    subtitle:
      "Prowadzisz klub, akademię lub zespół? Przygotujemy indywidualny pakiet coachingu grupowego — ceny hurtowe na analizę wideo, wspólne plany treningowe i dedykowany kontakt.",
    cta: "Zapytaj o ceny dla klubów",
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
    title: "Coaching para todo tu equipo",
    subtitle:
      "¿Gestionas un club, academia o equipo? Creamos paquetes de coaching grupal a medida — precios por volumen en análisis de vídeo, planes de entrenamiento compartidos y un punto de contacto dedicado.",
    cta: "Pregunta por precios para clubes",
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
    title: "Coaching per tutta la tua squadra",
    subtitle:
      "Gestisci un club, un'accademia o una squadra? Creiamo pacchetti di coaching di gruppo su misura — prezzi a volume sull'analisi video, piani di allenamento condivisi e un punto di contatto dedicato.",
    cta: "Chiedi informazioni sui prezzi per club",
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
    title: "Коучинг для всей вашей команды",
    subtitle:
      "Руководите клубом, академией или командой? Мы составим индивидуальный пакет группового коучинга — оптовые цены на видеоанализ, общие планы тренировок и выделенный контакт.",
    cta: "Узнать цены для клубов",
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
