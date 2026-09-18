import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { IconMail } from "@/components/icons";

const SOCIALS = [
  { label: "Instagram", short: "IG", href: "https://www.instagram.com/tacticaltennislab" },
  { label: "Facebook", short: "FB", href: "https://www.facebook.com/profile.php?id=6159084826074" },
];

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions about coaching plans, pricing, or how video analysis works for junior and competitive players? Get in touch with Tactical Tennis Lab.",
};

export default function ContactPage() {
  return (
    <div className="flex-1 flex flex-col">
      <PageHeader
        eyebrow="Get in touch"
        title="Contact us"
        subtitle="Questions about coaching, plans, or anything else — send us a message and we'll reply by email."
      />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-[1fr_1.3fr] items-start">
          <Reveal>
            <div className="rounded-2xl border border-line bg-brand-50/50 p-6 sm:p-8">
              <h2 className="font-semibold text-lg">Other ways to reach us</h2>
              <div className="mt-5 space-y-4">
                <a
                  href="mailto:tacticaltennislab@gmail.com"
                  className="flex items-center gap-3 text-sm text-body hover:text-brand-600 transition-colors"
                >
                  <span className="shrink-0 w-9 h-9 rounded-lg bg-surface border border-line flex items-center justify-center text-brand-600">
                    <IconMail className="w-4 h-4" />
                  </span>
                  tacticaltennislab@gmail.com
                </a>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-sm text-body hover:text-brand-600 transition-colors"
                  >
                    <span className="shrink-0 w-9 h-9 rounded-lg bg-surface border border-line flex items-center justify-center text-brand-600 text-xs font-semibold">
                      {s.short}
                    </span>
                    {s.label}
                  </a>
                ))}
              </div>
              <p className="mt-6 text-sm text-muted">
                We typically reply within 24 hours.
              </p>
            </div>
          </Reveal>
          <Reveal variant="zoom" delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </main>
    </div>
  );
}
