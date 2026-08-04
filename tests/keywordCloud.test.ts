import { describe, expect, it } from "vitest";
import { renderKeywordCloud } from "../src/components/keywordCloud";
import type { Keyword } from "../src/types";

const sampleKeywords: Keyword[] = [
  {
    id: "mens-eyebrows",
    label: "남자눈썹",
    category: "남성 그루밍",
    hotness: 83,
    summary: "인상을 빠르게 바꾸는 남성 외모관리 입문 키워드입니다.",
    whyHot: "정리만으로 변화가 커서 입문자용 콘텐츠로 강합니다.",
    audience: "깔끔한 첫인상을 만들고 싶은 남성 입문자",
    relatedSearches: ["남자 눈썹 정리", "눈썹 문신"],
    updatedAt: "2026-08-05",
    sourceType: "curated",
    audienceSegment: "men",
    trendState: "rising"
  },
  {
    id: "personal-color",
    label: "퍼스널컬러",
    category: "스타일",
    hotness: 66,
    summary: "피부톤에 어울리는 색을 찾는 키워드입니다.",
    whyHot: "스타일 입문 도구로 꾸준히 검색되고 공유됩니다.",
    audience: "색 선택이 어려운 사람",
    relatedSearches: ["웜톤 쿨톤", "자가진단"],
    updatedAt: "2026-08-05",
    sourceType: "curated",
    audienceSegment: "women",
    trendState: "steady"
  }
];

describe("keyword cloud", () => {
  it("renders audience segment filters", () => {
    const html = renderKeywordCloud(sampleKeywords, "mens-eyebrows", "all");

    expect(html).toContain("전체");
    expect(html).toContain("남자 관심");
    expect(html).toContain("여자 관심");
    expect(html).toContain("공통 관심");
  });

  it("filters keywords by audience segment and renders trend badges", () => {
    const html = renderKeywordCloud(sampleKeywords, "mens-eyebrows", "men");

    expect(html).toContain("남자눈썹");
    expect(html).not.toContain("퍼스널컬러");
    expect(html).toContain("상승");
  });
});
