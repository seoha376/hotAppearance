import { describe, expect, it } from "vitest";
import { renderKeywordDetail } from "../src/components/keywordDetail";
import type { Keyword } from "../src/types";

const keyword: Keyword = {
  id: "pdrn",
  label: "PDRN",
  category: "피부관리",
  hotness: 96,
  summary: "피부 컨디션과 탄력 관리 맥락에서 자주 언급되는 성분 키워드입니다.",
  whyHot: "스킨부스터와 크림 콘텐츠에서 함께 등장합니다.",
  audience: "성분을 보고 제품 정보를 비교하려는 사람",
  relatedSearches: ["PDRN 크림", "PDRN 앰플"],
  updatedAt: "2026-08-05",
  sourceType: "curated",
  audienceSegment: "women",
  trendState: "rising"
};

describe("keyword detail card", () => {
  it("links to the generated GitHub Pages keyword detail page", () => {
    const html = renderKeywordDetail(keyword);

    expect(html).toContain('href="/hotAppearance/keywords/pdrn/"');
    expect(html).toContain("Why It Matters");
    expect(html).toContain("Best For");
    expect(html).toContain("Related Searches");
    expect(html).toContain("View Details");
  });
});
