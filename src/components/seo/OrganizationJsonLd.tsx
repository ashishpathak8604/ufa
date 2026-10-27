import { site } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

export function OrganizationJsonLd() {
  const baseUrl = getSiteUrl();
  const homeUrl = new URL("/", baseUrl).toString();
  const logoUrl = new URL(site.logo.src, baseUrl).toString();
  const imageUrl = new URL(site.seo.ogImage.src, baseUrl).toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SportsOrganization",
        "@id": `${homeUrl}#organization`,
        name: site.name,
        alternateName: site.shortName,
        url: homeUrl,
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
          width: 512,
          height: 495,
        },
        image: imageUrl,
        description: site.seo.description,
        sport: "Association football",
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Uttrakhand, India",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${homeUrl}#website`,
        url: homeUrl,
        name: site.name,
        alternateName: site.shortName,
        inLanguage: "en-IN",
        publisher: { "@id": `${homeUrl}#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${homeUrl}#webpage`,
        url: homeUrl,
        name: site.seo.title,
        description: site.seo.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${homeUrl}#website` },
        about: { "@id": `${homeUrl}#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: imageUrl,
          width: site.seo.ogImage.width,
          height: site.seo.ogImage.height,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
