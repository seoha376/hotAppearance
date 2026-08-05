import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
const scriptDir = dirname(fileURLToPath(import.meta.url));
const defaultProjectRoot = resolve(scriptDir, "..");
const moduleCache = new Map();
const staticPaths = ["/", "/about/", "/contact/", "/privacy/"];

function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (!value.startsWith("--")) {
      continue;
    }

    args[value.slice(2)] = argv[index + 1];
    index += 1;
  }

  return args;
}

function resolveLocalTsModule(specifier, fromDir) {
  const base = resolve(fromDir, specifier);
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.js`,
    `${base}.json`,
    join(base, "index.ts"),
    join(base, "index.js")
  ];

  const found = candidates.find((candidate) => existsSync(candidate));

  if (!found) {
    throw new Error(`Unable to resolve local module "${specifier}" from ${fromDir}`);
  }

  return found;
}

function loadTsModule(filePath) {
  const resolvedPath = resolve(filePath);
  const cachedModule = moduleCache.get(resolvedPath);

  if (cachedModule) {
    return cachedModule.exports;
  }

  const source = readFileSync(resolvedPath, "utf8");
  const module = { exports: {} };
  moduleCache.set(resolvedPath, module);

  const output = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020
    },
    fileName: resolvedPath
  }).outputText;

  const localRequire = (specifier) => {
    if (specifier.startsWith(".")) {
      const localPath = resolveLocalTsModule(specifier, dirname(resolvedPath));

      if (localPath.endsWith(".ts")) {
        return loadTsModule(localPath);
      }

      return require(localPath);
    }

    return require(specifier);
  };

  const compiled = new Function("exports", "require", "module", "__filename", "__dirname", output);
  compiled(module.exports, localRequire, module, resolvedPath, dirname(resolvedPath));

  return module.exports;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeSiteUrl(siteUrl) {
  return siteUrl.replace(/\/+$/, "");
}

function ensurePathInside(root, target) {
  const relativePath = relative(root, target);

  if (relativePath.startsWith("..") || isAbsolute(relativePath)) {
    throw new Error(`Refusing to write outside output root: ${target}`);
  }
}

function absoluteUrl(siteUrl, path) {
  const normalizedPath = path === "/" ? "/" : path;
  return `${normalizeSiteUrl(siteUrl)}${normalizedPath}`;
}

function renderSitemap({ getKeywordPath, keywords, siteUrl }) {
  const urls = [
    ...staticPaths.map((path) => absoluteUrl(siteUrl, path)),
    ...keywords.map((keyword) => absoluteUrl(siteUrl, getKeywordPath(keyword.id)))
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>\n    <loc>${escapeHtml(url)}</loc>\n  </url>`).join("\n")}
</urlset>
`;
}

function renderRobots({ siteUrl }) {
  return `User-agent: *
Allow: /
Sitemap: ${normalizeSiteUrl(siteUrl)}/sitemap.xml
`;
}

function renderKeywordPage({ basePath, getAudienceSegmentLabel, getKeywordPath, getTrendStateLabel, keyword, navLinks, siteUrl }) {
  const canonicalUrl = absoluteUrl(siteUrl, getKeywordPath(keyword.id));
  const title = `${keyword.label} | Hot Appearance 키워드 상세`;
  const description = `${keyword.label} 키워드의 핫함 점수, 관심 구분, 관련 검색어와 왜 주목받는지 정리한 정보성 콘텐츠입니다.`;
  const audienceLabel = getAudienceSegmentLabel(keyword.audienceSegment);
  const trendLabel = getTrendStateLabel(keyword.trendState);
  const navHtml = navLinks.map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join("\n        ");
  const footerNavHtml = navLinks
    .filter((link) => link.href !== `${basePath}/#ranking`)
    .map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`)
    .join("\n        ");

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="theme-color" content="#ff4d6d" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="article" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <link rel="manifest" href="${basePath}/site.webmanifest" />
    <link rel="stylesheet" href="/src/styles.css" />
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6882848839362046"
      crossorigin="anonymous"
    ></script>
    <title>${escapeHtml(title)}</title>
  </head>
  <body>
    <header class="site-header">
      <a href="${basePath}/" class="brand">Hot Appearance</a>
      <nav aria-label="Main navigation">
        ${navHtml}
      </nav>
    </header>
    <main class="page-shell">
      <section class="hero compact-hero">
        <p class="eyebrow">${escapeHtml(keyword.category)}</p>
        <h1>${escapeHtml(keyword.label)}</h1>
        <p class="hero-copy">${escapeHtml(keyword.summary)}</p>
      </section>
      <article
        class="content-card page-content keyword-page"
        data-audience-segment="${escapeHtml(keyword.audienceSegment)}"
        data-trend-state="${escapeHtml(keyword.trendState)}"
      >
        <dl class="metric-grid" aria-label="Keyword signals">
          <div>
            <dt>Hotness</dt>
            <dd>${escapeHtml(keyword.hotness)}</dd>
          </div>
          <div>
            <dt>Audience</dt>
            <dd>${escapeHtml(audienceLabel)}</dd>
          </div>
          <div>
            <dt>Trend</dt>
            <dd>${escapeHtml(trendLabel)}</dd>
          </div>
        </dl>
        <div class="detail-block">
          <h2>Why It Matters</h2>
          <p>${escapeHtml(keyword.whyHot)}</p>
        </div>
        <div class="detail-block">
          <h2>Best For</h2>
          <p>${escapeHtml(keyword.audience)}</p>
        </div>
        <div class="detail-block">
          <h2>Related Searches</h2>
          <div class="chips" aria-label="Related searches">
            ${keyword.relatedSearches.map((search) => `<span>${escapeHtml(search)}</span>`).join("")}
          </div>
        </div>
        <p class="safety-note">
          이 페이지는 외모관리 키워드를 이해하기 위한 정보성 트렌드 해설입니다.
          의료적 조언이나 결과 보장을 제공하지 않으며, 제품이나 시술 선택은 개인 상태에 따라 달라질 수 있습니다.
        </p>
      </article>
    </main>
    <footer class="site-footer">
      <nav aria-label="Footer navigation">
        ${footerNavHtml}
      </nav>
      <p>© 2026 Hot Appearance. Informational trend notes for appearance-care keywords.</p>
    </footer>
  </body>
</html>
`;
}

function loadProjectData(projectRoot) {
  const keywordsModule = loadTsModule(join(projectRoot, "src", "data", "keywords.ts"));
  const siteContentModule = loadTsModule(join(projectRoot, "src", "content", "siteContent.ts"));
  const hotnessModule = loadTsModule(join(projectRoot, "src", "utils", "hotness.ts"));
  const labelsModule = loadTsModule(join(projectRoot, "src", "utils", "labels.ts"));
  const routesModule = loadTsModule(join(projectRoot, "src", "utils", "routes.ts"));

  return {
    basePath: routesModule.BASE_PATH,
    getAudienceSegmentLabel: labelsModule.getAudienceSegmentLabel,
    getKeywordPath: routesModule.getKeywordPath,
    getTrendStateLabel: hotnessModule.getTrendStateLabel,
    keywords: keywordsModule.keywords,
    navLinks: siteContentModule.navLinks,
    siteUrl: siteContentModule.SITE_URL,
    validateKeywordId: routesModule.validateKeywordId
  };
}

export function generateStaticPages(options = {}) {
  const projectRoot = resolve(options.projectRoot ?? defaultProjectRoot);
  const outputRoot = resolve(options.outputRoot ?? projectRoot);
  const projectData = options.keywords && options.siteUrl
    ? options
    : loadProjectData(projectRoot);
  const {
    basePath,
    getAudienceSegmentLabel,
    getKeywordPath,
    getTrendStateLabel,
    keywords,
    navLinks,
    siteUrl,
    validateKeywordId
  } = projectData;
  const keywordsRoot = join(outputRoot, "keywords");
  const sitemapPath = join(outputRoot, "public", "sitemap.xml");
  const robotsPath = join(outputRoot, "public", "robots.txt");

  ensurePathInside(outputRoot, keywordsRoot);
  ensurePathInside(outputRoot, sitemapPath);
  ensurePathInside(outputRoot, robotsPath);

  rmSync(keywordsRoot, { recursive: true, force: true });
  mkdirSync(keywordsRoot, { recursive: true });
  mkdirSync(dirname(sitemapPath), { recursive: true });

  for (const keyword of keywords) {
    const keywordId = validateKeywordId(keyword.id);
    const pageDir = join(keywordsRoot, keywordId);
    const pagePath = join(pageDir, "index.html");

    ensurePathInside(keywordsRoot, pagePath);
    ensurePathInside(outputRoot, pagePath);
    mkdirSync(pageDir, { recursive: true });
    writeFileSync(
      pagePath,
      renderKeywordPage({
        basePath,
        getAudienceSegmentLabel,
        getKeywordPath,
        getTrendStateLabel,
        keyword,
        navLinks,
        siteUrl
      }),
      "utf8"
    );
  }

  writeFileSync(sitemapPath, renderSitemap({ getKeywordPath, keywords, siteUrl }), "utf8");
  writeFileSync(robotsPath, renderRobots({ siteUrl }), "utf8");

  return {
    keywordCount: keywords.length,
    outputRoot,
    sitemapPath
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2));
  const projectRoot = resolve(args["project-root"] ?? defaultProjectRoot);
  const outputRoot = resolve(args["output-root"] ?? projectRoot);
  const result = generateStaticPages({ projectRoot, outputRoot });

  console.log(`Generated ${result.keywordCount} keyword pages and sitemap.xml`);
}
