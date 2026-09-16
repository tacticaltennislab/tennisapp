import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Providers from "@/components/Providers";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ChatWidget from "@/components/ChatWidget";
import ReferralCapture from "@/components/ReferralCapture";

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
  title: "Tactical Tennis Lab — Independent Video & Match Analysis",
  description:
    "Independent video and match analysis from former ATP-ranked players and ITF Level 2 coaches — for ambitious amateurs and competitive juniors.",
  openGraph: {
    title: "Tactical Tennis Lab",
    description:
      "Independent video and match analysis from former ATP-ranked players and ITF Level 2 coaches — for ambitious amateurs and competitive juniors.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tactical Tennis Lab",
    description:
      "Independent video and match analysis from former ATP-ranked players and ITF Level 2 coaches — for ambitious amateurs and competitive juniors.",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    title: "Tennis Lab",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#1b7a45",
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
          <ReferralCapture />
          <SiteHeader />
          {children}
          <SiteFooter />
          <ChatWidget />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
