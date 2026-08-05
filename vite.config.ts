import { resolve } from "node:path";
import { defineConfig, loadEnv } from "vite";
import { keywords } from "./src/data/keywords";
import { getKeywordPath } from "./src/utils/routes";

const keywordInputs = Object.fromEntries(
  keywords.map((keyword) => [
    `keyword-${keyword.id}`,
    resolve(__dirname, `.${getKeywordPath(keyword.id)}index.html`)
  ])
);

function normalizeBasePath(value: string | undefined): string {
  const rawValue = value?.trim() || "/";
  const withLeadingSlash = rawValue.startsWith("/") ? rawValue : `/${rawValue}`;
  const withoutTrailingSlash = withLeadingSlash.replace(/\/+$/, "");

  return withoutTrailingSlash === "" ? "" : withoutTrailingSlash;
}

function normalizeSiteUrl(value: string | undefined): string {
  const fallback = "https://hot-appearance.vercel.app";
  const rawValue = value?.trim() || fallback;
  const withProtocol = /^https?:\/\//.test(rawValue) ? rawValue : `https://${rawValue}`;

  return withProtocol.replace(/\/+$/, "");
}

function renderGoogleAnalyticsTag(measurementId: string | undefined): string {
  const trimmedMeasurementId = measurementId?.trim();

  if (!trimmedMeasurementId) {
    return "";
  }

  const encodedMeasurementId = encodeURIComponent(trimmedMeasurementId);
  const serializedMeasurementId = JSON.stringify(trimmedMeasurementId);

  return `
    <script async src="https://www.googletagmanager.com/gtag/js?id=${encodedMeasurementId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag("js", new Date());
      gtag("config", ${serializedMeasurementId});
    </script>`;
}

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };
  const basePath = normalizeBasePath(env.VITE_BASE_PATH);
  const siteUrl = normalizeSiteUrl(
    env.VITE_SITE_URL ?? env.VITE_VERCEL_PROJECT_PRODUCTION_URL
  );
  const googleAnalyticsTag = renderGoogleAnalyticsTag(env.VITE_GA_MEASUREMENT_ID);

  return {
    base: `${basePath || ""}/`,
    define: {
      __BASE_PATH__: JSON.stringify(basePath),
      __SITE_URL__: JSON.stringify(siteUrl)
    },
    plugins: [
      {
        name: "inject-google-analytics",
        transformIndexHtml(html) {
          if (!googleAnalyticsTag) {
            return html;
          }

          return html.replace("</head>", `${googleAnalyticsTag}\n  </head>`);
        }
      }
    ],
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
  };
});
