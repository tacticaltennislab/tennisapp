import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

const SECTIONS = [
  {
    title: "1. What we collect",
    body: [
      "Account information: your name, email address, and password (stored as a secure hash — we never store your password in plain text). If you sign in with Google, we receive your name and email from Google.",
      "Content you provide: video submissions, the details you enter when requesting a training plan or contacting a coach, and messages you send through the Service.",
      "Payment information: when you purchase a plan, payment is handled directly by Stripe. We receive confirmation of your purchase and plan, but never your full card number.",
    ],
  },
  {
    title: "2. How we use it",
    body: [
      "To provide the Service: reviewing your video, building your training plan, and letting you message your coach.",
      "To send you account-related email: welcome messages, password resets, coach feedback notifications, and purchase confirmations.",
      "We do not sell your personal information to third parties.",
    ],
  },
  {
    title: "3. Who we share it with",
    body: [
      "We use a small number of service providers to run Tactical Tennis Lab: Vercel (hosting), Neon (database), Vercel Blob (video storage), Resend (transactional email), and Stripe (payments). Each only receives the data it needs to perform its function, and each has its own privacy and security practices.",
    ],
  },
  {
    title: "4. How long we keep it",
    body: [
      "We keep your account, video submissions, and messages for as long as your account is active, so your coach and training history stay available to you. You can request deletion of your account and associated data at any time.",
    ],
  },
  {
    title: "5. Your rights",
    body: [
      "You can access, correct, or request deletion of your personal data at any time by emailing us. If you're in the EU/EEA, you have rights under GDPR including access, rectification, erasure, and data portability.",
    ],
  },
  {
    title: "6. Cookies",
    body: [
      "We use essential cookies to keep you signed in and remember your session. We don't use third-party advertising or tracking cookies.",
    ],
  },
  {
    title: "7. Contact",
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
