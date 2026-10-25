import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 60 is used for the full-screen clay photographs, 75 (the default) everywhere else.
    qualities: [60, 75],
  },
};

export default nextConfig;
