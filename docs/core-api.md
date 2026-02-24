# Core API Reference

`@auraform/core` is the platform-agnostic engine that powers both the React and React Native packages. It handles color math, contrast validation, and neumorphic token generation.

---

## Token Generation

### `getNeumorphicTokens(baseColor, options?)`

Generates a complete set of neumorphic design tokens from a single hex color.

```ts
import { getNeumorphicTokens } from '@auraform/core';

const tokens = getNeumorphicTokens('#e0e0e0');
// {
//   mode:          'light',
//   background:    '#e0e0e0',
//   lightShadow:   '#f5f0f0',   // L + 15%, S - 5%
//   darkShadow:    '#b8b8c1',   // L - 15%, S + 10%
//   outline:       'none',       // or '1px solid rgba(...)' if low contrast
//   textColor:     '#333333',    // adapts to mode
//   textSecondary: '#666666',
//   borderSubtle:  'rgba(0, 0, 0, 0.12)',
// }

// Dark mode:
const darkTokens = getNeumorphicTokens('#2d2d2d', { mode: 'dark' });
// → textColor: '#f0f0f0', borderSubtle: 'rgba(255, 255, 255, 0.12)', etc.
```

**Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `baseColor` | `string` | Hex color (with or without `#` prefix) |
| `options.intensity` | `number` | Lightness shift percentage. Default: `15`. |
| `options.mode` | `ColorMode \| "auto"` | `"light"`, `"dark"`, or `"auto"` (derives from lightness). Default: `"auto"`. |

**Returns:** `AuraformTokens`

**Algorithm:**
1. Convert base color to HSL
2. Resolve mode: if `"auto"`, uses `"dark"` when lightness < 50, otherwise `"light"`
3. **Light shadow:** H stays, S − 5%, L + intensity%
4. **Dark shadow:** H stays, S + 10%, L − intensity%
5. **Contrast check:** If the contrast ratio between the light shadow and the base is below `3.0:1`, a border is auto-injected (white-tinted in dark mode, black-tinted in light mode)
6. **Semantic colors:** `textColor`, `textSecondary`, and `borderSubtle` are set based on the resolved mode

---

## Types

### `ColorMode`

```ts
type ColorMode = 'light' | 'dark';
```

### `AuraformTokens`

```ts
interface AuraformTokens {
  mode: ColorMode;       // Resolved color mode
  background: string;    // Original base color as hex
  lightShadow: string;   // Lighter shadow (highlight) as hex
  darkShadow: string;    // Darker shadow as hex
  outline: string;       // '1px solid rgba(...)' or 'none'
  textColor: string;     // Primary text color for the mode
  textSecondary: string; // Secondary/muted text color
  borderSubtle: string;  // Subtle border color for inputs, dividers, etc.
}
```

### `Elevation`

```ts
type Elevation = 'flat' | 'low' | 'medium' | 'high';
```

### `ShadowConfig`

```ts
interface ShadowConfig {
  distance: number;  // Shadow offset in px
  blur: number;      // Shadow blur radius in px
}
```

### `ELEVATION_MAP`

Pre-defined shadow configurations for each elevation level:

```ts
const ELEVATION_MAP: Record<Elevation, ShadowConfig> = {
  flat:   { distance: 0,  blur: 0  },
  low:    { distance: 3,  blur: 6  },
  medium: { distance: 6,  blur: 12 },
  high:   { distance: 10, blur: 20 },
};
```

### `HSLColor` / `RGBColor`

```ts
interface HSLColor { h: number; s: number; l: number; }  // h: 0-360, s/l: 0-100
interface RGBColor { r: number; g: number; b: number; }  // 0-255 each
```

### `TokenOptions`

```ts
interface TokenOptions {
  intensity?: number;           // Default: 15
  mode?: ColorMode | 'auto';   // Default: 'auto'
}
```

---

## Color Utilities

Low-level functions for color conversion. All hex values are 6-character strings (with or without `#`).

| Function | Signature | Description |
|----------|-----------|-------------|
| `hexToRgb` | `(hex: string) → RGBColor` | Convert hex to RGB |
| `rgbToHsl` | `(rgb: RGBColor) → HSLColor` | Convert RGB to HSL |
| `hslToRgb` | `(hsl: HSLColor) → RGBColor` | Convert HSL to RGB |
| `hexToHsl` | `(hex: string) → HSLColor` | Convert hex directly to HSL |
| `hslToHex` | `(hsl: HSLColor) → string` | Convert HSL to hex string |
| `rgbToHex` | `(rgb: RGBColor) → string` | Convert RGB to hex string |
| `clamp` | `(value: number, min: number, max: number) → number` | Clamp a number within a range |

```ts
import { hexToHsl, hslToHex, clamp } from '@auraform/core';

const hsl = hexToHsl('#4A90D9');  // { h: 213, s: 59, l: 57 }
const hex = hslToHex({ h: 213, s: 59, l: 72 });  // '#89b5e4'
const val = clamp(120, 0, 100);   // 100
```

---

## Contrast Utilities

Functions for WCAG 2.0 contrast ratio calculations.

### `relativeLuminance(hex)`

Computes the relative luminance of a color per WCAG 2.0 definition.

```ts
import { relativeLuminance } from '@auraform/core';

relativeLuminance('#ffffff');  // 1.0
relativeLuminance('#000000');  // 0.0
```

### `contrastRatio(color1, color2)`

Returns the contrast ratio between two hex colors (range: 1 to 21).

```ts
import { contrastRatio } from '@auraform/core';

contrastRatio('#ffffff', '#000000');  // 21.0
contrastRatio('#e0e0e0', '#d0d0d0');  // ~1.2
```

### `MIN_SHADOW_CONTRAST`

The minimum contrast ratio threshold used by the token engine. Value: `3.0`.

When the contrast between the light shadow and the background falls below this value, the engine auto-injects a visible border to ensure the component edges remain perceptible.
