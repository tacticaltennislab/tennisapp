import type { AppLocale } from "@/i18n/locales";

export interface AboutDict {
  pageHeader: { eyebrow: string; title: string; subtitle: string };
  story: { title: string; paragraphs: [string, string, string] };
  philosophyTitle: string;
  philosophy: { title: string; detail: string }[];
  trustTitle: string;
  trust: { title: string; detail: string }[];
  ctaText: string;
  ctaButton: string;
}

const en: AboutDict = {
  pageHeader: {
    eyebrow: "About us",
    title: "Helping ambitious players improve, from anywhere",
    subtitle:
      "Independent video and match analysis for ambitious amateurs and competitive juniors — built for the gap most on-court coaches don't have hours in the week to fill.",
  },
  story: {
    title: "Our story",
    paragraphs: [
      "Tactical Tennis Lab exists to fill one specific gap: the systematic video and match analysis most on-court coaches simply don't have hours in the week to do. We're not trying to replace your coach — we're the independent second opinion that works alongside them.",
      "It's built for ambitious amateurs and competitive juniors who want more than a single lesson's worth of feedback: real analysis of technique and tactics, not a generic training plan aimed at everyone.",
      "And a report on its own doesn't change anything. Every analysis comes with clear priorities, drills to work on, and a path back to check what actually improved — video, diagnosis, correction, repeat.",
    ],
  },
  philosophyTitle: "Our philosophy",
  philosophy: [
    {
      title: "Technical Excellence",
      detail: "Every stroke is analyzed in detail to build efficient, repeatable technique that performs under pressure.",
    },
    {
      title: "Tactical Intelligence",
      detail: "Tennis is more than hitting the ball. We teach decision making, match strategy, and point construction.",
    },
    {
      title: "Continuous Improvement",
      detail: "Every player follows an individual development path with measurable long-term progress.",
    },
  ],
  trustTitle: "Why players trust us",
  trust: [
    { title: "Professional Experience", detail: "Coaching built on real competitive tennis experience." },
    { title: "Worldwide Coaching", detail: "Helping players improve from anywhere through online coaching." },
    { title: "Detailed Video Analysis", detail: "Every recommendation is supported with clear visual feedback." },
    { title: "Individual Development", detail: "Every player receives a plan tailored to their goals and level." },
  ],
  ctaText: "Want to know the coaches behind the plans?",
  ctaButton: "Meet the coaches",
};

const pl: AboutDict = {
  pageHeader: {
    eyebrow: "O nas",
    title: "Pomagamy ambitnym zawodnikom rozwijać się, z każdego miejsca",
    subtitle:
      "Niezależna analiza wideo i meczowa dla ambitnych amatorów i zawodników juniorskich — stworzona, by wypełnić lukę, na którą większość trenerów na korcie nie ma czasu w tygodniu.",
  },
  story: {
    title: "Nasza historia",
    paragraphs: [
      "Tactical Tennis Lab istnieje, by wypełnić jedną konkretną lukę: systematyczną analizę wideo i meczową, na którą większość trenerów na korcie po prostu nie ma czasu w tygodniu. Nie próbujemy zastąpić Twojego trenera — jesteśmy niezależną drugą opinią, która działa razem z nim.",
      "Powstało z myślą o ambitnych amatorach i zawodnikach juniorskich, którzy chcą czegoś więcej niż informacji zwrotnej z jednej lekcji: prawdziwej analizy techniki i taktyki, a nie ogólnego planu treningowego dla wszystkich.",
      "A sam raport niczego nie zmienia. Każda analiza zawiera jasne priorytety, ćwiczenia do wykonania i ścieżkę powrotu, by sprawdzić, co faktycznie się poprawiło — wideo, diagnoza, korekta, powtórka.",
    ],
  },
  philosophyTitle: "Nasza filozofia",
  philosophy: [
    {
      title: "Doskonałość techniczna",
      detail: "Każde uderzenie jest szczegółowo analizowane, by zbudować efektywną, powtarzalną technikę, która działa pod presją.",
    },
    {
      title: "Inteligencja taktyczna",
      detail: "Tenis to więcej niż uderzanie piłki. Uczymy podejmowania decyzji, strategii meczowej i budowania punktu.",
    },
    {
      title: "Ciągły rozwój",
      detail: "Każdy zawodnik podąża indywidualną ścieżką rozwoju z mierzalnym, długoterminowym postępem.",
    },
  ],
  trustTitle: "Dlaczego zawodnicy nam ufają",
  trust: [
    { title: "Doświadczenie profesjonalne", detail: "Coaching zbudowany na prawdziwym doświadczeniu w tenisie wyczynowym." },
    { title: "Trenerzy na całym świecie", detail: "Pomagamy zawodnikom rozwijać się z dowolnego miejsca dzięki coachingowi online." },
    { title: "Szczegółowa analiza wideo", detail: "Każda rekomendacja jest poparta jasną informacją zwrotną wizualną." },
    { title: "Indywidualny rozwój", detail: "Każdy zawodnik otrzymuje plan dopasowany do swoich celów i poziomu." },
  ],
  ctaText: "Chcesz poznać trenerów stojących za planami?",
  ctaButton: "Poznaj trenerów",
};

const es: AboutDict = {
  pageHeader: {
    eyebrow: "Sobre nosotros",
    title: "Ayudamos a jugadores ambiciosos a mejorar, desde cualquier lugar",
    subtitle:
      "Análisis independiente de vídeo y de partido para amateurs ambiciosos y juniors competitivos — creado para cubrir el hueco que la mayoría de entrenadores en pista no tiene horas en la semana para llenar.",
  },
  story: {
    title: "Nuestra historia",
    paragraphs: [
      "Tactical Tennis Lab existe para cubrir un hueco concreto: el análisis sistemático de vídeo y de partido para el que la mayoría de entrenadores en pista simplemente no tiene horas en la semana. No intentamos reemplazar a tu entrenador — somos la segunda opinión independiente que trabaja junto a él.",
      "Está pensado para amateurs ambiciosos y juniors competitivos que quieren algo más que el feedback de una sola clase: análisis real de técnica y táctica, no un plan de entrenamiento genérico pensado para todos.",
      "Y un informe por sí solo no cambia nada. Cada análisis viene con prioridades claras, ejercicios en los que trabajar, y un camino de vuelta para comprobar qué ha mejorado de verdad — vídeo, diagnóstico, corrección, repetir.",
    ],
  },
  philosophyTitle: "Nuestra filosofía",
  philosophy: [
    {
      title: "Excelencia técnica",
      detail: "Cada golpe se analiza en detalle para construir una técnica eficiente y repetible que funcione bajo presión.",
    },
    {
      title: "Inteligencia táctica",
      detail: "El tenis es más que golpear la pelota. Enseñamos toma de decisiones, estrategia de partido y construcción de puntos.",
    },
    {
      title: "Mejora continua",
      detail: "Cada jugador sigue un camino de desarrollo individual con progreso medible a largo plazo.",
    },
  ],
  trustTitle: "Por qué los jugadores confían en nosotros",
  trust: [
    { title: "Experiencia profesional", detail: "Coaching construido sobre experiencia real en tenis competitivo." },
    { title: "Entrenamiento en todo el mundo", detail: "Ayudamos a jugadores a mejorar desde cualquier lugar mediante coaching online." },
    { title: "Análisis de vídeo detallado", detail: "Cada recomendación se respalda con un feedback visual claro." },
    { title: "Desarrollo individual", detail: "Cada jugador recibe un plan adaptado a sus objetivos y nivel." },
  ],
  ctaText: "¿Quieres conocer a los entrenadores detrás de los planes?",
  ctaButton: "Conocer a los entrenadores",
};

const it: AboutDict = {
  pageHeader: {
    eyebrow: "Chi siamo",
    title: "Aiutiamo i giocatori ambiziosi a migliorare, da qualsiasi luogo",
    subtitle:
      "Analisi video e di partita indipendente per amatori ambiziosi e junior agonisti — creata per colmare il vuoto che la maggior parte degli allenatori in campo non ha ore in settimana per riempire.",
  },
  story: {
    title: "La nostra storia",
    paragraphs: [
      "Tactical Tennis Lab esiste per colmare un vuoto specifico: l'analisi sistematica video e di partita per cui la maggior parte degli allenatori in campo semplicemente non ha ore in settimana. Non cerchiamo di sostituire il tuo allenatore — siamo il secondo parere indipendente che lavora al suo fianco.",
      "È pensato per amatori ambiziosi e junior agonisti che vogliono più del feedback di una singola lezione: analisi reale di tecnica e tattica, non un piano di allenamento generico pensato per tutti.",
      "E un report da solo non cambia nulla. Ogni analisi arriva con priorità chiare, esercizi su cui lavorare, e un percorso di ritorno per verificare cosa è davvero migliorato — video, diagnosi, correzione, ripeti.",
    ],
  },
  philosophyTitle: "La nostra filosofia",
  philosophy: [
    {
      title: "Eccellenza tecnica",
      detail: "Ogni colpo viene analizzato in dettaglio per costruire una tecnica efficiente e ripetibile che funzioni sotto pressione.",
    },
    {
      title: "Intelligenza tattica",
      detail: "Il tennis è più che colpire la palla. Insegniamo il processo decisionale, la strategia di partita e la costruzione del punto.",
    },
    {
      title: "Miglioramento continuo",
      detail: "Ogni giocatore segue un percorso di sviluppo individuale con progressi misurabili nel lungo termine.",
    },
  ],
  trustTitle: "Perché i giocatori si fidano di noi",
  trust: [
    { title: "Esperienza professionale", detail: "Coaching costruito su esperienza reale nel tennis agonistico." },
    { title: "Coaching in tutto il mondo", detail: "Aiutiamo i giocatori a migliorare da qualsiasi luogo tramite coaching online." },
    { title: "Analisi video dettagliata", detail: "Ogni raccomandazione è supportata da un feedback visivo chiaro." },
    { title: "Sviluppo individuale", detail: "Ogni giocatore riceve un piano su misura per i suoi obiettivi e il suo livello." },
  ],
  ctaText: "Vuoi conoscere gli allenatori dietro i piani?",
  ctaButton: "Conosci gli allenatori",
};

const ru: AboutDict = {
  pageHeader: {
    eyebrow: "О нас",
    title: "Помогаем амбициозным игрокам прогрессировать, из любой точки мира",
    subtitle:
      "Независимый видео- и матч-анализ для амбициозных любителей и соревнующихся юниоров — создан, чтобы закрыть пробел, на который у большинства тренеров на корте просто не хватает часов в неделю.",
  },
  story: {
    title: "Наша история",
    paragraphs: [
      "Tactical Tennis Lab существует, чтобы закрыть один конкретный пробел: систематический видео- и матч-анализ, на который у большинства тренеров на корте просто не хватает часов в неделю. Мы не пытаемся заменить вашего тренера — мы независимое второе мнение, которое работает вместе с ним.",
      "Сервис создан для амбициозных любителей и соревнующихся юниоров, которые хотят большего, чем обратная связь с одного занятия: реального анализа техники и тактики, а не общего тренировочного плана для всех.",
      "А сам по себе отчёт ничего не меняет. Каждый анализ сопровождается чёткими приоритетами, упражнениями для отработки и путём назад, чтобы проверить, что реально улучшилось — видео, диагностика, коррекция, повтор.",
    ],
  },
  philosophyTitle: "Наша философия",
  philosophy: [
    {
      title: "Техническое совершенство",
      detail: "Каждый удар подробно анализируется, чтобы выстроить эффективную, повторяемую технику, которая работает под давлением.",
    },
    {
      title: "Тактический интеллект",
      detail: "Теннис — это больше, чем удар по мячу. Мы учим принятию решений, стратегии матча и построению розыгрышей.",
    },
    {
      title: "Постоянное развитие",
      detail: "Каждый игрок следует индивидуальному пути развития с измеримым долгосрочным прогрессом.",
    },
  ],
  trustTitle: "Почему игроки нам доверяют",
  trust: [
    { title: "Профессиональный опыт", detail: "Коучинг, построенный на реальном опыте соревновательного тенниса." },
    { title: "Тренировки по всему миру", detail: "Помогаем игрокам прогрессировать из любой точки мира благодаря онлайн-коучингу." },
    { title: "Детальный видеоанализ", detail: "Каждая рекомендация подкреплена наглядной визуальной обратной связью." },
    { title: "Индивидуальное развитие", detail: "Каждый игрок получает план, адаптированный под его цели и уровень." },
  ],
  ctaText: "Хотите узнать тренеров, стоящих за планами?",
  ctaButton: "Познакомиться с тренерами",
};

export const aboutDictionaries: Record<AppLocale, AboutDict> = { en, pl, es, it, ru };
