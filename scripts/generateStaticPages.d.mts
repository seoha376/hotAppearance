import type { Keyword } from "../src/types";
import type { NavLink } from "../src/content/siteContent";

export type GenerateStaticPagesOptions = {
  projectRoot?: string;
  outputRoot?: string;
  basePath?: string;
  getAudienceSegmentLabel?: (audienceSegment: Keyword["audienceSegment"]) => string;
  getKeywordPath?: (keywordId: string) => string;
  getTrendStateLabel?: (trendState: Keyword["trendState"]) => string;
  keywords?: Keyword[];
  navLinks?: NavLink[];
  siteUrl?: string;
  validateKeywordId?: (keywordId: string) => string;
};

export type GenerateStaticPagesResult = {
  keywordCount: number;
  outputRoot: string;
  sitemapPath: string;
};

export function generateStaticPages(
  options?: GenerateStaticPagesOptions
): GenerateStaticPagesResult;
