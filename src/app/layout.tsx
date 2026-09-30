import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import MotionProvider from "@/components/MotionProvider";
import Navbar from "@/components/Navbar";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ThemeProvider from "@/components/ThemeProvider";
import { serializeJsonLd } from "@/lib/json-ld";
import { siteDescription, siteName, siteUrl, socialUrls } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Matches the default dark theme; ThemeProvider updates it when toggled.
  themeColor: "#0a0a0a",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteName,
  url: siteUrl,
  jobTitle: "Computer Science Student",
  sameAs: Object.values(socialUrls),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={inter.variable}

      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="bg-[color:var(--background)] text-[color:var(--foreground)] antialiased transition-colors duration-300"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <ThemeProvider>
            <SmoothScrollProvider>
              <Navbar />
              {children}
            </SmoothScrollProvider>
          </ThemeProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
