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
    title: "Helping academies develop stronger players",
    subtitle:
      "Video and match analysis that supports tennis academies, clubs and their coaches — so coaches get time back for the court and players get feedback that shows the way to the next win.",
  },
  story: {
    title: "Our story",
    paragraphs: [
      "Tactical Tennis Lab is a support system for tennis academies and clubs. We take on the systematic video and match analysis that coaches rarely have hours in the week to do — so your coaches can spend their time and energy on court.",
      "We analyse technique and tactics in detail: the mistakes that cost points, how players win them, and what to work on next. Better-developed players get better results in tournaments, and results are what bring new players to an academy.",
      "A report on its own changes nothing. Every analysis comes with clear priorities and drills, shared with the coaches and the player — video, diagnosis, correction, repeat. We work alongside your coaches, never in place of them. Individual players are welcome too.",
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
  trustTitle: "Why academies trust us",
  trust: [
    { title: "Professional Experience", detail: "Coaching built on real competitive tennis experience." },
    { title: "Worldwide Coaching", detail: "Helping players improve from anywhere through online coaching." },
    { title: "Detailed Video Analysis", detail: "Every recommendation is supported with clear visual feedback." },
    { title: "Shared Feedback", detail: "Coaches and players see the same clear feedback in one academy dashboard." },
  ],
  ctaText: "Want to know the coaches behind the plans?",
  ctaButton: "Meet the coaches",
};

const pl: AboutDict = {
  pageHeader: {
    eyebrow: "O nas",
    title: "Pomagamy akademiom rozwijać silniejszych zawodników",
    subtitle:
      "Analiza wideo i meczowa, która wspiera akademie tenisowe, kluby i ich trenerów — aby trenerzy odzyskali czas na korcie, a zawodnicy dostawali informację zwrotną wskazującą drogę do kolejnego zwycięstwa.",
  },
  story: {
    title: "Nasza historia",
    paragraphs: [
      "Tactical Tennis Lab to system wsparcia dla akademii i klubów tenisowych. Bierzemy na siebie systematyczną analizę wideo i meczową, na którą trenerzy rzadko mają czas w tygodniu — aby Twoi trenerzy mogli poświęcić czas i energię pracy na korcie.",
      "Szczegółowo analizujemy technikę i taktykę: błędy, które kosztują punkty, to, jak zawodnicy je wygrywają, i nad czym pracować dalej. Lepiej rozwinięci zawodnicy osiągają lepsze wyniki na turniejach, a wyniki przyciągają nowych zawodników do akademii.",
      "Sam raport niczego nie zmienia. Każda analiza zawiera jasne priorytety i ćwiczenia, udostępnione trenerom i zawodnikowi — wideo, diagnoza, korekta, powtórka. Działamy razem z Twoimi trenerami, nigdy zamiast nich. Zawodnicy indywidualni są również mile widziani.",
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
  trustTitle: "Dlaczego akademie nam ufają",
  trust: [
    { title: "Doświadczenie profesjonalne", detail: "Coaching zbudowany na prawdziwym doświadczeniu w tenisie wyczynowym." },
    { title: "Trenerzy na całym świecie", detail: "Pomagamy zawodnikom rozwijać się z dowolnego miejsca dzięki coachingowi online." },
    { title: "Szczegółowa analiza wideo", detail: "Każda rekomendacja jest poparta jasną informacją zwrotną wizualną." },
    { title: "Wspólna informacja zwrotna", detail: "Trenerzy i zawodnicy widzą tę samą, jasną informację zwrotną w jednym panelu akademii." },
  ],
  ctaText: "Chcesz poznać trenerów stojących za planami?",
  ctaButton: "Poznaj trenerów",
};

const es: AboutDict = {
  pageHeader: {
    eyebrow: "Sobre nosotros",
    title: "Ayudamos a las academias a formar jugadores más fuertes",
    subtitle:
      "Análisis de vídeo y de partidos que apoya a academias de tenis, clubes y sus entrenadores: los entrenadores recuperan tiempo para la pista y los jugadores reciben comentarios que marcan el camino hacia la próxima victoria.",
  },
  story: {
    title: "Nuestra historia",
    paragraphs: [
      "Tactical Tennis Lab es un sistema de apoyo para academias y clubes de tenis. Nos encargamos del análisis sistemático de vídeo y de partidos para el que los entrenadores rara vez tienen horas en la semana, para que tus entrenadores dediquen su tiempo y energía a la pista.",
      "Analizamos en detalle la técnica y la táctica: los errores que cuestan puntos, cómo los ganan los jugadores y en qué trabajar a continuación. Los jugadores mejor desarrollados logran mejores resultados en los torneos, y los resultados son lo que atrae a nuevos jugadores a una academia.",
      "Un informe por sí solo no cambia nada. Cada análisis incluye prioridades claras y ejercicios, compartidos con los entrenadores y con el jugador: vídeo, diagnóstico, corrección, repetir. Trabajamos junto a tus entrenadores, nunca en su lugar. Los jugadores individuales también son bienvenidos.",
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
  trustTitle: "Por qué las academias confían en nosotros",
  trust: [
    { title: "Experiencia profesional", detail: "Coaching construido sobre experiencia real en tenis competitivo." },
    { title: "Entrenamiento en todo el mundo", detail: "Ayudamos a jugadores a mejorar desde cualquier lugar mediante coaching online." },
    { title: "Análisis de vídeo detallado", detail: "Cada recomendación se respalda con un feedback visual claro." },
    { title: "Feedback compartido", detail: "Entrenadores y jugadores ven el mismo feedback claro en un único panel de la academia." },
  ],
  ctaText: "¿Quieres conocer a los entrenadores detrás de los planes?",
  ctaButton: "Conocer a los entrenadores",
};

const it: AboutDict = {
  pageHeader: {
    eyebrow: "Chi siamo",
    title: "Aiutiamo le accademie a formare giocatori più forti",
    subtitle:
      "Analisi video e di partita che supporta accademie di tennis, club e i loro allenatori: gli allenatori ritrovano tempo per il campo e i giocatori ricevono un feedback che indica la strada verso la prossima vittoria.",
  },
  story: {
    title: "La nostra storia",
    paragraphs: [
      "Tactical Tennis Lab è un sistema di supporto per accademie e club di tennis. Ci occupiamo dell'analisi sistematica di video e partite per cui gli allenatori raramente hanno ore a disposizione durante la settimana, così i tuoi allenatori possono dedicare tempo ed energie al campo.",
      "Analizziamo nel dettaglio tecnica e tattica: gli errori che costano punti, come i giocatori li vincono e su cosa lavorare dopo. Giocatori meglio sviluppati ottengono risultati migliori nei tornei, e i risultati sono ciò che porta nuovi giocatori in un'accademia.",
      "Un report da solo non cambia nulla. Ogni analisi include priorità chiare ed esercizi, condivisi con gli allenatori e con il giocatore: video, diagnosi, correzione, ripetere. Lavoriamo al fianco dei tuoi allenatori, mai al loro posto. Anche i giocatori individuali sono i benvenuti.",
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
  trustTitle: "Perché le accademie si fidano di noi",
  trust: [
    { title: "Esperienza professionale", detail: "Coaching costruito su esperienza reale nel tennis agonistico." },
    { title: "Coaching in tutto il mondo", detail: "Aiutiamo i giocatori a migliorare da qualsiasi luogo tramite coaching online." },
    { title: "Analisi video dettagliata", detail: "Ogni raccomandazione è supportata da un feedback visivo chiaro." },
    { title: "Feedback condiviso", detail: "Allenatori e giocatori vedono lo stesso feedback chiaro in un'unica dashboard dell'accademia." },
  ],
  ctaText: "Vuoi conoscere gli allenatori dietro i piani?",
  ctaButton: "Conosci gli allenatori",
};

const ru: AboutDict = {
  pageHeader: {
    eyebrow: "О нас",
    title: "Помогаем академиям растить более сильных игроков",
    subtitle:
      "Видео- и матч-анализ в поддержку теннисных академий, клубов и их тренеров: тренеры получают время для корта, а игроки — обратную связь, которая показывает путь к следующей победе.",
  },
  story: {
    title: "Наша история",
    paragraphs: [
      "Tactical Tennis Lab — система поддержки для теннисных академий и клубов. Мы берём на себя систематический видео- и матч-анализ, на который у тренеров редко хватает часов в неделе, чтобы ваши тренеры могли тратить время и силы на корт.",
      "Мы подробно разбираем технику и тактику: ошибки, которые стоят очков, то, как игроки их выигрывают, и над чем работать дальше. Лучше развитые игроки показывают лучшие результаты на турнирах, а результаты привлекают в академию новых игроков.",
      "Один отчёт ничего не меняет. Каждый анализ содержит чёткие приоритеты и упражнения, доступные тренерам и игроку: видео, диагноз, коррекция, повтор. Мы работаем вместе с вашими тренерами, а не вместо них. Индивидуальные игроки тоже приветствуются.",
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
  trustTitle: "Почему академии нам доверяют",
  trust: [
    { title: "Профессиональный опыт", detail: "Коучинг, построенный на реальном опыте соревновательного тенниса." },
    { title: "Тренировки по всему миру", detail: "Помогаем игрокам прогрессировать из любой точки мира благодаря онлайн-коучингу." },
    { title: "Детальный видеоанализ", detail: "Каждая рекомендация подкреплена наглядной визуальной обратной связью." },
    { title: "Общая обратная связь", detail: "Тренеры и игроки видят одну и ту же понятную обратную связь в единой панели академии." },
  ],
  ctaText: "Хотите узнать тренеров, стоящих за планами?",
  ctaButton: "Познакомиться с тренерами",
};

export const aboutDictionaries: Record<AppLocale, AboutDict> = { en, pl, es, it, ru };
