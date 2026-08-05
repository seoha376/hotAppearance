import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const ADSENSE_CLIENT_ID = "ca-pub-6882848839362046";

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

  it("includes the AdSense review script on every top-level HTML entry", () => {
    for (const filePath of ["index.html", "about/index.html", "contact/index.html", "privacy/index.html"]) {
      const html = readFileSync(filePath, "utf8");

      expect(html).toContain("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");
      expect(html).toContain(`client=${ADSENSE_CLIENT_ID}`);
      expect(html).toContain('crossorigin="anonymous"');
    }
  });
});
