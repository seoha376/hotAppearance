import { describe, expect, it } from "vitest";
import { getKeywordHref, getKeywordPath } from "../src/utils/routes";

describe("route helpers", () => {
  it("rejects unsafe keyword ids before building keyword URLs", () => {
    expect(() => getKeywordPath("../about")).toThrow("Invalid keyword id");
    expect(() => getKeywordHref('pdrn" onclick="alert(1)')).toThrow("Invalid keyword id");
  });
});
