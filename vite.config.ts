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

  // Do not `define` VITE_WEB3FORMS_ACCESS_KEY here — that can bake an empty string and override
  // Vite’s normal replacement from process.env (Render/Netlify inject at build time).
  const web3FormsAccessKeyForLog = (
    process.env.VITE_WEB3FORMS_ACCESS_KEY ||
    loaded.VITE_WEB3FORMS_ACCESS_KEY ||
    ""
  ).trim();

  if (process.env.RENDER === "true" && !web3FormsAccessKeyForLog) {
    console.warn(
      "[vite] VITE_WEB3FORMS_ACCESS_KEY is missing at build time. In Render → Environment, add it, then use “Save, rebuild, and deploy” (not “Save and deploy”) so Vite can embed it in the bundle.",
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
    },
  };
});
