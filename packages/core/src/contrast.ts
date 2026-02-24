import type { RGBColor } from "./types";
import { hexToRgb } from "./color";

/**
 * Calculate the relative luminance of an RGB color.
 * Per WCAG 2.0 spec: https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
export function relativeLuminance(rgb: RGBColor): number {
  const [rs, gs, bs] = [rgb.r, rgb.g, rgb.b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate the contrast ratio between two colors.
 * Returns a value between 1 (no contrast) and 21 (max contrast).
 * Per WCAG 2.0: https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
export function contrastRatio(color1: string, color2: string): number {
  const lum1 = relativeLuminance(hexToRgb(color1));
  const lum2 = relativeLuminance(hexToRgb(color2));

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/** Minimum contrast ratio for neumorphic shadow visibility */
export const MIN_SHADOW_CONTRAST = 3.0;
