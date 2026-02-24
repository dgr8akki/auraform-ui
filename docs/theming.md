# Theming

Auraform's theming is deliberately simple: pass one color, get an entire neumorphic theme. No token files, no CSS-in-JS configuration — just a hex value.

---

## How It Works

1. You pass a `baseColor` hex string to `AuraformProvider` (or `NativeAuraformProvider`).
2. The `@auraform/core` engine converts it to HSL and generates:
   - **Light shadow:** Lightness increased by `intensity`%, saturation decreased by 5%
   - **Dark shadow:** Lightness decreased by `intensity`%, saturation increased by 10%
   - **Border:** Auto-injected only if the shadow contrast is below 3.0:1
3. Every component reads these tokens from context and applies them.

---

## Choosing a Base Color

Neumorphism works best with **mid-tone** colors. Extremely light or dark colors compress the available range for shadow generation.

| Base Color | Result |
|------------|--------|
| `#e0e0e0` | ✅ Classic light gray — excellent shadow visibility |
| `#d0d0d0` | ✅ Slightly darker gray — strong depth |
| `#f0e6d3` | ✅ Warm beige — soft, organic feel |
| `#d3e0f0` | ✅ Cool blue — calm, professional |
| `#e0d3f0` | ✅ Soft lavender — modern, creative |
| `#ffffff` | ⚠️ Pure white — shadows will be faint, border auto-injected |
| `#1a1a1a` | ⚠️ Near black — highlight shadow will be subtle, border auto-injected |

The auto-border feature ensures usability even with extreme colors, but mid-tones produce the most visually pleasing results.

---

## Adjusting Intensity

The `intensity` prop controls how far the shadow colors deviate from the base:

```tsx
{/* Subtle, soft shadows */}
<AuraformProvider baseColor="#e0e0e0" intensity={10}>

{/* Default — balanced */}
<AuraformProvider baseColor="#e0e0e0" intensity={15}>

{/* Bold, pronounced shadows */}
<AuraformProvider baseColor="#e0e0e0" intensity={25}>
```

| Intensity | Light Shadow Shift | Dark Shadow Shift | Feel |
|-----------|-------------------|-------------------|------|
| `10` | L + 10% | L − 10% | Whisper-soft, minimal |
| `15` | L + 15% | L − 15% | Default — balanced depth |
| `20` | L + 20% | L − 20% | Noticeable, tactile |
| `25` | L + 25% | L − 25% | Bold, high-contrast |

---

## CSS Custom Properties

On the web, `AuraformProvider` injects CSS custom properties on its wrapper `<div>`:

```css
--af-bg: #e0e0e0;
--af-light-shadow: #f5f0f0;
--af-dark-shadow: #b8b8c1;
--af-border: none;
```

You can use these in your own CSS or inline styles:

```css
.my-custom-element {
  background: var(--af-bg);
  box-shadow:
    6px 6px 12px var(--af-dark-shadow),
    -6px -6px 12px var(--af-light-shadow);
  border: var(--af-border);
}
```

---

## Dark Mode

To create a dark neumorphic theme, use a dark mid-tone as the base color:

```tsx
function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <AuraformProvider baseColor={isDark ? '#2d2d3d' : '#e0e0e0'}>
      <div style={{
        background: isDark ? '#2d2d3d' : '#e0e0e0',
        color: isDark ? '#e0e0e0' : '#333',
        minHeight: '100vh',
      }}>
        <SoftButton onClick={() => setIsDark(!isDark)}>
          Toggle Theme
        </SoftButton>
      </div>
    </AuraformProvider>
  );
}
```

**Tips for dark themes:**
- Use colors in the `#2a–#3a` lightness range (e.g. `#2d2d3d`, `#303040`)
- Increase `intensity` slightly (18–22) for better shadow visibility
- Set text color to a light value — components inherit `color` from their parent

---

## Theme Presets

Here are some tested base colors that produce great neumorphic results:

```tsx
const themes = {
  // Light themes
  silver:    '#e0e0e0',
  warmGray:  '#e8e0d8',
  coolBlue:  '#d3e0f0',
  lavender:  '#e0d3f0',
  mint:      '#d3f0e0',
  peach:     '#f0ddd3',

  // Dark themes
  charcoal:  '#2d2d3d',
  midnight:  '#1e2030',
  slate:     '#303845',
  espresso:  '#352820',
};
```

---

## Per-Component Accent Colors

While the base theme is set at the provider level, each component can override its accent color:

```tsx
<SoftButton accentColor="#E74C3C" variant="primary">Delete</SoftButton>
<SoftButton accentColor="#27AE60" variant="primary">Confirm</SoftButton>
<SoftSwitch accentColor="#8E44AD" aria-label="Feature toggle" />
<SoftSlider accentColor="#F39C12" aria-label="Brightness" />
```

The accent color is used for:
- Primary button borders and text
- Checkbox/radio fill when selected
- Switch track when on
- Slider filled portion and thumb border
- Chip background when selected
- Tab text when active
- Progress bar fill

---

## Nested Themes

You can nest providers to create sections with different themes:

```tsx
<AuraformProvider baseColor="#e0e0e0">
  <Surface elevation="medium">
    <p>Light section</p>
  </Surface>

  {/* Dark section within the light app */}
  <AuraformProvider baseColor="#2d2d3d">
    <div style={{ background: '#2d2d3d', color: '#e0e0e0', padding: 20 }}>
      <Surface elevation="medium">
        <p>Dark section</p>
      </Surface>
    </div>
  </AuraformProvider>
</AuraformProvider>
```

Each provider computes its own tokens independently, so nested themes work seamlessly.
