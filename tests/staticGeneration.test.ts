import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { keywords } from "../src/data/keywords";
import { navLinks, SITE_URL } from "../src/content/siteContent";
import { getTrendStateLabel } from "../src/utils/hotness";
import { getAudienceSegmentLabel } from "../src/utils/labels";
import { BASE_PATH, getKeywordPath, validateKeywordId } from "../src/utils/routes";
import { generateStaticPages } from "../scripts/generateStaticPages.mjs";

function generateIntoTemp(): string {
  const outputRoot = mkdtempSync(join(tmpdir(), "hot-appearance-static-"));
  generateStaticPages({
    basePath: BASE_PATH,
    getAudienceSegmentLabel,
    getKeywordPath,
    getTrendStateLabel,
    keywords,
    navLinks,
    outputRoot,
    siteUrl: SITE_URL,
    validateKeywordId
  });

  return outputRoot;
}

describe("static keyword page generation", () => {
  let outputRoot: string;

  beforeAll(() => {
    outputRoot = generateIntoTemp();
  });

  afterAll(() => {
    rmSync(outputRoot, { recursive: true, force: true });
  });

  it("generates every keyword detail page and sitemap URL from keyword data", () => {
    const sitemap = readFileSync(join(outputRoot, "public", "sitemap.xml"), "utf8");

    expect(sitemap).toContain(`${SITE_URL}/`);
    expect(sitemap).toContain(`${SITE_URL}/about/`);
    expect(sitemap).toContain(`${SITE_URL}/contact/`);
    expect(sitemap).toContain(`${SITE_URL}/privacy/`);

    for (const keyword of keywords) {
      expect(existsSync(join(outputRoot, "keywords", keyword.id, "index.html"))).toBe(true);
      expect(sitemap).toContain(`${SITE_URL}/keywords/${keyword.id}/`);
    }
  });

  it("renders keyword fields, SEO tags, related searches, and safety copy", () => {
    const keyword = keywords[0];
    const html = readFileSync(join(outputRoot, "keywords", keyword.id, "index.html"), "utf8");

    expect(html).toContain(`<title>${keyword.label} | Hot Appearance 키워드 상세</title>`);
    expect(html).toContain(`<link rel="canonical" href="${SITE_URL}/keywords/${keyword.id}/" />`);
    expect(html).toContain(`<meta property="og:type" content="article" />`);
    expect(html).toContain(keyword.label);
    expect(html).toContain(keyword.category);
    expect(html).toContain("<dt>Hotness</dt>");
    expect(html).toContain(`<dd>${keyword.hotness}</dd>`);
    expect(html).toContain(keyword.audienceSegment);
    expect(html).toContain(getTrendStateLabel(keyword.trendState));
    expect(html).toContain(keyword.summary);
    expect(html).toContain(keyword.whyHot);
    expect(html).toContain(keyword.audience);
    for (const relatedSearch of keyword.relatedSearches) {
      expect(html).toContain(relatedSearch);
    }
    expect(html).toContain("Why It Matters");
    expect(html).toContain("Best For");
    expect(html).toContain("Related Searches");
    expect(html).toContain("의료적 효과를 보장하지 않습니다");
  });

  it("rejects unsafe keyword ids before writing keyword pages", () => {
    const unsafeOutputRoot = mkdtempSync(join(tmpdir(), "hot-appearance-static-"));

    try {
      expect(() =>
        generateStaticPages({
          basePath: BASE_PATH,
          getAudienceSegmentLabel,
          getKeywordPath,
          getTrendStateLabel,
          keywords: [{ ...keywords[0], id: "../about" }],
          navLinks,
          outputRoot: unsafeOutputRoot,
          siteUrl: SITE_URL,
          validateKeywordId
        })
      ).toThrow("Invalid keyword id");
      expect(existsSync(join(unsafeOutputRoot, "about", "index.html"))).toBe(false);
    } finally {
      rmSync(unsafeOutputRoot, { recursive: true, force: true });
    }
  });
});
