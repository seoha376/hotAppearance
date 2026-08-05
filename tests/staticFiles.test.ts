import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

describe("static publishing files", () => {
  it("declares sitemap location in robots.txt", () => {
    const robots = readFileSync("public/robots.txt", "utf8");

    expect(robots).toContain("Sitemap: https://seoha376.github.io/hotAppearance/sitemap.xml");
  });

  it("lists required public pages in sitemap.xml", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");

    expect(sitemap).toContain("https://seoha376.github.io/hotAppearance/");
    expect(sitemap).toContain("https://seoha376.github.io/hotAppearance/about/");
    expect(sitemap).toContain("https://seoha376.github.io/hotAppearance/contact/");
    expect(sitemap).toContain("https://seoha376.github.io/hotAppearance/privacy/");
  });

  it("uses the GitHub Pages project path for root static asset links", () => {
    const html = readFileSync("index.html", "utf8");

    expect(html).toContain('href="/hotAppearance/site.webmanifest"');
  });

  it("does not publish ads.txt before an AdSense publisher id exists", () => {
    expect(() => readFileSync("public/ads.txt", "utf8")).toThrow();
  });
});
