# Hot Appearance Keyword Site Design

## Goal

Build a simple Korean SEO-oriented website that shows currently hot appearance-care keywords at a glance. The first version should be fast to build, free to deploy, and suitable as a foundation for ad approval. The design must also leave a clean path toward a future version that collects real trend keywords automatically.

## Product Positioning

The site is a lightweight "hot appearance keyword map."

Users should immediately understand:

- which appearance-care topics are hot right now;
- how hot each keyword is, represented by larger text for hotter keywords;
- what each keyword means and why people care about it;
- which practical beginner topics are worth reading first.

The tone should be useful, simple, and slightly trendy rather than clinical or overly glossy.

## First Version Scope

The first release is a static website with curated keyword data.

It includes:

1. A hero section with the site name and short explanation.
2. A keyword cloud where font size reflects hotness score.
3. Clickable keyword cards with concise explanations.
4. A "hot keyword ranking" section for SEO-friendly text content.
5. A few simple article-style sections for ad review readiness.
6. Basic legal/info pages needed for ad applications, such as About, Contact, and Privacy Policy.

The first version does not need login, database storage, server-side scraping, user accounts, comments, payments, or complex analytics.

## Future Evolution Path

The static keyword list should be modeled as structured data from day one, even if it is manually curated at first. This lets the site later evolve into a real keyword collection service without rewriting the whole UI.

Each keyword should have fields like:

- `id`
- `label`
- `category`
- `hotness`
- `summary`
- `whyHot`
- `audience`
- `relatedSearches`
- `updatedAt`
- `sourceType`

Future versions can replace the static data source with automated collection from APIs, feeds, search trend exports, social signals, or manual admin uploads. The UI should only depend on a normalized keyword data shape, not on where the data came from.

## Suggested Keyword Categories

Initial categories:

- Skin care
- Hair and scalp
- Men's grooming
- Makeup and tone-up
- Fragrance
- Body care
- Clinic and procedure trends
- Beginner basics

Initial keywords can include PDRN, exosome, slow aging, skin barrier, water-glow skin, scalp care, men's eyebrows, pore care, tone-up sunscreen, home dermaroller, fragrance layering, lip care, jawline care, and personal color.

## User Experience

The homepage should be extremely direct.

The first screen shows the promise of the site and the keyword cloud. Users can scan the page without reading long paragraphs. Hot keywords are visually louder through larger text. Clicking or tapping a keyword opens or highlights a short explanation card.

Below the cloud, the ranking section explains the top keywords in short paragraphs. This gives search engines and ad reviewers enough real informational text to understand the site's value.

The site should work well on mobile because beauty, grooming, and trend discovery traffic is likely to be mobile-heavy.

## Architecture

Use a static frontend-first architecture.

Recommended structure:

- keyword data lives in a dedicated data file;
- keyword cloud reads from that data file;
- ranking and article sections reuse the same data where possible;
- informational pages are plain static routes or sections;
- styling is responsive and lightweight.

This keeps deployment simple now and migration easy later.

## Data Flow

In the first version:

1. Curated keyword data is stored locally.
2. The homepage loads the keyword list.
3. Hotness scores determine text size and ranking order.
4. User clicks a keyword.
5. The UI displays the keyword detail card.

In a future version:

1. A collector gathers candidate keywords from configured sources.
2. A ranking process normalizes and scores them.
3. The frontend receives the same normalized keyword shape.
4. The existing UI renders the live or periodically updated data.

## Ad Readiness

To support ad review, the site should avoid feeling like a thin single-page gimmick. It should include enough original text and useful context.

Minimum ad-readiness content:

- homepage with useful keyword explanations;
- About page explaining the site purpose;
- Contact page with a clear contact email field that can be filled before ad application;
- Privacy Policy page;
- at least three article-style informational sections or pages;
- no misleading medical claims;
- no copied long-form content from other sites.

Beauty and procedure-related wording should stay informational and avoid promising results.

## Testing and Validation

Before release, verify:

- homepage renders on desktop and mobile widths;
- keyword font sizes visibly differ by hotness;
- every keyword click opens the right detail;
- ranking order matches hotness score;
- static pages are reachable;
- there are no broken internal links;
- production build succeeds;
- deployed URL loads without console errors.

## Deployment

Use a free static hosting path. Good candidates are Vercel, Netlify, GitHub Pages, or Cloudflare Pages.

The first release should prioritize the fastest working free deployment. After deployment, add or verify:

- site title and metadata;
- favicon or simple brand mark;
- sitemap if supported by the framework;
- robots.txt;
- privacy/contact/about pages;
- basic search console submission if the user wants to continue beyond deployment.

## Non-Goals

Do not build scraping, admin dashboards, authentication, paid features, product recommendations, clinic rankings, or affiliate systems in the first version.

Do not over-design the UI. The first activity goal is to publish a simple useful site, then apply for ads.
