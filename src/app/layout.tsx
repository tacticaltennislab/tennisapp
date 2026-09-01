import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import SiteHeader from "@/components/SiteHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Tactical Tennis Lab — Training Plans for Every Player",
  description:
    "Personalized tennis training plans and video-based coaching, for amateurs and everyone who plays.",
  openGraph: {
    title: "Tactical Tennis Lab",
    description:
      "Personalized tennis training plans and video-based coaching, for amateurs and everyone who plays.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tactical Tennis Lab",
    description:
      "Personalized tennis training plans and video-based coaching, for amateurs and everyone who plays.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <Providers>
          <SiteHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
