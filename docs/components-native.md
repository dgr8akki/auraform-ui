# React Native Components

`@auraform/native` provides neumorphic primitives for React Native with SVG-based shadows (consistent on iOS and Android) and automatic OS accessibility detection.

```tsx
import {
  NativeAuraformProvider,
  NativeSurface,
  useNativeAuraform,
  useReduceMotion,
  useBoldText,
} from '@auraform/native';
```

> **Note:** The React Native package currently includes the provider, surface primitive, and accessibility hooks. Higher-level components (buttons, inputs, etc.) are planned for a future release.

---

## Installation

```bash
npm install @auraform/native @auraform/core react-native-shadow-2 react-native-svg
```

If using Expo:
```bash
npx expo install react-native-svg
npm install @auraform/native @auraform/core react-native-shadow-2
```

---

## `NativeAuraformProvider`

Root context provider for React Native. Computes neumorphic tokens and automatically detects OS accessibility settings.

```tsx
import { NativeAuraformProvider } from '@auraform/native';

function App() {
  return (
    <NativeAuraformProvider baseColor="#e0e0e0" intensity={15}>
      {/* Your app */}
    </NativeAuraformProvider>
  );
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `baseColor` | `string` | **required** | Hex color for the background theme |
| `intensity` | `number` | `15` | Lightness shift (%) for shadow generation |
| `children` | `ReactNode` | — | App content |

**Automatic adjustments:**
- When the OS **Bold Text** / **Increase Contrast** setting is enabled, the provider automatically increases shadow intensity by +5 for better visibility.

---

## `useNativeAuraform()`

Hook to access tokens and accessibility state from context.

```tsx
import { useNativeAuraform } from '@auraform/native';

function MyComponent() {
  const { tokens, baseColor, reduceMotion, highContrast } = useNativeAuraform();

  return (
    <View style={{ backgroundColor: tokens.background }}>
      {/* Use tokens.lightShadow, tokens.darkShadow, tokens.outline */}
      {/* reduceMotion: boolean — skip animations when true */}
      {/* highContrast: boolean — increase visual weight when true */}
    </View>
  );
}
```

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `tokens` | `AuraformTokens` | `{ background, lightShadow, darkShadow, outline }` |
| `baseColor` | `string` | The original hex color passed to the provider |
| `reduceMotion` | `boolean` | `true` if the OS "Reduce Motion" setting is enabled |
| `highContrast` | `boolean` | `true` if the OS "Bold Text" setting is enabled |

---

## `NativeSurface`

The base neumorphic building block for React Native. Uses `react-native-shadow-2` for consistent SVG-based shadows on both iOS and Android.

```tsx
import { NativeSurface } from '@auraform/native';
import { Text } from 'react-native';

function Card() {
  return (
    <NativeSurface elevation="medium" borderRadius={16}>
      <Text>Hello from a neumorphic surface!</Text>
    </NativeSurface>
  );
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `elevation` | `Elevation` | `"medium"` | `"flat"` · `"low"` · `"medium"` · `"high"` |
| `isInset` | `boolean` | `false` | Renders as a flat view (inset shadows not supported natively) |
| `borderRadius` | `number` | `12` | Border radius in px |
| `style` | `ViewStyle` | — | Additional React Native styles |
| `children` | `ReactNode` | — | Content |

**Behavior:**
- **Flat / inset:** Renders a plain `<View>` with background color and optional border (no outer shadow).
- **Low / medium / high:** Wraps content in nested `<Shadow>` components — one for the dark shadow (bottom-right) and one for the light shadow (top-left).
- **High contrast mode:** Shadow distance is automatically increased by 30% when the OS accessibility setting is detected.

---

## Accessibility Hooks

These hooks can be used independently of the provider for building custom accessible components.

### `useReduceMotion()`

Returns `true` when the user has enabled "Reduce Motion" in their OS accessibility settings.

```tsx
import { useReduceMotion } from '@auraform/native';

function AnimatedCard() {
  const reduceMotion = useReduceMotion();

  return (
    <Animated.View
      style={{
        // Skip animation when reduce motion is on
        transform: [{ scale: reduceMotion ? 1 : animatedScale }],
      }}
    />
  );
}
```

Uses `AccessibilityInfo.isReduceMotionEnabled()` and listens for the `reduceMotionChanged` event.

### `useBoldText()`

Returns `true` when the user has enabled "Bold Text" (iOS) or equivalent increased contrast setting.

```tsx
import { useBoldText } from '@auraform/native';

function StyledText() {
  const boldText = useBoldText();

  return (
    <Text style={{ fontWeight: boldText ? '700' : '400' }}>
      This text respects the user's preference.
    </Text>
  );
}
```

Uses `AccessibilityInfo.isBoldTextEnabled()` and listens for the `boldTextChanged` event.

---

## Building Custom Native Components

Use the hook + core token system to build your own neumorphic components:

```tsx
import { useNativeAuraform } from '@auraform/native';
import { ELEVATION_MAP } from '@auraform/core';
import { Shadow } from 'react-native-shadow-2';
import { View, TouchableOpacity, Text } from 'react-native';

function NativeButton({ children, onPress }) {
  const { tokens, reduceMotion } = useNativeAuraform();
  const { distance } = ELEVATION_MAP['medium'];

  return (
    <Shadow
      distance={distance}
      startColor={tokens.darkShadow}
      offset={[distance, distance]}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: tokens.background,
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 24,
        }}
        activeOpacity={reduceMotion ? 1 : 0.8}
      >
        <Text>{children}</Text>
      </TouchableOpacity>
    </Shadow>
  );
}
```
