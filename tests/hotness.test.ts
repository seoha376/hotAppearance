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
