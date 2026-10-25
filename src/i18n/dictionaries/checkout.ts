import type { AppLocale } from "@/i18n/locales";

export interface CheckoutSuccessDict {
  title: string;
  freeMessage: string;
  paidMessage: string;
  pendingMessage: string;
  sendVideo: string;
  goToAccount: string;
}

export const checkoutSuccessDictionaries: Record<AppLocale, CheckoutSuccessDict> = {
  en: {
    title: "You're all set",
    freeMessage:
      "Redeemed with your referral discount: no charge. We'll be in touch shortly, or you can send your video now.",
    paidMessage: "Your payment went through. We'll be in touch shortly, or you can send your video now.",
    pendingMessage: "Thanks. We're confirming your payment now.",
    sendVideo: "Send your video",
    goToAccount: "Go to your account",
  },
  pl: {
    title: "Wszystko gotowe",
    freeMessage:
      "Zrealizowano dzięki zniżce polecającej: bez opłaty. Wkrótce się odezwiemy, albo możesz od razu przesłać swoje wideo.",
    paidMessage: "Twoja płatność została zrealizowana. Wkrótce się odezwiemy, albo możesz od razu przesłać swoje wideo.",
    pendingMessage: "Dziękujemy. Właśnie potwierdzamy Twoją płatność.",
    sendVideo: "Prześlij wideo",
    goToAccount: "Przejdź do konta",
  },
  es: {
    title: "Todo listo",
    freeMessage:
      "Canjeado con tu descuento por referido, sin cargo. Nos pondremos en contacto pronto, o puedes enviar tu video ahora mismo.",
    paidMessage: "Tu pago se ha procesado correctamente. Nos pondremos en contacto pronto, o puedes enviar tu video ahora mismo.",
    pendingMessage: "Gracias. Estamos confirmando tu pago.",
    sendVideo: "Enviar tu video",
    goToAccount: "Ir a tu cuenta",
  },
  it: {
    title: "Tutto pronto",
    freeMessage:
      "Riscattato con il tuo sconto referral, nessun addebito. Ti contatteremo a breve, oppure puoi inviare subito il tuo video.",
    paidMessage: "Il tuo pagamento è andato a buon fine. Ti contatteremo a breve, oppure puoi inviare subito il tuo video.",
    pendingMessage: "Grazie. Stiamo confermando il tuo pagamento.",
    sendVideo: "Invia il tuo video",
    goToAccount: "Vai al tuo account",
  },
  ru: {
    title: "Всё готово",
    freeMessage:
      "Активировано с помощью реферальной скидки: без оплаты. Мы скоро свяжемся с вами, либо вы можете отправить видео прямо сейчас.",
    paidMessage: "Ваш платёж прошёл успешно. Мы скоро свяжемся с вами, либо вы можете отправить видео прямо сейчас.",
    pendingMessage: "Спасибо. Мы подтверждаем ваш платёж.",
    sendVideo: "Отправить видео",
    goToAccount: "Перейти в аккаунт",
  },
};
