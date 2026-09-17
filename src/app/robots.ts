import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tacticaltennislab.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/account",
        "/submissions",
        "/submit-video",
        "/customers",
        "/waitlist/admin",
        "/reviews/admin",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
