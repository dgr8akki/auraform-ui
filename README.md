# Auraform UI

An accessibility-first Neumorphic UI component library for **React** and **React Native**.

Auraform solves the core problems of traditional neumorphism — poor contrast, ambiguous states, broken focus management, and limited color support — by baking WCAG-compliant accessibility directly into the design system.

---

## Features

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

## Components

### `AuraformProvider` / `NativeAuraformProvider`

Root context provider. Computes neumorphic tokens from `baseColor` and distributes them to all children.

| Prop | Type | Default | Description |
|---|---|---|---|
| `baseColor` | `string` | — | Base background color (hex) |
| `intensity` | `number` | `15` | Shadow lightness shift percentage |

### `Surface`

The base neumorphic building block. All other components inherit from its shadow/border logic.

| Prop | Type | Default | Description |
|---|---|---|---|
| `elevation` | `"flat" \| "low" \| "medium" \| "high"` | `"medium"` | Shadow depth |
| `isInset` | `boolean` | `false` | Pressed/inset appearance |
| `borderRadius` | `number` | `12` | Corner radius in pixels |

### `SoftButton`

Tactile button with press animation and dual-signaling.

| Prop | Type | Default | Description |
|---|---|---|---|
| `elevation` | `Elevation` | `"medium"` | Shadow depth |
| `variant` | `"default" \| "primary"` | `"default"` | Visual style |
| `accentColor` | `string` | `"#4A90D9"` | Primary variant accent |
| `disabled` | `boolean` | `false` | Disabled state |

### `SoftInput`

Inset input field with a high-contrast bottom border.

| Prop | Type | Default | Description |
|---|---|---|---|
| `borderRadius` | `number` | `12` | Corner radius |
| `accentColor` | `string` | `"#4A90D9"` | Focus border color |

### `SoftSwitch`

Toggle switch using physical depth and accent color to indicate state.

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | — | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Initial state (uncontrolled) |
| `onChange` | `(checked: boolean) => void` | — | Change handler |
| `accentColor` | `string` | `"#4A90D9"` | Active track color |
| `disabled` | `boolean` | `false` | Disabled state |

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
// → { background, lightShadow, darkShadow, outline }
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
│   ├── react/         # @auraform/react — web components
│   │   ├── .storybook/
│   │   └── src/
│   │       ├── AuraformProvider.tsx
│   │       ├── Surface.tsx
│   │       ├── SoftButton.tsx
│   │       ├── SoftInput.tsx
│   │       ├── SoftSwitch.tsx
│   │       ├── FocusRing.tsx
│   │       └── stories/
│   └── native/        # @auraform/native — mobile components
│       └── src/
│           ├── NativeAuraformProvider.tsx
│           ├── NativeSurface.tsx
│           └── accessibility.ts
├── docs/              # Design docs & project plan
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
