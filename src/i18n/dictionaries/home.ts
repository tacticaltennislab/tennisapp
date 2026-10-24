import type { AppLocale } from "@/i18n/locales";

export interface HomeDict {
  badges: [string, string, string, string];
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    playersNote: string;
    playersLink: string;
  };
  services: {
    eyebrow: string;
    title: string;
    included: string;
    from: string;
    names: [string, string, string];
    cta: string;
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
    summary: string; // {rating} {count}
    playVideo: string;
  };
  ctaBand: {
    title: string;
    subtitle: string;
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
  sampleAnalysis: {
    badge: string;
    reportTitle: string;
    meta: string;
    player: string;
    mistakesTitle: string;
    mistakes: string[];
    winningTitle: string;
    winning: string[];
    focusTitle: string;
    focus: string[];
    patternsTitle: string;
    patterns: { label: string; value: number }[];
    courtTitle: string;
    courtNote: string;
    footer: string;
  };
}

const en: HomeDict = {
  badges: ["Former ATP Players", "ATP Certified Coaches", "ITF Level 2 Coaches", "Worldwide Coaching"],
  hero: {
    title: "Every point, understood.",
    subtitle:
      "Premium video and match analysis for tennis academies. Reviewed frame by frame by former ATP players and ITF Level 2 coaches, then returned to your coaches as clear, usable feedback.",
    ctaPrimary: "Partner with us",
    ctaSecondary: "View academy packages",
    playersNote: "Training on your own?",
    playersLink: "See player plans",
  },
  services: {
    eyebrow: "Our services",
    title: "Three ways to understand the game.",
    included: "Included in every academy package.",
    from: "Individual players from",
    names: ["Stroke Analysis", "Training Programs", "Match Analysis"],
    cta: "See pricing",
  },
  offersPreview: {
    cta: "See full details & get started",
  },
  whoThisFor: {
    eyebrow: "Who this is for",
    title: "Built for academies and clubs",
    subtitle:
      "A support system for the people who develop players, directors, head coaches, and the players and families who trust them.",
  },
  audiences: [
    {
      title: "Academy owners & directors",
      hook: "Become the academy families choose.",
      detail:
        "Better analysis means better results, and results attract new players. Offer modern, data informed development that sets your academy apart.",
      cta: "See academy packages",
    },
    {
      title: "Head coaches & coaching teams",
      hook: "Spend your energy on court, not on video.",
      detail:
        "We take on the frame by frame video and match analysis and return clear, shared feedback in one academy dashboard, so your coaches can build sessions around it.",
      cta: "How it works",
    },
    {
      title: "Players & parents",
      hook: "Feedback that shows the way to the next win.",
      detail:
        "Players see what they do well, which tactical mistakes cost them points, and what to work on next, backed by their own coaches.",
      cta: "Talk to us",
    },
  ],
  howItWorks: {
    title: "How it works",
    subtitle: "From your players' footage to feedback your coaches can use on court.",
  },
  steps: [
    {
      title: "Players send video",
      detail: "Players in your academy upload practice or match clips from their own accounts.",
    },
    {
      title: "Professional analysis",
      detail: "Former ATP players and ITF level coaches break down technique, tactical mistakes and how points are won.",
    },
    {
      title: "Shared feedback for your team",
      detail: "Coaches and players see the feedback in your academy dashboard, ready to turn into sessions.",
    },
  ],
  testimonials: {
    eyebrow: "What players are saying",
    title: "Real feedback, from real customers",
    emptyText: "No reviews yet: be the first to tell other players what working with your coach has been like.",
    emptyCta: "Leave a review",
    filledPrefix: "Worked with a coach?",
    filledCta: "Leave your own review",
    summary: "Average rating {rating} / 5 · Reviews: {count}",
    playVideo: "Play video review",
  },
  ctaBand: {
    title: "Give your coaches their time on court back.",
    subtitle: "Tell us about your academy, or compare the packages first.",
  },
  coachesRoom: {
    eyebrow: "Real coaches, not an algorithm",
    title: "The coaches behind your academy's analysis",
    subtitle:
      "Every submission is reviewed by former ATP players and ITF Level 2 certified coaches, frame by frame technical and tactical breakdowns, then clear feedback your coaches can use straight away.",
    viewProfile: "View full profile",
  },
  productScroll: {
    eyebrow: "See it in action",
    titleLine1: "Real analysis.",
    titleLine2: "Real wins.",
  },
  sampleAnalysis: {
    badge: "Illustrative example",
    reportTitle: "Match analysis report",
    meta: "Singles match · hard court · 3 sets",
    player: "Player A · U16 · right handed baseline player",
    mistakesTitle: "Tactical mistakes",
    mistakes: [
      "Second serve is predictable: mostly to the backhand, so opponents step in and attack it.",
      "Changes direction too late in cross court rallies and loses patience around shot 7.",
      "Hesitates to approach after a short ball, giving the opponent time to reset.",
    ],
    winningTitle: "How the player wins points",
    winning: [
      "Serve + forehand: the first strike to the open court wins most of the points.",
      "Strong forehand down the line when the opponent is pulled wide.",
      "Wins most short rallies of four shots or fewer.",
    ],
    focusTitle: "Focus for the next sessions",
    focus: [
      "Add second serve variations to the body and wide.",
      "Drill: down the line change of direction on the first neutral ball.",
      "Drill: approach and finish after a short ball, then play out the point.",
    ],
    patternsTitle: "Points won by pattern",
    patterns: [
      { label: "Serve + forehand", value: 68 },
      { label: "Rallies of 1 to 4 shots", value: 62 },
      { label: "Second serve points", value: 41 },
      { label: "Rallies of 9+ shots", value: 38 },
    ],
    courtTitle: "Second serve placement",
    courtNote: "74% to the backhand side",
    footer: "Reviewed by Tactical Tennis Lab coaches · shared with the academy's coaching team",
  },
};

const pl: HomeDict = {
  badges: ["Byli zawodnicy ATP", "Trenerzy certyfikowani ATP", "Trenerzy ITF Level 2", "Trenerzy na całym świecie"],
  hero: {
    title: "Zrozum każdy punkt.",
    subtitle:
      "Premium analiza wideo i meczowa dla akademii tenisowych. Każde nagranie analizują klatka po klatce byli zawodnicy ATP i trenerzy ITF Level 2, a Twoi trenerzy dostają jasną, użyteczną informację zwrotną.",
    ctaPrimary: "Zostań naszym partnerem",
    ctaSecondary: "Zobacz pakiety dla akademii",
    playersNote: "Trenujesz indywidualnie?",
    playersLink: "Zobacz plany dla zawodników",
  },
  services: {
    eyebrow: "Nasze usługi",
    title: "Trzy sposoby, by zrozumieć grę.",
    included: "W cenie każdego pakietu dla akademii.",
    from: "Zawodnicy indywidualni od",
    names: ["Analiza uderzeń", "Programy treningowe", "Analiza meczu"],
    cta: "Zobacz cennik",
  },
  offersPreview: {
    cta: "Zobacz pełne szczegóły i zacznij",
  },
  whoThisFor: {
    eyebrow: "Dla kogo to jest",
    title: "Stworzone dla akademii i klubów",
    subtitle:
      "System wsparcia dla ludzi, którzy rozwijają zawodników, dyrektorów, głównych trenerów oraz zawodników i rodzin, które im ufają.",
  },
  audiences: [
    {
      title: "Właściciele i dyrektorzy akademii",
      hook: "Zostań akademią, którą wybierają rodziny.",
      detail:
        "Lepsza analiza to lepsze wyniki, a wyniki przyciągają nowych zawodników. Zaoferuj nowoczesny, oparty na danych rozwój, który wyróżni Twoją akademię.",
      cta: "Zobacz pakiety dla akademii",
    },
    {
      title: "Główni trenerzy i zespoły trenerskie",
      hook: "Energię zostaw na korcie, nie na wideo.",
      detail:
        "Bierzemy na siebie analizę wideo i meczową klatka po klatce i zwracamy jasną, wspólną informację zwrotną w jednym panelu akademii, aby trenerzy mogli budować wokół niej treningi.",
      cta: "Jak to działa",
    },
    {
      title: "Zawodnicy i rodzice",
      hook: "Informacja zwrotna, która wskazuje drogę do kolejnego zwycięstwa.",
      detail:
        "Zawodnicy widzą, co robią dobrze, jakie błędy taktyczne kosztują ich punkty i nad czym pracować dalej, wspierani przez własnych trenerów.",
      cta: "Porozmawiajmy",
    },
  ],
  howItWorks: {
    title: "Jak to działa",
    subtitle: "Od nagrań Twoich zawodników do informacji zwrotnej, z której trenerzy skorzystają na korcie.",
  },
  steps: [
    {
      title: "Zawodnicy wysyłają wideo",
      detail: "Zawodnicy Twojej akademii przesyłają nagrania treningów lub meczów ze swoich kont.",
    },
    {
      title: "Profesjonalna analiza",
      detail: "Byli zawodnicy ATP i trenerzy na poziomie ITF analizują technikę, błędy taktyczne i to, jak wygrywane są punkty.",
    },
    {
      title: "Wspólna informacja zwrotna dla zespołu",
      detail: "Trenerzy i zawodnicy widzą opinie w panelu akademii, gotowe do przełożenia na treningi.",
    },
  ],
  testimonials: {
    eyebrow: "Co mówią zawodnicy",
    title: "Prawdziwe opinie prawdziwych klientów",
    emptyText: "Brak opinii. Bądź pierwszą osobą, która opowie innym, jak wygląda współpraca z Twoim trenerem.",
    emptyCta: "Zostaw opinię",
    filledPrefix: "Pracowałeś z trenerem?",
    filledCta: "Zostaw własną opinię",
    summary: "Średnia ocena {rating} / 5 · Opinie: {count}",
    playVideo: "Odtwórz opinię wideo",
  },
  ctaBand: {
    title: "Oddaj swoim trenerom czas na korcie.",
    subtitle: "Opowiedz nam o swojej akademii albo najpierw porównaj pakiety.",
  },
  coachesRoom: {
    eyebrow: "Prawdziwi trenerzy, nie algorytm",
    title: "Trenerzy stojący za analizą Twojej akademii",
    subtitle:
      "Każde zgłoszenie analizują byli zawodnicy ATP i certyfikowani trenerzy ITF Level 2, techniczna i taktyczna analiza klatka po klatce, a potem jasna informacja zwrotna, z której trenerzy mogą od razu korzystać.",
    viewProfile: "Zobacz pełny profil",
  },
  productScroll: {
    eyebrow: "Zobacz to w akcji",
    titleLine1: "Prawdziwa analiza.",
    titleLine2: "Prawdziwe wygrane.",
  },
  sampleAnalysis: {
    badge: "Przykład poglądowy",
    reportTitle: "Raport z analizy meczu",
    meta: "Mecz singlowy · twarda nawierzchnia · 3 sety",
    player: "Zawodnik A · U16 · praworęczny, gra z głębi kortu",
    mistakesTitle: "Błędy taktyczne",
    mistakes: [
      "Drugi serwis jest przewidywalny: głównie na bekhend, więc rywale wchodzą w kort i atakują.",
      "Zbyt późno zmienia kierunek w wymianach po przekątnej i traci cierpliwość około 7. uderzenia.",
      "Waha się przed podejściem do siatki po krótkiej piłce, dając rywalowi czas na odbudowanie gry.",
    ],
    winningTitle: "Jak zawodnik wygrywa punkty",
    winning: [
      "Serwis + forehand: pierwsze uderzenie w otwarty kort wygrywa większość punktów.",
      "Mocny forehand po linii, gdy rywal jest wyciągnięty na bok.",
      "Wygrywa większość krótkich wymian do czterech uderzeń.",
    ],
    focusTitle: "Fokus na kolejne treningi",
    focus: [
      "Dodać warianty drugiego serwisu w ciało i szeroko.",
      "Ćwiczenie: zmiana kierunku po linii przy pierwszej neutralnej piłce.",
      "Ćwiczenie: podejście i wykończenie po krótkiej piłce, a potem rozegranie punktu.",
    ],
    patternsTitle: "Wygrane punkty według schematu",
    patterns: [
      { label: "Serwis + forehand", value: 68 },
      { label: "Wymiany 1 do 4 uderzeń", value: 62 },
      { label: "Punkty przy drugim serwisie", value: 41 },
      { label: "Wymiany 9+ uderzeń", value: 38 },
    ],
    courtTitle: "Rozmieszczenie drugiego serwisu",
    courtNote: "74% na stronę bekhendu",
    footer: "Przeanalizowane przez trenerów Tactical Tennis Lab · udostępnione zespołowi trenerskiemu akademii",
  },
};

const es: HomeDict = {
  badges: ["Exjugadores del ATP", "Entrenadores certificados por la ATP", "Entrenadores ITF Level 2", "Entrenamiento en todo el mundo"],
  hero: {
    title: "Entiende cada punto.",
    subtitle:
      "Análisis premium de vídeo y de partidos para academias de tenis. Revisado fotograma a fotograma por exjugadores del ATP y entrenadores ITF Level 2, y devuelto a tus entrenadores como feedback claro y útil.",
    ctaPrimary: "Colabora con nosotros",
    ctaSecondary: "Ver paquetes para academias",
    playersNote: "¿Entrenas por tu cuenta?",
    playersLink: "Ver planes para jugadores",
  },
  services: {
    eyebrow: "Nuestros servicios",
    title: "Tres formas de entender el juego.",
    included: "Incluido en todos los paquetes para academias.",
    from: "Jugadores individuales desde",
    names: ["Análisis de golpes", "Programas de entrenamiento", "Análisis de partidos"],
    cta: "Ver precios",
  },
  offersPreview: {
    cta: "Ver todos los detalles y empezar",
  },
  whoThisFor: {
    eyebrow: "Para quién es esto",
    title: "Pensado para academias y clubes",
    subtitle:
      "Un sistema de apoyo para quienes desarrollan jugadores: directores, entrenadores principales y los jugadores y familias que confían en ellos.",
  },
  audiences: [
    {
      title: "Propietarios y directores de academia",
      hook: "Conviértete en la academia que eligen las familias.",
      detail:
        "Mejor análisis significa mejores resultados, y los resultados atraen a nuevos jugadores. Ofrece un desarrollo moderno basado en datos que distinga a tu academia.",
      cta: "Ver paquetes para academias",
    },
    {
      title: "Entrenadores principales y equipos técnicos",
      hook: "Dedica tu energía a la pista, no al vídeo.",
      detail:
        "Nos encargamos del análisis de vídeo y de partidos fotograma a fotograma y devolvemos comentarios claros y compartidos en un único panel de la academia, para que tus entrenadores construyan las sesiones a partir de ellos.",
      cta: "Cómo funciona",
    },
    {
      title: "Jugadores y padres",
      hook: "Comentarios que marcan el camino hacia la próxima victoria.",
      detail:
        "Los jugadores ven qué hacen bien, qué errores tácticos les cuestan puntos y en qué trabajar a continuación, con el respaldo de sus propios entrenadores.",
      cta: "Hablemos",
    },
  ],
  howItWorks: {
    title: "Cómo funciona",
    subtitle: "De las grabaciones de tus jugadores a comentarios que tus entrenadores pueden usar en la pista.",
  },
  steps: [
    {
      title: "Los jugadores envían vídeo",
      detail: "Los jugadores de tu academia suben clips de entrenamientos o partidos desde sus propias cuentas.",
    },
    {
      title: "Análisis profesional",
      detail: "Exjugadores del ATP y entrenadores de nivel ITF analizan la técnica, los errores tácticos y cómo se ganan los puntos.",
    },
    {
      title: "Comentarios compartidos para tu equipo",
      detail: "Entrenadores y jugadores ven los comentarios en el panel de la academia, listos para convertirlos en sesiones.",
    },
  ],
  testimonials: {
    eyebrow: "Lo que dicen los jugadores",
    title: "Opiniones reales de clientes reales",
    emptyText: "Aún no hay opiniones: sé el primero en contar a otros jugadores cómo ha sido trabajar con tu entrenador.",
    emptyCta: "Deja una opinión",
    filledPrefix: "¿Trabajaste con un entrenador?",
    filledCta: "Deja tu propia opinión",
    summary: "Valoración media {rating} / 5 · Opiniones: {count}",
    playVideo: "Reproducir opinión en vídeo",
  },
  ctaBand: {
    title: "Devuelve a tus entrenadores su tiempo en la pista.",
    subtitle: "Cuéntanos sobre tu academia o compara primero los paquetes.",
  },
  coachesRoom: {
    eyebrow: "Entrenadores reales, no un algoritmo",
    title: "Los entrenadores detrás del análisis de tu academia",
    subtitle:
      "Cada envío lo revisan exjugadores del ATP y entrenadores certificados ITF Level 2: análisis técnico y táctico fotograma a fotograma y, después, comentarios claros que tus entrenadores pueden usar de inmediato.",
    viewProfile: "Ver perfil completo",
  },
  productScroll: {
    eyebrow: "Míralo en acción",
    titleLine1: "Análisis real.",
    titleLine2: "Victorias reales.",
  },
  sampleAnalysis: {
    badge: "Ejemplo ilustrativo",
    reportTitle: "Informe de análisis de partido",
    meta: "Partido individual · pista dura · 3 sets",
    player: "Jugador A · U16 · diestro, juega desde el fondo",
    mistakesTitle: "Errores tácticos",
    mistakes: [
      "El segundo saque es predecible: casi siempre al revés, así que los rivales entran y lo atacan.",
      "Cambia de dirección demasiado tarde en los intercambios cruzados y pierde la paciencia hacia el golpe 7.",
      "Duda en subir a la red tras una bola corta y da tiempo al rival para reorganizarse.",
    ],
    winningTitle: "Cómo gana puntos el jugador",
    winning: [
      "Saque + derecha: el primer golpe a la pista abierta gana la mayoría de los puntos.",
      "Derecha paralela potente cuando el rival está abierto.",
      "Gana la mayoría de los puntos cortos, de cuatro golpes o menos.",
    ],
    focusTitle: "Enfoque para las próximas sesiones",
    focus: [
      "Añadir variantes de segundo saque al cuerpo y abierto.",
      "Ejercicio: cambio de dirección paralelo en la primera bola neutra.",
      "Ejercicio: subida y definición tras una bola corta y jugar el punto hasta el final.",
    ],
    patternsTitle: "Puntos ganados por patrón",
    patterns: [
      { label: "Saque + derecha", value: 68 },
      { label: "Intercambios de 1 a 4 golpes", value: 62 },
      { label: "Puntos con segundo saque", value: 41 },
      { label: "Intercambios de 9+ golpes", value: 38 },
    ],
    courtTitle: "Colocación del segundo saque",
    courtNote: "74% al lado del revés",
    footer: "Revisado por los entrenadores de Tactical Tennis Lab · compartido con el equipo técnico de la academia",
  },
};

const it: HomeDict = {
  badges: ["Ex giocatori ATP", "Allenatori certificati ATP", "Allenatori ITF Level 2", "Coaching in tutto il mondo"],
  hero: {
    title: "Capisci ogni punto.",
    subtitle:
      "Analisi premium di video e partite per accademie di tennis. Esaminata fotogramma per fotogramma da ex giocatori ATP e allenatori ITF Level 2, e restituita ai tuoi allenatori come feedback chiaro e utilizzabile.",
    ctaPrimary: "Collabora con noi",
    ctaSecondary: "Vedi i pacchetti per accademie",
    playersNote: "Ti alleni da solo?",
    playersLink: "Vedi i piani per giocatori",
  },
  services: {
    eyebrow: "I nostri servizi",
    title: "Tre modi per capire il gioco.",
    included: "Incluso in ogni pacchetto per accademie.",
    from: "Giocatori individuali da",
    names: ["Analisi dei colpi", "Programmi di allenamento", "Analisi delle partite"],
    cta: "Vedi i prezzi",
  },
  offersPreview: {
    cta: "Vedi tutti i dettagli e inizia",
  },
  whoThisFor: {
    eyebrow: "Per chi è pensato",
    title: "Pensato per accademie e club",
    subtitle:
      "Un sistema di supporto per chi sviluppa i giocatori: direttori, capo allenatori e i giocatori e le famiglie che si affidano a loro.",
  },
  audiences: [
    {
      title: "Titolari e direttori di accademia",
      hook: "Diventa l'accademia che le famiglie scelgono.",
      detail:
        "Un'analisi migliore significa risultati migliori, e i risultati attirano nuovi giocatori. Offri uno sviluppo moderno e basato sui dati che distingua la tua accademia.",
      cta: "Vedi i pacchetti per accademie",
    },
    {
      title: "Capo allenatori e staff tecnici",
      hook: "Dedica le energie al campo, non ai video.",
      detail:
        "Ci occupiamo dell'analisi di video e partite fotogramma per fotogramma e restituiamo feedback chiari e condivisi in un'unica dashboard dell'accademia, così i tuoi allenatori possono costruire le sedute a partire da essi.",
      cta: "Come funziona",
    },
    {
      title: "Giocatori e genitori",
      hook: "Un feedback che indica la strada verso la prossima vittoria.",
      detail:
        "I giocatori vedono cosa fanno bene, quali errori tattici costano loro punti e su cosa lavorare dopo, con il supporto dei propri allenatori.",
      cta: "Parliamone",
    },
  ],
  howItWorks: {
    title: "Come funziona",
    subtitle: "Dai filmati dei tuoi giocatori a un feedback che i tuoi allenatori possono usare in campo.",
  },
  steps: [
    {
      title: "I giocatori inviano i video",
      detail: "I giocatori della tua accademia caricano clip di allenamenti o partite dai propri account.",
    },
    {
      title: "Analisi professionale",
      detail: "Ex giocatori ATP e allenatori di livello ITF analizzano tecnica, errori tattici e come si vincono i punti.",
    },
    {
      title: "Feedback condiviso per il tuo staff",
      detail: "Allenatori e giocatori vedono il feedback nella dashboard dell'accademia, pronto per trasformarsi in sedute.",
    },
  ],
  testimonials: {
    eyebrow: "Cosa dicono i giocatori",
    title: "Recensioni vere da clienti veri",
    emptyText: "Ancora nessuna recensione: sii il primo a raccontare agli altri giocatori com'è lavorare con il tuo allenatore.",
    emptyCta: "Lascia una recensione",
    filledPrefix: "Hai lavorato con un allenatore?",
    filledCta: "Lascia la tua recensione",
    summary: "Valutazione media {rating} / 5 · Recensioni: {count}",
    playVideo: "Riproduci recensione video",
  },
  ctaBand: {
    title: "Restituisci ai tuoi allenatori il loro tempo in campo.",
    subtitle: "Raccontaci della tua accademia oppure confronta prima i pacchetti.",
  },
  coachesRoom: {
    eyebrow: "Allenatori veri, non un algoritmo",
    title: "Gli allenatori dietro l'analisi della tua accademia",
    subtitle:
      "Ogni invio è esaminato da ex giocatori ATP e allenatori certificati ITF Level 2: analisi tecnica e tattica fotogramma per fotogramma, poi un feedback chiaro che i tuoi allenatori possono usare subito.",
    viewProfile: "Vedi il profilo completo",
  },
  productScroll: {
    eyebrow: "Guardalo in azione",
    titleLine1: "Analisi vera.",
    titleLine2: "Vittorie vere.",
  },
  sampleAnalysis: {
    badge: "Esempio illustrativo",
    reportTitle: "Report di analisi della partita",
    meta: "Singolare · cemento · 3 set",
    player: "Giocatore A · U16 · destrorso, gioca da fondo campo",
    mistakesTitle: "Errori tattici",
    mistakes: [
      "La seconda di servizio è prevedibile: quasi sempre sul rovescio, così gli avversari entrano in campo e attaccano.",
      "Cambia direzione troppo tardi negli scambi incrociati e perde la pazienza intorno al settimo colpo.",
      "Esita a scendere a rete dopo una palla corta e concede all'avversario il tempo di riorganizzarsi.",
    ],
    winningTitle: "Come il giocatore vince i punti",
    winning: [
      "Servizio + dritto: il primo colpo verso il campo aperto vince la maggior parte dei punti.",
      "Dritto lungolinea potente quando l'avversario è tirato fuori campo.",
      "Vince la maggior parte degli scambi brevi, di quattro colpi o meno.",
    ],
    focusTitle: "Focus per le prossime sedute",
    focus: [
      "Aggiungere varianti di seconda di servizio sul corpo e largo.",
      "Esercizio: cambio di direzione lungolinea sulla prima palla neutra.",
      "Esercizio: discesa a rete e chiusura dopo una palla corta, poi giocare il punto fino in fondo.",
    ],
    patternsTitle: "Punti vinti per schema",
    patterns: [
      { label: "Servizio + dritto", value: 68 },
      { label: "Scambi di 1 a 4 colpi", value: 62 },
      { label: "Punti con la seconda di servizio", value: 41 },
      { label: "Scambi di 9+ colpi", value: 38 },
    ],
    courtTitle: "Direzione della seconda di servizio",
    courtNote: "74% sul lato del rovescio",
    footer: "Esaminato dagli allenatori di Tactical Tennis Lab · condiviso con lo staff tecnico dell'accademia",
  },
};

const ru: HomeDict = {
  badges: ["Бывшие игроки ATP", "Тренеры с сертификатом ATP", "Тренеры уровня ITF Level 2", "Тренировки по всему миру"],
  hero: {
    title: "Понимайте каждое очко.",
    subtitle:
      "Премиальный видеоанализ и анализ матчей для теннисных академий. Бывшие игроки ATP и тренеры ITF Level 2 разбирают каждое видео покадрово и возвращают вашим тренерам понятную, применимую обратную связь.",
    ctaPrimary: "Стать партнёром",
    ctaSecondary: "Пакеты для академий",
    playersNote: "Тренируетесь самостоятельно?",
    playersLink: "Планы для игроков",
  },
  services: {
    eyebrow: "Наши услуги",
    title: "Три способа понять игру.",
    included: "Входит в каждый пакет для академий.",
    from: "Индивидуальным игрокам от",
    names: ["Анализ ударов", "Тренировочные программы", "Анализ матчей"],
    cta: "Смотреть цены",
  },
  offersPreview: {
    cta: "Смотреть все детали и начать",
  },
  whoThisFor: {
    eyebrow: "Кому это подходит",
    title: "Создано для академий и клубов",
    subtitle:
      "Система поддержки для тех, кто растит игроков: директоров, главных тренеров, а также игроков и семей, которые им доверяют.",
  },
  audiences: [
    {
      title: "Владельцы и директора академий",
      hook: "Станьте академией, которую выбирают семьи.",
      detail:
        "Лучший анализ даёт лучшие результаты, а результаты привлекают новых игроков. Предложите современное развитие на основе данных, которое выделит вашу академию.",
      cta: "Пакеты для академий",
    },
    {
      title: "Главные тренеры и тренерские команды",
      hook: "Тратьте силы на корт, а не на видео.",
      detail:
        "Мы берём на себя покадровый видеоанализ и разбор матчей и возвращаем понятную общую обратную связь в одной панели академии, чтобы тренеры могли строить на ней занятия.",
      cta: "Как это работает",
    },
    {
      title: "Игроки и родители",
      hook: "Обратная связь, которая показывает путь к следующей победе.",
      detail:
        "Игроки видят, что у них получается, какие тактические ошибки стоят им очков и над чем работать дальше, при поддержке собственных тренеров.",
      cta: "Давайте поговорим",
    },
  ],
  howItWorks: {
    title: "Как это работает",
    subtitle: "От записей ваших игроков до обратной связи, которую тренеры могут использовать на корте.",
  },
  steps: [
    {
      title: "Игроки присылают видео",
      detail: "Игроки вашей академии загружают записи тренировок или матчей из своих аккаунтов.",
    },
    {
      title: "Профессиональный анализ",
      detail: "Бывшие игроки ATP и тренеры уровня ITF разбирают технику, тактические ошибки и то, как выигрываются очки.",
    },
    {
      title: "Общая обратная связь для команды",
      detail: "Тренеры и игроки видят отзывы в панели академии, готовые к превращению в занятия.",
    },
  ],
  testimonials: {
    eyebrow: "Что говорят игроки",
    title: "Настоящие отзывы настоящих клиентов",
    emptyText: "Отзывов пока нет: станьте первым, кто расскажет другим игрокам, каково работать с вашим тренером.",
    emptyCta: "Оставить отзыв",
    filledPrefix: "Работали с тренером?",
    filledCta: "Оставить свой отзыв",
    summary: "Средняя оценка {rating} / 5 · Отзывы: {count}",
    playVideo: "Смотреть видеоотзыв",
  },
  ctaBand: {
    title: "Верните своим тренерам время на корте.",
    subtitle: "Расскажите нам о своей академии или сначала сравните пакеты.",
  },
  coachesRoom: {
    eyebrow: "Настоящие тренеры, а не алгоритм",
    title: "Тренеры, стоящие за анализом вашей академии",
    subtitle:
      "Каждую заявку разбирают бывшие игроки ATP и сертифицированные тренеры ITF Level 2, покадровый технический и тактический разбор, а затем понятная обратная связь, которую тренеры могут использовать сразу.",
    viewProfile: "Смотреть полный профиль",
  },
  productScroll: {
    eyebrow: "Посмотрите это в деле",
    titleLine1: "Настоящий анализ.",
    titleLine2: "Настоящие победы.",
  },
  sampleAnalysis: {
    badge: "Иллюстративный пример",
    reportTitle: "Отчёт по анализу матча",
    meta: "Одиночный матч · хард · 3 сета",
    player: "Игрок A · U16 · правша, играет с задней линии",
    mistakesTitle: "Тактические ошибки",
    mistakes: [
      "Вторая подача предсказуема: в основном на бэкхенд, поэтому соперники заходят в корт и атакуют.",
      "Слишком поздно меняет направление в розыгрышах по диагонали и теряет терпение около седьмого удара.",
      "Колеблется перед выходом к сетке после короткого мяча и даёт сопернику время перестроиться.",
    ],
    winningTitle: "Как игрок выигрывает очки",
    winning: [
      "Подача + форхенд: первый удар в открытый корт выигрывает большинство очков.",
      "Мощный форхенд вдоль линии, когда соперник выведен в сторону.",
      "Выигрывает большинство коротких розыгрышей: до четырёх ударов.",
    ],
    focusTitle: "Фокус на ближайшие тренировки",
    focus: [
      "Добавить варианты второй подачи в корпус и в сторону.",
      "Упражнение: смена направления вдоль линии на первом нейтральном мяче.",
      "Упражнение: выход к сетке и завершение после короткого мяча, затем доигрывание очка.",
    ],
    patternsTitle: "Выигранные очки по схемам",
    patterns: [
      { label: "Подача + форхенд", value: 68 },
      { label: "Розыгрыши в от 1 до 4 удара", value: 62 },
      { label: "Очки на второй подаче", value: 41 },
      { label: "Розыгрыши от 9 ударов", value: 38 },
    ],
    courtTitle: "Направление второй подачи",
    courtNote: "74% на сторону бэкхенда",
    footer: "Проверено тренерами Tactical Tennis Lab · доступно тренерской команде академии",
  },
};

export const homeDictionaries: Record<AppLocale, HomeDict> = { en, pl, es, it, ru };
