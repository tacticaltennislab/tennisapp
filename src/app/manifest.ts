import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tactical Tennis Lab",
    short_name: "Tennis Lab",
    description:
      "Video and match analysis for tennis academies, clubs and players.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1b7a45",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
