import type { Keyword } from "../types";
import { getFontSizeRem, getHotnessLabel } from "../utils/hotness";

export function renderKeywordCloud(keywords: Keyword[], selectedId: string): string {
  return `
    <section class="keyword-cloud-section" aria-labelledby="keyword-cloud-title">
      <div class="section-heading">
        <p class="eyebrow">Live-ish Trend Map</p>
        <h2 id="keyword-cloud-title">핫할수록 크게 보이는 키워드</h2>
        <p>지금은 큐레이션 데이터지만, 나중에는 수집 데이터로 바꿀 수 있게 같은 구조로 보여줍니다.</p>
      </div>
      <div class="keyword-cloud" role="list">
        ${keywords
          .map((keyword) => {
            const activeClass = keyword.id === selectedId ? " is-active" : "";
            return `
              <button
                class="keyword-pill${activeClass}"
                type="button"
                data-keyword-id="${keyword.id}"
                style="font-size: ${getFontSizeRem(keyword.hotness)}rem"
                aria-label="${keyword.label}, 핫함 ${keyword.hotness}점, ${getHotnessLabel(keyword.hotness)}"
              >
                ${keyword.label}
              </button>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}
