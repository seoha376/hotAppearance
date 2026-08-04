import { describe, expect, it } from "vitest";
import { renderInfoSections } from "../src/components/infoSections";

describe("info sections", () => {
  it("renders the real contact email for ad review readiness", () => {
    expect(renderInfoSections()).toContain("seoha376@gmail.com");
  });

  it("renders ad-ready privacy disclosures", () => {
    const sections = renderInfoSections();

    expect(sections).toContain("쿠키");
    expect(sections).toContain("Google");
    expect(sections).toContain("개인화 광고");
    expect(sections).toContain("분석 도구");
    expect(sections).toContain("정책 변경");
  });
});
