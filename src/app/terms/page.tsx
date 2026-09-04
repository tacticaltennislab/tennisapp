import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

const SECTIONS = [
  {
    title: "1. Who we are",
    body: [
      "Tactical Tennis Lab (“we”, “us”, “our”) provides online tennis coaching services, including video analysis and personalized training plans, accessible at tacticaltennislab.com (the “Service”).",
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
    title: "3. Accounts",
    body: [
      "You must provide accurate information when creating an account and keep your login credentials confidential. You are responsible for all activity under your account.",
      "You must be at least 16 years old to create an account. If you are coaching a minor, a parent or guardian should manage the account and review the content on the minor's behalf.",
    ],
  },
  {
    title: "4. Payments and subscriptions",
    body: [
      "Paid plans are processed securely through Stripe. We do not store your full card details on our servers.",
      "One-time plans (such as Stroke Fix, Smart System, and Match IQ) are billed once at purchase. PRO Tour is a recurring monthly subscription that renews automatically until cancelled.",
      "You can cancel a subscription at any time; cancellation takes effect at the end of the current billing period. Refund requests are reviewed case by case — contact us and we'll do our best to make it right.",
    ],
  },
  {
    title: "5. Your video and content",
    body: [
      "You retain ownership of the videos and content you submit. By submitting a video, you grant us a limited license to view, analyze, and store it solely for the purpose of providing your coaching feedback and training plan.",
      "Do not upload video or content that you do not have the right to share, or that is unlawful, abusive, or infringes someone else's rights.",
    ],
  },
  {
    title: "6. Acceptable use",
    body: [
      "Don't misuse the Service — this includes attempting to access another user's account, disrupting the Service, or using it for anything unlawful. We may suspend or terminate accounts that violate these terms.",
    ],
  },
  {
    title: "7. Intellectual property",
    body: [
      "The Tactical Tennis Lab name, branding, website design, and training methodology are our property. Training plans and feedback we provide to you are for your personal use and not for resale or redistribution.",
    ],
  },
  {
    title: "8. Disclaimers and limitation of liability",
    body: [
      "The Service is provided “as is.” We do not guarantee specific results from coaching or training plans. To the extent permitted by law, Tactical Tennis Lab is not liable for indirect, incidental, or consequential damages arising from your use of the Service, including injury sustained while training.",
    ],
  },
  {
    title: "9. Changes to these terms",
    body: [
      "We may update these Terms from time to time. Continued use of the Service after a change means you accept the updated Terms.",
    ],
  },
  {
    title: "10. Contact",
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
