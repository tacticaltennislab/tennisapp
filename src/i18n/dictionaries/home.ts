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
    tagline: string;
    footageCaption: string;
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
  beforeAfter: {
    eyebrow: string;
    title: string;
    lead: string;
    before: string;
    after: string;
    beforeText: string;
    afterText: string;
    caption: string;
    legend: string;
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
    observedTitle: string;
    observed: string[];
    priorityTitle: string;
    priority: string;
    recommendedTitle: string;
    recommended: string[];
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
      "Video and match analysis for tennis academies, reviewed frame by frame by former ATP players and ITF Level 2 coaches.",
    ctaPrimary: "Partner with us",
    ctaSecondary: "View academy packages",
    playersNote: "Training on your own?",
    playersLink: "See player plans",
    tagline: "Real tennis. Expert analysis. Better decisions on court.",
    footageCaption: "Stock photograph for illustration, not a client session.",
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
  beforeAfter: {
    eyebrow: "Tactical analysis",
    title: "Spot the pattern. Then change it.",
    lead: "One second serve pattern, before and after the coach's recommendation.",
    before: "Before",
    after: "After",
    beforeText: "Every second serve lands in the same zone. The returner knows where to stand and attacks early.",
    afterText: "Placement is mixed between the T, the body and wide. The returner can no longer prepare for a single target.",
    caption: "Illustration of one pattern. A real analysis shows patterns from your own match footage.",
    legend: "Dots show where each second serve landed. Filled circle: server. Open circle: returner.",
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
    eyebrow: "What you receive",
    titleLine1: "A report your coaches can use.",
    titleLine2: "Observation first. Recommendation second.",
  },
  sampleAnalysis: {
    badge: "Illustrative example",
    reportTitle: "Match analysis report",
    meta: "Singles match · hard court · illustrative",
    player: "Player A · U16 · right handed baseline player",
    observedTitle: "Observed",
    observed: ["Second serves land in the same zone, so the returner steps in early.", "Direction changes come late in cross court rallies.", "The first strike to the open court after a serve is a clear strength."],
    priorityTitle: "Priority",
    priority: "Make the second serve harder to read.",
    recommendedTitle: "Recommended next step",
    recommended: ["Add second serve variations to the body and wide.", "Drill: change direction down the line on the first neutral ball."],
    courtTitle: "Second serve placement",
    courtNote: "Each dot is one second serve in this example. Filled circle: server. Open circle: returner.",
    footer: "Illustrative example, not a real client report. Real reports are written by Tactical Tennis Lab coaches from your own footage.",
  },
};

const pl: HomeDict = {
  badges: ["Byli zawodnicy ATP", "Trenerzy certyfikowani ATP", "Trenerzy ITF Level 2", "Trenerzy na całym świecie"],
  hero: {
    title: "Zrozum każdy punkt.",
    subtitle:
      "Analiza wideo i meczów dla akademii tenisowych, przeglądana klatka po klatce przez byłych zawodników ATP i trenerów ITF Level 2.",
    ctaPrimary: "Zostań naszym partnerem",
    ctaSecondary: "Zobacz pakiety dla akademii",
    playersNote: "Trenujesz indywidualnie?",
    playersLink: "Zobacz plany dla zawodników",
    tagline: "Prawdziwy tenis. Ekspercka analiza. Lepsze decyzje na korcie.",
    footageCaption: "Zdjęcie stockowe dla ilustracji, nie sesja klienta.",
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
  beforeAfter: {
    eyebrow: "Analiza taktyczna",
    title: "Dostrzeż wzorzec. Potem go zmień.",
    lead: "Jeden wzorzec drugiego serwisu przed rekomendacją trenera i po niej.",
    before: "Przed",
    after: "Po",
    beforeText: "Każdy drugi serwis ląduje w tej samej strefie. Odbierający wie, gdzie stanąć, i atakuje wcześnie.",
    afterText: "Miejsce lądowania jest zróżnicowane: T, ciało i szeroko. Odbierający nie może już przygotować się na jeden cel.",
    caption: "Ilustracja jednego wzorca. Prawdziwa analiza pokazuje wzorce z Twojego własnego nagrania meczu.",
    legend: "Kropki pokazują, gdzie wylądował każdy drugi serwis. Pełne koło: serwujący. Puste koło: odbierający.",
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
    eyebrow: "Co otrzymujesz",
    titleLine1: "Raport, z którego trenerzy mogą korzystać.",
    titleLine2: "Najpierw obserwacja. Potem rekomendacja.",
  },
  sampleAnalysis: {
    badge: "Przykład poglądowy",
    reportTitle: "Raport z analizy meczu",
    meta: "Mecz singlowy · twarda nawierzchnia · poglądowo",
    player: "Zawodnik A · U16 · praworęczny, gra z głębi kortu",
    observedTitle: "Zaobserwowano",
    observed: ["Drugie serwisy lądują w tej samej strefie, więc odbierający wchodzi w kort od razu.", "Zmiany kierunku w wymianach po przekątnej następują zbyt późno.", "Pierwsze uderzenie w otwarty kort po serwisie jest wyraźnym atutem."],
    priorityTitle: "Priorytet",
    priority: "Utrudnić odczytanie drugiego serwisu.",
    recommendedTitle: "Zalecany następny krok",
    recommended: ["Dodać warianty drugiego serwisu w ciało i szeroko.", "Ćwiczenie: zmiana kierunku po linii przy pierwszej neutralnej piłce."],
    courtTitle: "Rozmieszczenie drugiego serwisu",
    courtNote: "Każda kropka to jeden drugi serwis w tym przykładzie. Pełne koło: serwujący. Puste koło: odbierający.",
    footer: "Przykład poglądowy, nie raport prawdziwego klienta. Prawdziwe raporty piszą trenerzy Tactical Tennis Lab na podstawie Twoich nagrań.",
  },
};

const es: HomeDict = {
  badges: ["Exjugadores del ATP", "Entrenadores certificados por la ATP", "Entrenadores ITF Level 2", "Entrenamiento en todo el mundo"],
  hero: {
    title: "Entiende cada punto.",
    subtitle:
      "Análisis de vídeo y de partidos para academias de tenis, revisado fotograma a fotograma por exjugadores ATP y entrenadores ITF Level 2.",
    ctaPrimary: "Colabora con nosotros",
    ctaSecondary: "Ver paquetes para academias",
    playersNote: "¿Entrenas por tu cuenta?",
    playersLink: "Ver planes para jugadores",
    tagline: "Tenis real. Análisis experto. Mejores decisiones en la pista.",
    footageCaption: "Fotografía de archivo a modo de ilustración, no una sesión de un cliente.",
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
  beforeAfter: {
    eyebrow: "Análisis táctico",
    title: "Detecta el patrón. Luego cámbialo.",
    lead: "Un patrón de segundo saque, antes y después de la recomendación del entrenador.",
    before: "Antes",
    after: "Después",
    beforeText: "Cada segundo saque cae en la misma zona. El restador sabe dónde colocarse y ataca pronto.",
    afterText: "La colocación se reparte entre la T, el cuerpo y abierto. El restador ya no puede prepararse para un único objetivo.",
    caption: "Ilustración de un patrón. Un análisis real muestra patrones de las imágenes de tu propio partido.",
    legend: "Los puntos muestran dónde cayó cada segundo saque. Círculo lleno: sacador. Círculo vacío: restador.",
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
    eyebrow: "Lo que recibes",
    titleLine1: "Un informe que tus entrenadores pueden usar.",
    titleLine2: "Primero la observación. Después la recomendación.",
  },
  sampleAnalysis: {
    badge: "Ejemplo ilustrativo",
    reportTitle: "Informe de análisis de partido",
    meta: "Partido individual · pista dura · ilustrativo",
    player: "Jugador A · U16 · diestro, juega desde el fondo",
    observedTitle: "Observado",
    observed: ["Los segundos saques caen en la misma zona, así que el restador entra pronto.", "Los cambios de dirección en los intercambios cruzados llegan tarde.", "El primer golpe a la pista abierta tras el saque es una clara fortaleza."],
    priorityTitle: "Prioridad",
    priority: "Hacer el segundo saque más difícil de leer.",
    recommendedTitle: "Siguiente paso recomendado",
    recommended: ["Añadir variaciones de segundo saque al cuerpo y abiertas.", "Ejercicio: cambio de dirección paralelo en la primera bola neutra."],
    courtTitle: "Colocación del segundo saque",
    courtNote: "Cada punto es un segundo saque en este ejemplo. Círculo lleno: sacador. Círculo vacío: restador.",
    footer: "Ejemplo ilustrativo, no es el informe de un cliente real. Los informes reales los redactan los entrenadores de Tactical Tennis Lab a partir de tus propias imágenes.",
  },
};

const it: HomeDict = {
  badges: ["Ex giocatori ATP", "Allenatori certificati ATP", "Allenatori ITF Level 2", "Coaching in tutto il mondo"],
  hero: {
    title: "Capisci ogni punto.",
    subtitle:
      "Analisi video e delle partite per accademie di tennis, rivista fotogramma per fotogramma da ex giocatori ATP e allenatori ITF Level 2.",
    ctaPrimary: "Collabora con noi",
    ctaSecondary: "Vedi i pacchetti per accademie",
    playersNote: "Ti alleni da solo?",
    playersLink: "Vedi i piani per giocatori",
    tagline: "Tennis vero. Analisi esperta. Decisioni migliori in campo.",
    footageCaption: "Fotografia di repertorio a scopo illustrativo, non una sessione di un cliente.",
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
  beforeAfter: {
    eyebrow: "Analisi tattica",
    title: "Individua lo schema. Poi cambialo.",
    lead: "Uno schema di seconda di servizio, prima e dopo la raccomandazione dell'allenatore.",
    before: "Prima",
    after: "Dopo",
    beforeText: "Ogni seconda di servizio cade nella stessa zona. Chi risponde sa dove posizionarsi e attacca presto.",
    afterText: "La posizione è variata tra la T, il corpo e il largo. Chi risponde non può più prepararsi a un solo bersaglio.",
    caption: "Illustrazione di uno schema. Un'analisi reale mostra schemi dai filmati della tua partita.",
    legend: "I punti mostrano dove è caduta ogni seconda di servizio. Cerchio pieno: chi serve. Cerchio vuoto: chi risponde.",
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
    eyebrow: "Cosa ricevi",
    titleLine1: "Un report che i tuoi allenatori possono usare.",
    titleLine2: "Prima l'osservazione. Poi la raccomandazione.",
  },
  sampleAnalysis: {
    badge: "Esempio illustrativo",
    reportTitle: "Report di analisi della partita",
    meta: "Singolare · cemento · illustrativo",
    player: "Giocatore A · U16 · destrimane, gioca da fondo campo",
    observedTitle: "Osservato",
    observed: ["Le seconde di servizio cadono nella stessa zona, quindi chi risponde entra subito in campo.", "I cambi di direzione negli scambi incrociati arrivano tardi.", "Il primo colpo nel campo aperto dopo il servizio è un chiaro punto di forza."],
    priorityTitle: "Priorità",
    priority: "Rendere la seconda di servizio più difficile da leggere.",
    recommendedTitle: "Prossimo passo consigliato",
    recommended: ["Aggiungere varianti di seconda al corpo e sul largo.", "Esercizio: cambio di direzione lungolinea sulla prima palla neutra."],
    courtTitle: "Posizione della seconda di servizio",
    courtNote: "Ogni punto è una seconda di servizio in questo esempio. Cerchio pieno: chi serve. Cerchio vuoto: chi risponde.",
    footer: "Esempio illustrativo, non il report di un cliente reale. I report reali sono scritti dagli allenatori di Tactical Tennis Lab a partire dai tuoi filmati.",
  },
};

const ru: HomeDict = {
  badges: ["Бывшие игроки ATP", "Тренеры с сертификатом ATP", "Тренеры уровня ITF Level 2", "Тренировки по всему миру"],
  hero: {
    title: "Понимайте каждое очко.",
    subtitle:
      "Видеоанализ и разбор матчей для теннисных академий: кадр за кадром, силами бывших игроков ATP и тренеров ITF Level 2.",
    ctaPrimary: "Стать партнёром",
    ctaSecondary: "Пакеты для академий",
    playersNote: "Тренируетесь самостоятельно?",
    playersLink: "Планы для игроков",
    tagline: "Настоящий теннис. Экспертный анализ. Лучшие решения на корте.",
    footageCaption: "Стоковое фото для иллюстрации, а не занятие клиента.",
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
  beforeAfter: {
    eyebrow: "Тактический анализ",
    title: "Заметьте закономерность. Затем измените её.",
    lead: "Одна схема второй подачи до и после рекомендации тренера.",
    before: "До",
    after: "После",
    beforeText: "Каждая вторая подача падает в одну и ту же зону. Принимающий знает, где встать, и атакует рано.",
    afterText: "Места падения чередуются: в T, в корпус и широко. Принимающий больше не может готовиться к одной цели.",
    caption: "Иллюстрация одной схемы. Настоящий анализ показывает закономерности на видео ваших собственных матчей.",
    legend: "Точки показывают, куда упала каждая вторая подача. Закрашенный круг: подающий. Пустой круг: принимающий.",
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
    eyebrow: "Что вы получаете",
    titleLine1: "Отчёт, с которым могут работать ваши тренеры.",
    titleLine2: "Сначала наблюдение. Затем рекомендация.",
  },
  sampleAnalysis: {
    badge: "Иллюстративный пример",
    reportTitle: "Отчёт об анализе матча",
    meta: "Одиночный матч · хард · иллюстрация",
    player: "Игрок A · U16 · правша, играет с задней линии",
    observedTitle: "Наблюдение",
    observed: ["Вторые подачи падают в одну зону, поэтому принимающий сразу заходит в корт.", "Смена направления в розыгрышах по диагонали происходит поздно.", "Первый удар в открытый корт после подачи является явной сильной стороной."],
    priorityTitle: "Приоритет",
    priority: "Сделать вторую подачу менее предсказуемой.",
    recommendedTitle: "Рекомендуемый следующий шаг",
    recommended: ["Добавить варианты второй подачи в корпус и широко.", "Упражнение: смена направления по линии на первом нейтральном мяче."],
    courtTitle: "Расположение второй подачи",
    courtNote: "Каждая точка: одна вторая подача в этом примере. Закрашенный круг: подающий. Пустой круг: принимающий.",
    footer: "Иллюстративный пример, а не отчёт реального клиента. Настоящие отчёты пишут тренеры Tactical Tennis Lab по вашим собственным видео.",
  },
};

export const homeDictionaries: Record<AppLocale, HomeDict> = { en, pl, es, it, ru };
