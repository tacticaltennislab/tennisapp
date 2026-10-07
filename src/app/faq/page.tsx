import type { Metadata } from "next";
import FaqContent from "@/components/FaqContent";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions from academies, parents and players about academy accounts, packages, video analysis, pricing, refunds and minors' accounts.",
  alternates: {
    canonical: "/faq",
    languages: {
      en: "/faq",
      pl: "/pl/faq",
      es: "/es/faq",
      it: "/it/faq",
      ru: "/ru/faq",
    },
  },
};

export default function FaqPage() {
  return <FaqContent lang="en" />;
}
