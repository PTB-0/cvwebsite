import { defineConfig } from "astro/config";

// Static output, zero client JS by default. `site` is a placeholder until the domain is chosen.
export default defineConfig({
  output: "static",
  site: "https://example.invalid",
  trailingSlash: "always",
  redirects: { "/": "/en/" },
  devToolbar: { enabled: false },
});
