/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical site origin, no trailing slash (injected at build from env). */
  readonly VITE_SITE_URL: string;
  /** Web3Forms access key — optional; enables email delivery without SMTP. */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  /** "true" when built on Netlify (or forced via .env) so the client may POST to Netlify Forms. */
  readonly VITE_NETLIFY_FORMS?: string;
}
