import type { AppLocale } from "@/i18n/locales";

export interface NavDict {
  pricing: string;
  coaches: string;
  contact: string;
  sendVideo: string;
  submissions: string;
  customers: string;
  reviews: string;
  customerReviews: string;
  admin: string;
  skip: string;
  academy: string;
  academies: string;
  dashboard: string;
  signIn: string;
  signUp: string;
  signOut: string;
  bookDemo: string;
}

const en: NavDict = {
  pricing: "Pricing",
  coaches: "Coaches",
  contact: "Contact",
  sendVideo: "Send Video",
  submissions: "Submissions",
  customers: "Customers",
  reviews: "Review queue",
  customerReviews: "Reviews",
  admin: "Admin",
  skip: "Skip to content",
  academy: "Academy",
  academies: "Academies",
  dashboard: "Dashboard",
  signIn: "Sign in",
  signUp: "Sign up",
  signOut: "Sign out",
  bookDemo: "Book a demo",
};

const pl: NavDict = {
  pricing: "Cennik",
  coaches: "Trenerzy",
  contact: "Kontakt",
  sendVideo: "Wyślij wideo",
  submissions: "Zgłoszenia",
  customers: "Klienci",
  reviews: "Moderacja opinii",
  customerReviews: "Opinie",
  admin: "Admin",
  skip: "Przejdź do treści",
  academy: "Akademia",
  academies: "Akademie",
  dashboard: "Panel",
  signIn: "Zaloguj się",
  signUp: "Zarejestruj się",
  signOut: "Wyloguj się",
  bookDemo: "Umów demo",
};

const es: NavDict = {
  pricing: "Precios",
  coaches: "Entrenadores",
  contact: "Contacto",
  sendVideo: "Enviar vídeo",
  submissions: "Envíos",
  customers: "Clientes",
  reviews: "Moderar opiniones",
  customerReviews: "Opiniones",
  admin: "Admin",
  skip: "Saltar al contenido",
  academy: "Academia",
  academies: "Academias",
  dashboard: "Panel",
  signIn: "Iniciar sesión",
  signUp: "Registrarse",
  signOut: "Cerrar sesión",
  bookDemo: "Reserva una demo",
};

const it: NavDict = {
  pricing: "Prezzi",
  coaches: "Allenatori",
  contact: "Contatti",
  sendVideo: "Invia video",
  submissions: "Invii",
  customers: "Clienti",
  reviews: "Modera recensioni",
  customerReviews: "Recensioni",
  admin: "Admin",
  skip: "Vai al contenuto",
  academy: "Accademia",
  academies: "Accademie",
  dashboard: "Dashboard",
  signIn: "Accedi",
  signUp: "Registrati",
  signOut: "Esci",
  bookDemo: "Prenota una demo",
};

const ru: NavDict = {
  pricing: "Цены",
  coaches: "Тренеры",
  contact: "Контакты",
  sendVideo: "Отправить видео",
  submissions: "Заявки",
  customers: "Клиенты",
  reviews: "Модерация отзывов",
  customerReviews: "Отзывы",
  admin: "Админ",
  skip: "Перейти к содержанию",
  academy: "Академия",
  academies: "Академии",
  dashboard: "Кабинет",
  signIn: "Войти",
  signUp: "Регистрация",
  signOut: "Выйти",
  bookDemo: "Записаться на демо",
};

export const navDictionaries: Record<AppLocale, NavDict> = { en, pl, es, it, ru };
