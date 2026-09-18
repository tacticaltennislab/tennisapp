import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions from parents and players about video analysis, pricing, refunds, minors' accounts, and how coaching works at Tactical Tennis Lab.",
};

const CATEGORIES = [
  {
    title: "Getting started",
    items: [
      {
        question: "How does it actually work?",
        answer:
          "You create an account, send a practice or match video along with what you want feedback on, and a real coach — a former ATP-ranked player or ITF Level 2 certified coach — personally reviews it frame by frame. Nothing is auto-generated. You get your analysis and a plan back through your account and by email.",
      },
      {
        question: "What kind of video should I send?",
        answer:
          "Film from the side so your coach can see your full swing, footwork, and body position. Capture a few points or a short rally rather than a single shot, and keep the camera steady — prop your phone against something solid or use a tripod. Use the notes field to say exactly what you want feedback on.",
      },
      {
        question: "Do I need an account to send a video?",
        answer:
          "Yes. Submitting a video, messaging a coach, and purchasing a plan all require an account, since your videos, feedback, and messages are tied to it.",
      },
      {
        question: "Is this for clubs and academies, or individual players?",
        answer:
          "Our main focus is individual junior and competitive players and their families — a second, independent expert opinion alongside your on-court coach, not a replacement for one. We also put together custom packages for clubs and academies on request, but that's not who this is primarily built for.",
      },
    ],
  },
  {
    title: "Plans & pricing",
    items: [
      {
        question: "What plans do you offer?",
        answer:
          "Stroke Fix ($49, one-time) is a focused technical breakdown of one issue. Smart System ($99) is a 4-week development program for one stroke. Match IQ comes in Short ($99, up to 60 minutes of footage) and Full ($159, up to a full match). PRO Tour ($249/month) is ongoing coaching with up to 4 analyses a month and direct coach access.",
      },
      {
        question: "Do prices include tax?",
        answer: "No. All prices are listed in USD, and we don't add VAT or sales tax at checkout.",
      },
      {
        question: "Can I cancel PRO Tour anytime?",
        answer:
          "Yes. Cancel anytime from your account — it takes effect at the end of your current billing period, and you keep access until then. We don't offer partial refunds for unused time in a billing period.",
      },
      {
        question: "What's your refund policy?",
        answer:
          "For one-time plans, you can get a full refund before a coach has started your analysis; once analysis begins, EU/EEA/UK consumers' 14-day right of withdrawal ends, since the service starts performing immediately at your request. For PRO Tour, you can withdraw within 14 days of first subscribing, minus the value of any analysis already delivered. Email tacticaltennislab@gmail.com to request a refund or see the full terms at /terms.",
      },
    ],
  },
  {
    title: "For parents & junior players",
    items: [
      {
        question: "Can my child have their own account?",
        answer:
          "Players must be at least 16 to create an account. For players under 18, a parent or guardian creates and manages the account on their behalf.",
      },
      {
        question: "Can I see everything my child sends or receives?",
        answer:
          "Yes. There's only one login per account, so every video, coach note, and message passes through that single account and is visible to whoever holds it — there's no separate or hidden channel between a coach and a minor.",
      },
      {
        question: "Is my child's data safe?",
        answer:
          "We collect only what's needed to provide the service, never sell personal data, and don't use it for advertising. Full details, including your rights under GDPR, are at /privacy.",
      },
    ],
  },
  {
    title: "Referrals",
    items: [
      {
        question: "How do referral discounts work?",
        answer:
          "Share your personal referral link, found on your account page. A referral counts once the person you referred completes their first paid purchase. 1 successful referral unlocks 20% off your own future purchases, 2 unlocks 40%, and 5 unlocks most plans free (PRO Tour is capped at 40% off and Match IQ: Full at 50%, even at higher referral counts). Discounts apply automatically at checkout.",
      },
    ],
  },
  {
    title: "Coaches & quality",
    items: [
      {
        question: "Is my analysis written by AI?",
        answer:
          "No. Every plan and piece of feedback is built personally by one of our coaches — former ATP-ranked players and ITF Level 2 certified coaches — based on your video and goals. The \"Quick questions\" chat widget on the site is a separate AI assistant that only answers simple questions about pricing and policies; it doesn't review video or give coaching advice.",
      },
      {
        question: "Can I leave a review?",
        answer:
          "Yes — go to /review (also linked in the footer). Reviews are checked by an admin before they appear publicly, so you won't see it on the homepage immediately.",
      },
    ],
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CATEGORIES.flatMap((category) =>
    category.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }))
  ),
};

export default function FaqPage() {
  return (
    <div className="flex-1 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PageHeader
        eyebrow="Help"
        title="Frequently asked questions"
        subtitle="Common questions from parents and players. Can't find what you need? Ask the Quick questions widget or email tacticaltennislab@gmail.com."
      />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-10">
          {CATEGORIES.map((category, i) => (
            <Reveal key={category.title} delay={i * 60}>
              <FaqAccordion title={category.title} items={category.items} />
            </Reveal>
          ))}
        </div>
      </main>
    </div>
  );
}
