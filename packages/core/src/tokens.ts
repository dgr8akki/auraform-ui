import type { AuraformTokens } from "./types";
import { hexToHsl, hslToHex, clamp } from "./color";
import { contrastRatio, MIN_SHADOW_CONTRAST } from "./contrast";

export interface TokenOptions {
  /** Override the default lightness shift (default: 15) */
  intensity?: number;
}

/**
 * Generate neumorphic design tokens from a base color.
 *
 * Algorithm:
 * 1. Convert base color to HSL
 * 2. Light shadow: L + intensity%, S - 5%
 * 3. Dark shadow: L - intensity%, S + 10%
 * 4. If contrast between light shadow and base is below 3.0:1,
 *    generate a 1px border using the dark shadow at 10% opacity
 */
export function getNeumorphicTokens(
  baseColor: string,
  options: TokenOptions = {}
): AuraformTokens {
  const { intensity = 15 } = options;

  const hsl = hexToHsl(baseColor);

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
      ? `1px solid rgba(0, 0, 0, 0.1)`
      : "none";

  return {
    background: baseColor,
    lightShadow: lightShadowHex,
    darkShadow: darkShadowHex,
    outline,
  };
}
