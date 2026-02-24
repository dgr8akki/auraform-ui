# Accessibility

Neumorphic design has a well-known accessibility problem: low-contrast soft shadows make it hard (or impossible) for many users to distinguish UI elements from the background. Auraform UI exists to solve this.

Every component in the library is built with accessibility as a first-class concern — not an afterthought.

---

## The Four Pillars

### 1. Automatic Contrast Safety

The `@auraform/core` token engine computes shadow colors from your base color using HSL shifts. After generating the light and dark shadows, it runs a **WCAG 2.0 contrast ratio check**:

- If the contrast between the light shadow and the background is **≥ 3.0:1** → shadows alone are sufficient.
- If it falls **below 3.0:1** → the engine automatically injects a subtle `1px solid rgba(0,0,0,0.1)` border so component edges remain perceptible.

This happens automatically — no configuration needed. You can adjust the threshold by working with the `contrastRatio()` utility directly for custom components.

### 2. Dual-Signaling

Traditional neumorphism often uses shadow depth as the **only** indicator of state (pressed, active, checked). This fails for users who can't perceive subtle depth differences.

Auraform uses **dual-signaling** — every state change communicates through two independent channels:

| State | Channel 1 (Depth) | Channel 2 (Color) |
|-------|-------------------|-------------------|
| Button pressed | Extruded → inset shadow | Scale animation (0.98) |
| Checkbox checked | Extruded → inset shadow | Accent color fill + checkmark icon |
| Radio selected | Extruded → inset shadow | Accent-colored inner dot |
| Switch on | Extruded → inset track | Accent color track fill |
| Chip selected | Extruded → inset shadow | Accent color background |
| Tab active | Flat → extruded shadow | Accent color text + bold weight |
| Slider position | Inset track depth | Accent color fill bar + thumb border |

This ensures that no information is conveyed through shadows alone.

### 3. Keyboard-First Focus Management

Every interactive component implements:

- **`:focus-visible` detection** — Focus rings only appear on keyboard navigation, not on mouse clicks. This uses the browser's native `:focus-visible` pseudo-class matched via `e.target.matches(":focus-visible")`.

- **`FocusRing` component** — A dedicated overlay that renders a visible ring following the neumorphic shape of the component. Customizable color, width, and offset.

- **Arrow-key navigation** — Composite widgets follow WAI-ARIA patterns:
  - `SoftRadioGroup`: Arrow keys cycle between radio options
  - `SoftTabs`: Left/Right arrows cycle tabs, Home/End jump to first/last
  - `SoftSlider`: Arrow keys adjust value by step, Home/End jump to min/max

- **Proper ARIA roles and attributes** on every component:
  - `role="switch"` with `aria-checked` on SoftSwitch
  - `role="slider"` with `aria-valuenow/min/max` on SoftSlider
  - `role="radiogroup"` + `role="radio"` with `aria-checked` on radio components
  - `role="tablist"` / `role="tab"` / `role="tabpanel"` with `aria-selected` and `aria-controls` on tabs
  - `role="progressbar"` with `aria-valuenow` on SoftProgress
  - `role="tooltip"` with `aria-describedby` on SoftTooltip
  - `role="status"` with descriptive `aria-label` on SoftBadge
  - `role="separator"` on SoftDivider
  - `role="img"` with `aria-label` on SoftAvatar
  - Required `aria-label` enforced via TypeScript on SoftIconButton

### 4. OS-Level Integration (React Native)

On mobile, Auraform detects and responds to system accessibility settings:

**Reduce Motion** (`useReduceMotion` hook):
- Listens to `AccessibilityInfo.isReduceMotionEnabled()`
- When `true`, animations should be suppressed or simplified
- The hook is reactive — it updates when the user toggles the setting

**Bold Text / Increase Contrast** (`useBoldText` hook):
- Listens to `AccessibilityInfo.isBoldTextEnabled()`
- When `true`, the `NativeAuraformProvider` automatically increases shadow intensity by +5
- `NativeSurface` increases shadow distance by 30%

---

## Testing Accessibility

### Storybook a11y Addon

The Storybook setup includes `@storybook/addon-a11y`, which runs automated accessibility checks on every story. Open the "Accessibility" panel in Storybook to see violations and warnings.

### Manual Testing Checklist

- [ ] **Keyboard navigation**: Tab through all interactive elements. Verify focus rings appear. Test arrow keys on radio groups, tabs, and sliders.
- [ ] **Screen reader**: Navigate with VoiceOver (macOS/iOS) or TalkBack (Android). Verify all roles, labels, and state changes are announced.
- [ ] **High contrast mode**: Enable Windows High Contrast or `forced-colors` media query. Verify borders and focus indicators remain visible.
- [ ] **Zoom**: Scale to 200%. Verify no content is clipped or overlapping.
- [ ] **Color blindness**: Use a color blindness simulator. Verify all states are distinguishable without relying on color alone (dual-signaling).

---

## Customizing for Accessibility

### Increasing Contrast

Raise the `intensity` prop on the provider:

```tsx
<AuraformProvider baseColor="#e0e0e0" intensity={25}>
  {/* Stronger shadows, more visible edges */}
</AuraformProvider>
```

### Custom Focus Ring

Override the default focus ring on any component:

```tsx
<FocusRing
  visible={isFocused}
  borderRadius={12}
  color="#FF6600"     // High-visibility orange
  width={3}           // Thicker ring
  offset={4}          // More spacing
/>
```

### Accent Color Choice

Choose accent colors with sufficient contrast against your background. A good rule of thumb: the accent should have at least a **4.5:1 contrast ratio** with the background for text, and **3:1** for large UI elements.

```tsx
// Good: strong contrast on light gray
<SoftButton accentColor="#1a65a3" variant="primary">Submit</SoftButton>

// Avoid: low contrast on light gray
<SoftButton accentColor="#c0c0c0" variant="primary">Submit</SoftButton>
```
