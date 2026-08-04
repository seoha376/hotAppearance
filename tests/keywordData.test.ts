import { describe, expect, it } from "vitest";
import { getTopKeywords, keywords } from "../src/data/keywords";

describe("keyword data", () => {
  it("contains enough initial keywords for a useful cloud", () => {
    expect(keywords.length).toBeGreaterThanOrEqual(14);
  });

  it("has required content fields for every keyword", () => {
    for (const keyword of keywords) {
      expect(keyword.id).toMatch(/^[a-z0-9-]+$/);
      expect(keyword.label.length).toBeGreaterThan(0);
      expect(keyword.category.length).toBeGreaterThan(0);
      expect(keyword.hotness).toBeGreaterThanOrEqual(0);
      expect(keyword.hotness).toBeLessThanOrEqual(100);
      expect(keyword.summary.length).toBeGreaterThan(20);
      expect(keyword.whyHot.length).toBeGreaterThan(20);
      expect(keyword.audience.length).toBeGreaterThan(5);
      expect(keyword.relatedSearches.length).toBeGreaterThanOrEqual(2);
      expect(keyword.updatedAt).toMatch(/^2026-08-05$/);
      expect(keyword.sourceType).toBe("curated");
    }
  });

  it("sorts top keywords by hotness descending", () => {
    const top = getTopKeywords(5);
    expect(top).toHaveLength(5);
    for (let index = 1; index < top.length; index += 1) {
      expect(top[index - 1].hotness).toBeGreaterThanOrEqual(top[index].hotness);
    }
  });
});
