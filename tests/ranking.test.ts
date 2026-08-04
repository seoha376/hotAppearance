import { describe, expect, it } from "vitest";
import { renderRanking } from "../src/components/ranking";
import type { Keyword } from "../src/types";

const keywords: Keyword[] = [
  {
    id: "pdrn",
    label: "PDRN",
    category: "피부관리",
    hotness: 96,
    summary: "피부 컨디션과 탄력 관리 맥락에서 자주 언급되는 성분 키워드입니다.",
    whyHot: "성분 중심 검색 수요가 커지고 있습니다.",
    audience: "성분을 보고 제품 정보를 비교하려는 사람",
    relatedSearches: ["PDRN 크림", "PDRN 앰플"],
    updatedAt: "2026-08-05",
    sourceType: "curated",
    audienceSegment: "women",
    trendState: "rising"
  }
];

describe("ranking", () => {
  it("renders rank and hotness as compact data labels", () => {
    const html = renderRanking(keywords);

    expect(html).toContain('class="rank-index"');
    expect(html).toContain("01");
    expect(html).toContain('class="rank-score"');
    expect(html).toContain("96");
  });
});
