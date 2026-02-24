import type { AuraformTokens, ColorMode } from "./types";
import { hexToHsl, hslToHex, clamp } from "./color";
import { contrastRatio, MIN_SHADOW_CONTRAST } from "./contrast";

export interface TokenOptions {
  /** Override the default lightness shift (default: 15) */
  intensity?: number;
  /** Color mode: "light", "dark", or "auto" (derives from base color lightness) */
  mode?: ColorMode | "auto";
}

/**
 * Generate neumorphic design tokens from a base color.
 *
 * Algorithm:
 * 1. Convert base color to HSL
 * 2. Light shadow: L + intensity%, S - 5%
 * 3. Dark shadow: L - intensity%, S + 10%
 * 4. If contrast between light shadow and base is below 3.0:1,
 *    generate a 1px border (color depends on mode)
 * 5. Generate semantic text/border colors based on mode
 */
export function getNeumorphicTokens(
  baseColor: string,
  options: TokenOptions = {}
): AuraformTokens {
  const { intensity = 15, mode: modeOption = "auto" } = options;

  const hsl = hexToHsl(baseColor);

  // Resolve color mode
  const resolvedMode: ColorMode =
    modeOption === "auto" ? (hsl.l < 50 ? "dark" : "light") : modeOption;

  const isDark = resolvedMode === "dark";

  const lightShadowHsl = {
    h: hsl.h,
    s: clamp(hsl.s - 5, 0, 100),
    l: clamp(hsl.l + intensity, 0, 100),
  };

  const darkShadowHsl = {
    h: hsl.h,
    s: clamp(hsl.s + 10, 0, 100),
    l: clamp(hsl.l - intensity, 0, 100),
  };

  const lightShadowHex = hslToHex(lightShadowHsl);
  const darkShadowHex = hslToHex(darkShadowHsl);

  // Accessibility guardrail: inject border if shadow contrast is too low
  const contrast = contrastRatio(lightShadowHex, baseColor);
  const outline =
    contrast < MIN_SHADOW_CONTRAST
      ? isDark
        ? `1px solid rgba(255, 255, 255, 0.1)`
        : `1px solid rgba(0, 0, 0, 0.1)`
      : "none";

  // Semantic colors based on mode
  const textColor = isDark ? "#f0f0f0" : "#333333";
  const textSecondary = isDark ? "#a0a0a0" : "#666666";
  const borderSubtle = isDark
    ? "rgba(255, 255, 255, 0.12)"
    : "rgba(0, 0, 0, 0.12)";

  return {
    mode: resolvedMode,
    background: baseColor,
    lightShadow: lightShadowHex,
    darkShadow: darkShadowHex,
    outline,
    textColor,
    textSecondary,
    borderSubtle,
  };
}
