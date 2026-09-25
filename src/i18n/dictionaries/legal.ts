import type { AppLocale } from "@/i18n/locales";

export interface LegalSection {
  title: string;
  body: string[];
}

export interface LegalPageDict {
  eyebrow: string;
  title: string;
  subtitle: string;
  sections: LegalSection[];
}

export interface LegalDict {
  terms: LegalPageDict;
  privacy: LegalPageDict;
}

export const legalDictionaries: Record<AppLocale, LegalDict> = {
  en: {
    terms: {
      eyebrow: "Legal",
      title: "Terms of Service",
      subtitle: "Last updated September 2026. Please read these terms carefully before using Tactical Tennis Lab.",
      sections: [
        {
          title: "1. Who we are",
          body: [
            "Tactical Tennis Lab (“we”, “us”, “our”) is currently operated by Piotr Kusiewicz and Mateusz Kułakowski as individuals, trading as Tactical Tennis Lab (formal business registration is in progress). We provide online tennis coaching services, including video analysis and personalized training plans, accessible at tacticaltennislab.com (the “Service”). You can reach us at tacticaltennislab@gmail.com.",
            "By creating an account, submitting a video, or purchasing a plan, you agree to these Terms of Service.",
          ],
        },
        {
          title: "2. The service",
          body: [
            "We offer video-based technical and tactical analysis, personalized training plans, and coach feedback delivered through the website. Every plan is built personally by one of our coaches based on your video and goals — not generated automatically. Submitting a video, messaging a coach, and purchasing a plan all require an account.",
            "Coaching feedback is based on the video and information you provide. It is educational and developmental in nature and is not a substitute for in-person instruction, medical advice, or a fitness assessment. You are responsible for your own physical safety while training.",
          ],
        },
        {
          title: "3. Accounts and minors",
          body: [
            "You must provide accurate information when creating an account and keep your login credentials confidential. You are responsible for all activity under your account.",
            "You must be at least 16 years old to create an account. If a player is under 18, a parent or guardian must create and manage the account on their behalf. There is only one login per account, so every video, coach note, and message exchanged with a coach passes through that single account and is visible to whoever holds it — there is no separate or hidden channel between a coach and a minor. Coaches will maintain professional conduct at all times when working with minors; if you have any safeguarding concern, contact us immediately at tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "4. Payments and subscriptions",
          body: [
            "Paid plans are processed securely through Stripe. We do not store your full card details on our servers. All prices are listed in USD; we do not add VAT or sales tax at checkout.",
            "One-time plans (such as Stroke Fix, Smart System, and Match IQ) are billed once at purchase. PRO Tour is a recurring monthly subscription that renews automatically until cancelled.",
            "You can cancel a subscription at any time from your account; cancellation takes effect at the end of the current billing period, and you keep access until then. We don't provide partial refunds for unused time in a billing period.",
            "You can earn a discount by sharing your personal referral link (found in your account). A referral only counts once the person you referred completes their first paid purchase. Once you reach a referral milestone, the corresponding discount applies automatically to your own future purchases: currently 20% off after 1 successful referral, 40% off after 2, and most plans free after 5 (Match IQ: Full is capped at 50% off and PRO Tour at 40% off, even at higher referral counts). Referral discounts cannot be exchanged for cash and cannot be combined with other promotional offers unless we say otherwise.",
            "We may modify, pause, or end the referral program, or change future discount tiers, at any time; a discount tier you've already unlocked will keep applying to your account going forward unless we notify you otherwise. We may reverse referral credit and suspend accounts involved in self-referral, fake accounts, or other abuse of the program, including where a qualifying purchase is later refunded or charged back.",
          ],
        },
        {
          title: "5. Your right to cancel (EU/EEA and UK consumers)",
          body: [
            "If you are a consumer in the EU, EEA, or UK, you normally have the right to withdraw from an online purchase within 14 days without giving a reason.",
            "Because our one-time plans (Stroke Fix, Smart System, Match IQ) involve personalized analysis that we begin as soon as you submit your video, you agree that performance starts immediately and acknowledge that once a coach has begun or completed your analysis, you lose the right of withdrawal for that purchase, as permitted under EU Consumer Rights Directive 2011/83/EU Article 16(m). Before a coach has started work on your submission, you can still request a full refund.",
            "For the PRO Tour subscription, you may withdraw within 14 days of first subscribing, minus the value of any analysis already delivered during that period. After the initial 14 days, the cancellation terms in Section 4 apply.",
            "To request a refund or cancellation under this section, email tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "6. Your video and content",
          body: [
            "You retain ownership of the videos and content you submit. By submitting a video, you grant us a limited license to view, analyze, and store it solely for the purpose of providing your coaching feedback and training plan.",
            "Only submit video that you have the right to share. If your video shows other identifiable players, you confirm you have their permission (or a parent/guardian's permission, if they are a minor) to share the footage with us for analysis.",
            "We will never use your video, photos, or name in marketing or promotional material without asking for your separate, explicit consent first.",
            "If you submit a review through your account, that is your separate, explicit consent for us to display it publicly on our website, together with your name, once we've approved it. We review submissions before publishing and may decline or remove a review at our discretion (for example, if it's abusive, fake, or unrelated to our coaching). You can ask us to remove a published review at any time by emailing tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "7. Acceptable use",
          body: [
            "Don't misuse the Service — this includes attempting to access another user's account, disrupting the Service, or using it for anything unlawful. We may suspend or terminate accounts that violate these terms.",
          ],
        },
        {
          title: "8. Intellectual property",
          body: [
            "The Tactical Tennis Lab name, branding, website design, and training methodology are our property. Training plans and feedback we provide to you are for your personal use and not for resale or redistribution.",
          ],
        },
        {
          title: "9. Disclaimers and limitation of liability",
          body: [
            "The Service is provided “as is.” We do not guarantee specific results from coaching or training plans. To the extent permitted by law, Tactical Tennis Lab is not liable for indirect, incidental, or consequential damages arising from your use of the Service, including injury sustained while training. Nothing in these Terms limits any liability that cannot be limited under applicable law, or affects the statutory rights you have as a consumer in your country of residence.",
            "The \"Quick questions\" widget is an automated AI assistant for general questions about pricing and how the Service works — it is not a coach, does not review video or technique, and does not create training plans. Its answers are provided for convenience and may occasionally be wrong; they are not professional coaching advice and don't override these Terms. For anything coaching-related, submit a video for a real coach to review; for anything else, email tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "10. Changes to these terms",
          body: [
            "We may update these Terms from time to time. Continued use of the Service after a change means you accept the updated Terms.",
          ],
        },
        {
          title: "11. Governing law and disputes",
          body: [
            "These Terms do not affect the mandatory consumer protection laws of your country of residence, which continue to apply if you are an EU/EEA or UK consumer regardless of any other law stated here. If you're not satisfied with how we've resolved an issue, you can also use the European Commission's Online Dispute Resolution platform or contact your local consumer protection authority.",
          ],
        },
        {
          title: "12. Contact",
          body: ["Questions about these Terms? Reach us at tacticaltennislab@gmail.com."],
        },
      ],
    },
    privacy: {
      eyebrow: "Legal",
      title: "Privacy Policy",
      subtitle: "Last updated September 2026. This explains what personal data we collect and how we use it.",
      sections: [
        {
          title: "1. Who is responsible for your data",
          body: [
            "Tactical Tennis Lab is currently operated by Piotr Kusiewicz and Mateusz Kułakowski as individuals (formal business registration is in progress). For the purposes of data protection law, Piotr Kusiewicz and Mateusz Kułakowski act as joint data controllers for personal data processed through tacticaltennislab.com. You can contact us about any privacy question at tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "2. What we collect",
          body: [
            "Account information: your name, email address, and password (stored as a secure hash — we never store your password in plain text). If you sign in with Google, we receive your name and email from Google.",
            "Content you provide: video submissions, the details you enter when requesting a training plan or contacting a coach, and messages you send through the Service.",
            "Payment information: when you purchase a plan, payment is handled directly by Stripe. We receive confirmation of your purchase and plan, but never your full card number.",
            "Referral information: if you sign up using a friend's referral link, we record which account referred you, and how many people you've successfully referred, so we can calculate referral discounts.",
            "Reviews: if you choose to submit a review, we store the rating and text you write. If we approve it, it's displayed publicly on our website together with your name — this only happens if you submit a review yourself, and you can ask us to take it down at any time.",
          ],
        },
        {
          title: "3. How we use it, and why we're allowed to",
          body: [
            "To provide the Service — reviewing your video, building your training plan, and letting you message your coach — because it's necessary to perform our contract with you.",
            "To send you account-related email — welcome messages, password resets, coach feedback notifications, and purchase confirmations — also necessary to perform our contract with you.",
            "To calculate and apply the discount you've earned through our referral program, if you take part in it — also necessary to perform our contract with you.",
            "To keep the Service secure and prevent misuse, and to comply with our legal obligations (for example, tax and payment records) — based on our legitimate interest and legal obligations.",
            "We do not sell your personal information to third parties, and we do not use your data for advertising.",
          ],
        },
        {
          title: "4. Who we share it with",
          body: [
            "We use a small number of service providers to run Tactical Tennis Lab: Vercel (hosting), Neon (database), Vercel Blob (video storage), Resend (transactional email), and Stripe (payments). We also use Vercel Analytics to understand overall site traffic; it's aggregated, cookieless, and doesn't identify you individually. Each provider only receives the data it needs to perform its function, and each has its own privacy and security practices.",
            "If you use the \"Quick questions\" AI assistant on the site, whatever you type is sent to Anthropic (our AI provider) to generate a response. That conversation isn't linked to your account or saved on our servers — it only exists in your browser for that visit. Avoid sharing personal details in it.",
            "Some of these providers may process data on servers outside the EU/EEA (for example, in the United States). Where that happens, they do so under their own GDPR-compliant safeguards, such as Standard Contractual Clauses.",
          ],
        },
        {
          title: "5. How long we keep it",
          body: [
            "We keep your account, video submissions, and messages for as long as your account is active, so your coach and training history stay available to you. If you delete your account, we delete or anonymize your personal data within a reasonable time, except where we're required to keep records (such as payment records) for legal or accounting reasons.",
          ],
        },
        {
          title: "6. Your rights",
          body: [
            "Under GDPR (if you're in the EU/EEA) and similar laws elsewhere, you have the right to: access the personal data we hold about you; correct inaccurate data; request erasure of your data; restrict or object to certain processing; request a portable copy of your data; and withdraw consent at any time where we rely on it.",
            "To exercise any of these rights, email tacticaltennislab@gmail.com. If you're not satisfied with our response, you have the right to lodge a complaint with your local data protection supervisory authority.",
          ],
        },
        {
          title: "7. Children's data",
          body: [
            "Our Service is intended for account holders 16 and older. For players under 18, a parent or guardian creates and manages the account, and the personal data of the minor (video submissions, feedback, messages) is processed on the basis of that parent or guardian's agreement to our Terms and this Policy. Because there is only one login per account, the parent or guardian who holds it has full visibility into everything exchanged with a coach.",
          ],
        },
        {
          title: "8. Cookies",
          body: [
            "We use essential cookies to keep you signed in and remember your session, and a first-party cookie that remembers which referral link you arrived through (if any) for up to 30 days, so we can credit the right account if you sign up. We don't use third-party advertising or tracking cookies.",
          ],
        },
        {
          title: "9. Changes to this policy",
          body: [
            "We may update this Privacy Policy from time to time. If we make material changes, we'll update the date below and, where appropriate, notify you by email.",
          ],
        },
        {
          title: "10. Contact",
          body: ["Questions about this Privacy Policy or your data? Email us at tacticaltennislab@gmail.com."],
        },
      ],
    },
  },
  pl: {
    terms: {
      eyebrow: "Informacje prawne",
      title: "Regulamin świadczenia usług",
      subtitle: "Ostatnia aktualizacja: wrzesień 2026. Prosimy o uważne zapoznanie się z niniejszym regulaminem przed rozpoczęciem korzystania z Tactical Tennis Lab.",
      sections: [
        {
          title: "1. Kim jesteśmy",
          body: [
            "Tactical Tennis Lab („my”, „nas”, „nasz”) jest obecnie prowadzony przez Piotra Kusiewicza i Mateusza Kułakowskiego jako osoby fizyczne, działające pod nazwą Tactical Tennis Lab (formalna rejestracja działalności gospodarczej jest w trakcie realizacji). Świadczymy usługi trenerskie w zakresie tenisa online, w tym analizę wideo i spersonalizowane plany treningowe, dostępne pod adresem tacticaltennislab.com („Usługa”). Możesz się z nami skontaktować pod adresem tacticaltennislab@gmail.com.",
            "Zakładając konto, przesyłając wideo lub kupując plan, akceptujesz niniejszy Regulamin świadczenia usług.",
          ],
        },
        {
          title: "2. Usługa",
          body: [
            "Oferujemy techniczną i taktyczną analizę na podstawie wideo, spersonalizowane plany treningowe oraz opinie trenerów przekazywane za pośrednictwem strony internetowej. Każdy plan jest tworzony osobiście przez jednego z naszych trenerów na podstawie Twojego wideo i celów — nie jest generowany automatycznie. Przesyłanie wideo, wysyłanie wiadomości do trenera oraz zakup planu wymagają posiadania konta.",
            "Informacja zwrotna od trenera opiera się na przesłanym przez Ciebie wideo i podanych informacjach. Ma charakter edukacyjny i rozwojowy i nie zastępuje instruktażu prowadzonego osobiście, porady medycznej ani oceny sprawności fizycznej. Odpowiadasz samodzielnie za swoje bezpieczeństwo fizyczne podczas treningu.",
          ],
        },
        {
          title: "3. Konta i osoby niepełnoletnie",
          body: [
            "Podczas zakładania konta musisz podać prawdziwe dane i zachować poufność danych logowania. Odpowiadasz za wszystkie działania wykonywane w ramach Twojego konta.",
            "Aby założyć konto, musisz mieć ukończone 16 lat. Jeśli zawodnik ma mniej niż 18 lat, konto w jego imieniu musi założyć i prowadzić rodzic lub opiekun prawny. Do każdego konta przypisane jest tylko jedno logowanie, więc każde wideo, notatka trenera i wiadomość wymieniona z trenerem przechodzi przez to jedno konto i jest widoczna dla osoby, która je posiada — nie istnieje osobny ani ukryty kanał komunikacji między trenerem a osobą niepełnoletnią. Trenerzy zawsze zachowują profesjonalizm podczas pracy z osobami niepełnoletnimi; w razie jakichkolwiek wątpliwości dotyczących bezpieczeństwa prosimy o niezwłoczny kontakt pod adresem tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "4. Płatności i subskrypcje",
          body: [
            "Płatne plany są przetwarzane w bezpieczny sposób za pośrednictwem Stripe. Nie przechowujemy pełnych danych Twojej karty na naszych serwerach. Wszystkie ceny podane są w USD; nie doliczamy VAT ani podatku od sprzedaży przy płatności.",
            "Plany jednorazowe (takie jak Stroke Fix, Smart System i Match IQ) są rozliczane jednorazowo w momencie zakupu. PRO Tour to cykliczna miesięczna subskrypcja, która odnawia się automatycznie do momentu anulowania.",
            "Subskrypcję możesz anulować w dowolnym momencie z poziomu swojego konta; anulowanie wchodzi w życie z końcem bieżącego okresu rozliczeniowego, a dostęp zachowujesz do tego czasu. Nie oferujemy częściowych zwrotów za niewykorzystany czas w ramach okresu rozliczeniowego.",
            "Możesz uzyskać zniżkę, udostępniając swój indywidualny link polecający (dostępny na koncie). Polecenie liczy się dopiero po dokonaniu przez poleconą osobę pierwszego płatnego zakupu. Po osiągnięciu danego progu poleceń odpowiadająca mu zniżka jest automatycznie stosowana do Twoich przyszłych zakupów: obecnie 20% zniżki po 1 skutecznym poleceniu, 40% po 2, a większość planów jest darmowa po 5 poleceniach (Match IQ: Full jest ograniczony do maksymalnie 50% zniżki, a PRO Tour do 40%, nawet przy wyższej liczbie poleceń). Zniżek z programu poleceń nie można wymienić na gotówkę ani łączyć z innymi ofertami promocyjnymi, chyba że wskażemy inaczej.",
            "Możemy w dowolnym momencie zmodyfikować, wstrzymać lub zakończyć program poleceń albo zmienić przyszłe progi zniżek; próg zniżki, który już odblokowałeś, będzie nadal stosowany do Twojego konta, chyba że poinformujemy Cię inaczej. Możemy cofnąć naliczony kredyt z polecenia i zawiesić konta zaangażowane w samopolecanie, fałszywe konta lub inne nadużycia programu, w tym w przypadkach gdy kwalifikujący się zakup zostanie później zwrócony lub zakwestionowany (chargeback).",
          ],
        },
        {
          title: "5. Twoje prawo do odstąpienia od umowy (konsumenci z UE/EOG i Wielkiej Brytanii)",
          body: [
            "Jeśli jesteś konsumentem z UE, EOG lub Wielkiej Brytanii, zasadniczo przysługuje Ci prawo do odstąpienia od zakupu online w ciągu 14 dni bez podania przyczyny.",
            "Ponieważ nasze plany jednorazowe (Stroke Fix, Smart System, Match IQ) obejmują spersonalizowaną analizę, którą rozpoczynamy natychmiast po przesłaniu przez Ciebie wideo, wyrażasz zgodę na to, że wykonanie usługi rozpoczyna się niezwłocznie, i przyjmujesz do wiadomości, że po rozpoczęciu lub zakończeniu analizy przez trenera tracisz prawo do odstąpienia od umowy w odniesieniu do tego zakupu, zgodnie z art. 16 lit. m) Dyrektywy Parlamentu Europejskiego i Rady 2011/83/UE w sprawie praw konsumentów. Przed rozpoczęciem pracy przez trenera nad Twoim zgłoszeniem nadal możesz wystąpić o pełny zwrot pieniędzy.",
            "W przypadku subskrypcji PRO Tour możesz odstąpić od umowy w ciągu 14 dni od pierwszej subskrypcji, pomniejszając zwrot o wartość analizy już dostarczonej w tym okresie. Po upływie pierwszych 14 dni obowiązują warunki anulowania określone w punkcie 4.",
            "Aby zażądać zwrotu pieniędzy lub anulowania na podstawie niniejszego punktu, napisz do nas na adres tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "6. Twoje wideo i treści",
          body: [
            "Zachowujesz prawa własności do przesyłanych przez siebie wideo i treści. Przesyłając wideo, udzielasz nam ograniczonej licencji na jego przeglądanie, analizowanie i przechowywanie wyłącznie w celu przekazania Ci opinii trenerskiej i planu treningowego.",
            "Przesyłaj wyłącznie wideo, do udostępnienia którego masz prawo. Jeśli na Twoim wideo widoczni są inni rozpoznawalni zawodnicy, potwierdzasz, że posiadasz ich zgodę (lub zgodę rodzica/opiekuna prawnego, jeśli są osobami niepełnoletnimi) na udostępnienie nam nagrania w celu analizy.",
            "Nigdy nie wykorzystamy Twojego wideo, zdjęć ani imienia i nazwiska w materiałach marketingowych lub promocyjnych bez uprzedniego uzyskania Twojej odrębnej, wyraźnej zgody.",
            "Jeśli za pośrednictwem swojego konta przesyłasz opinię, stanowi to Twoją odrębną, wyraźną zgodę na jej publiczne wyświetlenie na naszej stronie internetowej wraz z Twoim imieniem i nazwiskiem, po jej zatwierdzeniu przez nas. Przeglądamy zgłoszone opinie przed publikacją i możemy według własnego uznania odmówić publikacji lub usunąć opinię (na przykład jeśli jest obraźliwa, fałszywa lub niezwiązana z naszymi usługami trenerskimi). W dowolnym momencie możesz poprosić o usunięcie opublikowanej opinii, pisząc na adres tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "7. Dopuszczalne korzystanie z Usługi",
          body: [
            "Nie nadużywaj Usługi — dotyczy to m.in. prób uzyskania dostępu do konta innego użytkownika, zakłócania działania Usługi lub wykorzystywania jej do jakichkolwiek niezgodnych z prawem celów. Możemy zawiesić lub zamknąć konta naruszające niniejszy regulamin.",
          ],
        },
        {
          title: "8. Własność intelektualna",
          body: [
            "Nazwa Tactical Tennis Lab, identyfikacja wizualna, projekt strony internetowej oraz metodyka treningowa stanowią naszą własność. Plany treningowe i informacje zwrotne przekazywane Tobie są przeznaczone wyłącznie do Twojego osobistego użytku i nie mogą być odsprzedawane ani rozpowszechniane.",
          ],
        },
        {
          title: "9. Zastrzeżenia i ograniczenie odpowiedzialności",
          body: [
            "Usługa jest świadczona w stanie „takim, jaki jest” („as is”). Nie gwarantujemy konkretnych rezultatów treningów ani planów treningowych. W zakresie dopuszczalnym przez prawo Tactical Tennis Lab nie ponosi odpowiedzialności za szkody pośrednie, uboczne lub następcze wynikające z korzystania z Usługi, w tym za kontuzje odniesione podczas treningu. Żadne postanowienie niniejszego Regulaminu nie ogranicza odpowiedzialności, której nie można ograniczyć na mocy obowiązującego prawa, ani nie wpływa na ustawowe prawa przysługujące Ci jako konsumentowi w kraju Twojego zamieszkania.",
            "Widżet „Szybkie pytania” to zautomatyzowany asystent AI odpowiadający na ogólne pytania dotyczące cennika i zasad działania Usługi — nie jest trenerem, nie ocenia wideo ani techniki i nie tworzy planów treningowych. Jego odpowiedzi mają charakter pomocniczy i mogą czasem być błędne; nie stanowią profesjonalnej porady trenerskiej i nie zastępują niniejszego Regulaminu. W sprawach związanych z treningiem prześlij wideo do oceny przez prawdziwego trenera; w pozostałych sprawach napisz do nas na adres tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "10. Zmiany niniejszego regulaminu",
          body: [
            "Możemy od czasu do czasu aktualizować niniejszy Regulamin. Dalsze korzystanie z Usługi po wprowadzeniu zmian oznacza akceptację zaktualizowanego Regulaminu.",
          ],
        },
        {
          title: "11. Prawo właściwe i rozstrzyganie sporów",
          body: [
            "Niniejszy Regulamin nie wpływa na bezwzględnie obowiązujące przepisy dotyczące ochrony konsumentów w kraju Twojego zamieszkania, które mają zastosowanie w dalszym ciągu, jeśli jesteś konsumentem z UE/EOG lub Wielkiej Brytanii, niezależnie od innych postanowień wskazanych powyżej. Jeśli nie jesteś zadowolony ze sposobu rozwiązania sprawy, możesz również skorzystać z unijnej platformy internetowego rozstrzygania sporów (ODR) prowadzonej przez Komisję Europejską lub skontaktować się z lokalnym organem ochrony konsumentów.",
          ],
        },
        {
          title: "12. Kontakt",
          body: ["Masz pytania dotyczące niniejszego Regulaminu? Napisz do nas na adres tacticaltennislab@gmail.com."],
        },
      ],
    },
    privacy: {
      eyebrow: "Informacje prawne",
      title: "Polityka prywatności",
      subtitle: "Ostatnia aktualizacja: wrzesień 2026. Niniejszy dokument wyjaśnia, jakie dane osobowe zbieramy i w jaki sposób je wykorzystujemy.",
      sections: [
        {
          title: "1. Kto odpowiada za Twoje dane",
          body: [
            "Tactical Tennis Lab jest obecnie prowadzony przez Piotra Kusiewicza i Mateusza Kułakowskiego jako osoby fizyczne (formalna rejestracja działalności gospodarczej jest w trakcie realizacji). Dla celów przepisów o ochronie danych osobowych Piotr Kusiewicz i Mateusz Kułakowski są współadministratorami danych osobowych przetwarzanych za pośrednictwem strony tacticaltennislab.com. W każdej sprawie dotyczącej prywatności możesz się z nami skontaktować pod adresem tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "2. Jakie dane zbieramy",
          body: [
            "Dane konta: imię i nazwisko, adres e-mail oraz hasło (przechowywane w postaci bezpiecznego skrótu — nigdy nie przechowujemy hasła w postaci jawnej). Jeśli logujesz się przez Google, otrzymujemy od Google Twoje imię i nazwisko oraz adres e-mail.",
            "Treści, które przekazujesz: przesłane wideo, dane podane przy zamawianiu planu treningowego lub kontakcie z trenerem oraz wiadomości wysyłane za pośrednictwem Usługi.",
            "Dane płatności: przy zakupie planu płatność jest obsługiwana bezpośrednio przez Stripe. Otrzymujemy potwierdzenie zakupu i wybranego planu, ale nigdy pełnego numeru karty.",
            "Dane dotyczące poleceń: jeśli rejestrujesz się z wykorzystaniem linku polecającego znajomego, zapisujemy, które konto Cię poleciło, oraz ile osób skutecznie poleciłeś, aby móc naliczyć zniżki z programu poleceń.",
            "Opinie: jeśli zdecydujesz się przesłać opinię, przechowujemy przyznaną ocenę i wpisany tekst. Po zatwierdzeniu opinia jest wyświetlana publicznie na naszej stronie wraz z Twoim imieniem i nazwiskiem — dzieje się tak wyłącznie, gdy sam przesyłasz opinię, a w każdej chwili możesz poprosić o jej usunięcie.",
          ],
        },
        {
          title: "3. Jak wykorzystujemy dane i na jakiej podstawie prawnej",
          body: [
            "W celu świadczenia Usługi — oceny Twojego wideo, przygotowania planu treningowego i umożliwienia kontaktu z trenerem — ponieważ jest to niezbędne do wykonania zawartej z Tobą umowy.",
            "W celu wysyłania wiadomości e-mail związanych z kontem — powitalnych, dotyczących resetowania hasła, powiadomień o informacji zwrotnej trenera oraz potwierdzeń zakupu — również niezbędnych do wykonania zawartej z Tobą umowy.",
            "W celu naliczenia i zastosowania zniżki uzyskanej w ramach programu poleceń, jeśli w nim uczestniczysz — również niezbędnych do wykonania zawartej z Tobą umowy.",
            "W celu zapewnienia bezpieczeństwa Usługi i zapobiegania nadużyciom oraz wypełnienia naszych obowiązków prawnych (na przykład dotyczących dokumentacji podatkowej i płatniczej) — na podstawie naszego prawnie uzasadnionego interesu i obowiązków prawnych.",
            "Nie sprzedajemy Twoich danych osobowych podmiotom trzecim i nie wykorzystujemy Twoich danych do celów reklamowych.",
          ],
        },
        {
          title: "4. Komu udostępniamy dane",
          body: [
            "Korzystamy z niewielkiej liczby dostawców usług potrzebnych do prowadzenia Tactical Tennis Lab: Vercel (hosting), Neon (baza danych), Vercel Blob (przechowywanie wideo), Resend (transakcyjna poczta e-mail) oraz Stripe (płatności). Korzystamy również z Vercel Analytics w celu analizy ogólnego ruchu na stronie; dane te są zagregowane, nie wykorzystują plików cookie i nie pozwalają na identyfikację poszczególnych osób. Każdy dostawca otrzymuje wyłącznie dane niezbędne do realizacji swojej funkcji i stosuje własne zasady ochrony prywatności i bezpieczeństwa.",
            "Jeśli korzystasz z asystenta AI „Szybkie pytania” na stronie, wszystko, co wpiszesz, jest przesyłane do Anthropic (naszego dostawcy AI) w celu wygenerowania odpowiedzi. Taka rozmowa nie jest powiązana z Twoim kontem ani zapisywana na naszych serwerach — istnieje wyłącznie w Twojej przeglądarce podczas danej wizyty. Unikaj podawania w niej danych osobowych.",
            "Niektórzy z tych dostawców mogą przetwarzać dane na serwerach zlokalizowanych poza UE/EOG (na przykład w Stanach Zjednoczonych). W takich przypadkach czynią to na podstawie własnych zabezpieczeń zgodnych z RODO, takich jak standardowe klauzule umowne.",
          ],
        },
        {
          title: "5. Jak długo przechowujemy dane",
          body: [
            "Przechowujemy dane Twojego konta, przesłane wideo i wiadomości tak długo, jak Twoje konto jest aktywne, aby historia treningów i kontaktu z trenerem pozostawała dla Ciebie dostępna. W przypadku usunięcia konta usuwamy lub anonimizujemy Twoje dane osobowe w rozsądnym terminie, z wyjątkiem sytuacji, gdy jesteśmy zobowiązani do zachowania dokumentacji (na przykład dokumentacji płatniczej) z przyczyn prawnych lub księgowych.",
          ],
        },
        {
          title: "6. Twoje prawa",
          body: [
            "Zgodnie z RODO (jeśli znajdujesz się w UE/EOG) oraz podobnymi przepisami obowiązującymi w innych krajach, przysługuje Ci prawo do: dostępu do przechowywanych przez nas danych osobowych; sprostowania nieprawidłowych danych; żądania usunięcia danych; ograniczenia przetwarzania lub wniesienia sprzeciwu wobec określonego przetwarzania; żądania przenośnej kopii danych; oraz cofnięcia zgody w dowolnym momencie, jeśli na niej się opieramy.",
            "Aby skorzystać z któregokolwiek z tych praw, napisz na adres tacticaltennislab@gmail.com. Jeśli nie jesteś zadowolony z naszej odpowiedzi, masz prawo wnieść skargę do właściwego organu nadzorczego ds. ochrony danych osobowych.",
          ],
        },
        {
          title: "7. Dane dzieci",
          body: [
            "Nasza Usługa jest przeznaczona dla posiadaczy kont, którzy ukończyli 16 lat. W przypadku zawodników poniżej 18. roku życia konto zakłada i prowadzi rodzic lub opiekun prawny, a dane osobowe osoby niepełnoletniej (przesłane wideo, informacje zwrotne, wiadomości) są przetwarzane na podstawie zgody tego rodzica lub opiekuna na nasz Regulamin i niniejszą Politykę. Ponieważ do każdego konta przypisane jest tylko jedno logowanie, rodzic lub opiekun, który je posiada, ma pełny wgląd we wszystko, co jest wymieniane z trenerem.",
          ],
        },
        {
          title: "8. Pliki cookie",
          body: [
            "Wykorzystujemy niezbędne pliki cookie, aby utrzymać Twoje zalogowanie i pamiętać Twoją sesję, a także własny plik cookie zapamiętujący, z jakiego linku polecającego skorzystałeś (jeśli w ogóle), przez okres do 30 dni, abyśmy mogli przypisać zniżkę właściwemu kontu w razie rejestracji. Nie wykorzystujemy plików cookie podmiotów trzecich do celów reklamowych ani śledzących.",
          ],
        },
        {
          title: "9. Zmiany niniejszej polityki",
          body: [
            "Możemy od czasu do czasu aktualizować niniejszą Politykę prywatności. W przypadku istotnych zmian zaktualizujemy datę widoczną poniżej i, w stosownych przypadkach, powiadomimy Cię za pośrednictwem wiadomości e-mail.",
          ],
        },
        {
          title: "10. Kontakt",
          body: ["Masz pytania dotyczące niniejszej Polityki prywatności lub swoich danych? Napisz do nas na adres tacticaltennislab@gmail.com."],
        },
      ],
    },
  },
  es: {
    terms: {
      eyebrow: "Legal",
      title: "Términos del servicio",
      subtitle: "Última actualización: septiembre de 2026. Lee atentamente estos términos antes de utilizar Tactical Tennis Lab.",
      sections: [
        {
          title: "1. Quiénes somos",
          body: [
            "Tactical Tennis Lab («nosotros», «nos», «nuestro») está actualmente operado por Piotr Kusiewicz y Mateusz Kułakowski como personas físicas, bajo el nombre comercial Tactical Tennis Lab (el registro formal de la actividad empresarial está en trámite). Ofrecemos servicios de entrenamiento de tenis en línea, incluido el análisis de vídeo y planes de entrenamiento personalizados, accesibles en tacticaltennislab.com (el «Servicio»). Puedes contactarnos en tacticaltennislab@gmail.com.",
            "Al crear una cuenta, enviar un vídeo o comprar un plan, aceptas estos Términos del servicio.",
          ],
        },
        {
          title: "2. El servicio",
          body: [
            "Ofrecemos análisis técnico y táctico basado en vídeo, planes de entrenamiento personalizados y comentarios de entrenadores entregados a través del sitio web. Cada plan es elaborado personalmente por uno de nuestros entrenadores en función de tu vídeo y tus objetivos, y no se genera automáticamente. Enviar un vídeo, escribir a un entrenador y comprar un plan requieren tener una cuenta.",
            "Los comentarios del entrenador se basan en el vídeo y la información que proporcionas. Tienen carácter educativo y formativo y no sustituyen la instrucción presencial, el asesoramiento médico ni una evaluación de condición física. Eres responsable de tu propia seguridad física durante el entrenamiento.",
          ],
        },
        {
          title: "3. Cuentas y menores de edad",
          body: [
            "Debes proporcionar información precisa al crear una cuenta y mantener la confidencialidad de tus credenciales de acceso. Eres responsable de toda actividad realizada bajo tu cuenta.",
            "Debes tener al menos 16 años para crear una cuenta. Si un jugador es menor de 18 años, un padre, madre o tutor legal debe crear y gestionar la cuenta en su nombre. Cada cuenta tiene un único inicio de sesión, por lo que todos los vídeos, notas del entrenador y mensajes intercambiados con un entrenador pasan por esa misma cuenta y son visibles para quien la posea — no existe un canal separado u oculto entre un entrenador y un menor. Los entrenadores mantendrán en todo momento una conducta profesional al trabajar con menores; si tienes cualquier inquietud sobre la seguridad, contáctanos de inmediato en tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "4. Pagos y suscripciones",
          body: [
            "Los planes de pago se procesan de forma segura a través de Stripe. No almacenamos los datos completos de tu tarjeta en nuestros servidores. Todos los precios se indican en USD; no añadimos IVA ni impuesto sobre las ventas al finalizar la compra.",
            "Los planes de pago único (como Stroke Fix, Smart System y Match IQ) se cobran una sola vez en el momento de la compra. PRO Tour es una suscripción mensual recurrente que se renueva automáticamente hasta que se cancele.",
            "Puedes cancelar una suscripción en cualquier momento desde tu cuenta; la cancelación surte efecto al final del período de facturación en curso, y conservas el acceso hasta entonces. No ofrecemos reembolsos parciales por el tiempo no utilizado dentro de un período de facturación.",
            "Puedes obtener un descuento compartiendo tu enlace de referido personal (disponible en tu cuenta). Un referido solo cuenta una vez que la persona referida completa su primera compra de pago. Al alcanzar un hito de referidos, el descuento correspondiente se aplica automáticamente a tus futuras compras: actualmente, 20% de descuento tras 1 referido exitoso, 40% tras 2, y la mayoría de los planes gratis tras 5 (Match IQ: Full tiene un tope máximo del 50% de descuento y PRO Tour del 40%, incluso con más referidos). Los descuentos por referidos no pueden canjearse por dinero en efectivo ni combinarse con otras ofertas promocionales, salvo que indiquemos lo contrario.",
            "Podemos modificar, pausar o finalizar el programa de referidos, o cambiar los futuros niveles de descuento, en cualquier momento; un nivel de descuento que ya hayas desbloqueado seguirá aplicándose a tu cuenta en el futuro, salvo que te notifiquemos lo contrario. Podemos revertir el crédito por referidos y suspender cuentas implicadas en autorreferidos, cuentas falsas u otro uso indebido del programa, incluidos los casos en los que una compra que cualificaba sea posteriormente reembolsada o impugnada (contracargo).",
          ],
        },
        {
          title: "5. Tu derecho de desistimiento (consumidores de la UE/EEE y el Reino Unido)",
          body: [
            "Si eres un consumidor de la UE, el EEE o el Reino Unido, normalmente tienes derecho a desistir de una compra en línea dentro de un plazo de 14 días sin necesidad de justificar el motivo.",
            "Dado que nuestros planes de pago único (Stroke Fix, Smart System, Match IQ) implican un análisis personalizado que comenzamos en cuanto envías tu vídeo, aceptas que la prestación del servicio comienza de inmediato y reconoces que, una vez que un entrenador haya comenzado o finalizado tu análisis, pierdes el derecho de desistimiento respecto a esa compra, tal y como permite el artículo 16, letra m), de la Directiva 2011/83/UE del Parlamento Europeo y del Consejo sobre los derechos de los consumidores. Antes de que un entrenador haya comenzado a trabajar en tu envío, aún puedes solicitar un reembolso completo.",
            "Para la suscripción PRO Tour, puedes desistir dentro de los 14 días posteriores a tu primera suscripción, descontando el valor del análisis ya entregado durante ese período. Transcurridos los primeros 14 días, se aplican las condiciones de cancelación de la Sección 4.",
            "Para solicitar un reembolso o cancelación conforme a esta sección, escribe a tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "6. Tu vídeo y contenido",
          body: [
            "Conservas la propiedad de los vídeos y el contenido que envías. Al enviar un vídeo, nos concedes una licencia limitada para verlo, analizarlo y almacenarlo únicamente con el fin de proporcionarte los comentarios de entrenamiento y el plan de entrenamiento.",
            "Envía únicamente vídeos que tengas derecho a compartir. Si tu vídeo muestra a otros jugadores identificables, confirmas que cuentas con su permiso (o el de su padre, madre o tutor legal, si son menores de edad) para compartir las imágenes con nosotros para su análisis.",
            "Nunca utilizaremos tu vídeo, fotos o nombre en material de marketing o promocional sin solicitarte antes tu consentimiento explícito y separado.",
            "Si envías una reseña a través de tu cuenta, ello constituye tu consentimiento explícito y separado para que la mostremos públicamente en nuestro sitio web, junto con tu nombre, una vez que la hayamos aprobado. Revisamos las reseñas enviadas antes de publicarlas y podemos rechazar o eliminar una reseña a nuestra discreción (por ejemplo, si es abusiva, falsa o no relacionada con nuestros servicios de entrenamiento). Puedes solicitarnos la eliminación de una reseña publicada en cualquier momento escribiendo a tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "7. Uso aceptable",
          body: [
            "No hagas un uso indebido del Servicio — esto incluye intentar acceder a la cuenta de otro usuario, interrumpir el funcionamiento del Servicio o utilizarlo para cualquier fin ilícito. Podemos suspender o cancelar cuentas que infrinjan estos términos.",
          ],
        },
        {
          title: "8. Propiedad intelectual",
          body: [
            "El nombre Tactical Tennis Lab, la identidad de marca, el diseño del sitio web y la metodología de entrenamiento son de nuestra propiedad. Los planes de entrenamiento y los comentarios que te proporcionamos son para tu uso personal y no pueden revenderse ni redistribuirse.",
          ],
        },
        {
          title: "9. Exenciones de responsabilidad y limitación de responsabilidad",
          body: [
            "El Servicio se proporciona «tal cual». No garantizamos resultados específicos derivados del entrenamiento o de los planes de entrenamiento. En la medida permitida por la ley, Tactical Tennis Lab no será responsable de daños indirectos, incidentales o consecuentes derivados del uso del Servicio, incluidas lesiones sufridas durante el entrenamiento. Nada en estos Términos limita ninguna responsabilidad que no pueda limitarse conforme a la legislación aplicable, ni afecta a los derechos legales que te correspondan como consumidor en tu país de residencia.",
            "El widget «Preguntas rápidas» es un asistente de IA automatizado para preguntas generales sobre precios y el funcionamiento del Servicio — no es un entrenador, no revisa vídeos ni técnica, y no crea planes de entrenamiento. Sus respuestas se ofrecen por comodidad y pueden ser ocasionalmente incorrectas; no constituyen asesoramiento profesional de entrenamiento ni sustituyen estos Términos. Para cualquier asunto relacionado con el entrenamiento, envía un vídeo para que lo revise un entrenador real; para cualquier otro asunto, escribe a tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "10. Cambios en estos términos",
          body: [
            "Podemos actualizar estos Términos de vez en cuando. El uso continuado del Servicio tras un cambio implica la aceptación de los Términos actualizados.",
          ],
        },
        {
          title: "11. Ley aplicable y controversias",
          body: [
            "Estos Términos no afectan a las normas imperativas de protección al consumidor de tu país de residencia, que continúan aplicándose si eres consumidor de la UE, el EEE o el Reino Unido, con independencia de cualquier otra ley aquí mencionada. Si no estás satisfecho con la forma en que hemos resuelto un problema, también puedes utilizar la plataforma de resolución de litigios en línea de la Comisión Europea o contactar con tu autoridad local de protección al consumidor.",
          ],
        },
        {
          title: "12. Contacto",
          body: ["¿Tienes preguntas sobre estos Términos? Escríbenos a tacticaltennislab@gmail.com."],
        },
      ],
    },
    privacy: {
      eyebrow: "Legal",
      title: "Política de privacidad",
      subtitle: "Última actualización: septiembre de 2026. Este documento explica qué datos personales recopilamos y cómo los utilizamos.",
      sections: [
        {
          title: "1. Quién es responsable de tus datos",
          body: [
            "Tactical Tennis Lab está actualmente operado por Piotr Kusiewicz y Mateusz Kułakowski como personas físicas (el registro formal de la actividad empresarial está en trámite). A efectos de la normativa de protección de datos, Piotr Kusiewicz y Mateusz Kułakowski actúan como corresponsables del tratamiento de los datos personales procesados a través de tacticaltennislab.com. Puedes contactarnos ante cualquier duda sobre privacidad en tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "2. Qué datos recopilamos",
          body: [
            "Información de la cuenta: tu nombre, dirección de correo electrónico y contraseña (almacenada como un hash seguro — nunca almacenamos tu contraseña en texto plano). Si inicias sesión con Google, recibimos tu nombre y correo electrónico desde Google.",
            "Contenido que nos proporcionas: los vídeos enviados, los datos que introduces al solicitar un plan de entrenamiento o contactar con un entrenador, y los mensajes que envías a través del Servicio.",
            "Información de pago: al comprar un plan, el pago es gestionado directamente por Stripe. Recibimos la confirmación de tu compra y plan, pero nunca el número completo de tu tarjeta.",
            "Información de referidos: si te registras utilizando el enlace de referido de un amigo, registramos qué cuenta te refirió y a cuántas personas has referido con éxito, para poder calcular los descuentos por referidos.",
            "Reseñas: si decides enviar una reseña, almacenamos la valoración y el texto que escribes. Si la aprobamos, se muestra públicamente en nuestro sitio web junto con tu nombre — esto solo ocurre si tú mismo envías la reseña, y puedes solicitarnos su retirada en cualquier momento.",
          ],
        },
        {
          title: "3. Cómo utilizamos tus datos y por qué estamos autorizados a hacerlo",
          body: [
            "Para prestar el Servicio — revisar tu vídeo, elaborar tu plan de entrenamiento y permitirte enviar mensajes a tu entrenador — porque es necesario para ejecutar el contrato contigo.",
            "Para enviarte correos electrónicos relacionados con la cuenta — mensajes de bienvenida, restablecimiento de contraseña, notificaciones de comentarios del entrenador y confirmaciones de compra — también necesario para ejecutar el contrato contigo.",
            "Para calcular y aplicar el descuento que hayas obtenido a través de nuestro programa de referidos, si participas en él — también necesario para ejecutar el contrato contigo.",
            "Para mantener la seguridad del Servicio y prevenir su uso indebido, y para cumplir con nuestras obligaciones legales (por ejemplo, registros fiscales y de pago) — sobre la base de nuestro interés legítimo y nuestras obligaciones legales.",
            "No vendemos tu información personal a terceros ni utilizamos tus datos con fines publicitarios.",
          ],
        },
        {
          title: "4. Con quién compartimos tus datos",
          body: [
            "Utilizamos un número reducido de proveedores de servicios para operar Tactical Tennis Lab: Vercel (alojamiento), Neon (base de datos), Vercel Blob (almacenamiento de vídeo), Resend (correo electrónico transaccional) y Stripe (pagos). También utilizamos Vercel Analytics para comprender el tráfico general del sitio; estos datos están agregados, no utilizan cookies y no te identifican individualmente. Cada proveedor recibe únicamente los datos necesarios para cumplir su función, y cada uno cuenta con sus propias prácticas de privacidad y seguridad.",
            "Si utilizas el asistente de IA «Preguntas rápidas» del sitio, todo lo que escribas se envía a Anthropic (nuestro proveedor de IA) para generar una respuesta. Esa conversación no está vinculada a tu cuenta ni se guarda en nuestros servidores — solo existe en tu navegador durante esa visita. Evita compartir datos personales en ella.",
            "Algunos de estos proveedores pueden procesar datos en servidores ubicados fuera de la UE/EEE (por ejemplo, en Estados Unidos). Cuando esto ocurre, lo hacen conforme a sus propias garantías compatibles con el RGPD, como las Cláusulas Contractuales Tipo.",
          ],
        },
        {
          title: "5. Durante cuánto tiempo conservamos tus datos",
          body: [
            "Conservamos los datos de tu cuenta, los vídeos enviados y los mensajes mientras tu cuenta permanezca activa, de modo que tu historial de entrenamiento y con el entrenador siga estando disponible para ti. Si eliminas tu cuenta, eliminamos o anonimizamos tus datos personales en un plazo razonable, salvo cuando estemos obligados a conservar registros (como los de pago) por razones legales o contables.",
          ],
        },
        {
          title: "6. Tus derechos",
          body: [
            "Conforme al RGPD (si te encuentras en la UE/EEE) y normativas similares en otros lugares, tienes derecho a: acceder a los datos personales que tenemos sobre ti; corregir datos inexactos; solicitar la supresión de tus datos; restringir u oponerte a determinados tratamientos; solicitar una copia portátil de tus datos; y retirar tu consentimiento en cualquier momento cuando nos basemos en él.",
            "Para ejercer cualquiera de estos derechos, escribe a tacticaltennislab@gmail.com. Si no estás satisfecho con nuestra respuesta, tienes derecho a presentar una reclamación ante tu autoridad local de protección de datos.",
          ],
        },
        {
          title: "7. Datos de menores",
          body: [
            "Nuestro Servicio está destinado a titulares de cuenta de 16 años en adelante. Para jugadores menores de 18 años, un padre, madre o tutor legal crea y gestiona la cuenta, y los datos personales del menor (vídeos enviados, comentarios, mensajes) se tratan sobre la base del consentimiento de dicho padre, madre o tutor a nuestros Términos y a esta Política. Dado que cada cuenta tiene un único inicio de sesión, el padre, madre o tutor que la posee tiene visibilidad completa de todo lo intercambiado con un entrenador.",
          ],
        },
        {
          title: "8. Cookies",
          body: [
            "Utilizamos cookies esenciales para mantener tu sesión iniciada y recordar tu sesión, así como una cookie propia que recuerda a través de qué enlace de referido llegaste (en su caso) durante un máximo de 30 días, para poder acreditar la cuenta correcta si te registras. No utilizamos cookies publicitarias ni de seguimiento de terceros.",
          ],
        },
        {
          title: "9. Cambios en esta política",
          body: [
            "Podemos actualizar esta Política de privacidad de vez en cuando. Si realizamos cambios sustanciales, actualizaremos la fecha indicada a continuación y, cuando proceda, te lo notificaremos por correo electrónico.",
          ],
        },
        {
          title: "10. Contacto",
          body: ["¿Tienes preguntas sobre esta Política de privacidad o tus datos? Escríbenos a tacticaltennislab@gmail.com."],
        },
      ],
    },
  },
  it: {
    terms: {
      eyebrow: "Note legali",
      title: "Termini di servizio",
      subtitle: "Ultimo aggiornamento: settembre 2026. Ti invitiamo a leggere attentamente questi termini prima di utilizzare Tactical Tennis Lab.",
      sections: [
        {
          title: "1. Chi siamo",
          body: [
            "Tactical Tennis Lab («noi», «ci», «nostro») è attualmente gestito da Piotr Kusiewicz e Mateusz Kułakowski come persone fisiche, operanti con il nome Tactical Tennis Lab (la registrazione formale dell'attività è in corso). Offriamo servizi di coaching tennistico online, tra cui analisi video e piani di allenamento personalizzati, accessibili su tacticaltennislab.com (il «Servizio»). Puoi contattarci all'indirizzo tacticaltennislab@gmail.com.",
            "Creando un account, inviando un video o acquistando un piano, accetti i presenti Termini di servizio.",
          ],
        },
        {
          title: "2. Il servizio",
          body: [
            "Offriamo analisi tecnica e tattica basata su video, piani di allenamento personalizzati e feedback dei coach forniti tramite il sito web. Ogni piano viene costruito personalmente da uno dei nostri coach sulla base del tuo video e dei tuoi obiettivi — non è generato automaticamente. Inviare un video, scrivere a un coach e acquistare un piano richiedono tutti la presenza di un account.",
            "Il feedback del coach si basa sul video e sulle informazioni che fornisci. Ha natura educativa e formativa e non sostituisce l'istruzione in presenza, il parere medico o una valutazione della forma fisica. Sei responsabile della tua sicurezza fisica durante l'allenamento.",
          ],
        },
        {
          title: "3. Account e minorenni",
          body: [
            "Devi fornire informazioni accurate al momento della creazione dell'account e mantenere riservate le tue credenziali di accesso. Sei responsabile di tutte le attività svolte con il tuo account.",
            "Per creare un account devi avere almeno 16 anni. Se un giocatore ha meno di 18 anni, l'account deve essere creato e gestito da un genitore o tutore legale per suo conto. Ogni account ha un unico accesso, quindi ogni video, nota del coach e messaggio scambiato con un coach passa attraverso quell'unico account ed è visibile a chi lo detiene — non esiste un canale separato o nascosto tra un coach e un minore. I coach manterranno sempre una condotta professionale quando lavorano con i minori; in caso di qualsiasi preoccupazione relativa alla tutela dei minori, contattaci immediatamente all'indirizzo tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "4. Pagamenti e abbonamenti",
          body: [
            "I piani a pagamento vengono elaborati in modo sicuro tramite Stripe. Non conserviamo i dati completi della tua carta sui nostri server. Tutti i prezzi sono indicati in USD; non applichiamo IVA o imposta sulle vendite al momento del pagamento.",
            "I piani una tantum (come Stroke Fix, Smart System e Match IQ) vengono addebitati una sola volta al momento dell'acquisto. PRO Tour è un abbonamento mensile ricorrente che si rinnova automaticamente fino alla disdetta.",
            "Puoi annullare un abbonamento in qualsiasi momento dal tuo account; l'annullamento ha effetto alla fine del periodo di fatturazione in corso e mantieni l'accesso fino a quel momento. Non offriamo rimborsi parziali per il tempo non utilizzato all'interno di un periodo di fatturazione.",
            "Puoi ottenere uno sconto condividendo il tuo link di invito personale (disponibile nel tuo account). Un invito viene conteggiato solo quando la persona invitata completa il suo primo acquisto a pagamento. Al raggiungimento di una soglia di inviti, lo sconto corrispondente si applica automaticamente ai tuoi acquisti futuri: attualmente 20% di sconto dopo 1 invito andato a buon fine, 40% dopo 2, e la maggior parte dei piani gratuiti dopo 5 (Match IQ: Full è limitato a un massimo del 50% di sconto e PRO Tour al 40%, anche con un numero maggiore di inviti). Gli sconti da invito non possono essere convertiti in denaro né combinati con altre offerte promozionali, salvo diversa indicazione da parte nostra.",
            "Possiamo modificare, sospendere o interrompere il programma di invito, o modificare le future soglie di sconto, in qualsiasi momento; una soglia di sconto già sbloccata continuerà ad applicarsi al tuo account, salvo diversa comunicazione da parte nostra. Possiamo revocare il credito da invito e sospendere gli account coinvolti in auto-inviti, account falsi o altri abusi del programma, anche nei casi in cui un acquisto idoneo venga successivamente rimborsato o contestato (chargeback).",
          ],
        },
        {
          title: "5. Il tuo diritto di recesso (consumatori UE/SEE e Regno Unito)",
          body: [
            "Se sei un consumatore residente nell'UE, nel SEE o nel Regno Unito, hai normalmente il diritto di recedere da un acquisto online entro 14 giorni senza dover fornire alcuna motivazione.",
            "Poiché i nostri piani una tantum (Stroke Fix, Smart System, Match IQ) comportano un'analisi personalizzata che iniziamo non appena invii il tuo video, accetti che l'esecuzione del servizio inizi immediatamente e riconosci che, una volta che un coach ha iniziato o completato la tua analisi, perdi il diritto di recesso relativo a tale acquisto, come consentito dall'articolo 16, lettera m), della Direttiva 2011/83/UE del Parlamento europeo e del Consiglio sui diritti dei consumatori. Prima che un coach abbia iniziato a lavorare sul tuo invio, puoi comunque richiedere un rimborso completo.",
            "Per l'abbonamento PRO Tour, puoi recedere entro 14 giorni dalla prima sottoscrizione, detraendo il valore dell'analisi già fornita durante tale periodo. Trascorsi i primi 14 giorni, si applicano le condizioni di annullamento di cui alla Sezione 4.",
            "Per richiedere un rimborso o l'annullamento ai sensi della presente sezione, scrivi a tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "6. Il tuo video e i tuoi contenuti",
          body: [
            "Mantieni la proprietà dei video e dei contenuti che invii. Inviando un video, ci concedi una licenza limitata a visualizzarlo, analizzarlo e conservarlo esclusivamente allo scopo di fornirti il feedback del coach e il piano di allenamento.",
            "Invia solo video che hai il diritto di condividere. Se il tuo video mostra altri giocatori identificabili, confermi di avere il loro permesso (o il permesso di un genitore/tutore, se minorenni) di condividere le riprese con noi per l'analisi.",
            "Non utilizzeremo mai il tuo video, le tue foto o il tuo nome in materiale di marketing o promozionale senza prima richiederti un consenso esplicito e separato.",
            "Se invii una recensione tramite il tuo account, ciò costituisce il tuo consenso esplicito e separato a mostrarla pubblicamente sul nostro sito web, insieme al tuo nome, una volta approvata da parte nostra. Esaminiamo le recensioni inviate prima della pubblicazione e possiamo rifiutare o rimuovere una recensione a nostra discrezione (ad esempio, se offensiva, falsa o non correlata al nostro servizio di coaching). Puoi chiederci di rimuovere una recensione pubblicata in qualsiasi momento scrivendo a tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "7. Uso consentito",
          body: [
            "Non abusare del Servizio — ciò include il tentativo di accedere all'account di un altro utente, l'interruzione del funzionamento del Servizio o il suo utilizzo per scopi illeciti. Possiamo sospendere o chiudere gli account che violano i presenti termini.",
          ],
        },
        {
          title: "8. Proprietà intellettuale",
          body: [
            "Il nome Tactical Tennis Lab, l'identità del marchio, il design del sito web e la metodologia di allenamento sono di nostra proprietà. I piani di allenamento e il feedback che ti forniamo sono destinati al tuo uso personale e non possono essere rivenduti o ridistribuiti.",
          ],
        },
        {
          title: "9. Esclusioni di responsabilità e limitazione di responsabilità",
          body: [
            "Il Servizio è fornito «così com'è». Non garantiamo risultati specifici derivanti dal coaching o dai piani di allenamento. Nella misura consentita dalla legge, Tactical Tennis Lab non è responsabile per danni indiretti, accidentali o consequenziali derivanti dall'uso del Servizio, compresi gli infortuni subiti durante l'allenamento. Nessuna disposizione dei presenti Termini limita una responsabilità che non può essere limitata ai sensi della legge applicabile, né incide sui diritti previsti dalla legge di cui godi come consumatore nel tuo paese di residenza.",
            "Il widget «Domande rapide» è un assistente IA automatizzato per domande generali su prezzi e funzionamento del Servizio — non è un coach, non valuta video o tecnica e non crea piani di allenamento. Le sue risposte sono fornite per comodità e possono occasionalmente essere errate; non costituiscono una consulenza professionale di coaching e non prevalgono sui presenti Termini. Per qualsiasi questione relativa al coaching, invia un video da far valutare a un coach reale; per qualsiasi altra questione, scrivi a tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "10. Modifiche ai presenti termini",
          body: [
            "Potremmo aggiornare periodicamente i presenti Termini. L'uso continuato del Servizio dopo una modifica implica l'accettazione dei Termini aggiornati.",
          ],
        },
        {
          title: "11. Legge applicabile e controversie",
          body: [
            "I presenti Termini non pregiudicano le norme imperative a tutela dei consumatori del tuo paese di residenza, che continuano ad applicarsi se sei un consumatore residente nell'UE/SEE o nel Regno Unito, indipendentemente da qualsiasi altra legge qui indicata. Se non sei soddisfatto di come abbiamo risolto un problema, puoi anche utilizzare la piattaforma di risoluzione delle controversie online della Commissione europea o contattare la tua autorità locale per la tutela dei consumatori.",
          ],
        },
        {
          title: "12. Contatti",
          body: ["Domande su questi Termini? Scrivici a tacticaltennislab@gmail.com."],
        },
      ],
    },
    privacy: {
      eyebrow: "Note legali",
      title: "Informativa sulla privacy",
      subtitle: "Ultimo aggiornamento: settembre 2026. Questo documento spiega quali dati personali raccogliamo e come li utilizziamo.",
      sections: [
        {
          title: "1. Chi è responsabile dei tuoi dati",
          body: [
            "Tactical Tennis Lab è attualmente gestito da Piotr Kusiewicz e Mateusz Kułakowski come persone fisiche (la registrazione formale dell'attività è in corso). Ai fini della normativa sulla protezione dei dati, Piotr Kusiewicz e Mateusz Kułakowski agiscono come contitolari del trattamento dei dati personali trattati tramite tacticaltennislab.com. Puoi contattarci per qualsiasi domanda sulla privacy all'indirizzo tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "2. Quali dati raccogliamo",
          body: [
            "Informazioni sull'account: nome, indirizzo email e password (memorizzata come hash sicuro — non memorizziamo mai la password in chiaro). Se accedi con Google, riceviamo il tuo nome e la tua email da Google.",
            "Contenuti che fornisci: i video inviati, i dettagli che inserisci quando richiedi un piano di allenamento o contatti un coach, e i messaggi che invii tramite il Servizio.",
            "Informazioni di pagamento: quando acquisti un piano, il pagamento è gestito direttamente da Stripe. Riceviamo la conferma del tuo acquisto e del piano scelto, ma mai il numero completo della tua carta.",
            "Informazioni sugli inviti: se ti registri utilizzando il link di invito di un amico, registriamo quale account ti ha invitato e quante persone hai invitato con successo, in modo da poter calcolare gli sconti da invito.",
            "Recensioni: se scegli di inviare una recensione, memorizziamo la valutazione e il testo che scrivi. Se la approviamo, viene mostrata pubblicamente sul nostro sito web insieme al tuo nome — ciò avviene solo se invii tu stesso la recensione, e puoi chiederci di rimuoverla in qualsiasi momento.",
          ],
        },
        {
          title: "3. Come utilizziamo i tuoi dati e su quale base giuridica",
          body: [
            "Per fornire il Servizio — valutare il tuo video, costruire il tuo piano di allenamento e permetterti di scrivere al tuo coach — perché necessario per l'esecuzione del contratto con te.",
            "Per inviarti email relative all'account — messaggi di benvenuto, reimpostazione della password, notifiche di feedback del coach e conferme d'acquisto — anch'esso necessario per l'esecuzione del contratto con te.",
            "Per calcolare e applicare lo sconto che hai maturato tramite il nostro programma di invito, se vi partecipi — anch'esso necessario per l'esecuzione del contratto con te.",
            "Per mantenere sicuro il Servizio e prevenire abusi, e per adempiere ai nostri obblighi legali (ad esempio, registrazioni fiscali e di pagamento) — sulla base del nostro legittimo interesse e dei nostri obblighi legali.",
            "Non vendiamo i tuoi dati personali a terzi e non utilizziamo i tuoi dati a fini pubblicitari.",
          ],
        },
        {
          title: "4. Con chi condividiamo i tuoi dati",
          body: [
            "Utilizziamo un numero limitato di fornitori di servizi per gestire Tactical Tennis Lab: Vercel (hosting), Neon (database), Vercel Blob (archiviazione video), Resend (email transazionali) e Stripe (pagamenti). Utilizziamo inoltre Vercel Analytics per comprendere il traffico complessivo del sito; si tratta di dati aggregati, privi di cookie e che non ti identificano individualmente. Ciascun fornitore riceve solo i dati necessari a svolgere la propria funzione e adotta proprie pratiche di privacy e sicurezza.",
            "Se utilizzi l'assistente IA «Domande rapide» sul sito, tutto ciò che digiti viene inviato ad Anthropic (il nostro fornitore di IA) per generare una risposta. Quella conversazione non è collegata al tuo account né viene salvata sui nostri server — esiste solo nel tuo browser per quella visita. Evita di condividere dati personali al suo interno.",
            "Alcuni di questi fornitori possono trattare i dati su server situati al di fuori dell'UE/SEE (ad esempio negli Stati Uniti). In tali casi, lo fanno nel rispetto delle proprie garanzie conformi al RGPD, come le Clausole Contrattuali Standard.",
          ],
        },
        {
          title: "5. Per quanto tempo conserviamo i tuoi dati",
          body: [
            "Conserviamo i dati del tuo account, i video inviati e i messaggi finché il tuo account rimane attivo, in modo che la tua cronologia di coaching e allenamento rimanga a tua disposizione. Se elimini il tuo account, eliminiamo o rendiamo anonimi i tuoi dati personali entro un termine ragionevole, salvo quando siamo tenuti a conservare registrazioni (come quelle di pagamento) per motivi legali o contabili.",
          ],
        },
        {
          title: "6. I tuoi diritti",
          body: [
            "Ai sensi del RGPD (se ti trovi nell'UE/SEE) e di normative analoghe altrove, hai il diritto di: accedere ai dati personali che deteniamo su di te; correggere dati inesatti; richiedere la cancellazione dei tuoi dati; limitare o opporti a determinati trattamenti; richiedere una copia portabile dei tuoi dati; e revocare il consenso in qualsiasi momento quando ci basiamo su di esso.",
            "Per esercitare uno qualsiasi di questi diritti, scrivi a tacticaltennislab@gmail.com. Se non sei soddisfatto della nostra risposta, hai il diritto di presentare un reclamo alla tua autorità di controllo locale per la protezione dei dati.",
          ],
        },
        {
          title: "7. Dati dei minori",
          body: [
            "Il nostro Servizio è destinato a titolari di account di età pari o superiore a 16 anni. Per i giocatori minori di 18 anni, l'account viene creato e gestito da un genitore o tutore legale, e i dati personali del minore (video inviati, feedback, messaggi) vengono trattati sulla base del consenso di tale genitore o tutore ai nostri Termini e alla presente Informativa. Poiché ogni account ha un unico accesso, il genitore o tutore che lo detiene ha piena visibilità su tutto ciò che viene scambiato con un coach.",
          ],
        },
        {
          title: "8. Cookie",
          body: [
            "Utilizziamo cookie essenziali per mantenerti connesso e ricordare la tua sessione, oltre a un cookie proprietario che ricorda tramite quale link di invito sei arrivato (se presente) per un massimo di 30 giorni, in modo da poter accreditare l'account corretto in caso di registrazione. Non utilizziamo cookie pubblicitari o di tracciamento di terze parti.",
          ],
        },
        {
          title: "9. Modifiche alla presente informativa",
          body: [
            "Potremmo aggiornare periodicamente la presente Informativa sulla privacy. In caso di modifiche sostanziali, aggiorneremo la data riportata di seguito e, ove opportuno, te lo comunicheremo via email.",
          ],
        },
        {
          title: "10. Contatti",
          body: ["Domande su questa Informativa sulla privacy o sui tuoi dati? Scrivici a tacticaltennislab@gmail.com."],
        },
      ],
    },
  },
  ru: {
    terms: {
      eyebrow: "Юридическая информация",
      title: "Условия обслуживания",
      subtitle: "Последнее обновление: сентябрь 2026 г. Пожалуйста, внимательно ознакомьтесь с настоящими условиями перед использованием Tactical Tennis Lab.",
      sections: [
        {
          title: "1. Кто мы",
          body: [
            "Tactical Tennis Lab («мы», «нас», «наш») в настоящее время управляется Пиотром Кусевичем и Матеушем Кулаковским как физическими лицами, действующими под названием Tactical Tennis Lab (официальная регистрация бизнеса находится в процессе оформления). Мы предоставляем услуги онлайн-тренировок по теннису, включая видеоанализ и персонализированные планы тренировок, доступные на tacticaltennislab.com («Сервис»). Связаться с нами можно по адресу tacticaltennislab@gmail.com.",
            "Создавая аккаунт, отправляя видео или приобретая план, вы соглашаетесь с настоящими Условиями обслуживания.",
          ],
        },
        {
          title: "2. Сервис",
          body: [
            "Мы предлагаем технический и тактический анализ на основе видео, персонализированные планы тренировок и обратную связь от тренеров через сайт. Каждый план составляется лично одним из наших тренеров на основе вашего видео и целей, а не генерируется автоматически. Для отправки видео, переписки с тренером и покупки плана требуется аккаунт.",
            "Обратная связь от тренера основывается на предоставленном вами видео и информации. Она носит образовательный и развивающий характер и не заменяет очное обучение, медицинскую консультацию или оценку физической подготовки. Вы несёте ответственность за собственную физическую безопасность во время тренировок.",
          ],
        },
        {
          title: "3. Аккаунты и несовершеннолетние",
          body: [
            "При создании аккаунта вы обязаны указывать достоверную информацию и хранить учётные данные для входа в тайне. Вы несёте ответственность за все действия, совершённые в рамках вашего аккаунта.",
            "Для создания аккаунта необходимо достичь 16 лет. Если игроку менее 18 лет, аккаунт от его имени должен создавать и вести родитель или законный опекун. У каждого аккаунта только один логин, поэтому все видео, заметки тренера и сообщения, которыми обмениваются с тренером, проходят через этот единственный аккаунт и видны тому, кто им владеет — отдельного или скрытого канала связи между тренером и несовершеннолетним не существует. Тренеры всегда соблюдают профессиональную этику при работе с несовершеннолетними; при любых опасениях, связанных с безопасностью, немедленно свяжитесь с нами по адресу tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "4. Платежи и подписки",
          body: [
            "Платные планы обрабатываются безопасно через Stripe. Мы не храним полные данные вашей карты на наших серверах. Все цены указаны в долларах США; НДС или налог с продаж при оформлении заказа не добавляются.",
            "Разовые планы (например, Stroke Fix, Smart System и Match IQ) оплачиваются единовременно при покупке. PRO Tour — это регулярная ежемесячная подписка, которая автоматически продлевается до момента отмены.",
            "Вы можете отменить подписку в любой момент в своём аккаунте; отмена вступает в силу в конце текущего расчётного периода, и доступ сохраняется до этого момента. Частичный возврат средств за неиспользованное время в рамках расчётного периода не предоставляется.",
            "Вы можете получить скидку, поделившись своей персональной реферальной ссылкой (доступна в вашем аккаунте). Реферал засчитывается только после того, как приглашённый вами человек совершит свою первую платную покупку. По достижении определённого количества рефералов соответствующая скидка автоматически применяется к вашим будущим покупкам: в настоящее время 20% скидки после 1 успешного реферала, 40% после 2, а большинство планов становятся бесплатными после 5 (для Match IQ: Full максимальная скидка ограничена 50%, а для PRO Tour — 40%, даже при большем количестве рефералов). Реферальные скидки нельзя обменять на денежные средства или совмещать с другими промо-предложениями, если иное не указано нами отдельно.",
            "Мы можем в любое время изменить, приостановить или прекратить реферальную программу либо изменить будущие уровни скидок; уровень скидки, который вы уже разблокировали, будет и далее применяться к вашему аккаунту, если мы не уведомим вас об ином. Мы можем аннулировать реферальный бонус и приостановить действие аккаунтов, вовлечённых в самореферальство, создание фиктивных аккаунтов или иные злоупотребления программой, в том числе в случаях, когда засчитанная покупка впоследствии возвращена или оспорена (чарджбэк).",
          ],
        },
        {
          title: "5. Ваше право на отказ от договора (потребители из ЕС/ЕЭЗ и Великобритании)",
          body: [
            "Если вы являетесь потребителем из ЕС, ЕЭЗ или Великобритании, вы, как правило, имеете право отказаться от онлайн-покупки в течение 14 дней без объяснения причин.",
            "Поскольку наши разовые планы (Stroke Fix, Smart System, Match IQ) предполагают персонализированный анализ, который мы начинаем сразу после получения вашего видео, вы соглашаетесь с тем, что исполнение услуги начинается немедленно, и подтверждаете, что после того, как тренер приступил к анализу или завершил его, вы теряете право на отказ от договора в отношении этой покупки — в соответствии со статьёй 16(m) Директивы Европейского парламента и Совета 2011/83/ЕС о правах потребителей. До начала работы тренера над вашей заявкой вы всё ещё можете запросить полный возврат средств.",
            "Для подписки PRO Tour вы можете отказаться от договора в течение 14 дней с момента первой подписки, за вычетом стоимости уже предоставленного за этот период анализа. По истечении первых 14 дней применяются условия отмены, указанные в разделе 4.",
            "Чтобы запросить возврат средств или отмену в соответствии с настоящим разделом, напишите на tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "6. Ваше видео и контент",
          body: [
            "Вы сохраняете право собственности на видео и контент, который отправляете. Отправляя видео, вы предоставляете нам ограниченную лицензию на его просмотр, анализ и хранение исключительно с целью предоставления вам обратной связи от тренера и плана тренировок.",
            "Отправляйте только те видео, на распространение которых у вас есть право. Если на вашем видео присутствуют другие узнаваемые игроки, вы подтверждаете, что у вас есть их разрешение (или разрешение родителя/опекуна, если они несовершеннолетние) на передачу нам этих кадров для анализа.",
            "Мы никогда не будем использовать ваше видео, фотографии или имя в маркетинговых или рекламных материалах без предварительного получения вашего отдельного, явного согласия.",
            "Если вы отправляете отзыв через свой аккаунт, это является вашим отдельным, явным согласием на его публичное отображение на нашем сайте вместе с вашим именем после нашего одобрения. Мы проверяем отзывы перед публикацией и можем по своему усмотрению отклонить или удалить отзыв (например, если он оскорбителен, фиктивен или не относится к нашим тренерским услугам). Вы можете в любой момент попросить нас удалить опубликованный отзыв, написав на tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "7. Допустимое использование",
          body: [
            "Не злоупотребляйте Сервисом — это включает попытки получить доступ к аккаунту другого пользователя, нарушение работы Сервиса или его использование в незаконных целях. Мы можем приостановить или прекратить действие аккаунтов, нарушающих настоящие условия.",
          ],
        },
        {
          title: "8. Интеллектуальная собственность",
          body: [
            "Название Tactical Tennis Lab, фирменный стиль, дизайн сайта и методология тренировок являются нашей собственностью. Планы тренировок и обратная связь, предоставляемые вам, предназначены для вашего личного использования и не подлежат перепродаже или распространению.",
          ],
        },
        {
          title: "9. Отказ от гарантий и ограничение ответственности",
          body: [
            "Сервис предоставляется «как есть». Мы не гарантируем конкретных результатов от тренировок или планов тренировок. В пределах, допустимых законом, Tactical Tennis Lab не несёт ответственности за косвенные, случайные или последующие убытки, возникшие в связи с использованием Сервиса, включая травмы, полученные во время тренировок. Ничто в настоящих Условиях не ограничивает ответственность, которую нельзя ограничить в соответствии с применимым правом, и не затрагивает установленные законом права, которыми вы обладаете как потребитель в стране вашего проживания.",
            "Виджет «Быстрые вопросы» представляет собой автоматизированного ИИ-ассистента для общих вопросов о ценах и работе Сервиса — он не является тренером, не оценивает видео или технику и не составляет планы тренировок. Его ответы предоставляются для удобства и иногда могут быть неверными; они не являются профессиональной тренерской консультацией и не отменяют настоящие Условия. По любым вопросам, связанным с тренировками, отправьте видео на рассмотрение настоящему тренеру; по остальным вопросам напишите на tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "10. Изменения настоящих условий",
          body: [
            "Мы можем время от времени обновлять настоящие Условия. Дальнейшее использование Сервиса после внесения изменений означает принятие вами обновлённых Условий.",
          ],
        },
        {
          title: "11. Применимое право и споры",
          body: [
            "Настоящие Условия не затрагивают обязательные нормы законодательства о защите прав потребителей страны вашего проживания, которые продолжают действовать, если вы являетесь потребителем из ЕС/ЕЭЗ или Великобритании, независимо от любого иного права, указанного здесь. Если вас не устраивает решение возникшего вопроса, вы также можете воспользоваться платформой Европейской комиссии по урегулированию споров онлайн или обратиться в местный орган по защите прав потребителей.",
          ],
        },
        {
          title: "12. Контакты",
          body: ["Вопросы по настоящим Условиям? Напишите нам на tacticaltennislab@gmail.com."],
        },
      ],
    },
    privacy: {
      eyebrow: "Юридическая информация",
      title: "Политика конфиденциальности",
      subtitle: "Последнее обновление: сентябрь 2026 г. В этом документе объясняется, какие персональные данные мы собираем и как их используем.",
      sections: [
        {
          title: "1. Кто отвечает за ваши данные",
          body: [
            "Tactical Tennis Lab в настоящее время управляется Пиотром Кусевичем и Матеушем Кулаковским как физическими лицами (официальная регистрация бизнеса находится в процессе оформления). Для целей законодательства о защите данных Пиотр Кусевич и Матеуш Кулаковский выступают в качестве совместных операторов персональных данных, обрабатываемых через tacticaltennislab.com. По любым вопросам конфиденциальности вы можете связаться с нами по адресу tacticaltennislab@gmail.com.",
          ],
        },
        {
          title: "2. Какие данные мы собираем",
          body: [
            "Информация об аккаунте: ваше имя, адрес электронной почты и пароль (хранится в виде защищённого хеша — мы никогда не храним пароль в открытом виде). Если вы входите через Google, мы получаем от Google ваше имя и адрес электронной почты.",
            "Предоставляемый вами контент: отправленные видео, данные, которые вы вводите при заказе плана тренировок или обращении к тренеру, а также сообщения, отправляемые через Сервис.",
            "Платёжная информация: при покупке плана оплата обрабатывается непосредственно через Stripe. Мы получаем подтверждение вашей покупки и выбранного плана, но никогда не получаем полный номер вашей карты.",
            "Реферальная информация: если вы регистрируетесь по реферальной ссылке друга, мы фиксируем, какой аккаунт вас пригласил, и сколько людей вы успешно пригласили, чтобы рассчитать реферальные скидки.",
            "Отзывы: если вы решите оставить отзыв, мы сохраняем указанную вами оценку и текст. После одобрения он отображается публично на нашем сайте вместе с вашим именем — это происходит только если вы сами отправляете отзыв, и вы можете в любой момент попросить нас удалить его.",
          ],
        },
        {
          title: "3. Как мы используем данные и на каком основании",
          body: [
            "Для предоставления Сервиса — анализа вашего видео, составления плана тренировок и предоставления возможности переписки с тренером — поскольку это необходимо для исполнения нашего договора с вами.",
            "Для отправки вам писем, связанных с аккаунтом, — приветственных сообщений, сброса пароля, уведомлений об обратной связи от тренера и подтверждений покупки — также необходимо для исполнения нашего договора с вами.",
            "Для расчёта и применения скидки, заработанной через нашу реферальную программу, если вы в ней участвуете, — также необходимо для исполнения нашего договора с вами.",
            "Для обеспечения безопасности Сервиса и предотвращения злоупотреблений, а также для соблюдения наших юридических обязательств (например, налоговой и платёжной отчётности) — на основании нашего законного интереса и юридических обязательств.",
            "Мы не продаём ваши персональные данные третьим лицам и не используем ваши данные в рекламных целях.",
          ],
        },
        {
          title: "4. С кем мы делимся данными",
          body: [
            "Мы используем небольшое число поставщиков услуг для работы Tactical Tennis Lab: Vercel (хостинг), Neon (база данных), Vercel Blob (хранение видео), Resend (транзакционная электронная почта) и Stripe (платежи). Мы также используем Vercel Analytics для анализа общего трафика сайта; эти данные агрегированы, не используют файлы cookie и не позволяют идентифицировать вас лично. Каждый поставщик получает только те данные, которые необходимы для выполнения его функции, и придерживается собственных практик конфиденциальности и безопасности.",
            "Если вы используете ИИ-ассистента «Быстрые вопросы» на сайте, всё введённое вами текст отправляется в Anthropic (наш поставщик ИИ) для генерации ответа. Эта переписка не связана с вашим аккаунтом и не сохраняется на наших серверах — она существует только в вашем браузере во время посещения. Избегайте указания в ней личных данных.",
            "Некоторые из этих поставщиков могут обрабатывать данные на серверах за пределами ЕС/ЕЭЗ (например, в США). В таких случаях они делают это в соответствии с собственными гарантиями, соответствующими GDPR, такими как стандартные договорные положения.",
          ],
        },
        {
          title: "5. Как долго мы храним данные",
          body: [
            "Мы храним данные вашего аккаунта, отправленные видео и сообщения до тех пор, пока ваш аккаунт активен, чтобы история тренировок и общения с тренером оставалась доступной для вас. Если вы удаляете аккаунт, мы удаляем или обезличиваем ваши персональные данные в разумный срок, за исключением случаев, когда мы обязаны хранить записи (например, платёжные) по юридическим или бухгалтерским причинам.",
          ],
        },
        {
          title: "6. Ваши права",
          body: [
            "В соответствии с GDPR (если вы находитесь в ЕС/ЕЭЗ) и аналогичными законами в других странах, вы имеете право: получить доступ к персональным данным, которые мы храним о вас; исправить неточные данные; запросить удаление ваших данных; ограничить обработку или возразить против определённой обработки; запросить переносимую копию ваших данных; а также отозвать согласие в любой момент, если мы на него опираемся.",
            "Чтобы воспользоваться любым из этих прав, напишите на tacticaltennislab@gmail.com. Если вас не устраивает наш ответ, вы имеете право подать жалобу в местный надзорный орган по защите данных.",
          ],
        },
        {
          title: "7. Данные несовершеннолетних",
          body: [
            "Наш Сервис предназначен для владельцев аккаунтов от 16 лет и старше. Для игроков младше 18 лет аккаунт создаёт и ведёт родитель или законный опекун, и персональные данные несовершеннолетнего (отправленные видео, обратная связь, сообщения) обрабатываются на основании согласия этого родителя или опекуна с нашими Условиями и настоящей Политикой. Поскольку у каждого аккаунта только один логин, родитель или опекун, владеющий им, имеет полный доступ ко всему, чем обмениваются с тренером.",
          ],
        },
        {
          title: "8. Файлы cookie",
          body: [
            "Мы используем обязательные файлы cookie, чтобы сохранять вашу авторизацию и запоминать сессию, а также собственный файл cookie, который запоминает, по какой реферальной ссылке вы пришли (если таковая была), на срок до 30 дней, чтобы засчитать реферала нужному аккаунту при регистрации. Мы не используем сторонние рекламные или отслеживающие файлы cookie.",
          ],
        },
        {
          title: "9. Изменения настоящей политики",
          body: [
            "Мы можем время от времени обновлять настоящую Политику конфиденциальности. При внесении существенных изменений мы обновим указанную ниже дату и, при необходимости, уведомим вас по электронной почте.",
          ],
        },
        {
          title: "10. Контакты",
          body: ["Вопросы об этой Политике конфиденциальности или ваших данных? Напишите нам на tacticaltennislab@gmail.com."],
        },
      ],
    },
  },
};
