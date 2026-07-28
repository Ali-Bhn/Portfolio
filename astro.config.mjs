// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { remarkAlerts } from "./src/utils/remarkAlerts.mjs";

export default defineConfig({
  site: "https://bahadoran.de",
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkAlerts],
    shikiConfig: {
      theme: "night-owl",
      wrap: true,
    },
  },
  image: {
    responsiveStyles: true,
  },
});
