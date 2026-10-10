/** Canonical public site URL, no trailing slash (from Vite env / Netlify build). */
export function getSiteUrl(): string {
  return (import.meta.env.VITE_SITE_URL ?? "").replace(/\/$/, "");
}

export const SITE_NAME = "Resilient Societies of Zimbabwe";

/**
 * Public inbox for inquiries (mailto, footer, JSON-LD, form copy).
 * Web3Forms delivers to the inbox configured for your access key — set that dashboard email to this address.
 */
export const SITE_INQUIRY_EMAIL = "info@rszimbabwe.org";
export const SITE_TAGLINE = "Building Community Resilience";

export const DEFAULT_DESCRIPTION =
  "Resilient Societies of Zimbabwe (RSZ) builds community resilience through disaster mitigation, preparedness, and response in Manicaland and across Zimbabwe. PVO partner for sustainable, community-driven programmes.";

/** Official Facebook Page (no tracking query parameters). */
export const FACEBOOK_PAGE_URL = "https://www.facebook.com/RSocietiesZim/";

/** Official LinkedIn group. */
export const LINKEDIN_URL = "https://www.linkedin.com/groups/16709007/";

/** X (Twitter) — placeholder until a dedicated RSZ profile exists. */
export const X_TWITTER_URL = "https://x.com/";
