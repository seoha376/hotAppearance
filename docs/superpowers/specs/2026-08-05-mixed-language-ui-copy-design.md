# Mixed-Language UI Copy Design

## Goal

Make Hot Appearance feel more polished by switching short interface labels and section headings to English while keeping Korean informational content for clarity, SEO, and AdSense review readiness.

## Direction

Use English for compact UI chrome:

- Navigation labels
- Filter labels
- Trend badges
- Hotness labels
- Card section headings
- Primary action links
- Ranking headings
- Keyword cloud heading

Keep Korean for content that benefits from local search and user trust:

- Keyword names and Korean categories
- Keyword summaries
- Why-hot explanations
- Audience explanations
- About, Contact, and Privacy body copy
- Korean SEO meta text already in static pages

## Proposed Copy

- `홈` -> `Home`
- `랭킹` -> `Ranking`
- `소개` -> `About`
- `문의` -> `Contact`
- `개인정보` -> `Privacy`
- `전체` -> `All`
- `남자 관심` -> `Men`
- `여자 관심` -> `Women`
- `공통 관심` -> `Shared`
- `폭발적` -> `Breakout`
- `상승중` -> `Trending`
- `관심` -> `Watching`
- `상승` -> `Rising`
- `유지` -> `Steady`
- `하락` -> `Cooling`
- `왜 핫함?` -> `Why It Matters`
- `누가 보면 좋음?` -> `Best For`
- `관련 검색어` -> `Related Searches`
- `상세 보기` -> `View Details`
- `Live-ish Trend Map` -> `Trend Map`
- `핫할수록 크게 보이는 키워드` -> `Hotter Keywords. Bigger Signals.`
- `이번 주 핫 키워드 TOP 10` -> `Top 10 Appearance Keywords`

## Non-Goals

- Do not translate full Korean keyword content in this pass.
- Do not rewrite legal/privacy text.
- Do not change the keyword data model.
- Do not introduce new visual layout changes beyond copy length adjustments if needed.

## Success Criteria

- UI labels read as a consistent English product interface.
- Korean informational content remains intact.
- Existing keyword cloud/card/ranking behavior remains unchanged.
- `npm test` and `npm run build` pass.
