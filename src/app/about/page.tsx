import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Why we built an independent video and tactical analysis service for junior and competitive tennis players — a second expert opinion alongside your on-court coach, for individual players, not clubs.",
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
