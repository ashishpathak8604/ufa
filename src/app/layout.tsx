import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-barlow",
  preload: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

/**
 * metadataBase resolves relative Open Graph URLs. Set NEXT_PUBLIC_SITE_URL
 * at deploy time (non-secret). The fallback is a neutral placeholder and
 * makes no factual claim about the association.
 */
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL("https://example.com");

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: "Uttarakhand Football Association",
    template: "%s | Uttarakhand Football Association",
  },
  description:
    "Public information site of the Uttarakhand Football Association — achievements, fixtures, official notices, and pathways into football in the state.",
  applicationName: "Uttarakhand Football Association",
  keywords: ["Uttarakhand", "football", "association", "UFA"],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Uttarakhand Football Association",
    title: "Uttarakhand Football Association",
    description:
      "Achievements, fixtures, official notices, and pathways into football in Uttarakhand.",
    images: [
      {
        url: "/assets/placeholders/og-cover.webp",
        width: 1200,
        height: 630,
        alt: "Uttarakhand Football Association placeholder social card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uttarakhand Football Association",
    description:
      "Achievements, fixtures, official notices, and pathways into football in Uttarakhand.",
    images: ["/assets/placeholders/og-cover.webp"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F3EC",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body>
        <a href="#main-content" className="sr-only-focusable">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
