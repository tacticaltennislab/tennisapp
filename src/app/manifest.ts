import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tactical Tennis Lab",
    short_name: "Tennis Lab",
    description:
      "Personalized tennis training plans and video-based coaching, for amateurs and everyone who plays.",
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
