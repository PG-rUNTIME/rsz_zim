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

  // Resolve once in Node (same values the build sees) and inject explicitly. Relying only on
  // Vite’s default import.meta.env replacement has left some Render/static builds with an empty
  // key in the bundle; define guarantees what process.env / .env contained at config load time.
  // Also accept WEB3FORMS_ACCESS_KEY — a common dashboard typo (missing VITE_ prefix).
  const web3FormsAccessKey = (
    process.env.VITE_WEB3FORMS_ACCESS_KEY ||
    process.env.WEB3FORMS_ACCESS_KEY ||
    loaded.VITE_WEB3FORMS_ACCESS_KEY ||
    loaded.WEB3FORMS_ACCESS_KEY ||
    ""
  ).trim();

  if (process.env.RENDER === "true" && !web3FormsAccessKey) {
    console.warn(
      "[vite] Web3Forms key missing at build time. In Render → this static site → Environment, set VITE_WEB3FORMS_ACCESS_KEY (or WEB3FORMS_ACCESS_KEY), then “Save, rebuild, and deploy”. “Save and deploy” reuses an old bundle and will not pick up Vite env.",
    );
  }

  // Netlify sets NETLIFY=true during its build — enables the Netlify Forms fallback in the client.
  // Render / plain static hosts do not; POSTing there returns 405. Override with VITE_NETLIFY_FORMS=true if needed.
  const netlifyFormsEnabled =
    process.env.NETLIFY === "true" || loaded.VITE_NETLIFY_FORMS === "true";

  return {
    plugins: [react(), tailwindcss()],
    define: {
      "import.meta.env.VITE_SITE_URL": JSON.stringify(siteUrl),
      "import.meta.env.VITE_NETLIFY_FORMS": JSON.stringify(netlifyFormsEnabled ? "true" : ""),
      "import.meta.env.VITE_WEB3FORMS_ACCESS_KEY": JSON.stringify(web3FormsAccessKey),
    },
  };
});
