import { describe, it, expect } from "vitest";
import {
  hexToRgb,
  rgbToHsl,
  hslToRgb,
  hexToHsl,
  hslToHex,
  rgbToHex,
  clamp,
} from "../color";

describe("hexToRgb", () => {
  it("parses 6-digit hex", () => {
    expect(hexToRgb("#e0e0e0")).toEqual({ r: 224, g: 224, b: 224 });
  });

  it("parses 3-digit hex", () => {
    expect(hexToRgb("#fff")).toEqual({ r: 255, g: 255, b: 255 });
  });

  it("parses without # prefix", () => {
    expect(hexToRgb("000000")).toEqual({ r: 0, g: 0, b: 0 });
  });

  it("throws on invalid hex", () => {
    expect(() => hexToRgb("#zzzzzz")).toThrow("Invalid hex color");
    expect(() => hexToRgb("#12")).toThrow("Invalid hex color");
  });
});

describe("rgbToHsl", () => {
  it("converts pure white", () => {
    expect(rgbToHsl({ r: 255, g: 255, b: 255 })).toEqual({
      h: 0,
      s: 0,
      l: 100,
    });
  });

  it("converts pure black", () => {
    expect(rgbToHsl({ r: 0, g: 0, b: 0 })).toEqual({ h: 0, s: 0, l: 0 });
  });

  it("converts a mid-gray", () => {
    const hsl = rgbToHsl({ r: 224, g: 224, b: 224 });
    expect(hsl.s).toBe(0);
    expect(hsl.l).toBe(88);
  });

  it("converts a saturated color", () => {
    const hsl = rgbToHsl({ r: 255, g: 0, b: 0 });
    expect(hsl.h).toBe(0);
    expect(hsl.s).toBe(100);
    expect(hsl.l).toBe(50);
  });
});

describe("hslToRgb", () => {
  it("converts achromatic (gray)", () => {
    const rgb = hslToRgb({ h: 0, s: 0, l: 50 });
    expect(rgb).toEqual({ r: 128, g: 128, b: 128 });
  });

  it("converts pure red", () => {
    const rgb = hslToRgb({ h: 0, s: 100, l: 50 });
    expect(rgb).toEqual({ r: 255, g: 0, b: 0 });
  });
});

describe("roundtrip conversions", () => {
  it("hex -> hsl -> hex roundtrip preserves color", () => {
    const original = "#4a90d9";
    const hsl = hexToHsl(original);
    const result = hslToHex(hsl);
    // Allow slight rounding differences
    const rgb1 = hexToRgb(original);
    const rgb2 = hexToRgb(result);
    expect(Math.abs(rgb1.r - rgb2.r)).toBeLessThanOrEqual(1);
    expect(Math.abs(rgb1.g - rgb2.g)).toBeLessThanOrEqual(1);
    expect(Math.abs(rgb1.b - rgb2.b)).toBeLessThanOrEqual(1);
  });
});

describe("rgbToHex", () => {
  it("converts rgb to hex", () => {
    expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe("#ffffff");
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe("#000000");
  });

  it("clamps values", () => {
    expect(rgbToHex({ r: 300, g: -10, b: 128 })).toBe("#ff0080");
  });
});

describe("clamp", () => {
  it("clamps within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 100)).toBe(0);
    expect(clamp(150, 0, 100)).toBe(100);
  });
});
