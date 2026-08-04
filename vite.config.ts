import { resolve } from "node:path";
import { defineConfig } from "vite";
import { keywords } from "./src/data/keywords";
import { getKeywordPath } from "./src/utils/routes";

const keywordInputs = Object.fromEntries(
  keywords.map((keyword) => [
    `keyword-${keyword.id}`,
    resolve(__dirname, `.${getKeywordPath(keyword.id)}index.html`)
  ])
);

export default defineConfig({
  base: "/hotAppearance/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about/index.html"),
        contact: resolve(__dirname, "contact/index.html"),
        privacy: resolve(__dirname, "privacy/index.html"),
        ...keywordInputs
      }
    }
  }
});
