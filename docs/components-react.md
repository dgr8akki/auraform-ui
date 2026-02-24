# React Components

All components are exported from `@auraform/react` and must be used inside an `<AuraformProvider>`.

```tsx
import { AuraformProvider, SoftButton, SoftInput } from '@auraform/react';
```

---

## Provider & Utilities

### `AuraformProvider`

Root context provider that computes neumorphic tokens and injects CSS custom properties.

```tsx
<AuraformProvider baseColor="#e0e0e0" intensity={15}>
  {children}
</AuraformProvider>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `baseColor` | `string` | **required** | Hex color for the background theme |
| `intensity` | `number` | `15` | Lightness shift (%) for shadow generation |
| `children` | `ReactNode` | — | App content |

**CSS custom properties set:** `--af-bg`, `--af-light-shadow`, `--af-dark-shadow`, `--af-border`

### `useAuraform()`

Hook to access tokens from context.

```tsx
const { tokens, baseColor } = useAuraform();
```

Returns `{ tokens: AuraformTokens, baseColor: string }`.

### `FocusRing`

SVG-based focus indicator that overlays the neumorphic component shape. Used internally by all interactive components — you can also use it in custom components.

```tsx
<FocusRing visible={isFocused} borderRadius={12} color="#4A90D9" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | **required** | Whether the ring is shown |
| `borderRadius` | `number` | `12` | Matches the parent component's radius |
| `color` | `string` | `#4A90D9` | Ring color |
| `width` | `number` | `2` | Ring thickness (px) |
| `offset` | `number` | `3` | Gap between ring and component edge (px) |

---

## Primitives

### `Surface`

The base neumorphic building block. All higher-level components are built on this pattern.

```tsx
<Surface elevation="medium" borderRadius={16}>
  Content goes here
</Surface>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `elevation` | `Elevation` | `"medium"` | `"flat"` · `"low"` · `"medium"` · `"high"` |
| `isInset` | `boolean` | `false` | Renders with inset (pressed) shadows |
| `borderRadius` | `number` | `12` | Border radius in px |
| `style` | `CSSProperties` | — | Additional inline styles |
| `children` | `ReactNode` | — | Content |

Also accepts all `HTMLMotionProps<"div">` from Framer Motion (e.g. `whileHover`, `animate`).

---

## Form Components

### `SoftButton`

Tactile button with press animation and dual-signaling.

```tsx
<SoftButton variant="primary" onClick={handleClick}>
  Submit
</SoftButton>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `elevation` | `Elevation` | `"medium"` | Shadow depth |
| `variant` | `"default" \| "primary"` | `"default"` | Primary adds accent border + color |
| `accentColor` | `string` | `"#4A90D9"` | Accent for the primary variant |
| `borderRadius` | `number` | `12` | Border radius in px |
| `disabled` | `boolean` | `false` | Disabled state |
| `style` | `CSSProperties` | — | Additional styles |
| `children` | `ReactNode` | — | Button label |

Accepts all `HTMLMotionProps<"button">` (e.g. `onClick`, `onMouseEnter`).

---

### `SoftInput`

Inset text field with a high-contrast bottom border indicator.

```tsx
<SoftInput
  placeholder="Enter email"
  type="email"
  accentColor="#4A90D9"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `borderRadius` | `number` | `12` | Border radius in px |
| `accentColor` | `string` | `"#4A90D9"` | Bottom border color on focus |
| `style` | `CSSProperties` | — | Additional styles |

Accepts all standard `<input>` HTML attributes (`placeholder`, `type`, `value`, `onChange`, etc.).

---

### `SoftTextArea`

Multi-line text input following the same inset pattern as `SoftInput`.

```tsx
<SoftTextArea
  placeholder="Write a message..."
  rows={4}
  autoResize
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `borderRadius` | `number` | `12` | Border radius in px |
| `accentColor` | `string` | `"#4A90D9"` | Bottom border color on focus |
| `autoResize` | `boolean` | `false` | Auto-grow height based on content |
| `style` | `CSSProperties` | — | Additional styles |

Accepts all standard `<textarea>` HTML attributes (`rows`, `placeholder`, `value`, etc.).

---

### `SoftCheckbox`

Neumorphic checkbox with extruded → inset depth shift and SVG checkmark.

```tsx
<SoftCheckbox
  label="I agree to the terms"
  onChange={(checked) => console.log(checked)}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Initial state (uncontrolled) |
| `onChange` | `(checked: boolean) => void` | — | Change handler |
| `accentColor` | `string` | `"#4A90D9"` | Fill color when checked |
| `disabled` | `boolean` | `false` | Disabled state |
| `label` | `string` | — | Visible label text |
| `aria-label` | `string` | — | Accessible label (when no visible label) |

**Dual-signaling:** Checked state uses both accent color fill AND inset shadow depth.

---

### `SoftRadioGroup` + `SoftRadio`

Radio button group with circular neumorphic discs and arrow-key navigation.

```tsx
<SoftRadioGroup name="plan" defaultValue="pro" aria-label="Select plan">
  <SoftRadio value="basic" label="Basic" />
  <SoftRadio value="pro" label="Pro" />
  <SoftRadio value="enterprise" label="Enterprise" />
</SoftRadioGroup>
```

**SoftRadioGroup props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | **required** | Group name for form submission |
| `value` | `string` | — | Controlled selected value |
| `defaultValue` | `string` | — | Initial value (uncontrolled) |
| `onChange` | `(value: string) => void` | — | Selection change handler |
| `disabled` | `boolean` | `false` | Disable all radios |
| `aria-label` | `string` | — | Accessible group label |
| `aria-labelledby` | `string` | — | ID of labelling element |

**SoftRadio props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Option value |
| `label` | `string` | — | Visible label |
| `disabled` | `boolean` | — | Override group disabled for this option |
| `accentColor` | `string` | `"#4A90D9"` | Inner dot color when selected |

**Keyboard:** Arrow keys cycle between options. Space selects.

---

### `SoftSwitch`

Toggle switch using physical depth and accent color to indicate state.

```tsx
<SoftSwitch
  checked={isEnabled}
  onChange={setIsEnabled}
  aria-label="Enable notifications"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Controlled state |
| `defaultChecked` | `boolean` | `false` | Initial state (uncontrolled) |
| `onChange` | `(checked: boolean) => void` | — | Toggle handler |
| `accentColor` | `string` | `"#4A90D9"` | Track color when on |
| `disabled` | `boolean` | `false` | Disabled state |
| `aria-label` | `string` | — | Accessible label |

**Dual-signaling:** On state uses accent color fill AND inset track shadow. Off state is extruded.

---

### `SoftSlider`

Range slider with neumorphic inset track, extruded thumb, and accent fill.

```tsx
<SoftSlider
  defaultValue={50}
  min={0}
  max={100}
  step={5}
  aria-label="Volume"
  onChange={(val) => console.log(val)}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Controlled value |
| `defaultValue` | `number` | `0` | Initial value (uncontrolled) |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `onChange` | `(value: number) => void` | — | Value change handler |
| `accentColor` | `string` | `"#4A90D9"` | Color of the filled track portion |
| `disabled` | `boolean` | `false` | Disabled state |
| `width` | `number` | `200` | Track width in px |
| `aria-label` | `string` | — | Accessible label |
| `aria-valuetext` | `string` | — | Custom text for screen readers |

**Keyboard:** Arrow keys adjust by step. Home/End jump to min/max. Supports pointer drag.

---

## Display & Feedback

### `SoftCard`

Semantic card container with optional header, footer, and media slots.

```tsx
<SoftCard
  header="Card Title"
  footer={<span>Updated just now</span>}
  elevation="high"
  style={{ width: 320 }}
>
  Card body content goes here.
</SoftCard>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `elevation` | `Elevation` | `"medium"` | Shadow depth |
| `borderRadius` | `number` | `16` | Border radius in px |
| `header` | `ReactNode` | — | Header content (rendered with bold weight) |
| `footer` | `ReactNode` | — | Footer content (separated by a subtle border) |
| `media` | `ReactNode` | — | Media element at the top (no padding) |
| `interactive` | `boolean` | `false` | Enable hover/press animations and focus ring |
| `style` | `CSSProperties` | — | Additional styles |
| `children` | `ReactNode` | — | Body content |

Renders as `<article>`. Accepts Framer Motion props.

---

### `SoftProgress`

Linear and circular progress indicators with determinate and indeterminate modes.

```tsx
{/* Linear, determinate */}
<SoftProgress value={65} variant="linear" showLabel aria-label="Upload" />

{/* Circular, indeterminate */}
<SoftProgress variant="circular" aria-label="Loading" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Progress 0–100. Omit for indeterminate. |
| `variant` | `"linear" \| "circular"` | `"linear"` | Visual style |
| `accentColor` | `string` | `"#4A90D9"` | Fill color |
| `size` | `number` | `200` (linear) / `48` (circular) | Width or diameter in px |
| `thickness` | `number` | `8` (linear) / `4` (circular) | Track thickness in px |
| `showLabel` | `boolean` | `false` | Show percentage text |
| `aria-label` | `string` | — | Accessible label |

**ARIA:** `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.

---

### `SoftChip`

Compact label/tag with selectable and removable modes.

```tsx
<SoftChip label="React" selectable onSelect={(sel) => console.log(sel)} />
<SoftChip label="Delete me" removable onRemove={() => handleRemove()} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | Chip text |
| `selected` | `boolean` | — | Controlled selected state |
| `defaultSelected` | `boolean` | `false` | Initial selected state |
| `selectable` | `boolean` | `false` | Enable toggle selection |
| `onSelect` | `(selected: boolean) => void` | — | Selection handler |
| `removable` | `boolean` | `false` | Show remove (✕) icon |
| `onRemove` | `() => void` | — | Remove handler |
| `accentColor` | `string` | `"#4A90D9"` | Selected state color |
| `disabled` | `boolean` | `false` | Disabled state |

**Dual-signaling:** Selected chips use accent color fill AND inset shadow.

---

### `SoftBadge`

Notification badge overlay for child elements.

```tsx
<SoftBadge count={5}>
  <SoftIconButton aria-label="Notifications">🔔</SoftIconButton>
</SoftBadge>

<SoftBadge dot>
  <SoftIconButton aria-label="Messages">✉️</SoftIconButton>
</SoftBadge>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | `0` | Badge count (0 hides the badge) |
| `max` | `number` | `99` | Maximum before showing "99+" |
| `dot` | `boolean` | `false` | Show small dot instead of count |
| `color` | `string` | `"#E74C3C"` | Badge background color |
| `aria-label` | `string` | auto | Accessible description |
| `children` | `ReactNode` | **required** | Element to overlay the badge on |

**ARIA:** `role="status"` with auto-generated label like "5 notifications".

---

### `SoftAvatar`

Circular or rounded avatar for images and initials.

```tsx
<SoftAvatar src="https://example.com/photo.jpg" alt="Jane Doe" size="lg" />
<SoftAvatar fallback="JD" size="md" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image URL |
| `alt` | `string` | — | Alt text for the image |
| `fallback` | `string` | `"?"` | Initials text (max 2 chars displayed) |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size: 32px / 44px / 64px |
| `shape` | `"circle" \| "rounded"` | `"circle"` | Avatar shape |
| `aria-label` | `string` | — | Accessible label (falls back to `alt` or `fallback`) |

Automatically falls back to initials if the image fails to load.

---

### `SoftDivider`

Neumorphic separator line using an inset groove shadow.

```tsx
<SoftDivider />
<SoftDivider orientation="vertical" length={40} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Direction |
| `length` | `string \| number` | `"100%"` | Length of the divider |
| `spacing` | `number` | `12` | Margin around the divider (px) |

Renders as `<hr>` with `role="separator"`.

---

## Navigation

### `SoftTabs` + `SoftTabList` + `SoftTab` + `SoftTabPanel`

Neumorphic tab navigation with full ARIA support and keyboard navigation.

```tsx
<SoftTabs defaultValue="features">
  <SoftTabList aria-label="Sections">
    <SoftTab value="overview">Overview</SoftTab>
    <SoftTab value="features">Features</SoftTab>
    <SoftTab value="pricing">Pricing</SoftTab>
  </SoftTabList>

  <SoftTabPanel value="overview">Overview content</SoftTabPanel>
  <SoftTabPanel value="features">Features content</SoftTabPanel>
  <SoftTabPanel value="pricing">Pricing content</SoftTabPanel>
</SoftTabs>
```

**SoftTabs props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled active tab |
| `defaultValue` | `string` | **required** | Default active tab |
| `onChange` | `(tabId: string) => void` | — | Tab change handler |

**SoftTabList props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aria-label` | `string` | — | Accessible label for the tab list |

**SoftTab props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Unique tab identifier |
| `disabled` | `boolean` | `false` | Disabled state |
| `accentColor` | `string` | `"#4A90D9"` | Active tab accent color |
| `children` | `ReactNode` | — | Tab label |

**SoftTabPanel props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Must match a `SoftTab` value |
| `children` | `ReactNode` | — | Panel content |

**Keyboard:** Left/Right arrows cycle tabs. Home/End jump to first/last. Only the active tab is in the tab order.

**ARIA:** `role="tablist"` / `role="tab"` / `role="tabpanel"`, `aria-selected`, `aria-controls`, `aria-labelledby` all auto-wired.

---

### `SoftIconButton`

Icon-only button with required accessible label.

```tsx
<SoftIconButton aria-label="Settings" shape="circle" size={44}>
  ⚙️
</SoftIconButton>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aria-label` | `string` | **required** | Accessible label (enforced by TypeScript) |
| `elevation` | `Elevation` | `"medium"` | Shadow depth |
| `shape` | `"circle" \| "square"` | `"circle"` | Button shape |
| `size` | `number` | `44` | Width and height in px |
| `borderRadius` | `number` | `10` | Radius for square shape only |
| `disabled` | `boolean` | `false` | Disabled state |
| `style` | `CSSProperties` | — | Additional styles |
| `children` | `ReactNode` | **required** | Icon content |

Accepts all `HTMLMotionProps<"button">`.

---

### `SoftTooltip`

Floating tooltip on hover and focus with neumorphic styling.

```tsx
<SoftTooltip content="Save document" placement="bottom">
  <SoftIconButton aria-label="Save">💾</SoftIconButton>
</SoftTooltip>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | **required** | Tooltip text |
| `placement` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Position relative to trigger |
| `delay` | `number` | `200` | Delay before showing (ms) |
| `offset` | `number` | `8` | Distance from trigger (px) |
| `children` | `ReactElement` | **required** | Trigger element |

**ARIA:** `role="tooltip"`, `aria-describedby` linking automatically applied to the trigger element.

---

## Common Patterns

### Controlled vs Uncontrolled

All stateful components (checkbox, radio, switch, slider, tabs, chip) support both patterns:

```tsx
{/* Uncontrolled — manages its own state */}
<SoftCheckbox defaultChecked label="Remember me" />

{/* Controlled — you manage the state */}
const [checked, setChecked] = useState(false);
<SoftCheckbox checked={checked} onChange={setChecked} label="Remember me" />
```

### Forwarded Refs

All components use `forwardRef`, so you can attach refs for imperative access:

```tsx
const inputRef = useRef<HTMLInputElement>(null);
<SoftInput ref={inputRef} placeholder="Focus me" />

// Later:
inputRef.current?.focus();
```

### Accent Color

Most interactive components accept `accentColor` (default: `#4A90D9`) for dual-signaling. This color is used for borders, fills, and active state indicators alongside shadow depth changes.
