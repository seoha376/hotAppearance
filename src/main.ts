import { renderInfoSections } from "./components/infoSections";
import { type AudienceFilter, renderKeywordCloud } from "./components/keywordCloud";
import { renderKeywordDetail } from "./components/keywordDetail";
import { renderRanking } from "./components/ranking";
import { renderFooter, renderNav, renderStaticPage } from "./components/staticPage";
import { getTopKeywords, keywords } from "./data/keywords";
import "./styles.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root #app was not found.");
}

const appRoot = app;
let selectedKeywordId = getTopKeywords(1)[0]?.id ?? keywords[0].id;
let activeAudienceFilter: AudienceFilter = "all";
const staticPage = document.body.dataset.page;

function getSelectedKeyword() {
  return keywords.find((keyword) => keyword.id === selectedKeywordId) ?? keywords[0];
}

function renderApp() {
  if (staticPage === "about" || staticPage === "contact" || staticPage === "privacy") {
    appRoot.innerHTML = renderStaticPage(staticPage);
    return;
  }

  appRoot.innerHTML = `
    <header class="site-header">
      <a href="/hotAppearance/" class="brand">Hot Appearance</a>
      <nav aria-label="주요 메뉴">${renderNav()}</nav>
    </header>
    <main class="page-shell">
      <section class="hero">
        <p class="eyebrow">요즘 외모관리 지도</p>
        <h1>핫한 키워드일수록 더 크게.</h1>
        <p class="hero-copy">
          PDRN부터 남자눈썹, 두피케어까지. 요새 자주 보이는 외모관리 키워드를
          핫함 정도에 따라 한눈에 보여줍니다.
        </p>
      </section>
      <div class="main-layout">
        ${renderKeywordCloud(keywords, selectedKeywordId, activeAudienceFilter)}
        ${renderKeywordDetail(getSelectedKeyword())}
      </div>
      <div id="ranking">
        ${renderRanking(getTopKeywords(10))}
      </div>
      ${renderInfoSections()}
    </main>
    ${renderFooter()}
  `;

  appRoot.querySelectorAll<HTMLButtonElement>("[data-keyword-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedKeywordId = button.dataset.keywordId ?? selectedKeywordId;
      renderApp();
    });
  });

  appRoot.querySelectorAll<HTMLButtonElement>("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeAudienceFilter = (button.dataset.filter as AudienceFilter | undefined) ?? "all";
      const selectedKeyword = getSelectedKeyword();

      if (
        activeAudienceFilter !== "all" &&
        selectedKeyword.audienceSegment !== activeAudienceFilter
      ) {
        selectedKeywordId =
          keywords.find((keyword) => keyword.audienceSegment === activeAudienceFilter)?.id ??
          selectedKeywordId;
      }

      renderApp();
    });
  });
}

renderApp();
