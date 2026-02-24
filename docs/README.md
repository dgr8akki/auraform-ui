# Auraform UI

**Accessibility-first neumorphic component library for React & React Native.**

Auraform UI brings the soft, tactile beauty of neumorphism to your applications — without sacrificing accessibility. Every component is built with WCAG compliance, keyboard navigation, screen reader support, and dual-signaling baked in from day one.

---

## Packages

| Package | Description | Install |
|---------|-------------|---------|
| `@auraform/core` | Platform-agnostic token engine — color math, contrast checking, shadow generation | `npm i @auraform/core` |
| `@auraform/react` | 19 React components with Framer Motion animations | `npm i @auraform/react` |
| `@auraform/native` | React Native primitives with SVG shadows and OS accessibility detection | `npm i @auraform/native` |

---

## Quick Start (React)

```tsx
import { AuraformProvider, SoftButton } from '@auraform/react';

function App() {
  return (
    <AuraformProvider baseColor="#e0e0e0">
      <SoftButton variant="primary" onClick={() => alert('Hello!')}>
        Press Me
      </SoftButton>
    </AuraformProvider>
  );
}
```

## Quick Start (React Native)

```tsx
import { NativeAuraformProvider, NativeSurface } from '@auraform/native';
import { Text } from 'react-native';

function App() {
  return (
    <NativeAuraformProvider baseColor="#e0e0e0">
      <NativeSurface elevation="medium">
        <Text>Hello, Auraform!</Text>
      </NativeSurface>
    </NativeAuraformProvider>
  );
}
```

---

## Documentation

- **[Getting Started](./getting-started.md)** — Installation, provider setup, and your first component
- **[React Components](./components-react.md)** — Full API reference for all 19 web components
- **[React Native Components](./components-native.md)** — Native primitives and accessibility hooks
- **[Core API](./core-api.md)** — Token engine, color utilities, and contrast checking
- **[Theming](./theming.md)** — Customizing colors, intensity, and dark mode
- **[Accessibility](./accessibility.md)** — How Auraform ensures inclusive neumorphic design

---

## Live Storybook

Browse and interact with every component:
**[auraform-ui.github.io](https://dgr8akki.github.io/auraform-ui/)**

---

## Key Features

- **Automatic contrast safety** — Shadow colors are computed from your base color. If contrast falls below 3.0:1, a subtle border is auto-injected.
- **Dual-signaling** — Active states use both depth change AND accent color, so they're perceivable by color-blind users and sighted users alike.
- **Keyboard-first** — Every interactive component supports `:focus-visible` detection with a custom `FocusRing`, arrow-key navigation for radio groups and tabs, and proper ARIA roles.
- **One color, entire theme** — Pass a single `baseColor` hex to the provider. Light shadows, dark shadows, borders, and backgrounds are all derived automatically.
- **React & React Native** — Shared `@auraform/core` logic with platform-specific renderers.

---

## License

MIT © [Auraform Contributors](https://github.com/dgr8akki/auraform-ui)
