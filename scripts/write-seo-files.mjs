/**
 * Writes public/robots.txt and public/sitemap.xml.
 * Uses VITE_SITE_URL, URL (Netlify), or DEPLOY_PRIME_URL when set; otherwise https://www.rszimbabwe.org.
 */
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

/** Canonical site when env is unset (local builds / hosts without URL injection). Override with VITE_SITE_URL. */
const DEFAULT_SITE_URL = "https://rszimbabwe.org";

const base = (
  process.env.VITE_SITE_URL ||
  process.env.URL ||
  process.env.DEPLOY_PRIME_URL ||
  DEFAULT_SITE_URL
)
  .trim()
  .replace(/\/$/, "");

const lastmod = new Date().toISOString().slice(0, 10);

const routes = [
  "/",
  "/about",
  "/what-we-do",
  "/programs",
  "/team",
  "/board",
  "/contact",
  "/impact",
  "/partner",
];

const robotsMinimal = `User-agent: *
Allow: /
`;

const urlEntries = routes
  .map((path) => {
    const loc = path === "/" ? `${base}/` : `${base}${path}`;
    const priority = path === "/" ? "1.0" : "0.85";
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

writeFileSync(join(publicDir, "sitemap.xml"), sitemap);

const robots = `${robotsMinimal}
Sitemap: ${base}/sitemap.xml
`;

writeFileSync(join(publicDir, "robots.txt"), robots);
console.log(`write-seo-files: wrote sitemap.xml and robots.txt (${base})`);
