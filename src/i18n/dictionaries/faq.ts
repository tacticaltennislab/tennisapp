import type { AppLocale } from "@/i18n/locales";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  title: string;
  items: FaqItem[];
}

export interface FaqDict {
  pageHeader: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  categories: FaqCategory[];
}

const en: FaqDict = {
  pageHeader: {
    eyebrow: "Help",
    title: "Frequently asked questions",
    subtitle:
      "Common questions from academies, parents and players. Can't find what you need? Ask the Quick questions widget or email tacticaltennislab@gmail.com.",
  },
  categories: [
    {
      title: "For academies & clubs",
      items: [
        {
          question: "How does it work for an academy?",
          answer:
            "Your academy gets its own account, which we set up once the partnership is agreed. The owner invites coaches and players by email. Players upload practice or match videos from their own accounts, a real coach — a former ATP-ranked player or ITF Level 2 certified coach — analyses them, and the feedback appears in your academy dashboard for your coaches and the player.",
        },
        {
          question: "Do you replace our coaches?",
          answer:
            "No. We're a support system for your coaches. We take on the time-consuming video and match analysis so they can spend their energy on court, and we work alongside them rather than in their place.",
        },
        {
          question: "What do the academy packages include?",
          answer:
            "Club Starter ($550/month) covers 5–8 analyses per month, Academy Standard ($1,100/month) 10–15 plus a dedicated contact, and High Performance Club ($1,950/month) 20+ with priority support and shared training plans. Season packages cover 40–50 analyses over 3 months ($5,500) or 80–90 over 6 months ($9,500). See /pricing for details.",
        },
        {
          question: "Who can see our players' videos?",
          answer:
            "The player's own account, the coaches in your academy and our coaches. Players join an academy only by accepting an invitation, which gives you a clear record of consent — important for minors. Your coaches can review videos and leave feedback, but only our team can delete a video.",
        },
        {
          question: "How do we get started?",
          answer:
            "Choose a package on /pricing or contact us at /contact. Once the partnership is agreed we create your academy account and email an invitation to your owner.",
        },
      ],
    },
    {
      title: "Getting started",
      items: [
        {
          question: "How does it work for an individual player?",
          answer:
            "You create an account, send a practice or match video along with what you want feedback on, and a real coach — a former ATP-ranked player or ITF Level 2 certified coach — personally reviews it frame by frame. Nothing is auto-generated. You get your analysis and a plan back through your account and by email.",
        },
        {
          question: "What kind of video should I send?",
          answer:
            "Film from the side so your coach can see your full swing, footwork, and body position. Capture a few points or a short rally rather than a single shot, and keep the camera steady — prop your phone against something solid or use a tripod. Use the notes field to say exactly what you want feedback on.",
        },
        {
          question: "Do I need an account to send a video?",
          answer:
            "Yes. Submitting a video, messaging a coach, and purchasing a plan all require an account, since your videos, feedback, and messages are tied to it.",
        },
        {
          question: "Is this for academies or individual players?",
          answer:
            "Both. Academies and clubs are our main focus — we support their coaches with video and match analysis. Individual players are welcome too and can send a video and choose a one-time or monthly plan.",
        },
      ],
    },
    {
      title: "Individual player plans & pricing",
      items: [
        {
          question: "What plans do you offer?",
          answer:
            "Stroke Fix ($49, one-time) is a focused technical breakdown of one issue. Smart System ($99) is a 4-week development program for one stroke. Match IQ comes in Short ($99, up to 60 minutes of footage) and Full ($159, up to a full match). PRO Tour ($249/month) is ongoing coaching with up to 4 analyses a month and direct coach access.",
        },
        {
          question: "Do prices include tax?",
          answer: "No. All prices are listed in USD, and we don't add VAT or sales tax at checkout.",
        },
        {
          question: "Can I cancel PRO Tour anytime?",
          answer:
            "Yes. Cancel anytime from your account — it takes effect at the end of your current billing period, and you keep access until then. We don't offer partial refunds for unused time in a billing period.",
        },
        {
          question: "What's your refund policy?",
          answer:
            "For one-time plans, you can get a full refund before a coach has started your analysis; once analysis begins, EU/EEA/UK consumers' 14-day right of withdrawal ends, since the service starts performing immediately at your request. For PRO Tour, you can withdraw within 14 days of first subscribing, minus the value of any analysis already delivered. Email tacticaltennislab@gmail.com to request a refund or see the full terms at /terms.",
        },
      ],
    },
    {
      title: "For parents & junior players",
      items: [
        {
          question: "Can my child have their own account?",
          answer:
            "Players must be at least 16 to create an account. For players under 18, a parent or guardian creates and manages the account on their behalf.",
        },
        {
          question: "Can I see everything my child sends or receives?",
          answer:
            "Yes. There's only one login per account, so every video, coach note, and message passes through that single account and is visible to whoever holds it — there's no separate or hidden channel between a coach and a minor.",
        },
        {
          question: "Is my child's data safe?",
          answer:
            "We collect only what's needed to provide the service, never sell personal data, and don't use it for advertising. Full details, including your rights under GDPR, are at /privacy.",
        },
      ],
    },
    {
      title: "Referrals",
      items: [
        {
          question: "How do referral discounts work?",
          answer:
            "Share your personal referral link, found on your account page. A referral counts once the person you referred completes their first paid purchase. 1 successful referral unlocks 20% off your own future purchases, 2 unlocks 40%, and 5 unlocks most plans free (PRO Tour is capped at 40% off and Match IQ: Full at 50%, even at higher referral counts). Discounts apply automatically at checkout.",
        },
      ],
    },
    {
      title: "Coaches & quality",
      items: [
        {
          question: "Is my analysis written by AI?",
          answer:
            "No. Every plan and piece of feedback is built personally by one of our coaches — former ATP-ranked players and ITF Level 2 certified coaches — based on your video and goals. The \"Quick questions\" chat widget on the site is a separate AI assistant that only answers simple questions about pricing and policies; it doesn't review video or give coaching advice.",
        },
        {
          question: "Can I leave a review?",
          answer:
            "Yes — go to /review (also linked in the footer). Reviews are checked by an admin before they appear publicly, so you won't see it on the homepage immediately.",
        },
      ],
    },
  ],
};

const pl: FaqDict = {
  pageHeader: {
    eyebrow: "Pomoc",
    title: "Najczęściej zadawane pytania",
    subtitle:
      "Częste pytania akademii, rodziców i zawodników. Nie znalazłeś odpowiedzi? Zapytaj widżet Szybkie pytania lub napisz na tacticaltennislab@gmail.com.",
  },
  categories: [
    {
      title: "Dla akademii i klubów",
      items: [
        {
          question: "Jak to działa w przypadku akademii?",
          answer:
            "Twoja akademia dostaje własne konto, które zakładamy po uzgodnieniu współpracy. Właściciel zaprasza trenerów i zawodników e-mailem. Zawodnicy przesyłają nagrania treningów lub meczów ze swoich kont, prawdziwy trener — były zawodnik ATP lub certyfikowany trener ITF Level 2 — je analizuje, a informacja zwrotna pojawia się w panelu akademii dla Twoich trenerów i zawodnika.",
        },
        {
          question: "Czy zastępujecie naszych trenerów?",
          answer:
            "Nie. Jesteśmy systemem wsparcia dla Twoich trenerów. Bierzemy na siebie czasochłonną analizę wideo i meczową, aby mogli poświęcić energię pracy na korcie, i działamy razem z nimi, a nie zamiast nich.",
        },
        {
          question: "Co zawierają pakiety dla akademii?",
          answer:
            "Club Starter (550 USD/miesiąc) to 5–8 analiz miesięcznie, Academy Standard (1100 USD/miesiąc) to 10–15 analiz i dedykowana osoba kontaktowa, a High Performance Club (1950 USD/miesiąc) to ponad 20 analiz, priorytetowe wsparcie i wspólne plany treningowe. Pakiety sezonowe obejmują 40–50 analiz w 3 miesiące (5500 USD) lub 80–90 w 6 miesięcy (9500 USD). Szczegóły na /pricing.",
        },
        {
          question: "Kto widzi filmy naszych zawodników?",
          answer:
            "Konto samego zawodnika, trenerzy Twojej akademii i nasi trenerzy. Zawodnicy dołączają do akademii wyłącznie po przyjęciu zaproszenia, co daje jasny zapis zgody — ważny w przypadku niepełnoletnich. Twoi trenerzy mogą oceniać filmy i zostawiać opinie, ale usunąć film może tylko nasz zespół.",
        },
        {
          question: "Jak zacząć?",
          answer:
            "Wybierz pakiet na /pricing lub napisz do nas przez /contact. Po uzgodnieniu współpracy zakładamy konto akademii i wysyłamy zaproszenie e-mailem do właściciela.",
        },
      ],
    },
    {
      title: "Pierwsze kroki",
      items: [
        {
          question: "Jak to działa dla zawodnika indywidualnego?",
          answer:
            "Zakładasz konto, wysyłasz wideo z treningu lub meczu wraz z informacją, na czym Ci zależy, a prawdziwy trener — były zawodnik ATP lub certyfikowany trener ITF Level 2 — osobiście analizuje je klatka po klatce. Nic nie jest generowane automatycznie. Analizę i plan otrzymujesz przez konto i mailem.",
        },
        {
          question: "Jakie wideo powinienem wysłać?",
          answer:
            "Nagrywaj z boku, żeby trener widział pełne wymachy, pracę nóg i pozycję ciała. Nagraj kilka piłek lub krótką wymianę, a nie pojedyncze uderzenie, i trzymaj kamerę stabilnie — oprzyj telefon o coś solidnego lub użyj statywu. W polu notatek napisz dokładnie, o jaką informację zwrotną Ci chodzi.",
        },
        {
          question: "Czy potrzebuję konta, żeby wysłać wideo?",
          answer:
            "Tak. Wysłanie wideo, wiadomość do trenera i zakup planu wymagają konta, ponieważ Twoje wideo, informacje zwrotne i wiadomości są z nim powiązane.",
        },
        {
          question: "Czy to dla akademii, czy dla indywidualnych zawodników?",
          answer:
            "Dla obu. Akademie i kluby są naszym głównym celem — wspieramy ich trenerów analizą wideo i meczową. Zawodnicy indywidualni też są mile widziani i mogą wysłać wideo oraz wybrać plan jednorazowy lub miesięczny.",
        },
      ],
    },
    {
      title: "Plany indywidualne i ceny",
      items: [
        {
          question: "Jakie plany oferujecie?",
          answer:
            "Stroke Fix (49 USD, jednorazowo) to skoncentrowana analiza techniczna jednego problemu. Smart System (99 USD) to 4-tygodniowy program rozwoju jednego uderzenia. Match IQ jest dostępne w wersji Short (99 USD, do 60 minut nagrania) i Full (159 USD, do pełnego meczu). PRO Tour (249 USD/miesiąc) to ciągły coaching z do 4 analizami miesięcznie i bezpośrednim kontaktem z trenerem.",
        },
        {
          question: "Czy ceny zawierają podatek?",
          answer: "Nie. Wszystkie ceny podane są w USD, a przy płatności nie doliczamy VAT ani podatku od sprzedaży.",
        },
        {
          question: "Czy mogę anulować PRO Tour w dowolnym momencie?",
          answer:
            "Tak. Anuluj w dowolnym momencie z poziomu konta — anulowanie wchodzi w życie na koniec bieżącego okresu rozliczeniowego, a dostęp zachowujesz do tego czasu. Nie oferujemy częściowych zwrotów za niewykorzystany czas w okresie rozliczeniowym.",
        },
        {
          question: "Jaka jest Wasza polityka zwrotów?",
          answer:
            "W przypadku planów jednorazowych pełny zwrot przysługuje przed rozpoczęciem analizy przez trenera; po jej rozpoczęciu 14-dniowe prawo do odstąpienia dla konsumentów z UE/EOG/UK wygasa, ponieważ usługa zaczyna być realizowana natychmiast na Twoje żądanie. W przypadku PRO Tour możesz odstąpić w ciągu 14 dni od pierwszej subskrypcji, pomniejszone o wartość już dostarczonej analizy. Napisz na tacticaltennislab@gmail.com, aby poprosić o zwrot, lub zobacz pełny regulamin na /terms.",
        },
      ],
    },
    {
      title: "Dla rodziców i zawodników juniorskich",
      items: [
        {
          question: "Czy moje dziecko może mieć własne konto?",
          answer:
            "Zawodnicy muszą mieć co najmniej 16 lat, aby założyć konto. Dla zawodników poniżej 18 lat konto zakłada i prowadzi rodzic lub opiekun w ich imieniu.",
        },
        {
          question: "Czy widzę wszystko, co moje dziecko wysyła i otrzymuje?",
          answer:
            "Tak. Konto ma tylko jedno logowanie, więc każde wideo, notatka trenera i wiadomość przechodzą przez to jedno konto i są widoczne dla osoby, która je posiada — nie ma osobnego ani ukrytego kanału między trenerem a niepełnoletnim.",
        },
        {
          question: "Czy dane mojego dziecka są bezpieczne?",
          answer:
            "Zbieramy tylko to, co potrzebne do świadczenia usługi, nigdy nie sprzedajemy danych osobowych i nie wykorzystujemy ich do reklamy. Pełne informacje, w tym Twoje prawa wynikające z RODO, znajdziesz na /privacy.",
        },
      ],
    },
    {
      title: "Polecenia",
      items: [
        {
          question: "Jak działają zniżki za polecenie?",
          answer:
            "Udostępnij swój osobisty link polecający, dostępny na stronie konta. Polecenie liczy się, gdy osoba, którą poleciłeś, dokona pierwszego płatnego zakupu. 1 udane polecenie odblokowuje 20% zniżki na Twoje kolejne zakupy, 2 — 40%, a 5 — większość planów za darmo (PRO Tour jest ograniczone do 40% zniżki, a Match IQ: Full do 50%, nawet przy większej liczbie poleceń). Zniżki stosują się automatycznie przy płatności.",
        },
      ],
    },
    {
      title: "Trenerzy i jakość",
      items: [
        {
          question: "Czy moja analiza jest pisana przez AI?",
          answer:
            "Nie. Każdy plan i każda informacja zwrotna są tworzone osobiście przez jednego z naszych trenerów — byłych zawodników ATP i certyfikowanych trenerów ITF Level 2 — na podstawie Twojego wideo i celów. Widżet czatu \"Szybkie pytania\" na stronie to osobny asystent AI, który odpowiada wyłącznie na proste pytania o ceny i zasady; nie analizuje wideo ani nie udziela porad trenerskich.",
        },
        {
          question: "Czy mogę zostawić opinię?",
          answer:
            "Tak — przejdź na /review (link znajduje się też w stopce). Opinie są sprawdzane przez administratora, zanim pojawią się publicznie, więc nie zobaczysz jej na stronie głównej od razu.",
        },
      ],
    },
  ],
};

const es: FaqDict = {
  pageHeader: {
    eyebrow: "Ayuda",
    title: "Preguntas frecuentes",
    subtitle:
      "Preguntas habituales de academias, padres y jugadores. ¿No encuentras lo que buscas? Pregunta al widget de Preguntas rápidas o escribe a tacticaltennislab@gmail.com.",
  },
  categories: [
    {
      title: "Para academias y clubes",
      items: [
        {
          question: "¿Cómo funciona para una academia?",
          answer:
            "Tu academia tiene su propia cuenta, que creamos cuando se acuerda la colaboración. El propietario invita a entrenadores y jugadores por correo electrónico. Los jugadores suben vídeos de entrenamientos o partidos desde sus propias cuentas, un entrenador real — un exjugador del ATP o un entrenador certificado ITF Level 2 — los analiza, y el feedback aparece en el panel de la academia para tus entrenadores y el jugador.",
        },
        {
          question: "¿Sustituís a nuestros entrenadores?",
          answer:
            "No. Somos un sistema de apoyo para tus entrenadores. Nos encargamos del análisis de vídeo y de partidos, que requiere mucho tiempo, para que puedan dedicar su energía a la pista, y trabajamos junto a ellos, no en su lugar.",
        },
        {
          question: "¿Qué incluyen los paquetes para academias?",
          answer:
            "Club Starter (550 USD/mes) incluye 5–8 análisis al mes, Academy Standard (1100 USD/mes) 10–15 más una persona de contacto dedicada, y High Performance Club (1950 USD/mes) más de 20 con soporte prioritario y planes de entrenamiento compartidos. Los paquetes de temporada cubren 40–50 análisis en 3 meses (5500 USD) u 80–90 en 6 meses (9500 USD). Consulta los detalles en /pricing.",
        },
        {
          question: "¿Quién puede ver los vídeos de nuestros jugadores?",
          answer:
            "La propia cuenta del jugador, los entrenadores de tu academia y nuestros entrenadores. Los jugadores se unen a una academia solo aceptando una invitación, lo que deja un registro claro de consentimiento, importante en el caso de menores. Tus entrenadores pueden revisar vídeos y dejar comentarios, pero solo nuestro equipo puede eliminar un vídeo.",
        },
        {
          question: "¿Cómo empezamos?",
          answer:
            "Elige un paquete en /pricing o escríbenos en /contact. Cuando se acuerde la colaboración, creamos la cuenta de tu academia y enviamos una invitación por correo al propietario.",
        },
      ],
    },
    {
      title: "Primeros pasos",
      items: [
        {
          question: "¿Cómo funciona para un jugador individual?",
          answer:
            "Creas una cuenta, envías un vídeo de entrenamiento o partido junto con lo que quieres que se revise, y un entrenador real — un exjugador del ATP o un entrenador certificado ITF Level 2 — lo revisa personalmente fotograma a fotograma. Nada se genera automáticamente. Recibes tu análisis y un plan a través de tu cuenta y por email.",
        },
        {
          question: "¿Qué tipo de vídeo debería enviar?",
          answer:
            "Graba desde el lateral para que tu entrenador pueda ver tu swing completo, tu juego de piernas y tu posición corporal. Capta varios puntos o un peloteo corto en lugar de un solo golpe, y mantén la cámara estable — apoya el móvil sobre algo firme o usa un trípode. Usa el campo de notas para decir exactamente qué feedback quieres.",
        },
        {
          question: "¿Necesito una cuenta para enviar un vídeo?",
          answer:
            "Sí. Enviar un vídeo, escribir a un entrenador y comprar un plan requieren una cuenta, ya que tus vídeos, feedback y mensajes están vinculados a ella.",
        },
        {
          question: "¿Es para academias o para jugadores individuales?",
          answer:
            "Para ambos. Las academias y los clubes son nuestro foco principal: apoyamos a sus entrenadores con análisis de vídeo y de partidos. Los jugadores individuales también son bienvenidos y pueden enviar un vídeo y elegir un plan puntual o mensual.",
        },
      ],
    },
    {
      title: "Planes individuales y precios",
      items: [
        {
          question: "¿Qué planes ofrecéis?",
          answer:
            "Stroke Fix ($49, pago único) es un análisis técnico enfocado de un problema. Smart System ($99) es un programa de desarrollo de 4 semanas para un golpe. Match IQ viene en Short ($99, hasta 60 minutos de vídeo) y Full ($159, hasta un partido completo). PRO Tour ($249/mes) es coaching continuo con hasta 4 análisis al mes y acceso directo al entrenador.",
        },
        {
          question: "¿Los precios incluyen impuestos?",
          answer: "No. Todos los precios están en USD, y no añadimos IVA ni impuesto de ventas al finalizar la compra.",
        },
        {
          question: "¿Puedo cancelar PRO Tour en cualquier momento?",
          answer:
            "Sí. Cancela cuando quieras desde tu cuenta — tiene efecto al final de tu periodo de facturación actual, y mantienes el acceso hasta entonces. No ofrecemos reembolsos parciales por tiempo no utilizado dentro de un periodo de facturación.",
        },
        {
          question: "¿Cuál es vuestra política de reembolsos?",
          answer:
            "Para los planes de pago único, puedes obtener un reembolso completo antes de que un entrenador haya empezado tu análisis; una vez que el análisis comienza, el derecho de desistimiento de 14 días de los consumidores de la UE/EEE/Reino Unido termina, ya que el servicio empieza a prestarse de inmediato a petición tuya. Para PRO Tour, puedes desistir dentro de los 14 días desde tu primera suscripción, menos el valor de cualquier análisis ya entregado. Escribe a tacticaltennislab@gmail.com para solicitar un reembolso o consulta los términos completos en /terms.",
        },
      ],
    },
    {
      title: "Para padres y jugadores junior",
      items: [
        {
          question: "¿Puede mi hijo/a tener su propia cuenta?",
          answer:
            "Los jugadores deben tener al menos 16 años para crear una cuenta. Para jugadores menores de 18, un padre, madre o tutor crea y gestiona la cuenta en su nombre.",
        },
        {
          question: "¿Puedo ver todo lo que mi hijo/a envía o recibe?",
          answer:
            "Sí. Solo hay un inicio de sesión por cuenta, así que cada vídeo, nota del entrenador y mensaje pasa por esa única cuenta y es visible para quien la tenga — no hay un canal separado ni oculto entre un entrenador y un menor.",
        },
        {
          question: "¿Están seguros los datos de mi hijo/a?",
          answer:
            "Solo recopilamos lo necesario para prestar el servicio, nunca vendemos datos personales y no los usamos para publicidad. Los detalles completos, incluidos tus derechos bajo el RGPD, están en /privacy.",
        },
      ],
    },
    {
      title: "Referidos",
      items: [
        {
          question: "¿Cómo funcionan los descuentos por referidos?",
          answer:
            "Comparte tu enlace de referido personal, disponible en tu página de cuenta. Un referido cuenta cuando la persona que referiste completa su primera compra pagada. 1 referido exitoso desbloquea un 20% de descuento en tus próximas compras, 2 desbloquea un 40%, y 5 desbloquea la mayoría de planes gratis (PRO Tour está limitado a un 40% de descuento y Match IQ: Full a un 50%, incluso con más referidos). Los descuentos se aplican automáticamente al pagar.",
        },
      ],
    },
    {
      title: "Entrenadores y calidad",
      items: [
        {
          question: "¿Mi análisis está escrito por IA?",
          answer:
            "No. Cada plan y cada feedback lo elabora personalmente uno de nuestros entrenadores — exjugadores del ATP y entrenadores certificados ITF Level 2 — según tu vídeo y tus objetivos. El widget de chat \"Preguntas rápidas\" de la web es un asistente de IA independiente que solo responde preguntas sencillas sobre precios y políticas; no revisa vídeo ni da consejos de coaching.",
        },
        {
          question: "¿Puedo dejar una opinión?",
          answer:
            "Sí — ve a /review (también enlazado en el pie de página). Las opiniones son revisadas por un administrador antes de aparecer públicamente, así que no la verás en la página principal de inmediato.",
        },
      ],
    },
  ],
};

const it: FaqDict = {
  pageHeader: {
    eyebrow: "Aiuto",
    title: "Domande frequenti",
    subtitle:
      "Domande comuni di accademie, genitori e giocatori. Non trovi quello che cerchi? Chiedi al widget Domande rapide o scrivi a tacticaltennislab@gmail.com.",
  },
  categories: [
    {
      title: "Per accademie e club",
      items: [
        {
          question: "Come funziona per un'accademia?",
          answer:
            "La tua accademia ha un proprio account, che creiamo quando la collaborazione è concordata. Il titolare invita allenatori e giocatori via e-mail. I giocatori caricano video di allenamenti o partite dai propri account, un allenatore vero — un ex giocatore ATP o un allenatore certificato ITF Level 2 — li analizza, e il feedback compare nella dashboard dell'accademia per i tuoi allenatori e per il giocatore.",
        },
        {
          question: "Sostituite i nostri allenatori?",
          answer:
            "No. Siamo un sistema di supporto per i tuoi allenatori. Ci occupiamo dell'analisi di video e partite, che richiede molto tempo, così possono dedicare le energie al campo, e lavoriamo al loro fianco, non al loro posto.",
        },
        {
          question: "Cosa includono i pacchetti per accademie?",
          answer:
            "Club Starter (550 USD/mese) include 5–8 analisi al mese, Academy Standard (1100 USD/mese) 10–15 più un referente dedicato, e High Performance Club (1950 USD/mese) oltre 20 con supporto prioritario e piani di allenamento condivisi. I pacchetti stagionali coprono 40–50 analisi in 3 mesi (5500 USD) o 80–90 in 6 mesi (9500 USD). Vedi i dettagli su /pricing.",
        },
        {
          question: "Chi può vedere i video dei nostri giocatori?",
          answer:
            "L'account del giocatore stesso, gli allenatori della tua accademia e i nostri allenatori. I giocatori entrano in un'accademia solo accettando un invito, il che lascia una chiara traccia del consenso, importante per i minori. I tuoi allenatori possono esaminare i video e lasciare feedback, ma solo il nostro team può eliminare un video.",
        },
        {
          question: "Come iniziamo?",
          answer:
            "Scegli un pacchetto su /pricing oppure scrivici su /contact. Una volta concordata la collaborazione, creiamo l'account della tua accademia e inviamo un invito via e-mail al titolare.",
        },
      ],
    },
    {
      title: "Per iniziare",
      items: [
        {
          question: "Come funziona per un giocatore individuale?",
          answer:
            "Crei un account, invii un video di allenamento o partita insieme a ciò su cui vuoi un feedback, e un allenatore vero — un ex giocatore ATP o un allenatore certificato ITF Level 2 — lo rivede personalmente fotogramma per fotogramma. Niente è generato automaticamente. Ricevi la tua analisi e un piano tramite il tuo account e via email.",
        },
        {
          question: "Che tipo di video dovrei inviare?",
          answer:
            "Filma di lato così il tuo allenatore può vedere tutto lo swing, il gioco di gambe e la posizione del corpo. Cattura alcuni punti o uno scambio breve invece di un singolo colpo, e tieni la fotocamera stabile — appoggia il telefono a qualcosa di solido o usa un treppiede. Usa il campo note per dire esattamente su cosa vuoi un feedback.",
        },
        {
          question: "Ho bisogno di un account per inviare un video?",
          answer:
            "Sì. Inviare un video, scrivere a un allenatore e acquistare un piano richiedono un account, poiché i tuoi video, feedback e messaggi vi sono collegati.",
        },
        {
          question: "È per accademie o per giocatori individuali?",
          answer:
            "Per entrambi. Accademie e club sono il nostro focus principale: supportiamo i loro allenatori con analisi di video e partite. Anche i giocatori individuali sono i benvenuti e possono inviare un video e scegliere un piano una tantum o mensile.",
        },
      ],
    },
    {
      title: "Piani individuali e prezzi",
      items: [
        {
          question: "Quali piani offrite?",
          answer:
            "Stroke Fix ($49, una tantum) è un'analisi tecnica mirata su un problema. Smart System ($99) è un programma di sviluppo di 4 settimane per un colpo. Match IQ è disponibile in Short ($99, fino a 60 minuti di video) e Full ($159, fino a una partita completa). PRO Tour ($249/mese) è coaching continuo con fino a 4 analisi al mese e accesso diretto all'allenatore.",
        },
        {
          question: "I prezzi includono le tasse?",
          answer: "No. Tutti i prezzi sono in USD, e non aggiungiamo IVA o imposta sulle vendite al checkout.",
        },
        {
          question: "Posso annullare PRO Tour in qualsiasi momento?",
          answer:
            "Sì. Annulla quando vuoi dal tuo account — ha effetto alla fine del periodo di fatturazione corrente, e mantieni l'accesso fino ad allora. Non offriamo rimborsi parziali per il tempo non utilizzato in un periodo di fatturazione.",
        },
        {
          question: "Qual è la vostra politica di rimborso?",
          answer:
            "Per i piani una tantum, puoi ottenere un rimborso completo prima che un allenatore abbia iniziato la tua analisi; una volta iniziata l'analisi, il diritto di recesso di 14 giorni dei consumatori UE/SEE/UK termina, poiché il servizio inizia a essere eseguito immediatamente su tua richiesta. Per PRO Tour, puoi recedere entro 14 giorni dal primo abbonamento, meno il valore di qualsiasi analisi già fornita. Scrivi a tacticaltennislab@gmail.com per richiedere un rimborso o consulta i termini completi su /terms.",
        },
      ],
    },
    {
      title: "Per genitori e giocatori junior",
      items: [
        {
          question: "Mio figlio/a può avere un proprio account?",
          answer:
            "I giocatori devono avere almeno 16 anni per creare un account. Per i giocatori sotto i 18 anni, un genitore o tutore crea e gestisce l'account per loro conto.",
        },
        {
          question: "Posso vedere tutto ciò che mio figlio/a invia o riceve?",
          answer:
            "Sì. C'è un solo accesso per account, quindi ogni video, nota dell'allenatore e messaggio passa attraverso quell'unico account ed è visibile a chi lo possiede — non c'è un canale separato o nascosto tra un allenatore e un minore.",
        },
        {
          question: "I dati di mio figlio/a sono al sicuro?",
          answer:
            "Raccogliamo solo ciò che serve per fornire il servizio, non vendiamo mai dati personali e non li usiamo per la pubblicità. I dettagli completi, inclusi i tuoi diritti secondo il GDPR, sono su /privacy.",
        },
      ],
    },
    {
      title: "Referral",
      items: [
        {
          question: "Come funzionano gli sconti referral?",
          answer:
            "Condividi il tuo link di invito personale, disponibile nella pagina del tuo account. Un invito conta quando la persona che hai invitato completa il suo primo acquisto a pagamento. 1 invito riuscito sblocca il 20% di sconto sui tuoi acquisti futuri, 2 sblocca il 40%, e 5 sblocca la maggior parte dei piani gratis (PRO Tour è limitato al 40% di sconto e Match IQ: Full al 50%, anche con più inviti). Gli sconti si applicano automaticamente al checkout.",
        },
      ],
    },
    {
      title: "Allenatori e qualità",
      items: [
        {
          question: "La mia analisi è scritta dall'IA?",
          answer:
            "No. Ogni piano e ogni feedback è costruito personalmente da uno dei nostri allenatori — ex giocatori ATP e allenatori certificati ITF Level 2 — in base al tuo video e ai tuoi obiettivi. Il widget di chat \"Domande rapide\" sul sito è un assistente IA separato che risponde solo a domande semplici su prezzi e policy; non rivede video né dà consigli di coaching.",
        },
        {
          question: "Posso lasciare una recensione?",
          answer:
            "Sì — vai su /review (linkato anche nel footer). Le recensioni sono controllate da un amministratore prima di apparire pubblicamente, quindi non la vedrai subito sulla homepage.",
        },
      ],
    },
  ],
};

const ru: FaqDict = {
  pageHeader: {
    eyebrow: "Помощь",
    title: "Часто задаваемые вопросы",
    subtitle:
      "Частые вопросы академий, родителей и игроков. Не нашли ответ? Спросите виджет «Быстрые вопросы» или напишите на tacticaltennislab@gmail.com.",
  },
  categories: [
    {
      title: "Для академий и клубов",
      items: [
        {
          question: "Как это работает для академии?",
          answer:
            "У вашей академии есть собственный аккаунт, который мы создаём после согласования сотрудничества. Владелец приглашает тренеров и игроков по электронной почте. Игроки загружают записи тренировок или матчей из своих аккаунтов, настоящий тренер — бывший игрок ATP или сертифицированный тренер ITF Level 2 — разбирает их, а обратная связь появляется в панели академии для ваших тренеров и игрока.",
        },
        {
          question: "Вы заменяете наших тренеров?",
          answer:
            "Нет. Мы — система поддержки для ваших тренеров. Мы берём на себя трудоёмкий видео- и матч-анализ, чтобы они могли направить силы на корт, и работаем вместе с ними, а не вместо них.",
        },
        {
          question: "Что входит в пакеты для академий?",
          answer:
            "Club Starter (550 USD/мес.) — 5–8 анализов в месяц, Academy Standard (1100 USD/мес.) — 10–15 анализов и выделенный контакт, High Performance Club (1950 USD/мес.) — более 20 анализов, приоритетная поддержка и общие планы тренировок. Сезонные пакеты — 40–50 анализов за 3 месяца (5500 USD) или 80–90 за 6 месяцев (9500 USD). Подробности на /pricing.",
        },
        {
          question: "Кто видит видео наших игроков?",
          answer:
            "Собственный аккаунт игрока, тренеры вашей академии и наши тренеры. Игроки присоединяются к академии только приняв приглашение, что оставляет чёткую запись о согласии — это важно для несовершеннолетних. Ваши тренеры могут просматривать видео и оставлять отзывы, но удалить видео может только наша команда.",
        },
        {
          question: "Как начать?",
          answer:
            "Выберите пакет на /pricing или напишите нам на /contact. После согласования сотрудничества мы создаём аккаунт академии и отправляем владельцу приглашение по электронной почте.",
        },
      ],
    },
    {
      title: "Начало работы",
      items: [
        {
          question: "Как это работает для индивидуального игрока?",
          answer:
            "Вы создаёте аккаунт, отправляете видео с тренировки или матча вместе с тем, что хотите разобрать, и настоящий тренер — бывший игрок ATP или сертифицированный тренер ITF Level 2 — лично разбирает его покадрово. Ничего не генерируется автоматически. Вы получаете анализ и план через аккаунт и по email.",
        },
        {
          question: "Какое видео мне отправить?",
          answer:
            "Снимайте сбоку, чтобы тренер видел весь замах, работу ног и положение тела. Захватите несколько розыгрышей или короткий обмен ударами, а не один удар, и держите камеру стабильно — обоприте телефон о что-то устойчивое или используйте штатив. В поле заметок укажите точно, что хотите разобрать.",
        },
        {
          question: "Нужен ли аккаунт, чтобы отправить видео?",
          answer:
            "Да. Отправка видео, сообщения тренеру и покупка плана требуют аккаунта, так как ваши видео, обратная связь и сообщения привязаны к нему.",
        },
        {
          question: "Это для академий или для индивидуальных игроков?",
          answer:
            "Для обоих. Академии и клубы — наш главный фокус: мы поддерживаем их тренеров видео- и матч-анализом. Индивидуальные игроки тоже приветствуются: они могут отправить видео и выбрать разовый или ежемесячный план.",
        },
      ],
    },
    {
      title: "Индивидуальные планы и цены",
      items: [
        {
          question: "Какие планы вы предлагаете?",
          answer:
            "Stroke Fix ($49, разово) — сфокусированный технический разбор одной проблемы. Smart System ($99) — 4-недельная программа развития одного удара. Match IQ доступен в версиях Short ($99, до 60 минут видео) и Full ($159, до полного матча). PRO Tour ($249/месяц) — постоянный коучинг с до 4 анализами в месяц и прямым доступом к тренеру.",
        },
        {
          question: "Включён ли налог в цену?",
          answer: "Нет. Все цены указаны в USD, и при оплате мы не добавляем НДС или налог с продаж.",
        },
        {
          question: "Могу ли я отменить PRO Tour в любое время?",
          answer:
            "Да. Отмените в любой момент из своего аккаунта — это вступит в силу в конце текущего расчётного периода, а доступ сохранится до этого момента. Мы не предоставляем частичный возврат за неиспользованное время в расчётном периоде.",
        },
        {
          question: "Какова ваша политика возврата средств?",
          answer:
            "Для разовых планов вы можете получить полный возврат до того, как тренер начал ваш анализ; как только анализ начинается, 14-дневное право на отказ для потребителей из ЕС/ЕЭЗ/Великобритании прекращается, так как услуга начинает выполняться немедленно по вашему запросу. Для PRO Tour вы можете отказаться в течение 14 дней с момента первой подписки, за вычетом стоимости уже предоставленного анализа. Напишите на tacticaltennislab@gmail.com, чтобы запросить возврат, или посмотрите полные условия на /terms.",
        },
      ],
    },
    {
      title: "Для родителей и юниоров",
      items: [
        {
          question: "Может ли у моего ребёнка быть свой аккаунт?",
          answer:
            "Игрокам должно быть не менее 16 лет, чтобы создать аккаунт. Для игроков младше 18 лет аккаунт создаёт и ведёт родитель или опекун от их имени.",
        },
        {
          question: "Вижу ли я всё, что отправляет и получает мой ребёнок?",
          answer:
            "Да. У аккаунта только один логин, поэтому каждое видео, заметка тренера и сообщение проходят через этот единственный аккаунт и видны тому, кто им владеет — отдельного или скрытого канала между тренером и несовершеннолетним не существует.",
        },
        {
          question: "Безопасны ли данные моего ребёнка?",
          answer:
            "Мы собираем только то, что необходимо для предоставления услуги, никогда не продаём личные данные и не используем их для рекламы. Полная информация, включая ваши права по GDPR, доступна на /privacy.",
        },
      ],
    },
    {
      title: "Рефералы",
      items: [
        {
          question: "Как работают реферальные скидки?",
          answer:
            "Поделитесь своей персональной реферальной ссылкой, которая находится на странице аккаунта. Приглашение засчитывается, когда приглашённый вами человек совершает свою первую платную покупку. 1 успешное приглашение открывает скидку 20% на ваши будущие покупки, 2 — 40%, а 5 — большинство планов бесплатно (PRO Tour ограничен скидкой 40%, а Match IQ: Full — 50%, даже при большем числе приглашений). Скидки применяются автоматически при оплате.",
        },
      ],
    },
    {
      title: "Тренеры и качество",
      items: [
        {
          question: "Мой анализ написан ИИ?",
          answer:
            "Нет. Каждый план и каждая обратная связь создаются лично одним из наших тренеров — бывшими игроками ATP и сертифицированными тренерами ITF Level 2 — на основе вашего видео и целей. Виджет чата «Быстрые вопросы» на сайте — это отдельный ИИ-ассистент, который отвечает только на простые вопросы о ценах и политиках; он не разбирает видео и не даёт тренерских советов.",
        },
        {
          question: "Могу ли я оставить отзыв?",
          answer:
            "Да — перейдите на /review (ссылка есть также в подвале сайта). Отзывы проверяются администратором перед публикацией, поэтому вы не увидите его на главной странице сразу.",
        },
      ],
    },
  ],
};

export const faqDictionaries: Record<AppLocale, FaqDict> = { en, pl, es, it, ru };
