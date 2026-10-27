import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Cormorant_Garamond, Inter } from "next/font/google";
import { site } from "@/content/site";
import { getSiteUrl, isIndexableSite } from "@/lib/site-url";
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

const baseUrl = getSiteUrl();
const indexable = isIndexableSite();

const robots: Metadata["robots"] = indexable
  ? {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    }
  : { index: false, follow: false };

const verification = {
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : {}),
  ...(process.env.BING_SITE_VERIFICATION
    ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
    : {}),
};

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: site.seo.title,
    template: `%s | ${site.name}`,
  },
  description: site.seo.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "Sports",
  keywords: [...site.seo.keywords],
  alternates: { canonical: "/" },
  robots,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
    images: [
      {
        url: site.seo.ogImage.src,
        width: site.seo.ogImage.width,
        height: site.seo.ogImage.height,
        alt: site.seo.ogImage.alt,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: [site.seo.ogImage.src],
  },
  ...(Object.keys(verification).length > 0 ? { verification } : {}),
  other: {
    "geo.region": "IN-UT",
    "geo.placename": "Uttrakhand",
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
      lang="en-IN"
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
