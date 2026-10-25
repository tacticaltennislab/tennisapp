import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      pl: "/pl",
      es: "/es",
      it: "/it",
      ru: "/ru",
    },
  },
};

export default function Home() {
  return <HomeContent lang="en" />;
}
