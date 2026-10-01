import type { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/locales";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tacticaltennislab.com";

  const authGatedPaths = ["/account", "/submit-video", "/review"];
  const adminOnlyPaths = ["/submissions", "/customers", "/reviews/admin", "/club-agreement"];

  const disallow = [
    ...adminOnlyPaths,
    ...authGatedPaths,
    // Translated versions of the same auth-gated pages -- admin-only
    // pages aren't translated, so they don't need locale variants.
    ...LOCALES.flatMap((lang) => authGatedPaths.map((path) => `/${lang}${path}`)),
  ];

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow,
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
