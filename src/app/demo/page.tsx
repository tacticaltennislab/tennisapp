import type { Metadata } from "next";
import DemoContent from "@/components/DemoContent";
import { demoDictionaries } from "@/i18n/dictionaries/demo";

const seo = demoDictionaries.en.meta;

export const metadata: Metadata = {
  title: { absolute: seo.title },
  description: seo.description,
  openGraph: { title: seo.title, description: seo.description },
  twitter: { title: seo.title, description: seo.description },
  alternates: {
    canonical: "/demo",
    languages: {
      en: "/demo",
      pl: "/pl/demo",
      es: "/es/demo",
      it: "/it/demo",
      ru: "/ru/demo",
    },
  },
};

export default function DemoPage() {
  return <DemoContent lang="en" />;
}
