import type { Metadata, Viewport } from "next";
import "./globals.css";

import { fontVariables } from "@/lib/fonts";
import { site } from "@/data/site";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SpaceDustOverlay } from "@/components/SpaceDustOverlay";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { LoadingGateMount } from "@/components/LoadingGateMount";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import {
  personSchema,
  websiteSchema,
  jsonLd,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: site.defaultTitle,
    template: site.titleTemplate,
  },
  description: site.defaultDescription,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.domain }],
  creator: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.domain,
    siteName: site.name,
    title: site.defaultTitle,
    description: site.defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: site.defaultTitle,
    description: site.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-bg text-text antialiased">
        {/* Site-wide structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(personSchema())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(websiteSchema())}
        />

        {/* Skip link for keyboard users — first focusable element */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:border focus:border-line-strong focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-text"
        >
          Skip to content
        </a>

        {/* Cinematic chrome — fixed, pointer-events-none, a11y-inert */}
        <SpaceDustOverlay />
        <ScrollProgress />
        <GrainOverlay />
        <CustomCursor />

        <SmoothScrollProvider>
          <Nav />

          <main id="main" className="flex-1 pt-16">
            {children}
          </main>

          <Footer />
        </SmoothScrollProvider>

        <Toaster />

        {/* Cinematic first-visit loading gate (client-only, once per session) */}
        <LoadingGateMount />
      </body>
    </html>
  );
}
