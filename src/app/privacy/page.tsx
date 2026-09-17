import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

const SECTIONS = [
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
    body: [
      "Questions about this Privacy Policy or your data? Email us at tacticaltennislab@gmail.com.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Last updated September 2026. This explains what personal data we collect and how we use it."
      />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-10">
          {SECTIONS.map((section, i) => (
            <Reveal key={section.title} delay={i * 40}>
              <h2 className="text-xl font-bold">{section.title}</h2>
              <div className="mt-3 space-y-3 text-body">
                {section.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </main>
    </div>
  );
}
