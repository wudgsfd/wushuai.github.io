import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://wudgsfd.github.io",
  base: "/wushuai.github.io",
  trailingSlash: "always",
  integrations: [vue(), sitemap()],
  build: {
    format: "directory",
  },
});
