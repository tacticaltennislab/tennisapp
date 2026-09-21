import type { Metadata } from "next";
import CoachesListContent from "@/components/CoachesListContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meet Your Junior Tennis Coaches",
  description:
    "Former ATP-ranked players and ITF Level 2 certified coaches who personally review every video submission from junior and competitive players.",
  alternates: {
    canonical: "/coaches",
    languages: {
      en: "/coaches",
      pl: "/pl/coaches",
      es: "/es/coaches",
      it: "/it/coaches",
      ru: "/ru/coaches",
    },
  },
};

export default function CoachesPage() {
  return <CoachesListContent lang="en" />;
}
