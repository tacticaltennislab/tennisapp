import type { AppLocale } from "@/i18n/locales";

export interface DemoDict {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  whatTitle: string;
  bullets: string[];
  emailLine: { text: string; link: string };
  unavailable: { title: string; text: string };
  loading: string;
  /** Shown on /contact */
  contactNote: { text: string; cta: string };
  /** Header button, hero, closing section and club package cards */
  cta: string;
}

const en: DemoDict = {
  meta: { title: "Book a demo | Tactical Tennis Lab", description: "Book a demo for your tennis academy or club. We review a real clip from one of your players live, show the coach and player report, and tailor a package to your roster." },
  eyebrow: "For academies and clubs",
  title: "See how Tactical Tennis Lab works for your academy",
  whatTitle: "What happens on the call",
  bullets: ["We review a real clip from one of your players, live.", "We show you the coach and player report.", "We tailor a package to your roster."],
  emailLine: { text: "Prefer email?", link: "Contact us" },
  unavailable: { title: "Booking opens soon", text: "The calendar is not connected yet. Write to us and we will find a time." },
  loading: "Loading the calendar",
  contactNote: { text: "Run an academy or a club?", cta: "Book a demo" },
  cta: "Book a demo",
};

const pl: DemoDict = {
  meta: { title: "Umów demo | Tactical Tennis Lab", description: "Umów demo dla swojej akademii lub klubu tenisowego. Na żywo analizujemy prawdziwe nagranie jednego z Twoich zawodników, pokazujemy raport dla trenera i zawodnika oraz dopasowujemy pakiet do Twojego zespołu." },
  eyebrow: "Dla akademii i klubów",
  title: "Zobacz, jak Tactical Tennis Lab działa w Twojej akademii",
  whatTitle: "Co dzieje się podczas rozmowy",
  bullets: ["Na żywo analizujemy prawdziwe nagranie jednego z Twoich zawodników.", "Pokazujemy raport dla trenera i zawodnika.", "Dopasowujemy pakiet do Twojego zespołu."],
  emailLine: { text: "Wolisz email?", link: "Napisz do nas" },
  unavailable: { title: "Rezerwacja wkrótce", text: "Kalendarz nie jest jeszcze połączony. Napisz do nas, a znajdziemy termin." },
  loading: "Ładowanie kalendarza",
  contactNote: { text: "Prowadzisz akademię lub klub?", cta: "Umów demo" },
  cta: "Umów demo",
};

const es: DemoDict = {
  meta: { title: "Reserva una demo | Tactical Tennis Lab", description: "Reserva una demo para tu academia o club de tenis. Revisamos en directo un vídeo real de uno de tus jugadores, te mostramos el informe para entrenador y jugador y adaptamos un paquete a tu plantilla." },
  eyebrow: "Para academias y clubes",
  title: "Descubre cómo funciona Tactical Tennis Lab en tu academia",
  whatTitle: "Qué ocurre en la llamada",
  bullets: ["Revisamos en directo un vídeo real de uno de tus jugadores.", "Te mostramos el informe para entrenador y jugador.", "Adaptamos un paquete a tu plantilla."],
  emailLine: { text: "¿Prefieres el correo?", link: "Contáctanos" },
  unavailable: { title: "La reserva abre pronto", text: "El calendario aún no está conectado. Escríbenos y buscaremos un horario." },
  loading: "Cargando el calendario",
  contactNote: { text: "¿Diriges una academia o un club?", cta: "Reserva una demo" },
  cta: "Reserva una demo",
};

const it: DemoDict = {
  meta: { title: "Prenota una demo | Tactical Tennis Lab", description: "Prenota una demo per la tua accademia o il tuo club di tennis. Analizziamo dal vivo un video reale di uno dei tuoi giocatori, ti mostriamo il report per allenatore e giocatore e adattiamo un pacchetto alla tua rosa." },
  eyebrow: "Per accademie e club",
  title: "Scopri come funziona Tactical Tennis Lab per la tua accademia",
  whatTitle: "Cosa succede durante la chiamata",
  bullets: ["Analizziamo dal vivo un video reale di uno dei tuoi giocatori.", "Ti mostriamo il report per allenatore e giocatore.", "Adattiamo un pacchetto alla tua rosa."],
  emailLine: { text: "Preferisci l'email?", link: "Contattaci" },
  unavailable: { title: "Le prenotazioni aprono presto", text: "Il calendario non è ancora collegato. Scrivici e troveremo un orario." },
  loading: "Caricamento del calendario",
  contactNote: { text: "Gestisci un'accademia o un club?", cta: "Prenota una demo" },
  cta: "Prenota una demo",
};

const ru: DemoDict = {
  meta: { title: "Записаться на демо | Tactical Tennis Lab", description: "Запишитесь на демо для вашей теннисной академии или клуба. Мы вживую разберём реальное видео одного из ваших игроков, покажем отчёт для тренера и игрока и подберём пакет под ваш состав." },
  eyebrow: "Для академий и клубов",
  title: "Посмотрите, как Tactical Tennis Lab работает в вашей академии",
  whatTitle: "Что происходит на звонке",
  bullets: ["Мы вживую разберём реальное видео одного из ваших игроков.", "Покажем отчёт для тренера и игрока.", "Подберём пакет под ваш состав."],
  emailLine: { text: "Предпочитаете почту?", link: "Свяжитесь с нами" },
  unavailable: { title: "Запись скоро откроется", text: "Календарь ещё не подключён. Напишите нам, и мы найдём время." },
  loading: "Загрузка календаря",
  contactNote: { text: "Руководите академией или клубом?", cta: "Записаться на демо" },
  cta: "Записаться на демо",
};

export const demoDictionaries: Record<AppLocale, DemoDict> = { en, pl, es, it, ru };
