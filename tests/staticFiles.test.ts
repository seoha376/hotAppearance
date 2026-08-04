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
});
