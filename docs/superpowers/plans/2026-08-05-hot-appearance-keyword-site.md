# Hot Appearance Keyword Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a simple Korean SEO-oriented static website where hotter appearance-care keywords appear in larger text, with enough content and structure to support free deployment and future ad application.

**Architecture:** Use a static Vite app with focused modules: keyword data, keyword cloud rendering, detail card rendering, informational page content, and shared styling. Keyword data is normalized from day one so a future collector can replace the curated local data without rewriting the UI.

**Tech Stack:** Vite, TypeScript, plain DOM rendering, CSS, static HTML routes/files, npm scripts.

## Global Constraints

- First version is a static website with curated keyword data.
- Hotness score determines keyword text size and ranking order.
- The site must include homepage, About, Contact, and Privacy Policy content.
- The site must include enough original informational text to avoid feeling like a thin single-page gimmick.
- No login, database storage, server-side scraping, user accounts, comments, payments, or complex analytics in the first version.
- Avoid misleading medical claims and do not promise beauty or procedure results.
- Keep the UI mobile-friendly and lightweight.
- Preserve a future path where automated collection can provide the same normalized keyword data shape.

---

## File Structure

- `package.json`: npm scripts and dependencies for Vite/TypeScript.
- `index.html`: app shell and SEO metadata for the homepage.
- `src/main.ts`: bootstraps the static app and wires interactions.
- `src/data/keywords.ts`: normalized curated keyword dataset and exported helpers.
- `src/components/keywordCloud.ts`: renders clickable hotness-scaled keyword cloud.
- `src/components/keywordDetail.ts`: renders selected keyword detail card.
- `src/components/ranking.ts`: renders top keyword ranking and SEO-friendly summaries.
- `src/components/infoSections.ts`: renders article-style sections, About, Contact, and Privacy copy blocks used on the homepage.
- `src/styles.css`: responsive visual design and typography.
- `src/types.ts`: shared `Keyword` type.
- `src/utils/hotness.ts`: maps hotness score to font size and display labels.
- `public/robots.txt`: allows crawling.
- `public/site.webmanifest`: simple install/browser metadata.
- `tests/hotness.test.ts`: unit tests for hotness mapping and sorting helpers.
- `tests/keywordData.test.ts`: unit tests validating keyword data completeness and ad-safety structure.
- `vitest.config.ts`: Vitest configuration.
- `tsconfig.json`: TypeScript configuration.

## Task 1: Project Scaffold and Tooling

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `index.html`
- Create: `src/main.ts`
- Create: `src/styles.css`

**Interfaces:**
- Produces: `npm run dev`, `npm run build`, and `npm test` scripts.
- Produces: an app root element with id `app`.

- [ ] **Step 1: Create npm project config**

Create `package.json`:

```json
{
  "name": "hot-appearance",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "@vitejs/plugin-basic-ssl": "^1.2.0",
    "vite": "^5.4.0",
    "typescript": "^5.5.0"
  },
  "devDependencies": {
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: Create TypeScript config**

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src", "tests", "vitest.config.ts"]
}
```

- [ ] **Step 3: Create Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"]
  }
});
```

- [ ] **Step 4: Create HTML shell**

Create `index.html`:

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="요즘 뜨는 외모관리 키워드를 핫함 정도에 따라 큰 글자로 보여주는 트렌드 맵입니다."
    />
    <meta name="theme-color" content="#ff4d6d" />
    <title>Hot Appearance | 요즘 외모관리 키워드</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 5: Create temporary app bootstrap**

Create `src/main.ts`:

```ts
import "./styles.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root #app was not found.");
}

app.innerHTML = `
  <main class="page-shell">
    <section class="hero">
      <p class="eyebrow">Hot Appearance</p>
      <h1>요즘 외모관리 키워드를 한눈에</h1>
      <p class="hero-copy">핫할수록 글자가 커지는 키워드 맵을 준비 중입니다.</p>
    </section>
  </main>
`;
```

- [ ] **Step 6: Create base styles**

Create `src/styles.css`:

```css
:root {
  color: #25151c;
  background: #fff8fb;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background:
    radial-gradient(circle at 20% 20%, rgba(255, 77, 109, 0.16), transparent 28rem),
    linear-gradient(135deg, #fff8fb 0%, #fff 48%, #fff0f4 100%);
}

.page-shell {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 48px 0;
}

.hero {
  padding: 48px 0 32px;
}

.eyebrow {
  margin: 0 0 12px;
  color: #ff4d6d;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  max-width: 760px;
  font-size: clamp(2.4rem, 8vw, 5.6rem);
  line-height: 0.95;
}

.hero-copy {
  max-width: 640px;
  color: #6d5962;
  font-size: 1.1rem;
  line-height: 1.7;
}
```

- [ ] **Step 7: Install dependencies**

Run:

```bash
npm install
```

Expected: dependencies install successfully and `package-lock.json` is created.

- [ ] **Step 8: Run build**

Run:

```bash
npm run build
```

Expected: TypeScript and Vite build pass.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json tsconfig.json vitest.config.ts index.html src/main.ts src/styles.css
git commit -m "chore: scaffold static keyword site"
```

## Task 2: Keyword Data Model and Hotness Utilities

**Files:**
- Create: `src/types.ts`
- Create: `src/utils/hotness.ts`
- Create: `src/data/keywords.ts`
- Create: `tests/hotness.test.ts`
- Create: `tests/keywordData.test.ts`

**Interfaces:**
- Produces: `Keyword` type.
- Produces: `keywords: Keyword[]`.
- Produces: `getTopKeywords(limit: number): Keyword[]`.
- Produces: `getFontSizeRem(hotness: number): number`.
- Produces: `getHotnessLabel(hotness: number): string`.

- [ ] **Step 1: Write hotness tests**

Create `tests/hotness.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { getFontSizeRem, getHotnessLabel } from "../src/utils/hotness";

describe("hotness utilities", () => {
  it("maps low and high hotness to visibly different font sizes", () => {
    expect(getFontSizeRem(35)).toBeLessThan(getFontSizeRem(95));
    expect(getFontSizeRem(95)).toBeGreaterThanOrEqual(3.4);
  });

  it("clamps font sizes for out-of-range hotness values", () => {
    expect(getFontSizeRem(-10)).toBe(getFontSizeRem(0));
    expect(getFontSizeRem(130)).toBe(getFontSizeRem(100));
  });

  it("returns Korean display labels", () => {
    expect(getHotnessLabel(95)).toBe("폭발적");
    expect(getHotnessLabel(72)).toBe("상승중");
    expect(getHotnessLabel(45)).toBe("관심");
  });
});
```

- [ ] **Step 2: Write keyword data tests**

Create `tests/keywordData.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { getTopKeywords, keywords } from "../src/data/keywords";

describe("keyword data", () => {
  it("contains enough initial keywords for a useful cloud", () => {
    expect(keywords.length).toBeGreaterThanOrEqual(14);
  });

  it("has required content fields for every keyword", () => {
    for (const keyword of keywords) {
      expect(keyword.id).toMatch(/^[a-z0-9-]+$/);
      expect(keyword.label.length).toBeGreaterThan(0);
      expect(keyword.category.length).toBeGreaterThan(0);
      expect(keyword.hotness).toBeGreaterThanOrEqual(0);
      expect(keyword.hotness).toBeLessThanOrEqual(100);
      expect(keyword.summary.length).toBeGreaterThan(20);
      expect(keyword.whyHot.length).toBeGreaterThan(20);
      expect(keyword.audience.length).toBeGreaterThan(5);
      expect(keyword.relatedSearches.length).toBeGreaterThanOrEqual(2);
      expect(keyword.updatedAt).toMatch(/^2026-08-05$/);
      expect(keyword.sourceType).toBe("curated");
    }
  });

  it("sorts top keywords by hotness descending", () => {
    const top = getTopKeywords(5);
    expect(top).toHaveLength(5);
    for (let index = 1; index < top.length; index += 1) {
      expect(top[index - 1].hotness).toBeGreaterThanOrEqual(top[index].hotness);
    }
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run:

```bash
npm test
```

Expected: FAIL because the data and utility modules do not exist yet.

- [ ] **Step 4: Create shared type**

Create `src/types.ts`:

```ts
export type Keyword = {
  id: string;
  label: string;
  category: string;
  hotness: number;
  summary: string;
  whyHot: string;
  audience: string;
  relatedSearches: string[];
  updatedAt: string;
  sourceType: "curated" | "collected";
};
```

- [ ] **Step 5: Implement hotness utilities**

Create `src/utils/hotness.ts`:

```ts
const MIN_FONT_REM = 1.05;
const MAX_FONT_REM = 3.8;

function clampHotness(hotness: number): number {
  return Math.min(100, Math.max(0, hotness));
}

export function getFontSizeRem(hotness: number): number {
  const normalized = clampHotness(hotness) / 100;
  return Number((MIN_FONT_REM + normalized * (MAX_FONT_REM - MIN_FONT_REM)).toFixed(2));
}

export function getHotnessLabel(hotness: number): string {
  const value = clampHotness(hotness);

  if (value >= 88) {
    return "폭발적";
  }

  if (value >= 65) {
    return "상승중";
  }

  return "관심";
}
```

- [ ] **Step 6: Implement curated keyword dataset**

Create `src/data/keywords.ts` with at least these 14 entries:

```ts
import type { Keyword } from "../types";

export const keywords: Keyword[] = [
  {
    id: "pdrn",
    label: "PDRN",
    category: "피부관리",
    hotness: 96,
    summary: "피부 컨디션과 탄력 관리 맥락에서 자주 언급되는 성분 키워드입니다.",
    whyHot: "스킨부스터, 크림, 앰플 콘텐츠에서 함께 등장하며 성분 중심 검색 수요가 커지고 있습니다.",
    audience: "성분을 보고 제품이나 시술 정보를 비교하려는 사람",
    relatedSearches: ["PDRN 크림", "PDRN 앰플", "PDRN 뜻"],
    updatedAt: "2026-08-05",
    sourceType: "curated"
  },
  {
    id: "slow-aging",
    label: "슬로우에이징",
    category: "피부관리",
    hotness: 94,
    summary: "노화를 급하게 되돌리기보다 매일의 루틴으로 천천히 관리하자는 흐름입니다.",
    whyHot: "자극적인 안티에이징보다 장벽, 수분, 자외선 차단을 강조하는 콘텐츠가 늘고 있습니다.",
    audience: "20대 후반부터 피부 루틴을 정리하려는 사람",
    relatedSearches: ["슬로우에이징 루틴", "슬로우에이징 뜻", "노화관리 기초"],
    updatedAt: "2026-08-05",
    sourceType: "curated"
  },
  {
    id: "exosome",
    label: "엑소좀",
    category: "피부관리",
    hotness: 91,
    summary: "피부관리와 클리닉 콘텐츠에서 회복, 컨디션 관리 맥락으로 자주 보이는 키워드입니다.",
    whyHot: "시술 후기와 홈케어 제품 설명에서 함께 언급되며 관심도가 올라가고 있습니다.",
    audience: "클리닉 트렌드를 가볍게 파악하려는 사람",
    relatedSearches: ["엑소좀 뜻", "엑소좀 관리", "엑소좀 화장품"],
    updatedAt: "2026-08-05",
    sourceType: "curated"
  },
  {
    id: "skin-barrier",
    label: "피부장벽",
    category: "피부관리",
    hotness: 89,
    summary: "예민함, 건조함, 트러블을 이야기할 때 가장 먼저 나오는 기초관리 키워드입니다.",
    whyHot: "고기능 제품보다 장벽 회복과 저자극 루틴을 찾는 사람이 꾸준히 많습니다.",
    audience: "피부가 쉽게 뒤집어져 루틴을 단순화하려는 사람",
    relatedSearches: ["피부장벽 회복", "장벽크림", "저자극 스킨케어"],
    updatedAt: "2026-08-05",
    sourceType: "curated"
  },
  {
    id: "water-glow-skin",
    label: "물광피부",
    category: "메이크업",
    hotness: 86,
    summary: "촉촉하고 윤기 있어 보이는 피부 표현을 뜻하는 대중적인 외모관리 키워드입니다.",
    whyHot: "쿠션, 선크림, 앰플, 클리닉 콘텐츠까지 넓게 연결되어 검색하기 쉽습니다.",
    audience: "칙칙함보다 맑고 촉촉한 인상을 원하는 사람",
    relatedSearches: ["물광피부 만드는법", "광채쿠션", "촉촉한 베이스"],
    updatedAt: "2026-08-05",
    sourceType: "curated"
  },
  {
    id: "scalp-care",
    label: "두피케어",
    category: "헤어/두피",
    hotness: 85,
    summary: "머릿결뿐 아니라 냄새, 유분, 각질, 탈모 걱정까지 포함하는 관리 키워드입니다.",
    whyHot: "헤어스타일 완성도와 청결한 인상을 함께 챙기려는 관심이 커지고 있습니다.",
    audience: "머리 냄새, 유분, 볼륨 고민이 있는 사람",
    relatedSearches: ["두피 냄새", "두피 스케일링", "지성두피 샴푸"],
    updatedAt: "2026-08-05",
    sourceType: "curated"
  },
  {
    id: "mens-eyebrows",
    label: "남자눈썹",
    category: "남성 그루밍",
    hotness: 83,
    summary: "인상을 빠르게 바꾸는 남성 외모관리 입문 키워드입니다.",
    whyHot: "시술 없이도 정리만으로 변화가 커서 입문자용 콘텐츠로 강합니다.",
    audience: "깔끔한 첫인상을 만들고 싶은 남성 입문자",
    relatedSearches: ["남자 눈썹 정리", "눈썹 문신", "남자 그루밍"],
    updatedAt: "2026-08-05",
    sourceType: "curated"
  },
  {
    id: "pore-care",
    label: "모공관리",
    category: "피부관리",
    hotness: 80,
    summary: "피지, 블랙헤드, 피부결 고민과 함께 꾸준히 검색되는 관리 키워드입니다.",
    whyHot: "짧은 영상과 전후 비교 콘텐츠에서 이해하기 쉬워 관심이 유지됩니다.",
    audience: "피부결과 코 주변 피지가 신경 쓰이는 사람",
    relatedSearches: ["모공 줄이는법", "블랙헤드 관리", "피지관리"],
    updatedAt: "2026-08-05",
    sourceType: "curated"
  },
  {
    id: "tone-up-sunscreen",
    label: "톤업선크림",
    category: "메이크업",
    hotness: 78,
    summary: "자외선 차단과 자연스러운 피부 보정을 동시에 원하는 사람이 찾는 키워드입니다.",
    whyHot: "남녀 모두 부담 없이 쓸 수 있는 데일리 외모관리 제품군으로 자리잡고 있습니다.",
    audience: "화장한 티는 줄이고 안색은 정리하고 싶은 사람",
    relatedSearches: ["톤업 선크림 추천", "남자 톤업", "자연스러운 피부보정"],
    updatedAt: "2026-08-05",
    sourceType: "curated"
  },
  {
    id: "home-derma",
    label: "홈더마",
    category: "홈케어",
    hotness: 76,
    summary: "집에서 기기나 고기능 제품으로 피부관리를 시도하는 흐름을 말합니다.",
    whyHot: "클리닉 방문 전후 관리와 비용 절약 니즈가 겹치며 꾸준히 관심을 받고 있습니다.",
    audience: "집에서 루틴을 업그레이드하고 싶은 사람",
    relatedSearches: ["홈더마 기기", "LED 마스크", "홈케어 피부관리"],
    updatedAt: "2026-08-05",
    sourceType: "curated"
  },
  {
    id: "fragrance-layering",
    label: "향수레이어링",
    category: "향",
    hotness: 73,
    summary: "향수, 바디워시, 바디로션 향을 겹쳐 자기만의 인상을 만드는 키워드입니다.",
    whyHot: "외모관리 범위가 피부와 옷을 넘어 분위기와 기억까지 확장되고 있습니다.",
    audience: "은은하지만 기억나는 이미지를 만들고 싶은 사람",
    relatedSearches: ["향수 레이어링 조합", "살냄새 향수", "바디미스트"],
    updatedAt: "2026-08-05",
    sourceType: "curated"
  },
  {
    id: "lip-care",
    label: "입술관리",
    category: "기초관리",
    hotness: 70,
    summary: "각질, 생기, 건조함을 관리해 전체 인상을 깔끔하게 만드는 기본 키워드입니다.",
    whyHot: "작은 변화로 얼굴 컨디션이 좋아 보이는 실용적인 입문 관리입니다.",
    audience: "기초 외모관리를 빠르게 시작하려는 사람",
    relatedSearches: ["입술 각질", "립밤 추천", "입술색 관리"],
    updatedAt: "2026-08-05",
    sourceType: "curated"
  },
  {
    id: "jawline-care",
    label: "턱선관리",
    category: "페이스라인",
    hotness: 68,
    summary: "붓기, 자세, 마사지, 헤어스타일과 함께 언급되는 인상 관리 키워드입니다.",
    whyHot: "사진과 영상에서 얼굴형이 중요해지며 간단한 관리법 검색이 늘고 있습니다.",
    audience: "사진에서 얼굴 라인이 신경 쓰이는 사람",
    relatedSearches: ["턱선 만드는법", "얼굴 붓기", "페이스라인 관리"],
    updatedAt: "2026-08-05",
    sourceType: "curated"
  },
  {
    id: "personal-color",
    label: "퍼스널컬러",
    category: "스타일",
    hotness: 66,
    summary: "피부톤에 어울리는 색을 찾아 화장, 옷, 머리색 선택에 참고하는 키워드입니다.",
    whyHot: "실패 확률을 줄이는 스타일 입문 도구로 꾸준히 검색되고 공유됩니다.",
    audience: "옷과 메이크업 색 선택이 어려운 사람",
    relatedSearches: ["퍼스널컬러 자가진단", "웜톤 쿨톤", "나에게 어울리는 색"],
    updatedAt: "2026-08-05",
    sourceType: "curated"
  }
];

export function getTopKeywords(limit: number): Keyword[] {
  return [...keywords].sort((a, b) => b.hotness - a.hotness).slice(0, limit);
}
```

- [ ] **Step 7: Run tests**

Run:

```bash
npm test
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/types.ts src/utils/hotness.ts src/data/keywords.ts tests/hotness.test.ts tests/keywordData.test.ts
git commit -m "feat: add curated keyword data model"
```

## Task 3: Homepage Rendering and Keyword Interactions

**Files:**
- Modify: `src/main.ts`
- Create: `src/components/keywordCloud.ts`
- Create: `src/components/keywordDetail.ts`
- Create: `src/components/ranking.ts`
- Create: `src/components/infoSections.ts`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `keywords`, `getTopKeywords`, `getFontSizeRem`, `getHotnessLabel`.
- Produces: interactive homepage rendering inside `#app`.

- [ ] **Step 1: Implement keyword cloud component**

Create `src/components/keywordCloud.ts`:

```ts
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
```

- [ ] **Step 2: Implement detail component**

Create `src/components/keywordDetail.ts`:

```ts
import type { Keyword } from "../types";
import { getHotnessLabel } from "../utils/hotness";

export function renderKeywordDetail(keyword: Keyword): string {
  return `
    <aside class="keyword-detail" aria-live="polite">
      <div>
        <p class="eyebrow">${keyword.category}</p>
        <h2>${keyword.label}</h2>
      </div>
      <p class="score">핫함 ${keyword.hotness}점 · ${getHotnessLabel(keyword.hotness)}</p>
      <p>${keyword.summary}</p>
      <div class="detail-block">
        <h3>왜 핫함?</h3>
        <p>${keyword.whyHot}</p>
      </div>
      <div class="detail-block">
        <h3>누가 보면 좋음?</h3>
        <p>${keyword.audience}</p>
      </div>
      <div class="chips" aria-label="관련 검색어">
        ${keyword.relatedSearches.map((search) => `<span>${search}</span>`).join("")}
      </div>
    </aside>
  `;
}
```

- [ ] **Step 3: Implement ranking component**

Create `src/components/ranking.ts`:

```ts
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
```

- [ ] **Step 4: Implement informational sections**

Create `src/components/infoSections.ts`:

```ts
export function renderInfoSections(): string {
  return `
    <section class="article-grid" aria-label="외모관리 정보 글">
      <article class="content-card">
        <p class="eyebrow">Guide</p>
        <h2>외모관리 입문자는 무엇부터 보면 좋을까?</h2>
        <p>
          처음부터 모든 제품과 시술을 비교하려고 하면 금방 지칩니다. 가장 먼저 볼 키워드는
          피부장벽, 선크림, 눈썹정리, 두피케어처럼 매일의 인상을 안정적으로 바꾸는 기본 관리입니다.
        </p>
      </article>
      <article class="content-card">
        <p class="eyebrow">Trend Note</p>
        <h2>2026 외모관리 트렌드의 큰 흐름</h2>
        <p>
          최근 흐름은 강한 변화보다 꾸준한 컨디션 관리에 가깝습니다. 슬로우에이징, 장벽 관리,
          두피 관리, 자연스러운 톤 보정처럼 매일 유지 가능한 키워드가 눈에 띕니다.
        </p>
      </article>
      <article class="content-card">
        <p class="eyebrow">Ad Ready</p>
        <h2>이 사이트의 정보 기준</h2>
        <p>
          Hot Appearance는 외모관리 키워드를 쉽게 이해하도록 정리하는 정보 사이트입니다.
          의료적 효과를 보장하지 않으며, 제품이나 시술 선택 전에는 본인 상태와 전문가 상담을 함께 고려해야 합니다.
        </p>
      </article>
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
          문의 이메일: contact@example.com
        </p>
      </article>
      <article id="privacy" class="content-card">
        <h2>Privacy Policy</h2>
        <p>
          현재 이 사이트는 회원가입을 받지 않고 개인 정보를 직접 수집하지 않습니다. 향후 광고, 분석 도구,
          문의 기능을 추가할 경우 이 정책을 업데이트합니다.
        </p>
      </article>
    </section>
  `;
}
```

- [ ] **Step 5: Wire homepage**

Replace `src/main.ts` with:

```ts
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

let selectedKeywordId = getTopKeywords(1)[0]?.id ?? keywords[0].id;

function getSelectedKeyword() {
  return keywords.find((keyword) => keyword.id === selectedKeywordId) ?? keywords[0];
}

function renderApp() {
  app.innerHTML = `
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

  app.querySelectorAll<HTMLButtonElement>("[data-keyword-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedKeywordId = button.dataset.keywordId ?? selectedKeywordId;
      renderApp();
    });
  });
}

renderApp();
```

- [ ] **Step 6: Expand styles**

Append complete responsive styles to `src/styles.css` for:

```css
.site-header
.brand
.site-header nav
.main-layout
.keyword-cloud-section
.section-heading
.keyword-cloud
.keyword-pill
.keyword-pill.is-active
.keyword-detail
.score
.detail-block
.chips
.content-card
.ranking-list
.article-grid
.legal-grid
.site-footer
@media (max-width: 760px)
```

The styling must make the keyword cloud visually dominant, keep keyword buttons accessible, and ensure the detail card stacks below the cloud on mobile.

- [ ] **Step 7: Build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/main.ts src/components src/styles.css
git commit -m "feat: render interactive keyword homepage"
```

## Task 4: Static Publishing Readiness

**Files:**
- Create: `public/robots.txt`
- Create: `public/site.webmanifest`
- Modify: `index.html`
- Create: `README.md`

**Interfaces:**
- Produces: crawlable static site assets.
- Produces: basic project and deployment instructions.

- [ ] **Step 1: Add robots file**

Create `public/robots.txt`:

```txt
User-agent: *
Allow: /
```

- [ ] **Step 2: Add manifest**

Create `public/site.webmanifest`:

```json
{
  "name": "Hot Appearance",
  "short_name": "HotAppearance",
  "description": "요즘 뜨는 외모관리 키워드를 핫함 정도에 따라 보여주는 트렌드 맵",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#fff8fb",
  "theme_color": "#ff4d6d"
}
```

- [ ] **Step 3: Improve metadata**

Modify `index.html` to include:

```html
<meta property="og:title" content="Hot Appearance | 요즘 외모관리 키워드" />
<meta property="og:description" content="핫할수록 글자가 커지는 외모관리 키워드 맵." />
<meta property="og:type" content="website" />
<link rel="manifest" href="/site.webmanifest" />
```

- [ ] **Step 4: Add README**

Create `README.md`:

```md
# Hot Appearance

요즘 뜨는 외모관리 키워드를 핫함 정도에 따라 큰 글자로 보여주는 정적 웹사이트입니다.

## Scripts

- `npm run dev`: local development server
- `npm run build`: production build
- `npm test`: unit tests

## First Release

The first release uses curated static keyword data. The keyword data shape is normalized so future versions can replace it with collected trend data.

## Ad Application Checklist

- Homepage has original informational content.
- About, Contact, and Privacy Policy sections are present.
- Medical or procedure-related copy avoids guaranteed-result claims.
- Build output can be deployed to free static hosting.
```

- [ ] **Step 5: Build**

Run:

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add public/robots.txt public/site.webmanifest index.html README.md
git commit -m "chore: add static publishing metadata"
```

## Task 5: Final Verification and Free Deployment Prep

**Files:**
- Modify only if verification finds a concrete issue.

**Interfaces:**
- Consumes: complete site from Tasks 1-4.
- Produces: verified build artifact in `dist/`.

- [ ] **Step 1: Run tests**

Run:

```bash
npm test
```

Expected: PASS.

- [ ] **Step 2: Run production build**

Run:

```bash
npm run build
```

Expected: PASS and `dist/` is created.

- [ ] **Step 3: Inspect built files**

Run:

```bash
Get-ChildItem -Recurse dist
```

Expected: includes `index.html`, JS/CSS assets, `robots.txt`, and `site.webmanifest`.

- [ ] **Step 4: Start local preview**

Run:

```bash
npm run preview
```

Expected: Vite preview server prints a local URL.

- [ ] **Step 5: Browser smoke test**

Open the preview URL and verify:

- The hero appears.
- Keyword text sizes differ.
- Clicking `PDRN`, `슬로우에이징`, and `남자눈썹` changes the detail card.
- Ranking section appears.
- About, Contact, and Privacy sections appear.
- Mobile width layout stacks cleanly.

- [ ] **Step 6: Commit fixes if needed**

If fixes were required:

```bash
git add <changed-files>
git commit -m "fix: polish keyword site verification issues"
```

If no fixes were required, do not create an empty commit.

## Self-Review

- Spec coverage: covered static website, keyword cloud, detail cards, ranking, informational content, normalized data, ad readiness, and deployment prep.
- Completeness scan: no forbidden blank-detail patterns remain. Contact email uses a clear initial value that can be replaced before ad application.
- Type consistency: `Keyword`, `keywords`, `getTopKeywords`, `getFontSizeRem`, and `getHotnessLabel` are defined before use and referenced consistently.
- Scope check: scraping, admin dashboards, accounts, payments, comments, affiliate systems, and automated collection remain non-goals for this first release.
