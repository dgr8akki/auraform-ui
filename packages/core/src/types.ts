/** HSL color representation */
export interface HSLColor {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

/** RGB color representation */
export interface RGBColor {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

/** Neumorphic design tokens generated from a base color */
export interface AuraformTokens {
  /** The original background color as hex */
  background: string;
  /** Lighter shadow color (highlight) as hex */
  lightShadow: string;
  /** Darker shadow color as hex */
  darkShadow: string;
  /** Border to apply when contrast is insufficient, or "none" */
  outline: string;
}

/** Elevation levels for neumorphic components */
export type Elevation = "flat" | "low" | "medium" | "high";

/** Shadow configuration for a given elevation */
export interface ShadowConfig {
  distance: number;
  blur: number;
}

/** Map of elevation levels to shadow configurations */
export const ELEVATION_MAP: Record<Elevation, ShadowConfig> = {
  flat: { distance: 0, blur: 0 },
  low: { distance: 3, blur: 6 },
  medium: { distance: 6, blur: 12 },
  high: { distance: 10, blur: 20 },
};
