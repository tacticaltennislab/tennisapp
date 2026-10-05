import type { AppLocale } from "@/i18n/locales";

export interface NavDict {
  pricing: string;
  coaches: string;
  contact: string;
  sendVideo: string;
  submissions: string;
  customers: string;
  reviews: string;
  academy: string;
  academies: string;
  signIn: string;
  signUp: string;
  signOut: string;
}

const en: NavDict = {
  pricing: "Pricing",
  coaches: "Coaches",
  contact: "Contact",
  sendVideo: "Send Video",
  submissions: "Submissions",
  customers: "Customers",
  reviews: "Reviews",
  academy: "Academy",
  academies: "Academies",
  signIn: "Sign in",
  signUp: "Sign up",
  signOut: "Sign out",
};

const pl: NavDict = {
  pricing: "Cennik",
  coaches: "Trenerzy",
  contact: "Kontakt",
  sendVideo: "Wyślij wideo",
  submissions: "Zgłoszenia",
  customers: "Klienci",
  reviews: "Opinie",
  academy: "Akademia",
  academies: "Akademie",
  signIn: "Zaloguj się",
  signUp: "Zarejestruj się",
  signOut: "Wyloguj się",
};

const es: NavDict = {
  pricing: "Precios",
  coaches: "Entrenadores",
  contact: "Contacto",
  sendVideo: "Enviar vídeo",
  submissions: "Envíos",
  customers: "Clientes",
  reviews: "Opiniones",
  academy: "Academia",
  academies: "Academias",
  signIn: "Iniciar sesión",
  signUp: "Registrarse",
  signOut: "Cerrar sesión",
};

const it: NavDict = {
  pricing: "Prezzi",
  coaches: "Allenatori",
  contact: "Contatti",
  sendVideo: "Invia video",
  submissions: "Invii",
  customers: "Clienti",
  reviews: "Recensioni",
  academy: "Accademia",
  academies: "Accademie",
  signIn: "Accedi",
  signUp: "Registrati",
  signOut: "Esci",
};

const ru: NavDict = {
  pricing: "Цены",
  coaches: "Тренеры",
  contact: "Контакты",
  sendVideo: "Отправить видео",
  submissions: "Заявки",
  customers: "Клиенты",
  reviews: "Отзывы",
  academy: "Академия",
  academies: "Академии",
  signIn: "Войти",
  signUp: "Регистрация",
  signOut: "Выйти",
};

export const navDictionaries: Record<AppLocale, NavDict> = { en, pl, es, it, ru };
