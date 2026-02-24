import { describe, it, expect } from "vitest";
import { getNeumorphicTokens } from "../tokens";

describe("getNeumorphicTokens", () => {
  it("returns tokens for a typical neumorphic gray", () => {
    const tokens = getNeumorphicTokens("#e0e0e0");
    expect(tokens.background).toBe("#e0e0e0");
    expect(tokens.lightShadow).toBeDefined();
    expect(tokens.darkShadow).toBeDefined();
    expect(typeof tokens.outline).toBe("string");
  });

  it("light shadow is lighter than base", () => {
    const tokens = getNeumorphicTokens("#808080");
    const base = parseInt("80", 16);
    // Light shadow R channel should be higher
    const lightR = parseInt(tokens.lightShadow.slice(1, 3), 16);
    expect(lightR).toBeGreaterThan(base);
  });

  it("dark shadow is darker than base", () => {
    const tokens = getNeumorphicTokens("#808080");
    const base = parseInt("80", 16);
    const darkR = parseInt(tokens.darkShadow.slice(1, 3), 16);
    expect(darkR).toBeLessThan(base);
  });

  it("injects border for near-white backgrounds (low shadow contrast)", () => {
    const tokens = getNeumorphicTokens("#f8f8f8");
    // Near-white: light shadow contrast will be very low
    expect(tokens.outline).toContain("1px solid");
  });

  it("border is always injected at default intensity (15% shift < 3.0:1 contrast)", () => {
    // A 15% HSL lightness shift doesn't produce 3.0:1 contrast ratio,
    // so the accessibility border is correctly injected as a guardrail
    const tokens = getNeumorphicTokens("#808080");
    expect(tokens.outline).toContain("1px solid");
  });

  it("no border when intensity is high enough for sufficient contrast", () => {
    const tokens = getNeumorphicTokens("#808080", { intensity: 40 });
    expect(tokens.outline).toBe("none");
  });

  it("respects custom intensity", () => {
    const defaultTokens = getNeumorphicTokens("#808080");
    const highTokens = getNeumorphicTokens("#808080", { intensity: 25 });

    // Higher intensity = bigger lightness difference
    const defaultLightL = parseInt(defaultTokens.lightShadow.slice(1, 3), 16);
    const highLightL = parseInt(highTokens.lightShadow.slice(1, 3), 16);
    expect(highLightL).toBeGreaterThan(defaultLightL);
  });

  it("clamps values at extremes", () => {
    // Pure white - should not crash
    const whiteTokens = getNeumorphicTokens("#ffffff");
    expect(whiteTokens.background).toBe("#ffffff");

    // Pure black - should not crash
    const blackTokens = getNeumorphicTokens("#000000");
    expect(blackTokens.background).toBe("#000000");
  });
});
