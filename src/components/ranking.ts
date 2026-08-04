import type { Keyword } from "../types";

export function renderRanking(keywords: Keyword[]): string {
  return `
    <section class="content-card" aria-labelledby="ranking-title">
      <p class="eyebrow">Weekly Ranking</p>
      <h2 id="ranking-title">Top ${keywords.length} Appearance Keywords</h2>
      <ol class="ranking-list">
        ${keywords
          .map(
            (keyword) => `
              <li>
                <div>
                  <strong>${keyword.label}</strong>
                  <p>${keyword.summary} ${keyword.whyHot}</p>
                </div>
                <span>${keyword.hotness}</span>
              </li>
            `
          )
          .join("")}
      </ol>
    </section>
  `;
}
