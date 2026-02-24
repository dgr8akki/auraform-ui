# Auraform UI

[![npm: @auraform/core](https://img.shields.io/npm/v/@auraform/core?label=%40auraform%2Fcore&color=blue)](https://www.npmjs.com/package/@auraform/core)
[![npm: @auraform/react](https://img.shields.io/npm/v/@auraform/react?label=%40auraform%2Freact&color=blue)](https://www.npmjs.com/package/@auraform/react)
[![npm: @auraform/native](https://img.shields.io/npm/v/@auraform/native?label=%40auraform%2Fnative&color=blue)](https://www.npmjs.com/package/@auraform/native)
[![npm downloads](https://img.shields.io/npm/dm/@auraform/react?label=downloads&color=green)](https://www.npmjs.com/package/@auraform/react)
[![Storybook](https://img.shields.io/badge/Storybook-live-ff4785?logo=storybook&logoColor=white)](https://dgr8akki.github.io/auraform-ui/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

An accessibility-first Neumorphic UI component library for **React** and **React Native**.

Auraform solves the core problems of traditional neumorphism — poor contrast, ambiguous states, broken focus management, and limited color support — by baking WCAG-compliant accessibility directly into the design system.

---

## Features

- **Dark Mode** — Built-in `mode` prop (`"light"` / `"dark"` / `"auto"`) with auto-detection from base color lightness. Semantic tokens for text, borders, and outlines adapt automatically.
- **Automatic Contrast Guardrails** — Shadow tokens are generated from your base color using HSL math. If the contrast ratio falls below 3.0:1, a subtle border is automatically injected.
- **Dual-Signaling** — Active states use both shadow depth *and* accent color, so they remain clear for color-blind users.
- **Focus Management** — Every component includes a dedicated `FocusRing` that follows the neumorphic shape.
- **Cross-Platform** — Shared core logic powers both web (`@auraform/react`) and mobile (`@auraform/native`) packages.
- **Minified Builds** — All packages ship ESM + CJS with `.d.ts` types, built with [tsup](https://github.com/egoist/tsup).

---

## Packages

| Package | Description |
|---|---|
| `@auraform/core` | Platform-agnostic color math, contrast checking, and token generation |
| `@auraform/react` | React web components with Framer Motion animations |
| `@auraform/native` | React Native components with SVG shadows and OS accessibility detection |

---

## Quick Start

### Installation

```bash
# React (web)
npm install @auraform/core @auraform/react

# React Native
npm install @auraform/core @auraform/native react-native-shadow-2
```

### Usage (React Web)

```tsx
import { AuraformProvider, Surface, SoftButton } from "@auraform/react";

function App() {
  return (
    <AuraformProvider baseColor="#e0e0e0">
      <Surface elevation="medium">
        <h2>Card Title</h2>
        <p>Neumorphic content with automatic accessibility.</p>
        <SoftButton variant="primary">Get Started</SoftButton>
      </Surface>
    </AuraformProvider>
  );
}
```

### Usage (React Native)

```tsx
import { NativeAuraformProvider, NativeSurface } from "@auraform/native";

function App() {
  return (
    <NativeAuraformProvider baseColor="#e0e0e0">
      <NativeSurface elevation="medium">
        <Text>Neumorphic content on mobile.</Text>
      </NativeSurface>
    </NativeAuraformProvider>
  );
}
```

---

## Components (25 total)

### Provider & Primitives
- **`AuraformProvider`** — Root context provider. Computes tokens from `baseColor` and injects CSS variables. Supports `mode` prop for dark mode.
- **`Surface`** — Base neumorphic building block with elevation and inset modes.
- **`FocusRing`** — Accessible focus indicator overlay.

### Form Components
- **`SoftButton`** — Tactile button with press animation and dual-signaling.
- **`SoftInput`** — Inset text field with persistent bottom border.
- **`SoftTextArea`** — Multi-line input with optional auto-resize.
- **`SoftCheckbox`** — Checkbox with extruded→inset depth shift and SVG checkmark.
- **`SoftRadioGroup` + `SoftRadio`** — Radio buttons with arrow-key navigation.
- **`SoftSwitch`** — Toggle using depth + accent color for state.
- **`SoftSlider`** — Range slider with inset track and draggable thumb.
- **`SoftVerticalSlider`** — Volume/mixer-style vertical slider.
- **`SoftKnob`** — Rotary dial control with SVG arc indicator.
- **`SoftStepper`** — Numeric increment/decrement counter.
- **`SoftRating`** — Interactive star rating with hover preview.
- **`SoftSegmentedControl`** — iOS-style segmented toggle with animated sliding.

### Display & Feedback
- **`SoftCard`** — Semantic card with header/footer/media slots.
- **`SoftProgress`** — Linear and circular progress (determinate + indeterminate).
- **`SoftGauge`** — Semicircular dashboard gauge with needle and color segments.
- **`SoftChip`** — Selectable/removable tag component.
- **`SoftBadge`** — Notification count/dot overlay.
- **`SoftAvatar`** — Image or initials avatar with fallback.
- **`SoftDivider`** — Neumorphic groove separator.

### Navigation
- **`SoftTabs`** — Tab navigation with `SoftTabList`, `SoftTab`, `SoftTabPanel`.
- **`SoftIconButton`** — Icon-only button (requires `aria-label`).
- **`SoftTooltip`** — Floating tooltip on hover/focus.

Full API docs: **[docs/components-react.md](./docs/components-react.md)**

---

## Core Algorithm

```
baseColor → HSL
  lightShadow = L + 15%, S - 5%
  darkShadow  = L - 15%, S + 10%

if contrast(lightShadow, baseColor) < 3.0:1
  → inject 1px border at 10% opacity
```

Use `getNeumorphicTokens()` from `@auraform/core` directly for custom integrations:

```ts
import { getNeumorphicTokens } from "@auraform/core";

const tokens = getNeumorphicTokens("#e0e0e0", { intensity: 15 });
// → { mode, background, lightShadow, darkShadow, outline, textColor, textSecondary, borderSubtle }
```

---

## Development

### Prerequisites

- Node.js ≥ 18
- pnpm ≥ 8

### Setup

```bash
git clone https://github.com/dgr8akki/auraform-ui.git
cd auraform-ui
pnpm install
```

### Commands

```bash
# Build all packages
pnpm build

# Run tests
pnpm test

# Launch Storybook (React components)
pnpm --filter @auraform/react storybook

# Build Storybook static site
pnpm --filter @auraform/react build-storybook
```

### Project Structure

```
auraform-ui/
├── packages/
│   ├── core/          # @auraform/core — color math & tokens
│   │   └── src/
│   │       ├── color.ts        # Hex/RGB/HSL conversions
│   │       ├── contrast.ts     # WCAG luminance & contrast ratio
│   │       ├── tokens.ts       # getNeumorphicTokens()
│   │       └── types.ts        # TypeScript interfaces
│   ├── react/         # @auraform/react — 25 web components
│   │   ├── .storybook/
│   │   └── src/
│   │       ├── AuraformProvider.tsx
│   │       ├── Surface.tsx
│   │       ├── Soft*.tsx          # 15 component files
│   │       ├── FocusRing.tsx
│   │       └── stories/           # Storybook stories for each
│   └── native/        # @auraform/native — mobile components
│       └── src/
│           ├── NativeAuraformProvider.tsx
│           ├── NativeSurface.tsx
│           └── accessibility.ts
├── docs/              # Full documentation (API reference, theming, accessibility)
├── turbo.json
└── pnpm-workspace.yaml
```

---

## Accessibility

Auraform is built around these accessibility principles:

- **WCAG Contrast** — Automatic 3.0:1 contrast checking with fallback borders
- **ARIA** — `aria-pressed`, `aria-checked`, `aria-disabled` built into components
- **Focus Visible** — Dedicated `FocusRing` component for keyboard navigation
- **OS Integration** — React Native detects "Reduce Motion" and "Bold Text" settings, adjusting shadows accordingly
- **Forced Colors** — Web components support `forced-colors` media queries
- **Dual-Signaling** — States never rely on shadows alone; accent colors and icons provide redundant cues

---

## Tech Stack

- **Monorepo**: [Turborepo](https://turbo.build) + pnpm workspaces
- **Bundler**: [tsup](https://github.com/egoist/tsup) (ESM + CJS, minified, .d.ts)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) (web)
- **Shadows**: [react-native-shadow-2](https://github.com/nicksrandall/react-native-shadow-2) (mobile)
- **Testing**: [Vitest](https://vitest.dev)
- **Docs**: [Storybook](https://storybook.js.org) with a11y addon

---

## License

MIT
