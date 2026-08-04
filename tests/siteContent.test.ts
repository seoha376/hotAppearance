import { describe, expect, it } from "vitest";
import { articleGuides, navLinks, SITE_URL } from "../src/content/siteContent";

describe("site content", () => {
  it("has at least five original guide articles for ad review readiness", () => {
    expect(articleGuides.length).toBeGreaterThanOrEqual(5);

    for (const article of articleGuides) {
      expect(article.title.length).toBeGreaterThan(8);
      expect(article.body.length).toBeGreaterThan(120);
      expect(article.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("exposes clear navigation to required trust pages", () => {
    expect(navLinks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ href: "/hotAppearance/about/", label: "About" }),
        expect.objectContaining({ href: "/hotAppearance/contact/", label: "Contact" }),
        expect.objectContaining({ href: "/hotAppearance/privacy/", label: "Privacy" })
      ])
    );
  });

  it("uses the deployed GitHub Pages URL as canonical site URL", () => {
    expect(SITE_URL).toBe("https://seoha376.github.io/hotAppearance");
  });
});
