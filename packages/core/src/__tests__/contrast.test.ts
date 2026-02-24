import { describe, it, expect } from "vitest";
import { relativeLuminance, contrastRatio } from "../contrast";

describe("relativeLuminance", () => {
  it("returns 0 for black", () => {
    expect(relativeLuminance({ r: 0, g: 0, b: 0 })).toBe(0);
  });

  it("returns 1 for white", () => {
    expect(relativeLuminance({ r: 255, g: 255, b: 255 })).toBe(1);
  });

  it("returns ~0.2126 for pure red", () => {
    const lum = relativeLuminance({ r: 255, g: 0, b: 0 });
    expect(lum).toBeCloseTo(0.2126, 4);
  });
});

describe("contrastRatio", () => {
  it("returns 21 for black vs white", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 0);
  });

  it("returns 1 for same colors", () => {
    expect(contrastRatio("#e0e0e0", "#e0e0e0")).toBeCloseTo(1, 2);
  });

  it("is commutative", () => {
    const r1 = contrastRatio("#4a90d9", "#e0e0e0");
    const r2 = contrastRatio("#e0e0e0", "#4a90d9");
    expect(r1).toBeCloseTo(r2, 4);
  });
});
