import type { Keyword } from "../types";

export function renderRanking(keywords: Keyword[]): string {
  return `
    <section class="content-card" aria-labelledby="ranking-title">
      <p class="eyebrow">Ranking</p>
      <h2 id="ranking-title">이번 주 핫 키워드 TOP ${keywords.length}</h2>
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
