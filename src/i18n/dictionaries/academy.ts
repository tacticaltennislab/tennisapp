import type { AppLocale } from "@/i18n/locales";

export interface AcademyDict {
  roles: { owner: string; coach: string; player: string };
  index: {
    eyebrow: string;
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyDetail: string;
  };
  detail: {
    eyebrow: string;
    subtitle: string;
    coaches: string;
    players: string;
    noPlayersTitle: string;
    noPlayersDetail: string;
    fallbackPlayer: string; // used in the remove confirmation when a player has no name
    inviteTitle: string;
    submissionsTitle: string;
    noVideos: string;
  };
  remove: {
    button: string;
    removing: string;
    confirm: string; // {name}
    error: string;
  };
  invite: {
    emailPlaceholder: string;
    language: string;
    send: string;
    sending: string;
    sent: string; // {email}
    error: string;
    emailFailed: string;
    copyLink: string;
    copied: string;
  };
  pending: {
    title: string;
    cancel: string;
    cancelling: string;
    cancelConfirm: string; // {email}
    cancelError: string;
    resend: string;
    resending: string;
    resent: string; // {email}
    resendError: string;
    emailFailed: string;
  };
  accept: {
    eyebrow: string;
    title: string;
    subtitle: string;
    invalid: string;
    wrongEmail: string; // {invited} {current}
    intro: Record<"owner" | "coach" | "player", string>; // {academy}
    button: string;
    submitting: string;
    error: string;
  };
  review: {
    untitled: string;
    watchVideo: string;
    placeholder: string;
    save: string;
    saving: string;
    error: string;
    status: { pending: string; reviewed: string };
  };
}

const en: AcademyDict = {
  roles: { owner: "Owner", coach: "Coach", player: "Player" },
  index: {
    eyebrow: "Academy",
    title: "Your academies",
    subtitle: "Academies you coach or manage on Tactical Tennis Lab.",
    emptyTitle: "No academy yet",
    emptyDetail: "Once your academy invites you, open the invitation link from your email.",
  },
  detail: {
    eyebrow: "Academy",
    subtitle: "Your coaches, players, and their video submissions.",
    coaches: "Coaches",
    players: "Players",
    noPlayersTitle: "No players yet",
    noPlayersDetail: "Invite players by email below.",
    fallbackPlayer: "this player",
    inviteTitle: "Invite someone",
    submissionsTitle: "Player submissions",
    noVideos: "No videos yet",
  },
  remove: {
    button: "Remove",
    removing: "Removing...",
    confirm: "Remove {name} from this academy?",
    error: "Could not remove.",
  },
  invite: {
    emailPlaceholder: "Email address",
    language: "Invitation language",
    send: "Send invite",
    sending: "Sending...",
    sent: "Invitation sent to {email}.",
    error: "Could not send invitation.",
    emailFailed: "The email could not be delivered. Copy this link and send it to them yourself:",
    copyLink: "Copy link",
    copied: "Copied",
  },
  pending: {
    title: "Pending invitations",
    cancel: "Cancel",
    cancelling: "Cancelling...",
    cancelConfirm: "Cancel the invitation for {email}? The link will stop working.",
    cancelError: "Could not cancel this invitation.",
    resend: "Resend",
    resending: "Sending...",
    resent: "Invitation re-sent to {email}.",
    resendError: "Could not resend this invitation.",
    emailFailed: "The email could not be delivered. Copy this link and send it yourself:",
  },
  accept: {
    eyebrow: "Academy invitation",
    title: "Join your academy",
    subtitle: "Accept your invitation to get started.",
    invalid: "This invitation is no longer valid. Ask your academy for a new one.",
    wrongEmail:
      "This invitation was sent to {invited}. You're signed in as {current}. Sign out and sign in with the invited address to accept.",
    intro: {
      owner: "You've been invited to manage this academy's account as part of {academy}.",
      coach: "You've been invited to review your academy's players' videos as part of {academy}.",
      player: "You've been invited to join {academy} so your coaches can review your videos.",
    },
    button: "Accept invitation",
    submitting: "Accepting...",
    error: "Could not accept this invitation.",
  },
  review: {
    untitled: "Untitled video",
    watchVideo: "Watch video",
    placeholder: "Feedback and training plan notes for this player...",
    save: "Save feedback",
    saving: "Saving...",
    error: "Something went wrong.",
    status: { pending: "pending", reviewed: "reviewed" },
  },
};

const pl: AcademyDict = {
  roles: { owner: "Właściciel", coach: "Trener", player: "Zawodnik" },
  index: {
    eyebrow: "Akademia",
    title: "Twoje akademie",
    subtitle: "Akademie, w których trenujesz lub którymi zarządzasz w Tactical Tennis Lab.",
    emptyTitle: "Brak akademii",
    emptyDetail: "Gdy akademia Cię zaprosi, otwórz link z zaproszenia w swojej poczcie.",
  },
  detail: {
    eyebrow: "Akademia",
    subtitle: "Trenerzy, zawodnicy i ich przesłane filmy.",
    coaches: "Trenerzy",
    players: "Zawodnicy",
    noPlayersTitle: "Brak zawodników",
    noPlayersDetail: "Zaproś zawodników e-mailem poniżej.",
    fallbackPlayer: "tego zawodnika",
    inviteTitle: "Zaproś osobę",
    submissionsTitle: "Filmy zawodników",
    noVideos: "Brak filmów",
  },
  remove: {
    button: "Usuń",
    removing: "Usuwanie...",
    confirm: "Usunąć {name} z tej akademii?",
    error: "Nie udało się usunąć.",
  },
  invite: {
    emailPlaceholder: "Adres e-mail",
    language: "Język zaproszenia",
    send: "Wyślij zaproszenie",
    sending: "Wysyłanie...",
    sent: "Zaproszenie wysłano na adres {email}.",
    error: "Nie udało się wysłać zaproszenia.",
    emailFailed: "Nie udało się dostarczyć wiadomości. Skopiuj ten link i wyślij go samodzielnie:",
    copyLink: "Kopiuj link",
    copied: "Skopiowano",
  },
  pending: {
    title: "Oczekujące zaproszenia",
    cancel: "Anuluj",
    cancelling: "Anulowanie...",
    cancelConfirm: "Anulować zaproszenie dla {email}? Link przestanie działać.",
    cancelError: "Nie udało się anulować zaproszenia.",
    resend: "Wyślij ponownie",
    resending: "Wysyłanie...",
    resent: "Ponownie wysłano zaproszenie na adres {email}.",
    resendError: "Nie udało się ponownie wysłać zaproszenia.",
    emailFailed: "Nie udało się dostarczyć wiadomości. Skopiuj ten link i wyślij go samodzielnie:",
  },
  accept: {
    eyebrow: "Zaproszenie do akademii",
    title: "Dołącz do swojej akademii",
    subtitle: "Przyjmij zaproszenie, aby zacząć.",
    invalid: "To zaproszenie jest już nieważne. Poproś akademię o nowe.",
    wrongEmail:
      "To zaproszenie wysłano na adres {invited}. Jesteś zalogowany jako {current}. Wyloguj się i zaloguj na zaproszony adres, aby je przyjąć.",
    intro: {
      owner: "Zaproszono Cię do zarządzania kontem tej akademii w ramach {academy}.",
      coach: "Zaproszono Cię do oceniania filmów zawodników swojej akademii w ramach {academy}.",
      player: "Zaproszono Cię do dołączenia do {academy}, aby Twoi trenerzy mogli oceniać Twoje filmy.",
    },
    button: "Przyjmij zaproszenie",
    submitting: "Przyjmowanie...",
    error: "Nie udało się przyjąć zaproszenia.",
  },
  review: {
    untitled: "Film bez tytułu",
    watchVideo: "Obejrzyj film",
    placeholder: "Opinia i uwagi do planu treningowego dla tego zawodnika...",
    save: "Zapisz opinię",
    saving: "Zapisywanie...",
    error: "Coś poszło nie tak.",
    status: { pending: "oczekuje", reviewed: "ocenione" },
  },
};

const es: AcademyDict = {
  roles: { owner: "Propietario", coach: "Entrenador", player: "Jugador" },
  index: {
    eyebrow: "Academia",
    title: "Tus academias",
    subtitle: "Academias que entrenas o gestionas en Tactical Tennis Lab.",
    emptyTitle: "Aún no hay academia",
    emptyDetail: "Cuando tu academia te invite, abre el enlace de la invitación que recibirás por correo.",
  },
  detail: {
    eyebrow: "Academia",
    subtitle: "Tus entrenadores, jugadores y los vídeos que envían.",
    coaches: "Entrenadores",
    players: "Jugadores",
    noPlayersTitle: "Aún no hay jugadores",
    noPlayersDetail: "Invita a jugadores por correo electrónico abajo.",
    fallbackPlayer: "este jugador",
    inviteTitle: "Invitar a alguien",
    submissionsTitle: "Vídeos de los jugadores",
    noVideos: "Aún no hay vídeos",
  },
  remove: {
    button: "Quitar",
    removing: "Quitando...",
    confirm: "¿Quitar a {name} de esta academia?",
    error: "No se pudo quitar.",
  },
  invite: {
    emailPlaceholder: "Correo electrónico",
    language: "Idioma de la invitación",
    send: "Enviar invitación",
    sending: "Enviando...",
    sent: "Invitación enviada a {email}.",
    error: "No se pudo enviar la invitación.",
    emailFailed: "No se pudo entregar el correo. Copia este enlace y envíaselo tú mismo:",
    copyLink: "Copiar enlace",
    copied: "Copiado",
  },
  pending: {
    title: "Invitaciones pendientes",
    cancel: "Cancelar",
    cancelling: "Cancelando...",
    cancelConfirm: "¿Cancelar la invitación de {email}? El enlace dejará de funcionar.",
    cancelError: "No se pudo cancelar la invitación.",
    resend: "Reenviar",
    resending: "Enviando...",
    resent: "Invitación reenviada a {email}.",
    resendError: "No se pudo reenviar la invitación.",
    emailFailed: "No se pudo entregar el correo. Copia este enlace y envíalo tú mismo:",
  },
  accept: {
    eyebrow: "Invitación a la academia",
    title: "Únete a tu academia",
    subtitle: "Acepta tu invitación para empezar.",
    invalid: "Esta invitación ya no es válida. Pide una nueva a tu academia.",
    wrongEmail:
      "Esta invitación se envió a {invited}. Has iniciado sesión como {current}. Cierra sesión e inicia sesión con la dirección invitada para aceptarla.",
    intro: {
      owner: "Te han invitado a gestionar la cuenta de esta academia como parte de {academy}.",
      coach: "Te han invitado a revisar los vídeos de los jugadores de tu academia como parte de {academy}.",
      player: "Te han invitado a unirte a {academy} para que tus entrenadores puedan revisar tus vídeos.",
    },
    button: "Aceptar invitación",
    submitting: "Aceptando...",
    error: "No se pudo aceptar la invitación.",
  },
  review: {
    untitled: "Vídeo sin título",
    watchVideo: "Ver vídeo",
    placeholder: "Comentarios y notas del plan de entrenamiento para este jugador...",
    save: "Guardar comentarios",
    saving: "Guardando...",
    error: "Algo salió mal.",
    status: { pending: "pendiente", reviewed: "revisado" },
  },
};

const it: AcademyDict = {
  roles: { owner: "Titolare", coach: "Allenatore", player: "Giocatore" },
  index: {
    eyebrow: "Accademia",
    title: "Le tue accademie",
    subtitle: "Le accademie che alleni o gestisci su Tactical Tennis Lab.",
    emptyTitle: "Nessuna accademia",
    emptyDetail: "Quando la tua accademia ti inviterà, apri il link dell'invito che riceverai via e-mail.",
  },
  detail: {
    eyebrow: "Accademia",
    subtitle: "I tuoi allenatori, i giocatori e i video che inviano.",
    coaches: "Allenatori",
    players: "Giocatori",
    noPlayersTitle: "Nessun giocatore",
    noPlayersDetail: "Invita i giocatori via e-mail qui sotto.",
    fallbackPlayer: "questo giocatore",
    inviteTitle: "Invita qualcuno",
    submissionsTitle: "Video dei giocatori",
    noVideos: "Nessun video",
  },
  remove: {
    button: "Rimuovi",
    removing: "Rimozione...",
    confirm: "Rimuovere {name} da questa accademia?",
    error: "Impossibile rimuovere.",
  },
  invite: {
    emailPlaceholder: "Indirizzo e-mail",
    language: "Lingua dell'invito",
    send: "Invia invito",
    sending: "Invio...",
    sent: "Invito inviato a {email}.",
    error: "Impossibile inviare l'invito.",
    emailFailed: "Non è stato possibile recapitare l'e-mail. Copia questo link e invialo tu stesso:",
    copyLink: "Copia link",
    copied: "Copiato",
  },
  pending: {
    title: "Inviti in sospeso",
    cancel: "Annulla",
    cancelling: "Annullamento...",
    cancelConfirm: "Annullare l'invito per {email}? Il link smetterà di funzionare.",
    cancelError: "Impossibile annullare l'invito.",
    resend: "Reinvia",
    resending: "Invio...",
    resent: "Invito reinviato a {email}.",
    resendError: "Impossibile reinviare l'invito.",
    emailFailed: "Non è stato possibile recapitare l'e-mail. Copia questo link e invialo tu stesso:",
  },
  accept: {
    eyebrow: "Invito all'accademia",
    title: "Unisciti alla tua accademia",
    subtitle: "Accetta l'invito per iniziare.",
    invalid: "Questo invito non è più valido. Chiedi un nuovo invito alla tua accademia.",
    wrongEmail:
      "Questo invito è stato inviato a {invited}. Hai effettuato l'accesso come {current}. Esci e accedi con l'indirizzo invitato per accettarlo.",
    intro: {
      owner: "Ti è stato inviato un invito a gestire l'account di questa accademia come parte di {academy}.",
      coach: "Ti è stato inviato un invito a esaminare i video dei giocatori della tua accademia come parte di {academy}.",
      player: "Ti è stato inviato un invito a unirti a {academy} in modo che i tuoi allenatori possano esaminare i tuoi video.",
    },
    button: "Accetta l'invito",
    submitting: "Accettazione...",
    error: "Impossibile accettare l'invito.",
  },
  review: {
    untitled: "Video senza titolo",
    watchVideo: "Guarda il video",
    placeholder: "Feedback e note sul piano di allenamento per questo giocatore...",
    save: "Salva feedback",
    saving: "Salvataggio...",
    error: "Qualcosa è andato storto.",
    status: { pending: "in attesa", reviewed: "esaminato" },
  },
};

const ru: AcademyDict = {
  roles: { owner: "Владелец", coach: "Тренер", player: "Игрок" },
  index: {
    eyebrow: "Академия",
    title: "Ваши академии",
    subtitle: "Академии, в которых вы тренируете или которыми управляете на Tactical Tennis Lab.",
    emptyTitle: "Академий пока нет",
    emptyDetail: "Когда академия пригласит вас, откройте ссылку из письма с приглашением.",
  },
  detail: {
    eyebrow: "Академия",
    subtitle: "Ваши тренеры, игроки и их видео.",
    coaches: "Тренеры",
    players: "Игроки",
    noPlayersTitle: "Игроков пока нет",
    noPlayersDetail: "Пригласите игроков по электронной почте ниже.",
    fallbackPlayer: "этого игрока",
    inviteTitle: "Пригласить участника",
    submissionsTitle: "Видео игроков",
    noVideos: "Видео пока нет",
  },
  remove: {
    button: "Удалить",
    removing: "Удаление...",
    confirm: "Удалить {name} из этой академии?",
    error: "Не удалось удалить.",
  },
  invite: {
    emailPlaceholder: "Адрес электронной почты",
    language: "Язык приглашения",
    send: "Отправить приглашение",
    sending: "Отправка...",
    sent: "Приглашение отправлено на {email}.",
    error: "Не удалось отправить приглашение.",
    emailFailed: "Не удалось доставить письмо. Скопируйте эту ссылку и отправьте её самостоятельно:",
    copyLink: "Копировать ссылку",
    copied: "Скопировано",
  },
  pending: {
    title: "Ожидающие приглашения",
    cancel: "Отменить",
    cancelling: "Отмена...",
    cancelConfirm: "Отменить приглашение для {email}? Ссылка перестанет работать.",
    cancelError: "Не удалось отменить приглашение.",
    resend: "Отправить снова",
    resending: "Отправка...",
    resent: "Приглашение повторно отправлено на {email}.",
    resendError: "Не удалось повторно отправить приглашение.",
    emailFailed: "Не удалось доставить письмо. Скопируйте эту ссылку и отправьте её самостоятельно:",
  },
  accept: {
    eyebrow: "Приглашение в академию",
    title: "Присоединитесь к своей академии",
    subtitle: "Примите приглашение, чтобы начать.",
    invalid: "Это приглашение больше не действует. Попросите академию прислать новое.",
    wrongEmail:
      "Это приглашение отправлено на {invited}. Вы вошли как {current}. Выйдите и войдите с приглашённым адресом, чтобы принять его.",
    intro: {
      owner: "Вас пригласили управлять аккаунтом этой академии в составе {academy}.",
      coach: "Вас пригласили просматривать видео игроков вашей академии в составе {academy}.",
      player: "Вас пригласили присоединиться к {academy}, чтобы ваши тренеры могли разбирать ваши видео.",
    },
    button: "Принять приглашение",
    submitting: "Принятие...",
    error: "Не удалось принять приглашение.",
  },
  review: {
    untitled: "Видео без названия",
    watchVideo: "Смотреть видео",
    placeholder: "Отзыв и заметки к плану тренировок для этого игрока...",
    save: "Сохранить отзыв",
    saving: "Сохранение...",
    error: "Что-то пошло не так.",
    status: { pending: "ожидает", reviewed: "просмотрено" },
  },
};

export const academyDictionaries: Record<AppLocale, AcademyDict> = { en, pl, es, it, ru };

export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
}
