# @auraform/react

Accessibility-first neumorphic UI components for web React apps.

This package provides an `AuraformProvider` that injects CSS custom properties for neumorphic theming, along with a suite of accessible components such as `Surface`, `SoftButton`, `SoftInput`, and more.

## 🚀 Installation

```bash
npm install @auraform/react
# or
pnpm add @auraform/react
# or
yarn add @auraform/react
```

### Peer dependencies

- `react` (>=18)
- `react-dom` (>=18)

## 🧩 Quick Start

```tsx
import React from "react";
import { AuraformProvider, Surface, SoftButton } from "@auraform/react";

export function App() {
  return (
    <AuraformProvider baseColor="#e7e7f2">
      <Surface elevation="medium" borderRadius={16}>
        <SoftButton onClick={() => alert("Hello")}>Click me</SoftButton>
      </Surface>
    </AuraformProvider>
  );
}
```

## 📦 Exported Components

- `AuraformProvider`, `useAuraform`
- `Surface`, `FocusRing`
- `SoftButton`, `SoftInput`, `SoftSwitch`, `SoftCheckbox`, `SoftRadio`, `SoftTextArea`, `SoftSlider`, `SoftCard`, `SoftProgress`, `SoftChip`, `SoftBadge`, `SoftIconButton`, `SoftTabs`, `SoftTooltip`, `SoftAvatar`, `SoftDivider`, `SoftKnob`, `SoftVerticalSlider`, `SoftGauge`, `SoftStepper`, `SoftRating`, `SoftSegmentedControl`

## 🧪 Development

From the repo root:

```bash
pnpm install
pnpm --filter @auraform/react dev
```

Run Storybook:

```bash
pnpm --filter @auraform/react storybook
```

Run tests:

```bash
pnpm --filter @auraform/react test
```

## � Storybook

Live demo: https://dgr8akki.github.io/auraform-ui/

## �📄 License

MIT
