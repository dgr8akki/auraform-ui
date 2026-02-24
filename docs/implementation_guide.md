Implementation Guide: Auraform Library

A11yMorph Implementation & Usage Guide
Project Overview
A11yMorph is an accessibility-first Neumorphic UI library designed to provide a tactile, modern aesthetic without sacrificing usability. It targets both React (Web) and React Native (Mobile) through a shared core logic package.

Core Strategy
• Shared Math: All color calculations happen in `@a11ymorph/core` using HSL manipulation.

• 15% Lightness Shift: Light shadows are +15% lightness; dark shadows are -15% lightness.

• Adaptive Borders: If background contrast is too low, a subtle 1px border is automatically injected.

• Dual Signaling: We never rely on shadows alone; we use icons or accent colors to denote active states.

Web Application Plan
• Styling: Use CSS custom properties (variables) for dynamic theming.

• Animation: Implement Framer Motion to handle transitions between 'extruded' and 'pressed' states.

• Focus Management: Utilize a custom SVG-based focus ring that follows the component's border-radius.

React Native Plan
• Shadow Rendering: Use react-native-shadow-2 to ensure consistent, high-quality SVG shadows on both iOS and Android.

• Haptics: Integrate `expo-haptics` or `react-native-haptic-feedback` to provide physical confirmation when buttons are pressed.

• Layout: Use the Surface primitive to wrap all mobile UI elements.

Usage Instructions
1. Setup: Wrap your application root in the `A11yMorphProvider` and provide a base background color.

2. The Surface Component: Use the `Surface` component as your primary building block.

3. Props:

  • elevation: Choose between 'flat', 'low', 'medium', or 'high'.

  • isInset: Boolean to toggle between extruded and pressed looks.

  • intensity: Override the default 15% shadow shift if needed.

Development Roadmap
• Phase 1: Finalize HSL utility and contrast checker.

• Phase 2: Build the Web 'Surface' with Framer Motion.

• Phase 3: Build the Native 'Surface' with SVG shadows.

• Phase 4: Release specialized components (SoftButton, SoftInput, SoftSwitch).
