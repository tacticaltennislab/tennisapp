import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

const SECTIONS = [
  {
    title: "1. Services",
    body: [
      "Provider will deliver tennis video and match analysis services to players nominated by the Academy, under the package selected below (the \"Package\"):",
      "Package: [ Club Starter / Academy Standard / High Performance Club / Season — 3 Months / Season — 6 Months ]",
      "Volume: [ e.g. \"10–15 analyses per month\" ]      Fee: [ $______ ]      Billing: [ monthly / one-time ]",
      "Each analysis covers one video submission per player (technique or match footage) and is delivered by a Tactical Tennis Lab coach, consistent with the format described for this Package on tacticaltennislab.com/pricing.",
    ],
  },
  {
    title: "2. Term and Renewal",
    body: [
      "For monthly Packages (Club Starter, Academy Standard, High Performance Club): this Agreement begins on the Effective Date below and continues month to month until either party gives written notice of cancellation, effective at the end of the current billing month.",
      "For Season Packages (3 or 6 months): this Agreement runs for the stated fixed term and does not renew automatically. A new agreement is required to continue past the end of the term.",
    ],
  },
  {
    title: "3. Fees and Payment",
    body: [
      "Fees are as stated in Section 1, in USD, with no VAT or sales tax added. Monthly Packages are billed at the start of each billing month; Season Packages are billed in full at signing unless the parties agree otherwise in writing.",
      "Payment is processed through Stripe. If a payment fails or is not received within 7 days of the due date, Provider may pause delivery of new analyses until the account is current.",
      "Fees already paid for a billing period or a Season Package are non-refundable once Provider has begun work on an analysis within that period, consistent with the refund terms on tacticaltennislab.com/terms.",
    ],
  },
  {
    title: "4. Player Submissions and Consent",
    body: [
      "The Academy is responsible for making sure it has the right to submit each player's footage to Provider, and — for any player under 18 — the written consent of a parent or guardian, before any video is sent for analysis.",
      "Provider is granted a limited license to view, analyze, and store submitted footage solely to deliver the Package. Ownership of the footage remains with the player and/or the Academy.",
    ],
  },
  {
    title: "5. Confidentiality",
    body: [
      "Both parties will keep player performance data, analysis reports, and any non-public information shared under this Agreement confidential, and will not disclose it to third parties except as needed to deliver the Package or as required by law.",
    ],
  },
  {
    title: "6. Marketing and Case Studies",
    body: [
      "Provider will not name the Academy, use player footage, or reference results achieved under this Agreement in any marketing, case study, or public material without the Academy's separate prior written consent — which the Academy may give or withdraw at any time.",
      "Where the Academy does consent, any player-identifiable material additionally requires that player's own consent (or their parent/guardian's, if a minor), consistent with Provider's Privacy Policy.",
    ],
  },
  {
    title: "7. Intellectual Property",
    body: [
      "The Tactical Tennis Lab name, branding, and training methodology remain Provider's property. Analysis reports delivered under this Agreement are licensed to the Academy for its internal coaching use and may not be resold or redistributed outside the Academy.",
    ],
  },
  {
    title: "8. Service Limitations",
    body: [
      "Provider's analysis is educational and developmental in nature. It supplements, and does not replace, the Academy's own on-court coaching, medical advice, or fitness assessment. Provider does not guarantee specific player results, tournament outcomes, or academy enrollment numbers. Responsibility for player safety during training remains with the Academy and its on-court coaches at all times.",
    ],
  },
  {
    title: "9. Liability",
    body: [
      "To the extent permitted by law, Provider's total liability under this Agreement is limited to the fees paid by the Academy in the three (3) months preceding the event giving rise to the claim. Neither party is liable for indirect, incidental, or consequential damages arising from this Agreement.",
    ],
  },
  {
    title: "10. Data Protection",
    body: [
      "Provider processes player personal data as described in the Tactical Tennis Lab Privacy Policy (tacticaltennislab.com/privacy). The Academy is responsible for obtaining any consents required from players or their parents/guardians before submitting personal data or footage to Provider.",
    ],
  },
  {
    title: "11. Termination",
    body: [
      "Either party may terminate a monthly Package with 30 days' written notice. A Season Package may not be terminated early except for material breach by the other party that remains uncured 14 days after written notice.",
      "Provider may suspend or terminate this Agreement immediately for non-payment or misuse of the Service.",
    ],
  },
  {
    title: "12. Independent Parties",
    body: [
      "Provider acts as an independent service provider, not as an employee, partner, franchisee, or agent of the Academy. This Agreement does not create a joint venture or partnership between the parties.",
    ],
  },
  {
    title: "13. Governing Law",
    body: [
      "This Agreement is governed by the laws of [ ______________ ], without regard to its conflict-of-laws principles. Any dispute will first be addressed in good faith between the parties before either pursues formal proceedings.",
    ],
  },
  {
    title: "14. Entire Agreement",
    body: [
      "This Agreement, together with the Tactical Tennis Lab Terms of Service and Privacy Policy referenced above, is the entire agreement between the parties regarding its subject matter, and supersedes any prior discussions. Amendments must be in writing and signed by both parties.",
    ],
  },
];

export default function ClubAgreementPage() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="print:hidden max-w-3xl mx-auto w-full px-4 pt-6">
        <div className="rounded-xl border border-amber-300 bg-amber-50 text-amber-900 px-4 py-3 text-sm">
          <strong>Draft for internal review.</strong> This is a template, not legal advice — have a
          lawyer check the liability, termination, and governing-law sections before sending this to
          an academy for signature. Fill in every bracketed field before use.
        </div>
      </div>

      <PageHeader
        eyebrow="Club & academy agreement"
        title="Club & Academy Partnership Agreement"
        subtitle="A service agreement between Tactical Tennis Lab and your club or academy. Fill in every bracketed field before sending it for signature."
      />

      <main className="flex-1 px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-10">
          <Reveal>
            <div className="rounded-2xl border border-line p-6 space-y-2 text-body">
              <p>
                This Agreement is made as of <strong>[ Effective Date ]</strong>, between:
              </p>
              <p>
                <strong>Provider:</strong> Piotr Kusiewicz and Mateusz Kułakowski, individuals trading
                as Tactical Tennis Lab (tacticaltennislab.com), reachable at
                tacticaltennislab@gmail.com (&ldquo;Provider&rdquo;); and
              </p>
              <p>
                <strong>Client:</strong> <strong>[ Academy / Club Name ]</strong>, represented by{" "}
                <strong>[ Representative Name &amp; Title ]</strong>, located at{" "}
                <strong>[ Address ]</strong> (&ldquo;Academy&rdquo;).
              </p>
              <p>Together, the &ldquo;Parties.&rdquo;</p>
            </div>
          </Reveal>

          {SECTIONS.map((section, i) => (
            <Reveal key={section.title} delay={i * 30}>
              <h2 className="text-xl font-bold">{section.title}</h2>
              <div className="mt-3 space-y-3 text-body">
                {section.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="grid sm:grid-cols-2 gap-8 pt-6">
              <div>
                <p className="font-semibold">For Provider</p>
                <div className="mt-8 border-t border-line pt-2 text-sm text-muted">
                  Signature, printed name, date
                </div>
                <p className="mt-6 text-sm text-body">Piotr Kusiewicz</p>
                <div className="mt-8 border-t border-line pt-2 text-sm text-muted">
                  Signature, printed name, date
                </div>
                <p className="mt-6 text-sm text-body">Mateusz Kułakowski</p>
              </div>
              <div>
                <p className="font-semibold">For Academy</p>
                <div className="mt-8 border-t border-line pt-2 text-sm text-muted">
                  Signature, printed name, title, date
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
    </div>
  );
}
