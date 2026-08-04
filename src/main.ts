import { renderInfoSections } from "./components/infoSections";
import { renderKeywordCloud } from "./components/keywordCloud";
import { renderKeywordDetail } from "./components/keywordDetail";
import { renderRanking } from "./components/ranking";
import { getTopKeywords, keywords } from "./data/keywords";
import "./styles.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root #app was not found.");
}

const appRoot = app;
let selectedKeywordId = getTopKeywords(1)[0]?.id ?? keywords[0].id;

function getSelectedKeyword() {
  return keywords.find((keyword) => keyword.id === selectedKeywordId) ?? keywords[0];
}

function renderApp() {
  appRoot.innerHTML = `
    <header class="site-header">
      <a href="#" class="brand">Hot Appearance</a>
      <nav aria-label="주요 메뉴">
        <a href="#ranking">랭킹</a>
        <a href="#about">소개</a>
        <a href="#privacy">개인정보</a>
      </nav>
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
        ${renderKeywordCloud(keywords, selectedKeywordId)}
        ${renderKeywordDetail(getSelectedKeyword())}
      </div>
      <div id="ranking">
        ${renderRanking(getTopKeywords(10))}
      </div>
      ${renderInfoSections()}
    </main>
    <footer class="site-footer">
      <p>© 2026 Hot Appearance. Informational trend notes for appearance-care keywords.</p>
    </footer>
  `;

  appRoot.querySelectorAll<HTMLButtonElement>("[data-keyword-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedKeywordId = button.dataset.keywordId ?? selectedKeywordId;
      renderApp();
    });
  });
}

renderApp();
