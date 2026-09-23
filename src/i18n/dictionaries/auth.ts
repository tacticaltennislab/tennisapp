import type { AppLocale } from "@/i18n/locales";

export interface AuthDict {
  panel: { title: string; subtitle: string };
  or: string;
  signIn: {
    title: string;
    subtitle: string;
    email: string;
    password: string;
    forgotPassword: string;
    invalidCredentials: string;
    submit: string;
    submitting: string;
    google: string;
    noAccount: string;
    signUpLink: string;
  };
  signUp: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    password: string;
    passwordHint: string;
    genericError: string;
    partialError: string;
    submit: string;
    submitting: string;
    agreePrefix: string;
    termsLabel: string;
    andLabel: string;
    privacyLabel: string;
    google: string;
    haveAccount: string;
    signInLink: string;
  };
  forgotPassword: {
    title: string;
    subtitle: string;
    email: string;
    sent: string;
    submit: string;
    submitting: string;
    backToSignIn: string;
  };
  resetPassword: {
    invalidTitle: string;
    invalidSubtitle: string;
    requestNewLink: string;
    title: string;
    subtitlePrefix: string; // "Resetting password for " -- email appended, then "."
    newPassword: string;
    passwordHint: string;
    genericError: string;
    done: string;
    submit: string;
    submitting: string;
  };
}

const en: AuthDict = {
  panel: {
    title: "Coached by people who've played at the top.",
    subtitle:
      "Former ATP players and ITF Level 2 certified coaches review your game and build a plan around what you need to fix.",
  },
  or: "or",
  signIn: {
    title: "Welcome back",
    subtitle: "Sign in to view your plans and video feedback.",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot password?",
    invalidCredentials: "Invalid email or password.",
    submit: "Sign in",
    submitting: "Signing in...",
    google: "Sign in with Google",
    noAccount: "No account yet?",
    signUpLink: "Sign up",
  },
  signUp: {
    title: "Create your account",
    subtitle: "Get personalized training plans and video feedback.",
    name: "Name",
    email: "Email",
    password: "Password",
    passwordHint: "At least 8 characters.",
    genericError: "Something went wrong.",
    partialError: "Account created, but sign-in failed. Try signing in.",
    submit: "Sign up",
    submitting: "Creating account...",
    agreePrefix: "By signing up, you agree to our",
    termsLabel: "Terms of Service",
    andLabel: "and",
    privacyLabel: "Privacy Policy",
    google: "Sign up with Google",
    haveAccount: "Already have an account?",
    signInLink: "Sign in",
  },
  forgotPassword: {
    title: "Reset your password",
    subtitle: "Enter your email and we'll send you a reset link.",
    email: "Email",
    sent: "If an account exists for that email, a reset link is on its way.",
    submit: "Send reset link",
    submitting: "Sending...",
    backToSignIn: "Back to sign in",
  },
  resetPassword: {
    invalidTitle: "Invalid link",
    invalidSubtitle: "This password reset link is missing information.",
    requestNewLink: "Request a new reset link",
    title: "Set a new password",
    subtitlePrefix: "Resetting password for",
    newPassword: "New password",
    passwordHint: "At least 8 characters.",
    genericError: "Something went wrong.",
    done: "Password updated. Redirecting to sign in…",
    submit: "Save new password",
    submitting: "Saving...",
  },
};

const pl: AuthDict = {
  panel: {
    title: "Trenowani przez ludzi, którzy grali na najwyższym poziomie.",
    subtitle:
      "Byli zawodnicy ATP i certyfikowani trenerzy ITF Level 2 analizują Twoją grę i budują plan wokół tego, co wymaga poprawy.",
  },
  or: "lub",
  signIn: {
    title: "Witaj ponownie",
    subtitle: "Zaloguj się, aby zobaczyć swoje plany i informacje zwrotne o wideo.",
    email: "E-mail",
    password: "Hasło",
    forgotPassword: "Nie pamiętasz hasła?",
    invalidCredentials: "Nieprawidłowy e-mail lub hasło.",
    submit: "Zaloguj się",
    submitting: "Logowanie...",
    google: "Zaloguj się przez Google",
    noAccount: "Nie masz jeszcze konta?",
    signUpLink: "Zarejestruj się",
  },
  signUp: {
    title: "Utwórz konto",
    subtitle: "Otrzymuj spersonalizowane plany treningowe i informacje zwrotne o wideo.",
    name: "Imię",
    email: "E-mail",
    password: "Hasło",
    passwordHint: "Co najmniej 8 znaków.",
    genericError: "Coś poszło nie tak.",
    partialError: "Konto zostało utworzone, ale logowanie się nie powiodło. Spróbuj się zalogować.",
    submit: "Zarejestruj się",
    submitting: "Tworzenie konta...",
    agreePrefix: "Rejestrując się, akceptujesz nasz",
    termsLabel: "Regulamin",
    andLabel: "i",
    privacyLabel: "Politykę prywatności",
    google: "Zarejestruj się przez Google",
    haveAccount: "Masz już konto?",
    signInLink: "Zaloguj się",
  },
  forgotPassword: {
    title: "Zresetuj hasło",
    subtitle: "Podaj swój e-mail, a wyślemy Ci link do resetowania hasła.",
    email: "E-mail",
    sent: "Jeśli konto o tym adresie e-mail istnieje, link do resetowania hasła jest już w drodze.",
    submit: "Wyślij link resetujący",
    submitting: "Wysyłanie...",
    backToSignIn: "Powrót do logowania",
  },
  resetPassword: {
    invalidTitle: "Nieprawidłowy link",
    invalidSubtitle: "W tym linku do resetowania hasła brakuje informacji.",
    requestNewLink: "Poproś o nowy link resetujący",
    title: "Ustaw nowe hasło",
    subtitlePrefix: "Resetowanie hasła dla",
    newPassword: "Nowe hasło",
    passwordHint: "Co najmniej 8 znaków.",
    genericError: "Coś poszło nie tak.",
    done: "Hasło zaktualizowane. Przekierowuję do logowania…",
    submit: "Zapisz nowe hasło",
    submitting: "Zapisywanie...",
  },
};

const es: AuthDict = {
  panel: {
    title: "Entrenado por gente que ha jugado al más alto nivel.",
    subtitle:
      "Exjugadores del ATP y entrenadores certificados ITF Level 2 revisan tu juego y construyen un plan en torno a lo que necesitas corregir.",
  },
  or: "o",
  signIn: {
    title: "Bienvenido de nuevo",
    subtitle: "Inicia sesión para ver tus planes y el feedback de tus vídeos.",
    email: "Email",
    password: "Contraseña",
    forgotPassword: "¿Olvidaste tu contraseña?",
    invalidCredentials: "Email o contraseña incorrectos.",
    submit: "Iniciar sesión",
    submitting: "Iniciando sesión...",
    google: "Iniciar sesión con Google",
    noAccount: "¿Aún no tienes cuenta?",
    signUpLink: "Regístrate",
  },
  signUp: {
    title: "Crea tu cuenta",
    subtitle: "Obtén planes de entrenamiento personalizados y feedback de vídeo.",
    name: "Nombre",
    email: "Email",
    password: "Contraseña",
    passwordHint: "Al menos 8 caracteres.",
    genericError: "Algo salió mal.",
    partialError: "Cuenta creada, pero el inicio de sesión falló. Intenta iniciar sesión.",
    submit: "Registrarse",
    submitting: "Creando cuenta...",
    agreePrefix: "Al registrarte, aceptas nuestros",
    termsLabel: "Términos de Servicio",
    andLabel: "y",
    privacyLabel: "Política de Privacidad",
    google: "Registrarse con Google",
    haveAccount: "¿Ya tienes una cuenta?",
    signInLink: "Iniciar sesión",
  },
  forgotPassword: {
    title: "Restablece tu contraseña",
    subtitle: "Introduce tu email y te enviaremos un enlace para restablecerla.",
    email: "Email",
    sent: "Si existe una cuenta con ese email, un enlace de restablecimiento está en camino.",
    submit: "Enviar enlace de restablecimiento",
    submitting: "Enviando...",
    backToSignIn: "Volver a iniciar sesión",
  },
  resetPassword: {
    invalidTitle: "Enlace no válido",
    invalidSubtitle: "A este enlace de restablecimiento de contraseña le falta información.",
    requestNewLink: "Solicitar un nuevo enlace de restablecimiento",
    title: "Establece una nueva contraseña",
    subtitlePrefix: "Restableciendo la contraseña de",
    newPassword: "Nueva contraseña",
    passwordHint: "Al menos 8 caracteres.",
    genericError: "Algo salió mal.",
    done: "Contraseña actualizada. Redirigiendo al inicio de sesión…",
    submit: "Guardar nueva contraseña",
    submitting: "Guardando...",
  },
};

const it: AuthDict = {
  panel: {
    title: "Allenato da persone che hanno giocato ai massimi livelli.",
    subtitle:
      "Ex giocatori ATP e allenatori certificati ITF Level 2 rivedono il tuo gioco e costruiscono un piano su ciò che devi correggere.",
  },
  or: "oppure",
  signIn: {
    title: "Bentornato",
    subtitle: "Accedi per vedere i tuoi piani e il feedback sui video.",
    email: "Email",
    password: "Password",
    forgotPassword: "Hai dimenticato la password?",
    invalidCredentials: "Email o password non validi.",
    submit: "Accedi",
    submitting: "Accesso in corso...",
    google: "Accedi con Google",
    noAccount: "Non hai ancora un account?",
    signUpLink: "Registrati",
  },
  signUp: {
    title: "Crea il tuo account",
    subtitle: "Ottieni piani di allenamento personalizzati e feedback sui video.",
    name: "Nome",
    email: "Email",
    password: "Password",
    passwordHint: "Almeno 8 caratteri.",
    genericError: "Qualcosa è andato storto.",
    partialError: "Account creato, ma l'accesso non è riuscito. Prova ad accedere.",
    submit: "Registrati",
    submitting: "Creazione account...",
    agreePrefix: "Registrandoti, accetti i nostri",
    termsLabel: "Termini di Servizio",
    andLabel: "e",
    privacyLabel: "Informativa sulla Privacy",
    google: "Registrati con Google",
    haveAccount: "Hai già un account?",
    signInLink: "Accedi",
  },
  forgotPassword: {
    title: "Reimposta la tua password",
    subtitle: "Inserisci la tua email e ti invieremo un link per il reset.",
    email: "Email",
    sent: "Se esiste un account con questa email, un link di reset è in arrivo.",
    submit: "Invia link di reset",
    submitting: "Invio in corso...",
    backToSignIn: "Torna all'accesso",
  },
  resetPassword: {
    invalidTitle: "Link non valido",
    invalidSubtitle: "A questo link di reset password mancano delle informazioni.",
    requestNewLink: "Richiedi un nuovo link di reset",
    title: "Imposta una nuova password",
    subtitlePrefix: "Reimpostazione password per",
    newPassword: "Nuova password",
    passwordHint: "Almeno 8 caratteri.",
    genericError: "Qualcosa è andato storto.",
    done: "Password aggiornata. Reindirizzamento all'accesso…",
    submit: "Salva nuova password",
    submitting: "Salvataggio...",
  },
};

const ru: AuthDict = {
  panel: {
    title: "С тренерами, которые играли на самом высоком уровне.",
    subtitle:
      "Бывшие игроки ATP и сертифицированные тренеры ITF Level 2 разбирают вашу игру и строят план вокруг того, что нужно исправить.",
  },
  or: "или",
  signIn: {
    title: "С возвращением",
    subtitle: "Войдите, чтобы увидеть свои планы и обратную связь по видео.",
    email: "Email",
    password: "Пароль",
    forgotPassword: "Забыли пароль?",
    invalidCredentials: "Неверный email или пароль.",
    submit: "Войти",
    submitting: "Вход...",
    google: "Войти через Google",
    noAccount: "Ещё нет аккаунта?",
    signUpLink: "Зарегистрироваться",
  },
  signUp: {
    title: "Создайте аккаунт",
    subtitle: "Получайте персональные планы тренировок и обратную связь по видео.",
    name: "Имя",
    email: "Email",
    password: "Пароль",
    passwordHint: "Минимум 8 символов.",
    genericError: "Что-то пошло не так.",
    partialError: "Аккаунт создан, но вход не удался. Попробуйте войти.",
    submit: "Зарегистрироваться",
    submitting: "Создание аккаунта...",
    agreePrefix: "Регистрируясь, вы соглашаетесь с нашими",
    termsLabel: "Условиями использования",
    andLabel: "и",
    privacyLabel: "Политикой конфиденциальности",
    google: "Зарегистрироваться через Google",
    haveAccount: "Уже есть аккаунт?",
    signInLink: "Войти",
  },
  forgotPassword: {
    title: "Сбросить пароль",
    subtitle: "Введите email, и мы отправим вам ссылку для сброса пароля.",
    email: "Email",
    sent: "Если аккаунт с таким email существует, ссылка для сброса уже отправлена.",
    submit: "Отправить ссылку для сброса",
    submitting: "Отправка...",
    backToSignIn: "Назад к входу",
  },
  resetPassword: {
    invalidTitle: "Недействительная ссылка",
    invalidSubtitle: "В этой ссылке для сброса пароля отсутствует информация.",
    requestNewLink: "Запросить новую ссылку для сброса",
    title: "Установите новый пароль",
    subtitlePrefix: "Сброс пароля для",
    newPassword: "Новый пароль",
    passwordHint: "Минимум 8 символов.",
    genericError: "Что-то пошло не так.",
    done: "Пароль обновлён. Перенаправление на вход…",
    submit: "Сохранить новый пароль",
    submitting: "Сохранение...",
  },
};

export const authDictionaries: Record<AppLocale, AuthDict> = { en, pl, es, it, ru };
