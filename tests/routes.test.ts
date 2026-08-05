import { describe, expect, it } from "vitest";
import { BASE_PATH, getKeywordHref, getKeywordPath } from "../src/utils/routes";

describe("route helpers", () => {
  it("builds root-relative URLs for Vercel deployment", () => {
    expect(BASE_PATH).toBe("");
    expect(getKeywordHref("pdrn")).toBe("/keywords/pdrn/");
  });

  it("rejects unsafe keyword ids before building keyword URLs", () => {
    expect(() => getKeywordPath("../about")).toThrow("Invalid keyword id");
    expect(() => getKeywordHref('pdrn" onclick="alert(1)')).toThrow("Invalid keyword id");
  });
});
