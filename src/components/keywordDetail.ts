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
      <dl class="metric-grid" aria-label="Keyword signals">
        <div>
          <dt>Hotness</dt>
          <dd>${keyword.hotness}</dd>
        </div>
        <div>
          <dt>Audience</dt>
          <dd>${getAudienceSegmentLabel(keyword.audienceSegment)}</dd>
        </div>
        <div>
          <dt>Trend</dt>
          <dd>${getTrendStateLabel(keyword.trendState)}</dd>
        </div>
      </dl>
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
      <p class="safety-note">
        This is an informational trend note. It does not guarantee beauty, medical, or treatment results.
      </p>
      <a class="detail-link" href="${getKeywordHref(keyword.id)}">View Details</a>
    </aside>
  `;
}
