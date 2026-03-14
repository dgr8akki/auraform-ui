# @auraform/core

Core color math, shadow token generation, and contrast checking for Auraform UI.

This package is the foundation for the Auraform design system. It provides utilities for generating neumorphic color tokens and enforcing accessible contrast in both web and native components.

## 🚀 Installation

```bash
npm install @auraform/core
# or
pnpm add @auraform/core
# or
yarn add @auraform/core
```

## 🧰 Usage

```ts
import { getNeumorphicTokens } from "@auraform/core";

const tokens = getNeumorphicTokens("#f0f0f5", { intensity: 15 });

console.log(tokens.background); // e.g. "#f0f0f5"
console.log(tokens.lightShadow); // e.g. "rgba(255,255,255,0.8)"
```

### Available exports

- `getNeumorphicTokens(baseColor, options)` — generates tokens for neumorphic UIs.
- Color utilities: `hexToRgb`, `rgbToHsl`, `hslToHex`, etc.
- Contrast utilities: `relativeLuminance`, `contrastRatio`, `MIN_SHADOW_CONTRAST`.
- Types: `AuraformTokens`, `Elevation`, `ColorMode`, `ShadowConfig`, etc.

## 🧪 Development

This package is part of a monorepo. From the repo root:

```bash
pnpm install
pnpm --filter @auraform/core dev
```

Run tests:

```bash
pnpm --filter @auraform/core test
```

## 📕 Storybook

`@auraform/core` provides shared token logic and does not have its own Storybook. For component demos, see the React package storybook:

https://dgr8akki.github.io/auraform-ui/

## 🪪 License

MIT
