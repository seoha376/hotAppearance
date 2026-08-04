import type { Keyword } from "../types";
import { getFontSizeRem, getHotnessLabel, getTrendStateLabel } from "../utils/hotness";

export type AudienceFilter = "all" | "men" | "women" | "common";

const filterLabels: Record<AudienceFilter, string> = {
  all: "All",
  men: "Men",
  women: "Women",
  common: "Shared"
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
        <p class="eyebrow">Trend Map</p>
        <h2 id="keyword-cloud-title">Hotter Keywords. Bigger Signals.</h2>
        <p>Curated now, structured for live trend data later.</p>
      </div>
      <div class="segment-filters" aria-label="Audience filters">
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
                aria-label="${keyword.label}, Hotness ${keyword.hotness}, ${getHotnessLabel(keyword.hotness)}, ${trendStateLabel}"
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
