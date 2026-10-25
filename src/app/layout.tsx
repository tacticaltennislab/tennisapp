import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";
import Providers from "@/components/Providers";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ChatWidget from "@/components/ChatWidget";
import AiFaqWidget from "@/components/AiFaqWidget";
import ReferralCapture from "@/components/ReferralCapture";
import HtmlLangSync from "@/components/HtmlLangSync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const DEFAULT_TITLE = "Tactical Tennis Lab: Video & Match Analysis for Tennis Academies and Clubs";
const DEFAULT_DESCRIPTION =
  "Professional video and match analysis that supports tennis academies, clubs and their coaches. Tactical and technical feedback from ATP players, certified ATP and ITF coaches, so players improve faster and coaches spend more time on court.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Tactical Tennis Lab",
    default: DEFAULT_TITLE,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "tennis academy video analysis",
    "tennis club match analysis",
    "tennis coaching support software",
    "tennis match analysis for academies",
    "online tennis video analysis",
    "tennis tactical analysis",
  ],
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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
  themeColor: "#ffffff",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tactical Tennis Lab",
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  areaServed: "Worldwide",
  sameAs: [
    "https://www.instagram.com/tacticaltennislab",
    "https://www.facebook.com/profile.php?id=6159084826074",
  ],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Online Tennis Video & Tactical Analysis",
      serviceType: "Tennis coaching",
      audience: {
        "@type": "Audience",
        audienceType: "Tennis academies, clubs and their coaches and players",
      },
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`}
        </Script>
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <Providers>
          <HtmlLangSync />
          <ReferralCapture />
          <SiteHeader />
          <div id="main-content" tabIndex={-1} className="flex-1 flex flex-col outline-none">
            {children}
          </div>
          <SiteFooter />
          <ChatWidget />
          <AiFaqWidget />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
