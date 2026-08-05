import { renderInfoSections } from "./components/infoSections";
import { type AudienceFilter, renderKeywordCloud } from "./components/keywordCloud";
import { renderKeywordDetail } from "./components/keywordDetail";
import { renderRanking } from "./components/ranking";
import { renderFooter, renderNav, renderStaticPage } from "./components/staticPage";
import { navLinks } from "./content/siteContent";
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
  const homeHref = navLinks.find((link) => link.label === "Home")?.href ?? "/";

  if (staticPage === "about" || staticPage === "contact" || staticPage === "privacy") {
    appRoot.innerHTML = renderStaticPage(staticPage);
    return;
  }

  appRoot.innerHTML = `
    <header class="site-header">
      <a href="${homeHref}" class="brand">Hot Appearance</a>
      <nav aria-label="Main navigation">${renderNav()}</nav>
    </header>
    <main class="page-shell">
      <section class="hero">
        <p class="eyebrow">Appearance Trend Map</p>
        <h1>Hotter Keywords. Bigger Signals.</h1>
        <p class="hero-copy">
          Track the appearance-care keywords people are paying attention to,
          from PDRN to scalp care and men's grooming.
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
