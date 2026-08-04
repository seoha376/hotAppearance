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
        Hotness ${keyword.hotness} · ${getHotnessLabel(keyword.hotness)} ·
        ${getAudienceSegmentLabel(keyword.audienceSegment)} · ${getTrendStateLabel(keyword.trendState)}
      </p>
      <p>${keyword.summary}</p>
      <div class="detail-block">
        <h3>Why It Matters</h3>
        <p>${keyword.whyHot}</p>
      </div>
      <div class="detail-block">
        <h3>Best For</h3>
        <p>${keyword.audience}</p>
      </div>
      <div class="detail-block">
        <h3>Related Searches</h3>
        <div class="chips" aria-label="Related searches">
          ${keyword.relatedSearches.map((search) => `<span>${search}</span>`).join("")}
        </div>
      </div>
      <a class="detail-link" href="${getKeywordHref(keyword.id)}">View Details</a>
    </aside>
  `;
}
