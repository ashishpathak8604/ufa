import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexableSite } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  if (!isIndexableSite()) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: new URL("/sitemap.xml", baseUrl).toString(),
    host: baseUrl.origin,
  };
}
