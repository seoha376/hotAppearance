import type { Keyword } from "../types";
import { getHotnessLabel, getTrendStateLabel } from "../utils/hotness";
import { getAudienceSegmentLabel } from "../utils/labels";
import { getKeywordHref } from "../utils/routes";

export function renderKeywordDetail(keyword: Keyword): string {
  return `
    <aside class="keyword-detail" aria-live="polite">
      <div>
        <p class="eyebrow">${keyword.category}</p>
        <h2>${keyword.label}</h2>
      </div>
      <p class="score">
        핫함 ${keyword.hotness}점 · ${getHotnessLabel(keyword.hotness)} ·
        ${getAudienceSegmentLabel(keyword.audienceSegment)} · ${getTrendStateLabel(keyword.trendState)}
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
      <a class="detail-link" href="${getKeywordHref(keyword.id)}">상세 보기</a>
    </aside>
  `;
}
