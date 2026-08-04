# Rule-Based Keyword Narratives Design

## Goal

Hot Appearance keyword detail pages should gain more useful, AdSense-friendly explanatory text without requiring a hand-written article for every keyword. The site will keep using curated keyword data as the source of truth, but add small structured fields that a deterministic narrative generator can turn into page-specific guidance.

## Problem

Writing several custom paragraphs for every keyword does not scale as the keyword list grows. The project also must avoid real community crawling, copied community text, unsafe medical claims, hateful language, and overly promotional beauty claims.

## Approach

Use a rule-based narrative engine. Each keyword gets only lightweight metadata:

- `intentTags`: two to four short labels such as `성분 이해`, `제품 비교`, `트렌드 파악`
- `cautionLevel`: `general` or `medical`

The generator combines existing fields (`category`, `trendState`, `audienceSegment`, `relatedSearches`) with these new fields to render deterministic explanation sections. The text is not random; the same keyword data always produces the same HTML.

## Generated Sections

Each keyword detail page will include:

- Current keyword summary and why-hot content already present
- An automatically generated context paragraph
- A short "how to read this keyword" paragraph based on category and intent tags
- Audience/trend phrasing based on `audienceSegment` and `trendState`
- Related searches
- A safety note selected by `cautionLevel`

## Rule Examples

Trend phrasing:

- `rising`: recently gaining attention
- `steady`: steadily searched and referenced
- `falling`: less heated than before but still useful as a reference keyword

Category guidance:

- `피부관리`: separate skin condition, product information, and treatment context
- `헤어/두피`: check daily routine, scalp condition, and product usage rhythm
- `메이크업`: compare skin tone, finish, texture, and wear
- Other categories: use a general appearance-care reading guide

Safety:

- `medical`: explicitly says the page does not guarantee medical or treatment effects
- `general`: says the page is informational and individual results may vary

## Files

- `src/types.ts`: add `intentTags` and `cautionLevel`
- `src/data/keywords.ts`: add lightweight metadata to the current 14 keywords
- `src/utils/keywordNarrative.ts`: generate deterministic narrative sections
- `scripts/generateStaticPages.mjs`: render narrative sections in keyword pages
- `tests/keywordNarrative.test.ts`: cover rule behavior and safety phrasing
- `tests/keywordData.test.ts`: require the new fields on every keyword
- `tests/staticGeneration.test.ts`: verify generated pages include the narrative content

## Non-Goals

- No real crawling
- No copied community text
- No AI-generated article pipeline in this iteration
- No hand-written long article per keyword
- No randomized output that changes between builds

## Success Criteria

- Adding a new keyword only requires small structured metadata, not a full article
- Keyword detail pages include useful explanatory text beyond raw data fields
- Medical or treatment-adjacent keywords get stronger safety language
- `npm test` and `npm run build` pass
