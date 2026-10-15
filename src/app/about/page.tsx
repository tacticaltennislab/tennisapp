import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Why we built a video and tactical analysis service that supports tennis academies, clubs and their coaches, with more time on court for coaches, clearer feedback for players.",
  alternates: {
    canonical: "/about",
    languages: {
      en: "/about",
      pl: "/pl/about",
      es: "/es/about",
      it: "/it/about",
      ru: "/ru/about",
    },
  },
};

export default function AboutPage() {
  return <AboutContent lang="en" />;
}
