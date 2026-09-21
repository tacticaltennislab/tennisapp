import type { Metadata } from "next";
import FaqContent from "@/components/FaqContent";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions from parents and players about video analysis, pricing, refunds, minors' accounts, and how coaching works at Tactical Tennis Lab.",
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
