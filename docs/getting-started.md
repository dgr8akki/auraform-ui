# Getting Started

## Installation

### React (Web)

```bash
npm install @auraform/react @auraform/core
```

**Peer dependencies:** `react >= 18`, `framer-motion >= 10`

### React Native

```bash
npm install @auraform/native @auraform/core react-native-shadow-2 react-native-svg
```

### Core only (for custom integrations)

```bash
npm install @auraform/core
```

---

## Setting Up the Provider

Every Auraform component reads its neumorphic tokens (background, shadows, borders) from a context provider. Wrap your app once at the root.

### React

```tsx
import { AuraformProvider } from '@auraform/react';

function App() {
  return (
    <AuraformProvider baseColor="#e0e0e0">
      {/* All Auraform components go here */}
    </AuraformProvider>
  );
}
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `baseColor` | `string` | — | Hex color for the background. All tokens are derived from this. |
| `intensity` | `number` | `15` | Lightness shift (%) for shadow generation. Higher = more contrast. |

### React Native

```tsx
import { NativeAuraformProvider } from '@auraform/native';

function App() {
  return (
    <NativeAuraformProvider baseColor="#e0e0e0">
      {/* Native components go here */}
    </NativeAuraformProvider>
  );
}
```

The native provider automatically detects **Reduce Motion** and **Bold Text / Increase Contrast** OS settings and adjusts shadow intensity accordingly.

---

## Your First Component

### React

```tsx
import { AuraformProvider, SoftButton, SoftInput } from '@auraform/react';

function LoginForm() {
  return (
    <AuraformProvider baseColor="#e0e0e0">
      <div style={{ padding: 40, background: '#e0e0e0', minHeight: '100vh' }}>
        <h2>Sign In</h2>
        <SoftInput placeholder="Email" type="email" />
        <SoftInput placeholder="Password" type="password" />
        <SoftButton variant="primary">Log In</SoftButton>
      </div>
    </AuraformProvider>
  );
}
```

### React Native

```tsx
import { NativeAuraformProvider, NativeSurface } from '@auraform/native';
import { Text, View } from 'react-native';

function Card() {
  return (
    <NativeAuraformProvider baseColor="#e0e0e0">
      <View style={{ flex: 1, padding: 24, backgroundColor: '#e0e0e0' }}>
        <NativeSurface elevation="medium">
          <Text>Welcome to Auraform!</Text>
        </NativeSurface>
      </View>
    </NativeAuraformProvider>
  );
}
```

---

## Accessing Tokens Directly

If you need the raw token values (e.g. for custom styling), use the context hook:

### React

```tsx
import { useAuraform } from '@auraform/react';

function CustomComponent() {
  const { tokens, baseColor } = useAuraform();
  // tokens.background, tokens.lightShadow, tokens.darkShadow, tokens.outline
  return <div style={{ background: tokens.background }}>...</div>;
}
```

### React Native

```tsx
import { useNativeAuraform } from '@auraform/native';

function CustomNativeComponent() {
  const { tokens, reduceMotion, highContrast } = useNativeAuraform();
  // Also provides reduceMotion and highContrast booleans
}
```

---

## What's Next?

- Browse the full **[React component API →](./components-react.md)**
- Explore **[React Native components →](./components-native.md)**
- Learn about **[theming and customization →](./theming.md)**
- Understand the **[accessibility features →](./accessibility.md)**
