import type { Keyword } from "../types";

const audienceSegmentLabels: Record<Keyword["audienceSegment"], string> = {
  men: "Men",
  women: "Women",
  common: "Shared"
};

export function getAudienceSegmentLabel(audienceSegment: Keyword["audienceSegment"]): string {
  return audienceSegmentLabels[audienceSegment];
}
