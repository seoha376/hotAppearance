import { articleGuides, navLinks, privacyParagraphs, SITE_URL } from "../content/siteContent";

type StaticPageName = "about" | "contact" | "privacy";

const pageCopy: Record<StaticPageName, { eyebrow: string; title: string; body: string[] }> = {
  about: {
    eyebrow: "About",
    title: "About Hot Appearance",
    body: [
      "Hot Appearance는 요즘 많이 언급되는 외모관리 키워드를 한눈에 볼 수 있게 정리하는 트렌드 맵입니다.",
      "첫 버전은 큐레이션 기반이지만, 데이터 구조는 향후 검색·커뮤니티·소셜 신호를 안전하게 요약해 반영할 수 있도록 설계했습니다.",
      "커뮤니티 트렌드를 다룰 때도 원문을 그대로 복사하지 않고, 정보글로 맥락을 정리한 뒤 원문으로 이동할 수 있는 링크 방식을 우선합니다."
    ]
  },
  contact: {
    eyebrow: "Contact",
    title: "Contact",
    body: [
      "사이트 오류, 키워드 제안, 광고 및 제휴 문의는 이메일로 보낼 수 있습니다.",
      "문의 이메일: seoha376@gmail.com"
    ]
  },
  privacy: {
    eyebrow: "Privacy",
    title: "Privacy Policy",
    body: privacyParagraphs
  }
};

export function renderNav(): string {
  return navLinks.map((link) => `<a href="${link.href}">${link.label}</a>`).join("");
}

export function renderFooter(): string {
  return `
    <footer class="site-footer">
      <nav aria-label="Footer navigation">${renderNav()}</nav>
      <p>© 2026 Hot Appearance. Informational trend notes for appearance-care keywords.</p>
    </footer>
  `;
}

export function renderStaticPage(page: StaticPageName): string {
  const copy = pageCopy[page];
  const homeHref = navLinks.find((link) => link.label === "Home")?.href ?? "/";

  return `
    <header class="site-header">
      <a href="${homeHref}" class="brand">Hot Appearance</a>
      <nav aria-label="Main navigation">${renderNav()}</nav>
    </header>
    <main class="page-shell">
      <section class="hero compact-hero">
        <p class="eyebrow">${copy.eyebrow}</p>
        <h1>${copy.title}</h1>
      </section>
      <section class="content-card page-content">
        ${copy.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      </section>
      <section class="article-grid" aria-label="Recommended guides">
        ${articleGuides.slice(0, 3).map((article) => `
          <article class="content-card">
            <p class="eyebrow">${article.eyebrow}</p>
            <h2>${article.title}</h2>
            <p>${article.body}</p>
          </article>
        `).join("")}
      </section>
    </main>
    ${renderFooter()}
  `;
}

export function canonicalLink(path = ""): string {
  const normalizedPath = path.replace(/^\/+/, "").replace(/\/+$/, "");
  return normalizedPath ? `${SITE_URL}/${normalizedPath}/` : `${SITE_URL}/`;
}
