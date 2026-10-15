import type { AppLocale } from "@/i18n/locales";

export interface HomeDict {
  badges: [string, string, string, string];
  hero: {
    titlePre: string;
    titleHighlight: string;
    titleSuffix: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    playersNote: string;
    playersLink: string;
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
    footer: string;
  };
}

const en: HomeDict = {
  badges: ["Former ATP Players", "ATP Certified Coaches", "ITF Level 2 Coaches", "Worldwide Coaching"],
  hero: {
    titlePre: "Build a stronger academy with ",
    titleHighlight: "better analysis",
    titleSuffix: "of every player.",
    subtitle:
      "We support your coaches with professional video and match analysis, tactical patterns, how points are won and lost, and clear next steps for every player, so your coaches can focus their energy on the court.",
    ctaPrimary: "Partner with us",
    ctaSecondary: "View academy packages",
    playersNote: "Training on your own?",
    playersLink: "See player plans",
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
  },
  journey: {
    eyebrow: "Your path with us",
    title: "From first video to your next win",
    steps: [
      {
        title: "See how it works",
        detail: "Players send video, we analyse it, and your coaches get clear feedback.",
        cta: "How it works",
      },
      {
        title: "Meet the coaches",
        detail: "Former ATP players and ITF Level 2 certified coaches review every submission.",
        cta: "Meet the coaches",
      },
      {
        title: "Choose your academy package",
        detail: "Packages from $550/month for clubs and academies, or season packages for a full training block.",
        cta: "See academy packages",
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
    footer: "Reviewed by Tactical Tennis Lab coaches · shared with the academy's coaching team",
  },
};

const pl: HomeDict = {
  badges: ["Byli zawodnicy ATP", "Trenerzy certyfikowani ATP", "Trenerzy ITF Level 2", "Trenerzy na całym świecie"],
  hero: {
    titlePre: "Zbuduj silniejszą akademię dzięki ",
    titleHighlight: "lepszej analizie",
    titleSuffix: "każdego zawodnika.",
    subtitle:
      "Wspieramy Twoich trenerów profesjonalną analizą wideo i meczową, wzorce taktyczne, to jak punkty są wygrywane i tracone, oraz jasne kolejne kroki dla każdego zawodnika, aby trenerzy mogli skupić energię na korcie.",
    ctaPrimary: "Zostań naszym partnerem",
    ctaSecondary: "Zobacz pakiety dla akademii",
    playersNote: "Trenujesz indywidualnie?",
    playersLink: "Zobacz plany dla zawodników",
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
  },
  journey: {
    eyebrow: "Twoja droga z nami",
    title: "Od pierwszego wideo do kolejnego zwycięstwa",
    steps: [
      {
        title: "Zobacz, jak to działa",
        detail: "Zawodnicy wysyłają wideo, my je analizujemy, a Twoi trenerzy dostają jasną informację zwrotną.",
        cta: "Jak to działa",
      },
      {
        title: "Poznaj trenerów",
        detail: "Byli zawodnicy ATP i certyfikowani trenerzy ITF Level 2 analizują każde zgłoszenie.",
        cta: "Poznaj trenerów",
      },
      {
        title: "Wybierz pakiet dla akademii",
        detail: "Pakiety od 550 USD miesięcznie dla klubów i akademii oraz pakiety sezonowe na cały blok treningowy.",
        cta: "Zobacz pakiety dla akademii",
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
    footer: "Przeanalizowane przez trenerów Tactical Tennis Lab · udostępnione zespołowi trenerskiemu akademii",
  },
};

const es: HomeDict = {
  badges: ["Exjugadores del ATP", "Entrenadores certificados por la ATP", "Entrenadores ITF Level 2", "Entrenamiento en todo el mundo"],
  hero: {
    titlePre: "Construye una academia más fuerte con ",
    titleHighlight: "mejor análisis",
    titleSuffix: "de cada jugador.",
    subtitle:
      "Apoyamos a tus entrenadores con análisis profesional de vídeo y de partidos, patrones tácticos, cómo se ganan y se pierden los puntos y próximos pasos claros para cada jugador, para que tus entrenadores concentren su energía en la pista.",
    ctaPrimary: "Colabora con nosotros",
    ctaSecondary: "Ver paquetes para academias",
    playersNote: "¿Entrenas por tu cuenta?",
    playersLink: "Ver planes para jugadores",
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
  },
  journey: {
    eyebrow: "Tu camino con nosotros",
    title: "Del primer vídeo a tu próxima victoria",
    steps: [
      {
        title: "Mira cómo funciona",
        detail: "Los jugadores envían vídeo, nosotros lo analizamos y tus entrenadores reciben comentarios claros.",
        cta: "Cómo funciona",
      },
      {
        title: "Conoce a los entrenadores",
        detail: "Exjugadores del ATP y entrenadores certificados ITF Level 2 revisan cada envío.",
        cta: "Conocer entrenadores",
      },
      {
        title: "Elige tu paquete para academias",
        detail: "Paquetes desde 550 USD al mes para clubes y academias, o paquetes de temporada para un bloque completo de entrenamiento.",
        cta: "Ver paquetes para academias",
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
    footer: "Revisado por los entrenadores de Tactical Tennis Lab · compartido con el equipo técnico de la academia",
  },
};

const it: HomeDict = {
  badges: ["Ex giocatori ATP", "Allenatori certificati ATP", "Allenatori ITF Level 2", "Coaching in tutto il mondo"],
  hero: {
    titlePre: "Costruisci un'accademia più forte con ",
    titleHighlight: "un'analisi migliore",
    titleSuffix: "di ogni giocatore.",
    subtitle:
      "Supportiamo i tuoi allenatori con analisi professionale di video e partite, schemi tattici, come si vincono e si perdono i punti e prossimi passi chiari per ogni giocatore, così i tuoi allenatori possono concentrare le energie sul campo.",
    ctaPrimary: "Collabora con noi",
    ctaSecondary: "Vedi i pacchetti per accademie",
    playersNote: "Ti alleni da solo?",
    playersLink: "Vedi i piani per giocatori",
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
  },
  journey: {
    eyebrow: "Il tuo percorso con noi",
    title: "Dal primo video alla tua prossima vittoria",
    steps: [
      {
        title: "Scopri come funziona",
        detail: "I giocatori inviano i video, noi li analizziamo e i tuoi allenatori ricevono un feedback chiaro.",
        cta: "Come funziona",
      },
      {
        title: "Conosci gli allenatori",
        detail: "Ex giocatori ATP e allenatori certificati ITF Level 2 rivedono ogni invio.",
        cta: "Conosci gli allenatori",
      },
      {
        title: "Scegli il pacchetto per la tua accademia",
        detail: "Pacchetti da 550 USD al mese per club e accademie, oppure pacchetti stagionali per un intero blocco di allenamento.",
        cta: "Vedi i pacchetti per accademie",
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
    footer: "Esaminato dagli allenatori di Tactical Tennis Lab · condiviso con lo staff tecnico dell'accademia",
  },
};

const ru: HomeDict = {
  badges: ["Бывшие игроки ATP", "Тренеры с сертификатом ATP", "Тренеры уровня ITF Level 2", "Тренировки по всему миру"],
  hero: {
    titlePre: "Постройте более сильную академию с ",
    titleHighlight: "лучшим анализом",
    titleSuffix: "каждого игрока.",
    subtitle:
      "Мы поддерживаем ваших тренеров профессиональным видеоанализом и разбором матчей, тактические паттерны, как выигрываются и проигрываются очки и понятные следующие шаги для каждого игрока,, чтобы тренеры могли направить энергию на корт.",
    ctaPrimary: "Стать партнёром",
    ctaSecondary: "Пакеты для академий",
    playersNote: "Тренируетесь самостоятельно?",
    playersLink: "Планы для игроков",
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
  },
  journey: {
    eyebrow: "Ваш путь с нами",
    title: "От первого видео до следующей победы",
    steps: [
      {
        title: "Посмотрите, как это работает",
        detail: "Игроки присылают видео, мы анализируем его, а ваши тренеры получают понятную обратную связь.",
        cta: "Как это работает",
      },
      {
        title: "Познакомьтесь с тренерами",
        detail: "Бывшие игроки ATP и сертифицированные тренеры ITF Level 2 разбирают каждую заявку.",
        cta: "Познакомиться с тренерами",
      },
      {
        title: "Выберите пакет для академии",
        detail: "Пакеты от 550 USD в месяц для клубов и академий или сезонные пакеты на весь тренировочный блок.",
        cta: "Пакеты для академий",
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
    footer: "Проверено тренерами Tactical Tennis Lab · доступно тренерской команде академии",
  },
};

export const homeDictionaries: Record<AppLocale, HomeDict> = { en, pl, es, it, ru };
