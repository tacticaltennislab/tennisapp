import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

const SECTIONS = [
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
      "Paid plans are processed securely through Stripe. We do not store your full card details on our servers.",
      "One-time plans (such as Stroke Fix, Smart System, and Match IQ) are billed once at purchase. PRO Tour is a recurring monthly subscription that renews automatically until cancelled.",
      "You can cancel a subscription at any time from your account; cancellation takes effect at the end of the current billing period, and you keep access until then. We don't provide partial refunds for unused time in a billing period.",
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
    body: [
      "Questions about these Terms? Reach us at tacticaltennislab@gmail.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="Last updated September 2026. Please read these terms carefully before using Tactical Tennis Lab."
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
