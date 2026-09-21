import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions about coaching plans, pricing, or how video analysis works for junior and competitive players? Get in touch with Tactical Tennis Lab.",
  alternates: {
    canonical: "/contact",
    languages: {
      en: "/contact",
      pl: "/pl/contact",
      es: "/es/contact",
      it: "/it/contact",
      ru: "/ru/contact",
    },
  },
};

export default function ContactPage() {
  return <ContactContent lang="en" />;
}
