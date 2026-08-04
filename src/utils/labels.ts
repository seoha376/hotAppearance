import type { Keyword } from "../types";

const audienceSegmentLabels: Record<Keyword["audienceSegment"], string> = {
  men: "남자 관심",
  women: "여자 관심",
  common: "공통 관심"
};

export function getAudienceSegmentLabel(audienceSegment: Keyword["audienceSegment"]): string {
  return audienceSegmentLabels[audienceSegment];
}
