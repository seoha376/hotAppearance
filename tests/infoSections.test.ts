import { describe, expect, it } from "vitest";
import { renderInfoSections } from "../src/components/infoSections";

describe("info sections", () => {
  it("renders the real contact email for ad review readiness", () => {
    expect(renderInfoSections()).toContain("seoha376@gmail.com");
  });
});
