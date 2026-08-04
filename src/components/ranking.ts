import type { Keyword } from "../types";

export function renderRanking(keywords: Keyword[]): string {
  return `
    <section class="content-card" aria-labelledby="ranking-title">
      <p class="eyebrow">Weekly Ranking</p>
      <h2 id="ranking-title">Top ${keywords.length} Appearance Keywords</h2>
      <ol class="ranking-list">
        ${keywords
          .map(
            (keyword, index) => `
              <li>
                <span class="rank-index">${String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong>${keyword.label}</strong>
                  <p>${keyword.summary} ${keyword.whyHot}</p>
                </div>
                <span class="rank-score">${keyword.hotness}</span>
              </li>
            `
          )
          .join("")}
      </ol>
    </section>
  `;
}
