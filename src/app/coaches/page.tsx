import type { Metadata } from "next";
import CoachesListContent from "@/components/CoachesListContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meet the Coaches Behind Your Academy's Analysis",
  description:
    "Former ATP ranked players and ITF Level 2 certified coaches who personally review every video and match submitted through your academy.",
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
