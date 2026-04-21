import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const loaded = loadEnv(mode, process.cwd(), "");
  const siteUrl = (
    loaded.VITE_SITE_URL ||
    process.env.VITE_SITE_URL ||
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL ||
    ""
  ).replace(/\/$/, "");

  // Netlify (and CI) inject secrets into process.env at build time; merge so the client bundle
  // always receives the key. Vite only reads .env files via loadEnv — without this, UI-only env
  // vars added in Netlify after a deploy can be missing until the next build picks them up.
  const web3FormsAccessKey = (
    loaded.VITE_WEB3FORMS_ACCESS_KEY ||
    process.env.VITE_WEB3FORMS_ACCESS_KEY ||
    ""
  ).trim();

  // Netlify sets NETLIFY=true during its build — enables the Netlify Forms fallback in the client.
  // Render / plain static hosts do not; POSTing there returns 405. Override with VITE_NETLIFY_FORMS=true if needed.
  const netlifyFormsEnabled =
    process.env.NETLIFY === "true" || loaded.VITE_NETLIFY_FORMS === "true";

  return {
    plugins: [react(), tailwindcss()],
    define: {
      "import.meta.env.VITE_SITE_URL": JSON.stringify(siteUrl),
      "import.meta.env.VITE_WEB3FORMS_ACCESS_KEY": JSON.stringify(web3FormsAccessKey),
      "import.meta.env.VITE_NETLIFY_FORMS": JSON.stringify(netlifyFormsEnabled ? "true" : ""),
    },
  };
});
