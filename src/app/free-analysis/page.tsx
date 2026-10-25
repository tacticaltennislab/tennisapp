import type { Metadata } from "next";
import FreeAnalysisContent from "@/components/FreeAnalysisContent";
import { freeAnalysisDictionaries } from "@/i18n/dictionaries/freeAnalysis";

export const dynamic = "force-dynamic";

const seo = freeAnalysisDictionaries.en.meta;

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  openGraph: { title: seo.title, description: seo.description },
  alternates: {
    canonical: "/free-analysis",
    languages: {
      en: "/free-analysis",
      pl: "/pl/free-analysis",
      es: "/es/free-analysis",
      it: "/it/free-analysis",
      ru: "/ru/free-analysis",
    },
  },
};

export default function FreeAnalysisPage() {
  return <FreeAnalysisContent lang="en" />;
}
