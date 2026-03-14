# @auraform/native

Accessibility-first neumorphic components for React Native.

This package provides a `NativeAuraformProvider` to compute neumorphic design tokens from a base color and includes a `NativeSurface` component with consistent cross-platform shadows.

## 🚀 Installation

```bash
npm install @auraform/native
# or
pnpm add @auraform/native
# or
yarn add @auraform/native
```

### Peer dependencies

- `react` (>=18)
- `react-native` (>=0.70)

## 🧩 Quick Start

```tsx
import React from "react";
import { NativeAuraformProvider, NativeSurface } from "@auraform/native";

export function App() {
  return (
    <NativeAuraformProvider baseColor="#e7e7f2">
      <NativeSurface elevation="medium" borderRadius={16}>
        {/* Your content here */}
      </NativeSurface>
    </NativeAuraformProvider>
  );
}
```

## 🔌 API

### `NativeAuraformProvider`

Props:
- `baseColor: string` — base background color (hex).
- `intensity?: number` — shadow intensity (default: 15).

### `NativeSurface`

Props:
- `elevation?: "flat" | "low" | "medium" | "high"` — shadow depth.
- `isInset?: boolean` — renders an inset surface.
- `borderRadius?: number` — corner radius.

### Hooks

- `useNativeAuraform()` — access generated tokens and OS accessibility settings.

## 🧪 Development

From the repo root:

```bash
pnpm install
pnpm --filter @auraform/native dev
```

Run tests:

```bash
pnpm --filter @auraform/native test
```

## � Storybook

`@auraform/native` provides native components and does not include a Storybook instance. The web component storybook is available in the React package:

https://dgr8akki.github.io/auraform-ui/

## �📄 License

MIT
