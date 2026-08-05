import { describe, expect, it } from "vitest";
import { articleGuides, navLinks, SITE_URL } from "../src/content/siteContent";

describe("site content", () => {
  it("has eight original guide articles for ad review readiness", () => {
    expect(articleGuides).toHaveLength(8);

    for (const article of articleGuides) {
      expect(article.title.length).toBeGreaterThan(8);
      expect(article.body.length).toBeGreaterThan(120);
      expect(article.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("keeps beauty trend copy informational and policy-safe", () => {
    const siteCopy = articleGuides
      .flatMap((article) => [article.title, article.body])
      .join(" ");

    expect(siteCopy).toContain("정보성");
    expect(siteCopy).not.toMatch(/완치|치료 보장|효과 보장|무조건 개선|원문 복붙/);
  });

  it("exposes clear navigation to required trust pages", () => {
    expect(navLinks).toEqual(
        expect.arrayContaining([
        expect.objectContaining({ href: "/about/", label: "About" }),
        expect.objectContaining({ href: "/contact/", label: "Contact" }),
        expect.objectContaining({ href: "/privacy/", label: "Privacy" })
      ])
    );
  });

  it("uses the Vercel production URL as canonical site URL", () => {
    expect(SITE_URL).toBe("https://hot-appearance.vercel.app");
  });
});
