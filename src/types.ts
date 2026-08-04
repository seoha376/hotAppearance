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
  audienceSegment: "men" | "women" | "common";
  trendState: "rising" | "steady" | "falling";
};
