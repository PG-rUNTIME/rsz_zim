import { useEffect } from "react";
import {
  DEFAULT_DESCRIPTION,
  FACEBOOK_PAGE_URL,
  getSiteUrl,
  LINKEDIN_URL,
  SITE_INQUIRY_EMAIL,
  SITE_NAME,
  X_TWITTER_URL,
} from "../seo/site";

const SCRIPT_ID = "rsz-organization-jsonld";

/**
 * Organization structured data for Google and other search engines
 * (see https://schema.org/Organization).
 */
export function OrganizationJsonLd() {
  useEffect(() => {
    const url = getSiteUrl();
    const logoUrl = url ? `${url}/logo.png` : undefined;

    const data: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": ["NGO", "Organization"],
      name: SITE_NAME,
      alternateName: "RSZ",
      description: DEFAULT_DESCRIPTION,
      email: SITE_INQUIRY_EMAIL,
      telephone: ["+263-778-934-153", "+263-772-978-904"],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Stand Number 2822, Mutare (Chikanga)",
        addressLocality: "Mutare",
        addressRegion: "Manicaland Province",
        addressCountry: "ZW",
      },
      areaServed: {
        "@type": "Country",
        name: "Zimbabwe",
      },
      sameAs: [FACEBOOK_PAGE_URL, X_TWITTER_URL, LINKEDIN_URL],
    };

    if (url) {
      data.url = url;
    }
    if (logoUrl) {
      data.logo = logoUrl;
    }

    let el = document.getElementById(SCRIPT_ID);
    if (!el) {
      el = document.createElement("script");
      el.id = SCRIPT_ID;
      el.setAttribute("type", "application/ld+json");
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
  }, []);

  return null;
}
