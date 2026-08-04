import type { Keyword } from "../types";
import { getHotnessLabel, getTrendStateLabel } from "../utils/hotness";

const audienceSegmentLabels: Record<Keyword["audienceSegment"], string> = {
  men: "남자 관심",
  women: "여자 관심",
  common: "공통 관심"
};

export function renderKeywordDetail(keyword: Keyword): string {
  return `
    <aside class="keyword-detail" aria-live="polite">
      <div>
        <p class="eyebrow">${keyword.category}</p>
        <h2>${keyword.label}</h2>
      </div>
      <p class="score">
        핫함 ${keyword.hotness}점 · ${getHotnessLabel(keyword.hotness)} ·
        ${audienceSegmentLabels[keyword.audienceSegment]} · ${getTrendStateLabel(keyword.trendState)}
      </p>
      <p>${keyword.summary}</p>
      <div class="detail-block">
        <h3>왜 핫함?</h3>
        <p>${keyword.whyHot}</p>
      </div>
      <div class="detail-block">
        <h3>누가 보면 좋음?</h3>
        <p>${keyword.audience}</p>
      </div>
      <div class="chips" aria-label="관련 검색어">
        ${keyword.relatedSearches.map((search) => `<span>${search}</span>`).join("")}
      </div>
    </aside>
  `;
}
