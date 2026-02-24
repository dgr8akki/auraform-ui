Project Plan: Auraform UI Library

Previous Issues in Neumorphism
• Contrast Ratios: The biggest failure. Elements often have a 1.2:1 contrast ratio with the background, failing WCAG (3:1 or 4.5:1).

• State Ambiguity: Hard to distinguish between a toggle that is "on" (pressed in) vs "off" (extruded).

• Focus States: Most libraries forget focus rings, making keyboard navigation impossible.

• Color Binding: Traditional neumorphism only works on specific mid-tone grays/pastels; it breaks on very dark or very light themes.

• Component Bloat: Excessive `box-shadow` chains can lead to performance lag on low-end mobile devices.

The A11yMorph Plan (React & React Native)
Phase 1: The Design System (Tokens)

• Shadow Math: Create a utility that automatically calculates shadow colors based on the background color to ensure visibility.

• Contrast Buffers: Introduce a subtle 1px border (0.1 opacity) that only appears if the shadow contrast is too low.

Phase 2: Architecture

• Monorepo Structure: Use Turborepo.

• Core Logic: A shared `@a11ymorph/core` for shadow calculations.

• React Web: Use `framer-motion` for tactile animations.

• React Native: Use `react-native-shadow-2` for consistent Android/iOS shadow rendering.

Phase 3: Accessibility Features

• Built-in ARIA: Components must wrap logic for `aria-pressed`, `aria-expanded`.

• High-Contrast Mode: Detect OS accessibility settings and automatically switch to a "High Contrast Neumorphism" (thicker borders, darker shadows).

• Focus Management: Every component must have a clearly defined `:focus-visible` state.

Phase 4: Component Roadmap

1. The Surface (Container): The base unit that handles the background/shadow logic.

2. The Soft Button: Supporting extruded (default), pressed (active), and glassmorphic (secondary) states.

3. The Input Field: Inset shadows with a persistent high-contrast bottom border.

4. The Switch/Toggle: Using physical "depth" to indicate state.
Phase 1: The Design System (Tokens) Details

• Shadow Math Logic:

  • Input: `backgroundColor` (HEX/HSL).

  • `lightShadow`: L + 15%, S - 5%.

  • `darkShadow`: L - 15%, S + 10%.

  • Contrast Check: If `contrast(lightShadow, bg) < 3.0`, apply a 1px solid border at 10% opacity of the `darkShadow` color.

• Token structure:

  • `--nm-bg`: Base color.

  • `--nm-light-shadow`: Calculated highlight.

  • `--nm-dark-shadow`: Calculated shadow.

  • `--nm-border`: Conditional buffer border.
Phase 2: Architecture Details

• Monorepo Strategy: Use Turborepo to manage `@a11ymorph/core`, `@a11ymorph/react`, and `@a11ymorph/native`.

• Platform Rendering:

  • Web: Standard CSS `box-shadow` with `framer-motion` for transitions.

  • Native: SVG-based shadows via `react-native-shadow-2` for iOS/Android consistency.

• The "Surface" Primitive: A master component that handles background/shadow logic, which all other components (Button, Card, Input) inherit.

• Shared Logic Flow: Core calculates tokens -> A11y check -> Platform-specific render.
Phase 3: Accessibility (A11y) Features

• Adaptive "Shadow Check": A system that monitors background luminosity and auto-injects borders if contrast falls below 3.0:1.

• Dual-Signaling: Active states (like a pressed button) won't just use shadows; they'll use a subtle accent color or icon to ensure the state is clear to color-blind users.

• OS-Level Integration:

  • Web: Support for `forced-colors` media queries.

  • Native: Detection of "Reduce Motion" and "Increase Contrast" OS settings to flatten the UI and increase shadow darkness.

• Focus Management: A dedicated `FocusRing` component that "wraps" around the neumorphic shape, ensuring the focus indicator follows the curved/tactile edges of the element.
