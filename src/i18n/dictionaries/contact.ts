import type { AppLocale } from "@/i18n/locales";

export interface ContactDict {
  pageHeader: { eyebrow: string; title: string; subtitle: string };
  otherWays: string;
  repliesNote: string;
  form: {
    name: string;
    email: string;
    message: string;
    sending: string;
    send: string;
    sentTitle: string;
    sentBody: string;
    error: string;
  };
}

const en: ContactDict = {
  pageHeader: {
    eyebrow: "Get in touch",
    title: "Contact us",
    subtitle: "Questions about coaching, plans, or anything else — send us a message and we'll reply by email.",
  },
  otherWays: "Other ways to reach us",
  repliesNote: "We typically reply within 24 hours.",
  form: {
    name: "Name",
    email: "Email",
    message: "Message",
    sending: "Sending...",
    send: "Send message",
    sentTitle: "Message sent",
    sentBody: "Thanks for reaching out — we'll get back to you soon.",
    error: "Something went wrong.",
  },
};

const pl: ContactDict = {
  pageHeader: {
    eyebrow: "Skontaktuj się",
    title: "Kontakt",
    subtitle: "Pytania o coaching, plany lub cokolwiek innego — napisz do nas, a odpowiemy mailem.",
  },
  otherWays: "Inne sposoby kontaktu",
  repliesNote: "Zazwyczaj odpowiadamy w ciągu 24 godzin.",
  form: {
    name: "Imię",
    email: "E-mail",
    message: "Wiadomość",
    sending: "Wysyłanie...",
    send: "Wyślij wiadomość",
    sentTitle: "Wiadomość wysłana",
    sentBody: "Dziękujemy za kontakt — wkrótce odpowiemy.",
    error: "Coś poszło nie tak.",
  },
};

const es: ContactDict = {
  pageHeader: {
    eyebrow: "Ponte en contacto",
    title: "Contáctanos",
    subtitle: "Preguntas sobre coaching, planes o cualquier otra cosa — envíanos un mensaje y te responderemos por email.",
  },
  otherWays: "Otras formas de contactarnos",
  repliesNote: "Normalmente respondemos en 24 horas.",
  form: {
    name: "Nombre",
    email: "Email",
    message: "Mensaje",
    sending: "Enviando...",
    send: "Enviar mensaje",
    sentTitle: "Mensaje enviado",
    sentBody: "Gracias por escribirnos — te responderemos pronto.",
    error: "Algo salió mal.",
  },
};

const it: ContactDict = {
  pageHeader: {
    eyebrow: "Contattaci",
    title: "Contattaci",
    subtitle: "Domande sul coaching, sui piani o su qualsiasi altra cosa — inviaci un messaggio e ti risponderemo via email.",
  },
  otherWays: "Altri modi per contattarci",
  repliesNote: "Di solito rispondiamo entro 24 ore.",
  form: {
    name: "Nome",
    email: "Email",
    message: "Messaggio",
    sending: "Invio in corso...",
    send: "Invia messaggio",
    sentTitle: "Messaggio inviato",
    sentBody: "Grazie per averci contattato — ti risponderemo presto.",
    error: "Qualcosa è andato storto.",
  },
};

const ru: ContactDict = {
  pageHeader: {
    eyebrow: "Связаться с нами",
    title: "Контакты",
    subtitle: "Вопросы о коучинге, планах или что-то ещё — напишите нам, и мы ответим по email.",
  },
  otherWays: "Другие способы связи",
  repliesNote: "Обычно мы отвечаем в течение 24 часов.",
  form: {
    name: "Имя",
    email: "Email",
    message: "Сообщение",
    sending: "Отправка...",
    send: "Отправить сообщение",
    sentTitle: "Сообщение отправлено",
    sentBody: "Спасибо, что написали нам — мы скоро ответим.",
    error: "Что-то пошло не так.",
  },
};

export const contactDictionaries: Record<AppLocale, ContactDict> = { en, pl, es, it, ru };
