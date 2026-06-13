// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// applyBaseStyles: false -> usamos nuestro propio global.css con las directivas
// @tailwind (importado por Layout.astro), para controlar el orden de capas.
export default defineConfig({
  integrations: [tailwind({ applyBaseStyles: false })],
});
