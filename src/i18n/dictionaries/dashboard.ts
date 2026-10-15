import type { AppLocale } from "@/i18n/locales";

export interface DashboardDict {
  account: {
    eyebrow: string;
    welcomeBack: string; // "Welcome back, {name}" -- {name} placeholder
    defaultTitle: string;
    yourVideos: string;
    sendVideo: string;
    noVideosTitle: string;
    noVideosDetail: string;
    viewVideo: string;
    coachFeedback: string;
    messagesTitle: string;
    messagesNote: string;
  };
  referral: {
    title: string;
    subtitle: string;
    copy: string;
    copied: string;
    friendSingular: string;
    friendPlural: string;
    referredSoFar: string; // appears after the count+friend(s) label
    status5: string;
    status2: string;
    status1: string;
    status0: string;
  };
  messages: {
    emptyAdmin: string;
    emptyCustomer: string;
    placeholder: string;
    send: string;
  };
  review: {
    pageEyebrow: string;
    pageTitle: string;
    pageSubtitle: string;
    formTitle: string;
    formSubtitle: string;
    statusPending: string;
    statusApproved: string;
    statusRejected: string;
    ratingAria: string; // "{n} star(s)" -- handled with a function below in the component instead
    bodyPlaceholder: string;
    mediaLabel: string;
    mediaOptional: string;
    remove: string;
    chooseFile: string;
    replaceFile: string;
    noFileSelected: string;
    fileTooLarge: string;
    uploadFailed: string;
    genericError: string;
    publicNote: string;
    submit: string;
    submitting: string;
    update: string;
  };
  submitVideo: {
    beforeEyebrow: string;
    beforeTitle: string;
    beforeSubtitle: string;
    processTitle: string;
    process: { title: string; detail: string }[];
    tipsTitle: string;
    tips: string[];
    readyText: string;
    createAccountCta: string;
    seePricingCta: string;
    haveAccount: string;
    signInLink: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    form: {
      titleLabel: string;
      titlePlaceholder: string;
      feedbackLabel: string;
      feedbackPlaceholder: string;
      levelFocusTitle: string;
      levelFocusSubtitle: string;
      skillLevel: string;
      primaryGoal: string;
      trainLabel: string;
      videoLabel: string;
      chooseFile: string;
      noFileSelected: string;
      chooseFileError: string;
      uploadFailedError: string;
      genericError: string;
      uploading: string; // "Uploading... {pct}%" -- {pct} placeholder
      submit: string;
    };
  };
}

const en: DashboardDict = {
  account: {
    eyebrow: "Your account",
    welcomeBack: "Welcome back, {name}",
    defaultTitle: "Your account",
    yourVideos: "Your videos",
    sendVideo: "Send a video",
    noVideosTitle: "You haven't sent any videos yet",
    noVideosDetail: "Send one to get personalized coach feedback.",
    viewVideo: "View video",
    coachFeedback: "Coach feedback",
    messagesTitle: "Messages",
    messagesNote:
      "Managing this account for a junior player? Everything here, every message, note, and piece of feedback, is visible to whoever holds this login.",
  },
  referral: {
    title: "Refer a friend",
    subtitle:
      "Share your link. Once a friend's first purchase goes through, you unlock a bigger discount on every future purchase of your own.",
    copy: "Copy",
    copied: "Copied!",
    friendSingular: "friend",
    friendPlural: "friends",
    referredSoFar: "referred so far.",
    status5: "You've got most plans free (PRO Tour capped at 40% off, Match IQ: Full capped at 50% off).",
    status2: "You have 40% off every plan. Refer 3 more (5 total) and most plans are free.",
    status1: "You have 20% off every plan. Refer 1 more for 40% off.",
    status0: "Refer 1 friend to unlock 20% off every plan.",
  },
  messages: {
    emptyAdmin: "No messages with this customer yet.",
    emptyCustomer: "No messages yet: send one below.",
    placeholder: "Type a message...",
    send: "Send",
  },
  review: {
    pageEyebrow: "Your opinion",
    pageTitle: "Leave a review",
    pageSubtitle: "Tell other players what working with your coach has been like.",
    formTitle: "Leave a review",
    formSubtitle: "Help other players decide: share what working with your coach has been like.",
    statusPending: "Awaiting approval. Thanks for your patience.",
    statusApproved: "Live on the site. Thank you!",
    statusRejected: "Not published. Feel free to update and resubmit.",
    ratingAria: "stars",
    bodyPlaceholder: "What did you work on, and what changed?",
    mediaLabel: "Photo or video",
    mediaOptional: "(optional)",
    remove: "Remove",
    chooseFile: "Choose file",
    replaceFile: "Replace file",
    noFileSelected: "No file selected",
    fileTooLarge: "File is too large (max 100MB).",
    uploadFailed: "Media upload failed. Please try again.",
    genericError: "Something went wrong.",
    publicNote: "If approved, this is shown publicly on our website with your name.",
    submit: "Submit review",
    submitting: "Submitting...",
    update: "Update review",
  },
  submitVideo: {
    beforeEyebrow: "Before you send",
    beforeTitle: "What happens when you send your video",
    beforeSubtitle: "Here's exactly what to expect: no account needed to read this part.",
    processTitle: "The process",
    process: [
      {
        title: "Send your video",
        detail: "Upload a practice or match clip, tell us your level, and what you want feedback on.",
      },
      {
        title: "Your coach reviews it personally",
        detail: "Frame by frame, by a former ATP ranked player or ITF Level 2 coach, not a template, not an algorithm.",
      },
      {
        title: "Get your analysis back",
        detail: "Clear priorities to work on, drills to practice, and the reasoning behind each note, through your account and by email.",
      },
    ],
    tipsTitle: "Tips for a great video",
    tips: [
      "Film from the side so your coach can see your full swing, footwork, and body position.",
      "Capture a few points or a short rally, a single shot doesn't show enough to work with.",
      "Steady the camera. Prop your phone against something solid, or use a tripod if you have one.",
      "Use the notes field to tell your coach exactly what you want feedback on.",
    ],
    readyText: "Ready to send yours? Pick a plan, or create a free account to get started.",
    createAccountCta: "Create account & send video",
    seePricingCta: "See pricing & what's included",
    haveAccount: "Already have an account?",
    signInLink: "Sign in",
    eyebrow: "Get feedback",
    title: "Send your video",
    subtitle: "Upload a practice or match video and our coaches will review it frame by frame and send back a personalized plan.",
    form: {
      titleLabel: "Title",
      titlePlaceholder: "e.g. Match vs. Alex, first set",
      feedbackLabel: "What do you want feedback on?",
      feedbackPlaceholder: "e.g. My serve keeps going long, and I want tips on net play.",
      levelFocusTitle: "Your level & focus",
      levelFocusSubtitle: "Help your coach see where you're at and what to work on before they watch your video.",
      skillLevel: "Skill level",
      primaryGoal: "Primary goal",
      trainLabel: "What do you want to train?",
      videoLabel: "Video",
      chooseFile: "Choose file",
      noFileSelected: "No file selected",
      chooseFileError: "Choose a video file.",
      uploadFailedError: "Upload failed.",
      genericError: "Upload failed. Please try again.",
      uploading: "Uploading... {pct}%",
      submit: "Send video",
    },
  },
};

const pl: DashboardDict = {
  account: {
    eyebrow: "Twoje konto",
    welcomeBack: "Witaj ponownie, {name}",
    defaultTitle: "Twoje konto",
    yourVideos: "Twoje wideo",
    sendVideo: "Wyślij wideo",
    noVideosTitle: "Nie wysłałeś jeszcze żadnego wideo",
    noVideosDetail: "Wyślij jedno, aby otrzymać spersonalizowaną informację zwrotną od trenera.",
    viewVideo: "Zobacz wideo",
    coachFeedback: "Informacja zwrotna trenera",
    messagesTitle: "Wiadomości",
    messagesNote:
      "Prowadzisz to konto dla juniora? Wszystko tutaj, każda wiadomość, notatka i informacja zwrotna, jest widoczne dla osoby posiadającej to logowanie.",
  },
  referral: {
    title: "Poleć znajomego",
    subtitle:
      "Udostępnij swój link. Gdy znajomy dokona pierwszego zakupu, odblokujesz większą zniżkę na każdy swój kolejny zakup.",
    copy: "Kopiuj",
    copied: "Skopiowano!",
    friendSingular: "znajomego",
    friendPlural: "znajomych",
    referredSoFar: "poleciłeś do tej pory.",
    status5: "Masz większość planów za darmo (PRO Tour ograniczone do 40% zniżki, Match IQ: Full do 50%).",
    status2: "Masz 40% zniżki na każdy plan. Poleć jeszcze 3 osoby (5 łącznie), a większość planów będzie za darmo.",
    status1: "Masz 20% zniżki na każdy plan. Poleć jeszcze 1 osobę, aby uzyskać 40%.",
    status0: "Poleć 1 znajomego, aby odblokować 20% zniżki na każdy plan.",
  },
  messages: {
    emptyAdmin: "Brak wiadomości z tym klientem.",
    emptyCustomer: "Brak wiadomości. Wyślij jedną poniżej.",
    placeholder: "Napisz wiadomość...",
    send: "Wyślij",
  },
  review: {
    pageEyebrow: "Twoja opinia",
    pageTitle: "Zostaw opinię",
    pageSubtitle: "Powiedz innym zawodnikom, jak wyglądała współpraca z Twoim trenerem.",
    formTitle: "Zostaw opinię",
    formSubtitle: "Pomóż innym zawodnikom podjąć decyzję: podziel się tym, jak wyglądała współpraca z trenerem.",
    statusPending: "Oczekuje na zatwierdzenie: dziękujemy za cierpliwość.",
    statusApproved: "Opublikowano na stronie. Dziękujemy!",
    statusRejected: "Nieopublikowane. Możesz zaktualizować i wysłać ponownie.",
    ratingAria: "gwiazdek",
    bodyPlaceholder: "Nad czym pracowałeś i co się zmieniło?",
    mediaLabel: "Zdjęcie lub wideo",
    mediaOptional: "(opcjonalnie)",
    remove: "Usuń",
    chooseFile: "Wybierz plik",
    replaceFile: "Zamień plik",
    noFileSelected: "Nie wybrano pliku",
    fileTooLarge: "Plik jest za duży (maks. 100MB).",
    uploadFailed: "Przesyłanie mediów nie powiodło się. Spróbuj ponownie.",
    genericError: "Coś poszło nie tak.",
    publicNote: "Po zatwierdzeniu opinia jest publicznie widoczna na naszej stronie wraz z Twoim imieniem.",
    submit: "Wyślij opinię",
    submitting: "Wysyłanie...",
    update: "Zaktualizuj opinię",
  },
  submitVideo: {
    beforeEyebrow: "Zanim wyślesz",
    beforeTitle: "Co się dzieje, gdy wysyłasz swoje wideo",
    beforeSubtitle: "Oto dokładnie, czego się spodziewać: nie potrzebujesz konta, aby to przeczytać.",
    processTitle: "Proces",
    process: [
      {
        title: "Wyślij swoje wideo",
        detail: "Prześlij nagranie z treningu lub meczu, podaj swój poziom i to, na czym Ci zależy.",
      },
      {
        title: "Twój trener osobiście je analizuje",
        detail: "Klatka po klatce, przez byłego zawodnika ATP lub trenera ITF Level 2, nie szablon, nie algorytm.",
      },
      {
        title: "Otrzymaj swoją analizę",
        detail: "Jasne priorytety do pracy, ćwiczenia do wykonania i uzasadnienie każdej uwagi, przez konto i mailem.",
      },
    ],
    tipsTitle: "Wskazówki dla świetnego wideo",
    tips: [
      "Nagrywaj z boku, żeby trener widział pełne wymachy, pracę nóg i pozycję ciała.",
      "Nagraj kilka piłek lub krótką wymianę, pojedyncze uderzenie to za mało, by nad czymś pracować.",
      "Trzymaj kamerę stabilnie. Oprzyj telefon o coś solidnego lub użyj statywu, jeśli go masz.",
      "W polu notatek napisz trenerowi dokładnie, o jaką informację zwrotną Ci chodzi.",
    ],
    readyText: "Gotowy, by wysłać swoje? Wybierz plan lub załóż darmowe konto, aby zacząć.",
    createAccountCta: "Załóż konto i wyślij wideo",
    seePricingCta: "Zobacz cennik i co jest w zestawie",
    haveAccount: "Masz już konto?",
    signInLink: "Zaloguj się",
    eyebrow: "Otrzymaj informację zwrotną",
    title: "Wyślij swoje wideo",
    subtitle: "Prześlij wideo z treningu lub meczu, a nasi trenerzy przeanalizują je klatka po klatce i odeślą spersonalizowany plan.",
    form: {
      titleLabel: "Tytuł",
      titlePlaceholder: "np. Mecz z Alexem, pierwszy set",
      feedbackLabel: "Na czym Ci zależy?",
      feedbackPlaceholder: "np. Mój serwis ciągle wychodzi za długi i chcę wskazówek do gry przy siatce.",
      levelFocusTitle: "Twój poziom i priorytety",
      levelFocusSubtitle: "Pomóż trenerowi zobaczyć, na jakim jesteś poziomie i nad czym pracować, zanim obejrzy Twoje wideo.",
      skillLevel: "Poziom umiejętności",
      primaryGoal: "Główny cel",
      trainLabel: "Co chcesz trenować?",
      videoLabel: "Wideo",
      chooseFile: "Wybierz plik",
      noFileSelected: "Nie wybrano pliku",
      chooseFileError: "Wybierz plik wideo.",
      uploadFailedError: "Przesyłanie nie powiodło się.",
      genericError: "Przesyłanie nie powiodło się. Spróbuj ponownie.",
      uploading: "Przesyłanie... {pct}%",
      submit: "Wyślij wideo",
    },
  },
};

const es: DashboardDict = {
  account: {
    eyebrow: "Tu cuenta",
    welcomeBack: "Bienvenido de nuevo, {name}",
    defaultTitle: "Tu cuenta",
    yourVideos: "Tus vídeos",
    sendVideo: "Enviar un vídeo",
    noVideosTitle: "Todavía no has enviado ningún vídeo",
    noVideosDetail: "Envía uno para obtener feedback personalizado de tu entrenador.",
    viewVideo: "Ver vídeo",
    coachFeedback: "Feedback del entrenador",
    messagesTitle: "Mensajes",
    messagesNote:
      "¿Gestionas esta cuenta para un jugador junior? Todo aquí, cada mensaje, nota y feedback, es visible para quien tenga este inicio de sesión.",
  },
  referral: {
    title: "Recomienda a un amigo",
    subtitle:
      "Comparte tu enlace. En cuanto la primera compra de un amigo se complete, desbloqueas un descuento mayor en cada futura compra propia.",
    copy: "Copiar",
    copied: "¡Copiado!",
    friendSingular: "amigo",
    friendPlural: "amigos",
    referredSoFar: "referidos hasta ahora.",
    status5: "Tienes la mayoría de planes gratis (PRO Tour limitado al 40% y Match IQ: Full al 50%).",
    status2: "Tienes un 40% de descuento en todos los planes. Refiere a 3 más (5 en total) y la mayoría de planes serán gratis.",
    status1: "Tienes un 20% de descuento en todos los planes. Refiere a 1 más para conseguir el 40%.",
    status0: "Refiere a 1 amigo para desbloquear un 20% de descuento en todos los planes.",
  },
  messages: {
    emptyAdmin: "Aún no hay mensajes con este cliente.",
    emptyCustomer: "Aún no hay mensajes: envía uno abajo.",
    placeholder: "Escribe un mensaje...",
    send: "Enviar",
  },
  review: {
    pageEyebrow: "Tu opinión",
    pageTitle: "Deja una opinión",
    pageSubtitle: "Cuenta a otros jugadores cómo ha sido trabajar con tu entrenador.",
    formTitle: "Deja una opinión",
    formSubtitle: "Ayuda a otros jugadores a decidir, comparte cómo ha sido trabajar con tu entrenador.",
    statusPending: "Pendiente de aprobación: gracias por tu paciencia.",
    statusApproved: "Publicada en la web. ¡Gracias!",
    statusRejected: "No publicada. Puedes actualizarla y reenviarla.",
    ratingAria: "estrellas",
    bodyPlaceholder: "¿En qué trabajaste y qué cambió?",
    mediaLabel: "Foto o vídeo",
    mediaOptional: "(opcional)",
    remove: "Eliminar",
    chooseFile: "Elegir archivo",
    replaceFile: "Reemplazar archivo",
    noFileSelected: "Ningún archivo seleccionado",
    fileTooLarge: "El archivo es demasiado grande (máx. 100MB).",
    uploadFailed: "Error al subir el archivo. Inténtalo de nuevo.",
    genericError: "Algo salió mal.",
    publicNote: "Si se aprueba, esto se muestra públicamente en nuestra web con tu nombre.",
    submit: "Enviar opinión",
    submitting: "Enviando...",
    update: "Actualizar opinión",
  },
  submitVideo: {
    beforeEyebrow: "Antes de enviar",
    beforeTitle: "Qué pasa cuando envías tu vídeo",
    beforeSubtitle: "Esto es exactamente lo que puedes esperar, no necesitas una cuenta para leer esta parte.",
    processTitle: "El proceso",
    process: [
      {
        title: "Envía tu vídeo",
        detail: "Sube un clip de entrenamiento o partido, dinos tu nivel y qué feedback quieres.",
      },
      {
        title: "Tu entrenador lo revisa personalmente",
        detail: "Fotograma a fotograma, por un exjugador del ATP o un entrenador ITF Level 2, no una plantilla, no un algoritmo.",
      },
      {
        title: "Recibe tu análisis",
        detail: "Prioridades claras en las que trabajar, ejercicios para practicar, y el razonamiento detrás de cada nota, a través de tu cuenta y por email.",
      },
    ],
    tipsTitle: "Consejos para un buen vídeo",
    tips: [
      "Graba desde el lateral para que tu entrenador vea tu swing completo, tu juego de piernas y tu posición corporal.",
      "Capta varios puntos o un peloteo corto, un solo golpe no muestra suficiente para trabajar.",
      "Mantén la cámara estable. Apoya el móvil sobre algo firme, o usa un trípode si tienes uno.",
      "Usa el campo de notas para decirle a tu entrenador exactamente qué feedback quieres.",
    ],
    readyText: "¿Listo para enviar el tuyo? Elige un plan, o crea una cuenta gratis para empezar.",
    createAccountCta: "Crear cuenta y enviar vídeo",
    seePricingCta: "Ver precios y qué incluye",
    haveAccount: "¿Ya tienes una cuenta?",
    signInLink: "Iniciar sesión",
    eyebrow: "Recibe feedback",
    title: "Envía tu vídeo",
    subtitle: "Sube un vídeo de entrenamiento o partido y nuestros entrenadores lo revisarán fotograma a fotograma y te enviarán un plan personalizado.",
    form: {
      titleLabel: "Título",
      titlePlaceholder: "ej. Partido vs. Alex, primer set",
      feedbackLabel: "¿En qué quieres feedback?",
      feedbackPlaceholder: "ej. Mi servicio sigue saliendo largo, y quiero consejos sobre el juego de red.",
      levelFocusTitle: "Tu nivel y enfoque",
      levelFocusSubtitle: "Ayuda a tu entrenador a ver en qué nivel estás y en qué trabajar antes de ver tu vídeo.",
      skillLevel: "Nivel de habilidad",
      primaryGoal: "Objetivo principal",
      trainLabel: "¿En qué quieres entrenar?",
      videoLabel: "Vídeo",
      chooseFile: "Elegir archivo",
      noFileSelected: "Ningún archivo seleccionado",
      chooseFileError: "Elige un archivo de vídeo.",
      uploadFailedError: "Error al subir el archivo.",
      genericError: "Error al subir el archivo. Inténtalo de nuevo.",
      uploading: "Subiendo... {pct}%",
      submit: "Enviar vídeo",
    },
  },
};

const it: DashboardDict = {
  account: {
    eyebrow: "Il tuo account",
    welcomeBack: "Bentornato, {name}",
    defaultTitle: "Il tuo account",
    yourVideos: "I tuoi video",
    sendVideo: "Invia un video",
    noVideosTitle: "Non hai ancora inviato nessun video",
    noVideosDetail: "Inviane uno per ricevere un feedback personalizzato dal tuo allenatore.",
    viewVideo: "Vedi video",
    coachFeedback: "Feedback dell'allenatore",
    messagesTitle: "Messaggi",
    messagesNote:
      "Gestisci questo account per un giocatore junior? Tutto qui, ogni messaggio, nota e feedback, è visibile a chi possiede questo accesso.",
  },
  referral: {
    title: "Invita un amico",
    subtitle:
      "Condividi il tuo link. Una volta completato il primo acquisto di un amico, sblocchi uno sconto maggiore su ogni tuo acquisto futuro.",
    copy: "Copia",
    copied: "Copiato!",
    friendSingular: "amico",
    friendPlural: "amici",
    referredSoFar: "invitati finora.",
    status5: "Hai la maggior parte dei piani gratis (PRO Tour limitato al 40% e Match IQ: Full al 50%).",
    status2: "Hai il 40% di sconto su ogni piano. Invita altre 3 persone (5 in totale) e la maggior parte dei piani sarà gratis.",
    status1: "Hai il 20% di sconto su ogni piano. Invita 1 altra persona per ottenere il 40%.",
    status0: "Invita 1 amico per sbloccare il 20% di sconto su ogni piano.",
  },
  messages: {
    emptyAdmin: "Ancora nessun messaggio con questo cliente.",
    emptyCustomer: "Ancora nessun messaggio: inviane uno qui sotto.",
    placeholder: "Scrivi un messaggio...",
    send: "Invia",
  },
  review: {
    pageEyebrow: "La tua opinione",
    pageTitle: "Lascia una recensione",
    pageSubtitle: "Racconta ad altri giocatori com'è stato lavorare con il tuo allenatore.",
    formTitle: "Lascia una recensione",
    formSubtitle: "Aiuta altri giocatori a decidere: condividi com'è stato lavorare con il tuo allenatore.",
    statusPending: "In attesa di approvazione: grazie per la pazienza.",
    statusApproved: "Pubblicata sul sito. Grazie!",
    statusRejected: "Non pubblicata. Sentiti libero di aggiornarla e reinviarla.",
    ratingAria: "stelle",
    bodyPlaceholder: "Su cosa hai lavorato, e cosa è cambiato?",
    mediaLabel: "Foto o video",
    mediaOptional: "(opzionale)",
    remove: "Rimuovi",
    chooseFile: "Scegli file",
    replaceFile: "Sostituisci file",
    noFileSelected: "Nessun file selezionato",
    fileTooLarge: "Il file è troppo grande (max 100MB).",
    uploadFailed: "Caricamento del file non riuscito. Riprova.",
    genericError: "Qualcosa è andato storto.",
    publicNote: "Se approvata, questa viene mostrata pubblicamente sul nostro sito con il tuo nome.",
    submit: "Invia recensione",
    submitting: "Invio in corso...",
    update: "Aggiorna recensione",
  },
  submitVideo: {
    beforeEyebrow: "Prima di inviare",
    beforeTitle: "Cosa succede quando invii il tuo video",
    beforeSubtitle: "Ecco esattamente cosa aspettarti: non serve un account per leggere questa parte.",
    processTitle: "Il processo",
    process: [
      {
        title: "Invia il tuo video",
        detail: "Carica un video di allenamento o partita, dicci il tuo livello e su cosa vuoi un feedback.",
      },
      {
        title: "Il tuo allenatore lo rivede personalmente",
        detail: "Fotogramma per fotogramma, da un ex giocatore ATP o un allenatore ITF Level 2, non un modello, non un algoritmo.",
      },
      {
        title: "Ricevi la tua analisi",
        detail: "Priorità chiare su cui lavorare, esercizi da praticare, e il ragionamento dietro ogni nota, tramite il tuo account e via email.",
      },
    ],
    tipsTitle: "Consigli per un ottimo video",
    tips: [
      "Filma di lato così il tuo allenatore può vedere tutto lo swing, il gioco di gambe e la posizione del corpo.",
      "Cattura alcuni punti o uno scambio breve, un singolo colpo non mostra abbastanza su cui lavorare.",
      "Tieni la fotocamera stabile. Appoggia il telefono a qualcosa di solido, o usa un treppiede se ne hai uno.",
      "Usa il campo note per dire al tuo allenatore esattamente su cosa vuoi un feedback.",
    ],
    readyText: "Pronto a inviare il tuo? Scegli un piano, o crea un account gratuito per iniziare.",
    createAccountCta: "Crea account e invia video",
    seePricingCta: "Vedi i prezzi e cosa è incluso",
    haveAccount: "Hai già un account?",
    signInLink: "Accedi",
    eyebrow: "Ricevi un feedback",
    title: "Invia il tuo video",
    subtitle: "Carica un video di allenamento o partita e i nostri allenatori lo rivedranno fotogramma per fotogramma inviandoti un piano personalizzato.",
    form: {
      titleLabel: "Titolo",
      titlePlaceholder: "es. Partita vs. Alex, primo set",
      feedbackLabel: "Su cosa vuoi un feedback?",
      feedbackPlaceholder: "es. Il mio servizio continua a uscire lungo, e voglio consigli sul gioco a rete.",
      levelFocusTitle: "Il tuo livello e focus",
      levelFocusSubtitle: "Aiuta il tuo allenatore a vedere a che punto sei e su cosa lavorare prima di guardare il tuo video.",
      skillLevel: "Livello di abilità",
      primaryGoal: "Obiettivo principale",
      trainLabel: "Su cosa vuoi allenarti?",
      videoLabel: "Video",
      chooseFile: "Scegli file",
      noFileSelected: "Nessun file selezionato",
      chooseFileError: "Scegli un file video.",
      uploadFailedError: "Caricamento non riuscito.",
      genericError: "Caricamento non riuscito. Riprova.",
      uploading: "Caricamento... {pct}%",
      submit: "Invia video",
    },
  },
};

const ru: DashboardDict = {
  account: {
    eyebrow: "Ваш аккаунт",
    welcomeBack: "С возвращением, {name}",
    defaultTitle: "Ваш аккаунт",
    yourVideos: "Ваши видео",
    sendVideo: "Отправить видео",
    noVideosTitle: "Вы ещё не отправили ни одного видео",
    noVideosDetail: "Отправьте одно, чтобы получить персональную обратную связь от тренера.",
    viewVideo: "Смотреть видео",
    coachFeedback: "Обратная связь тренера",
    messagesTitle: "Сообщения",
    messagesNote:
      "Ведёте этот аккаунт для юниора? Всё здесь, каждое сообщение, заметка и обратная связь, видно тому, кто владеет этим логином.",
  },
  referral: {
    title: "Пригласить друга",
    subtitle:
      "Поделитесь своей ссылкой. Как только друг совершит первую покупку, вы разблокируете большую скидку на каждую свою будущую покупку.",
    copy: "Копировать",
    copied: "Скопировано!",
    friendSingular: "друг",
    friendPlural: "друзей",
    referredSoFar: "приглашено на данный момент.",
    status5: "У вас большинство планов бесплатно (PRO Tour ограничен скидкой 40%, Match IQ: Full, 50%).",
    status2: "У вас скидка 40% на все планы. Пригласите ещё 3 (всего 5), и большинство планов станут бесплатными.",
    status1: "У вас скидка 20% на все планы. Пригласите ещё 1 человека, чтобы получить 40%.",
    status0: "Пригласите 1 друга, чтобы разблокировать скидку 20% на все планы.",
  },
  messages: {
    emptyAdmin: "С этим клиентом пока нет сообщений.",
    emptyCustomer: "Сообщений пока нет: отправьте одно ниже.",
    placeholder: "Введите сообщение...",
    send: "Отправить",
  },
  review: {
    pageEyebrow: "Ваше мнение",
    pageTitle: "Оставить отзыв",
    pageSubtitle: "Расскажите другим игрокам, каково было работать с вашим тренером.",
    formTitle: "Оставить отзыв",
    formSubtitle: "Помогите другим игрокам определиться: поделитесь опытом работы с тренером.",
    statusPending: "Ожидает подтверждения. Спасибо за терпение.",
    statusApproved: "Опубликован на сайте. Спасибо!",
    statusRejected: "Не опубликован. Вы можете обновить и отправить снова.",
    ratingAria: "звёзд",
    bodyPlaceholder: "Над чем вы работали и что изменилось?",
    mediaLabel: "Фото или видео",
    mediaOptional: "(необязательно)",
    remove: "Удалить",
    chooseFile: "Выбрать файл",
    replaceFile: "Заменить файл",
    noFileSelected: "Файл не выбран",
    fileTooLarge: "Файл слишком большой (макс. 100МБ).",
    uploadFailed: "Не удалось загрузить файл. Попробуйте ещё раз.",
    genericError: "Произошла ошибка.",
    publicNote: "После одобрения это будет опубликовано на нашем сайте вместе с вашим именем.",
    submit: "Отправить отзыв",
    submitting: "Отправка...",
    update: "Обновить отзыв",
  },
  submitVideo: {
    beforeEyebrow: "Перед отправкой",
    beforeTitle: "Что происходит, когда вы отправляете видео",
    beforeSubtitle: "Вот чего именно стоит ожидать: аккаунт не нужен, чтобы прочитать эту часть.",
    processTitle: "Процесс",
    process: [
      {
        title: "Отправьте видео",
        detail: "Загрузите ролик с тренировки или матча, укажите свой уровень и что хотите разобрать.",
      },
      {
        title: "Тренер лично разбирает его",
        detail: "Покадрово, бывшим игроком ATP или тренером ITF Level 2, не по шаблону, не алгоритмом.",
      },
      {
        title: "Получите свой анализ",
        detail: "Чёткие приоритеты для работы, упражнения для отработки и обоснование каждой заметки, через аккаунт и по email.",
      },
    ],
    tipsTitle: "Советы для хорошего видео",
    tips: [
      "Снимайте сбоку, чтобы тренер видел весь замах, работу ног и положение тела.",
      "Захватите несколько розыгрышей или короткий обмен ударами, одного удара недостаточно для разбора.",
      "Держите камеру стабильно. Обоприте телефон о устойчивую опору или используйте штатив, если он есть.",
      "В поле заметок укажите тренеру точно, что хотите разобрать.",
    ],
    readyText: "Готовы отправить своё? Выберите план или создайте бесплатный аккаунт, чтобы начать.",
    createAccountCta: "Создать аккаунт и отправить видео",
    seePricingCta: "Смотреть цены и что входит",
    haveAccount: "Уже есть аккаунт?",
    signInLink: "Войти",
    eyebrow: "Получить обратную связь",
    title: "Отправьте своё видео",
    subtitle: "Загрузите видео с тренировки или матча, и наши тренеры разберут его покадрово и пришлют персональный план.",
    form: {
      titleLabel: "Название",
      titlePlaceholder: "напр. Матч против Алекса, первый сет",
      feedbackLabel: "Что вы хотите разобрать?",
      feedbackPlaceholder: "напр. Моя подача постоянно уходит в аут, хочу советы по игре у сетки.",
      levelFocusTitle: "Ваш уровень и фокус",
      levelFocusSubtitle: "Помогите тренеру увидеть, на каком вы уровне и над чем работать, прежде чем он посмотрит ваше видео.",
      skillLevel: "Уровень игры",
      primaryGoal: "Основная цель",
      trainLabel: "Что вы хотите тренировать?",
      videoLabel: "Видео",
      chooseFile: "Выбрать файл",
      noFileSelected: "Файл не выбран",
      chooseFileError: "Выберите видеофайл.",
      uploadFailedError: "Загрузка не удалась.",
      genericError: "Загрузка не удалась. Попробуйте ещё раз.",
      uploading: "Загрузка... {pct}%",
      submit: "Отправить видео",
    },
  },
};

export const dashboardDictionaries: Record<AppLocale, DashboardDict> = { en, pl, es, it, ru };
