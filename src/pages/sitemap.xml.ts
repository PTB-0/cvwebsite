import type { APIRoute } from "astro";
import { locales } from "../i18n";

// Hand-written sitemap (no extra dependency). Uses `site` from astro.config.mjs.
export const GET: APIRoute = ({ site }) => {
  const base = site?.toString() ?? "";
  const abs = (path: string) => new URL(path, base).toString();
  const urls = locales
    .map((lang) => {
      const alternates = locales
        .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(`/${l}/`)}"/>`)
        .join("\n");
      return `  <url>\n    <loc>${abs(`/${lang}/`)}</loc>\n${alternates}\n  </url>`;
    })
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
