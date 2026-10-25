import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Want to partner with us or have a question about academy packages, pricing, or how video analysis works? Get in touch with Tactical Tennis Lab.",
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
