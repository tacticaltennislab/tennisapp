import type { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/locales";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tacticaltennislab.com";
  const now = new Date();

  const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/pricing", changeFrequency: "weekly", priority: 0.9 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/coaches", changeFrequency: "monthly", priority: 0.6 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.4 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
    ...LOCALES.flatMap((lang) => [
      { path: `/${lang}`, changeFrequency: "weekly" as const, priority: 0.9 },
      { path: `/${lang}/pricing`, changeFrequency: "weekly" as const, priority: 0.85 },
      { path: `/${lang}/about`, changeFrequency: "monthly" as const, priority: 0.55 },
      { path: `/${lang}/coaches`, changeFrequency: "monthly" as const, priority: 0.55 },
      { path: `/${lang}/faq`, changeFrequency: "monthly" as const, priority: 0.65 },
      { path: `/${lang}/contact`, changeFrequency: "yearly" as const, priority: 0.35 },
      { path: `/${lang}/terms`, changeFrequency: "yearly" as const, priority: 0.15 },
      { path: `/${lang}/privacy`, changeFrequency: "yearly" as const, priority: 0.15 },
    ]),
  ];

  return routes.map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
