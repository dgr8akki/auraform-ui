# Auraform UI — Project Understanding & Implementation Plan

## What This Is
Auraform UI (internally called **A11yMorph**) is an **accessibility-first Neumorphic UI component library** targeting both **React (Web)** and **React Native (Mobile)**. It exists only as design docs right now — no code has been written.

The core thesis: traditional neumorphism fails accessibility (poor contrast, ambiguous states, no focus management, limited color range). Auraform solves this with automatic contrast checking, adaptive borders, dual-signaling for states, and OS-level accessibility integration.

## Current State
The repo contains only a `docs/` folder with 3 planning documents and zero code:
* `project_plan.md` — Problem statement, 4-phase plan, detailed token math, architecture, and accessibility strategy.
* `implementation_guide.md` — Condensed version of the plan with usage examples (Provider, Surface, props API).
* `Pseudo_code.md` — Pseudo-code for the core theme engine, React Surface, and React Native Surface.

## Planned Architecture
**Turborepo monorepo** with 3 packages:
* `@auraform/core` — Shared HSL color math, shadow token generation, contrast checking. Platform-agnostic.
* `@auraform/react` — Web components using CSS `box-shadow` + Framer Motion for animations.
* `@auraform/native` — React Native components using `react-native-shadow-2` for cross-platform SVG shadows + haptic feedback.

**Core algorithm** (from pseudo-code and plan):
1. Take a `baseColor` input.
2. Convert to HSL; generate `lightShadow` (L+15%, S-5%) and `darkShadow` (L-15%, S+10%).
3. Check contrast ratio of light shadow against background; if below 3.0:1, inject a 1px border at 10% opacity.
4. Return token object (`background`, `lightShadow`, `darkShadow`, `outline`).

**Key components planned:** Surface (base primitive), SoftButton, SoftInput, SoftSwitch.

**Accessibility features:** ARIA attributes, `forced-colors` / `prefers-contrast` media query support, OS "Reduce Motion" / "Increase Contrast" detection, SVG-based FocusRing component, dual-signaling (never shadow-only state indication).

## Planned Phases
1. **Design System Tokens** — HSL utility, shadow math, contrast checker, token structure (CSS custom properties).
2. **Architecture** — Turborepo setup, `@auraform/core` package, Web Surface with Framer Motion, Native Surface with SVG shadows.
3. **Accessibility** — Adaptive shadow check, dual-signaling, OS-level integration, FocusRing component.
4. **Components** — SoftButton, SoftInput, SoftSwitch built on top of Surface.

## Decisions Made
* **Naming:** `@auraform/*` everywhere.
* **Bundler:** tsup (ESM + CJS, .d.ts generation, minification).
* **Build/publish:** npm registry + GitHub (releases/CI). Versioning strategy TBD.
* **Testing:** Unit tests for core math, component tests for react/native. Build output will be minified.
* **Storybook:** Used for component development and visual documentation.

## AuraformProvider Design
The root context component that all Auraform apps must wrap with. Responsibilities:
* **Global theme** — Single source of truth for `baseColor`. Runs `@auraform/core` shadow math (HSL shifts) and distributes tokens to all children via React context.
* **Accessibility guardrails** — Monitors background luminosity; signals children to inject 1px safety border when contrast < 3.0:1.
* **Platform-specific output:**
    * Web: injects CSS custom properties (`--af-bg`, `--af-light-shadow`, `--af-dark-shadow`, `--af-border`) into the DOM.
    * Native: provides token object via context for SVG shadow rendering.
* **Usage:** `<AuraformProvider baseColor="#e0e0e0"><App /></AuraformProvider>`

## Proposed Implementation Steps
1. **Scaffold the monorepo** — Turborepo + pnpm workspaces with `packages/core`, `packages/react`, `packages/native`. All packages under `@auraform/*`.
2. **Build `core`** — HSL utilities, `getNeumorphicTokens()`, contrast checker, token types (TypeScript).
3. **Build `react`** — `AuraformProvider`, `Surface`, then SoftButton/SoftInput/SoftSwitch. Framer Motion for animations, SVG FocusRing.
4. **Build `native`** — `NativeSurface` with `react-native-shadow-2`, haptic integration, OS accessibility detection.
5. **Storybook** — Set up Storybook for `@auraform/react` with stories for each component, interactive controls for props (elevation, baseColor, isInset), and accessibility addon.
6. **Testing & docs** — Unit tests for core math, visual regression via Storybook, usage documentation.
