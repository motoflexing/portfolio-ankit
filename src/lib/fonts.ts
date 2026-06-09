import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

/**
 * Display typeface — major headings only.
 * Brief specifies Clash Display; Space Grotesk is the stated fallback.
 * To swap in Clash Display later: replace this export with `next/font/local`
 * pointing at self-hosted ClashDisplay .woff2 files, keep the same
 * `--font-display` CSS variable, and nothing else changes.
 */
export const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

/** Body / UI typeface. */
export const fontSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

/** Mono — section indices, technical labels, eyebrows, status text. */
export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const fontVariables = `${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`;
