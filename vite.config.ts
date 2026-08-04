import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/hotAppearance/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about/index.html"),
        contact: resolve(__dirname, "contact/index.html"),
        privacy: resolve(__dirname, "privacy/index.html")
      }
    }
  }
});
