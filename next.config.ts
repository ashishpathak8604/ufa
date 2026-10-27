import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Tightest script policy that works with Next.js App Router hydration
      // (inline bootstrap/hydration scripts are required by Next.js).
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const isPreviewDeployment =
  process.env.VERCEL_ENV !== undefined
    ? process.env.VERCEL_ENV !== "production"
    : !process.env.NEXT_PUBLIC_SITE_URL ||
      /localhost|127\.0\.0\.1|example\.com/i.test(process.env.NEXT_PUBLIC_SITE_URL);

const headers = isPreviewDeployment
  ? [...securityHeaders, { key: "X-Robots-Tag", value: "noindex, nofollow" }]
  : securityHeaders;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  experimental: { serverActions: { bodySizeLimit: "5mb" } },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
  },
  async headers() {
    return [{ source: "/(.*)", headers }];
  },
};

export default nextConfig;
