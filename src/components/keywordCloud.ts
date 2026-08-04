import type { Keyword } from "../types";
import { getFontSizeRem, getHotnessLabel, getTrendStateLabel } from "../utils/hotness";

export type AudienceFilter = "all" | "men" | "women" | "common";

const filterLabels: Record<AudienceFilter, string> = {
  all: "전체",
  men: "남자 관심",
  women: "여자 관심",
  common: "공통 관심"
};

export function renderKeywordCloud(
  keywords: Keyword[],
  selectedId: string,
  activeFilter: AudienceFilter = "all"
): string {
  const visibleKeywords =
    activeFilter === "all"
      ? keywords
      : keywords.filter((keyword) => keyword.audienceSegment === activeFilter);

  return `
    <section class="keyword-cloud-section" aria-labelledby="keyword-cloud-title">
      <div class="section-heading">
        <p class="eyebrow">Live-ish Trend Map</p>
        <h2 id="keyword-cloud-title">핫할수록 크게 보이는 키워드</h2>
        <p>지금은 큐레이션 데이터지만, 나중에는 수집 데이터로 바꿀 수 있게 같은 구조로 보여줍니다.</p>
      </div>
      <div class="segment-filters" aria-label="관심 그룹 필터">
        ${(Object.keys(filterLabels) as AudienceFilter[])
          .map((filter) => {
            const activeClass = filter === activeFilter ? " is-active" : "";
            return `
              <button class="segment-filter${activeClass}" type="button" data-filter="${filter}">
                ${filterLabels[filter]}
              </button>
            `;
          })
          .join("")}
      </div>
      <div class="keyword-cloud" role="list">
        ${visibleKeywords
          .map((keyword) => {
            const activeClass = keyword.id === selectedId ? " is-active" : "";
            const trendStateLabel = getTrendStateLabel(keyword.trendState);
            return `
              <button
                class="keyword-pill${activeClass}"
                type="button"
                data-keyword-id="${keyword.id}"
                style="font-size: ${getFontSizeRem(keyword.hotness)}rem"
                aria-label="${keyword.label}, 핫함 ${keyword.hotness}점, ${getHotnessLabel(keyword.hotness)}, ${trendStateLabel}"
              >
                ${keyword.label}
                <span class="trend-badge trend-${keyword.trendState}">${trendStateLabel}</span>
              </button>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}
