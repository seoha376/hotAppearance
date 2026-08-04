import { articleGuides, privacyParagraphs } from "../content/siteContent";

export function renderInfoSections(): string {
  return `
    <section class="article-grid" aria-label="외모관리 정보 글">
      ${articleGuides
        .map(
          (article) => `
            <article class="content-card" id="${article.slug}">
              <p class="eyebrow">${article.eyebrow}</p>
              <h2>${article.title}</h2>
              <p>${article.body}</p>
            </article>
          `
        )
        .join("")}
    </section>
    <section class="legal-grid" aria-label="사이트 정보">
      <article id="about" class="content-card">
        <h2>About</h2>
        <p>
          Hot Appearance는 요즘 많이 언급되는 외모관리 키워드를 한눈에 볼 수 있게 정리하는 작은 트렌드 맵입니다.
          첫 버전은 큐레이션 기반이며, 이후 실제 검색/소셜 신호를 반영하는 서비스로 확장할 수 있습니다.
        </p>
      </article>
      <article id="contact" class="content-card">
        <h2>Contact</h2>
        <p>
          문의 이메일: seoha376@gmail.com
        </p>
      </article>
      <article id="privacy" class="content-card">
        <h2>Privacy Policy</h2>
        ${privacyParagraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      </article>
    </section>
  `;
}
