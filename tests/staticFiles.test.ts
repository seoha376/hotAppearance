import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

describe("static publishing files", () => {
  it("declares sitemap location in robots.txt", () => {
    const robots = readFileSync("public/robots.txt", "utf8");

    expect(robots).toContain("Sitemap: https://hot-appearance.vercel.app/sitemap.xml");
  });

  it("lists required public pages in sitemap.xml", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8");

    expect(sitemap).toContain("https://hot-appearance.vercel.app/");
    expect(sitemap).toContain("https://hot-appearance.vercel.app/about/");
    expect(sitemap).toContain("https://hot-appearance.vercel.app/contact/");
    expect(sitemap).toContain("https://hot-appearance.vercel.app/privacy/");
  });

  it("uses root static asset links for Vercel deployment", () => {
    const html = readFileSync("index.html", "utf8");

    expect(html).toContain('href="/site.webmanifest"');
  });

  it("does not publish ads.txt before an AdSense publisher id exists", () => {
    expect(() => readFileSync("public/ads.txt", "utf8")).toThrow();
  });
});
