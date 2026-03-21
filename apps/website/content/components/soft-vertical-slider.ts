import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-vertical-slider",
  name: "SoftVerticalSlider",
  category: "form",
  description:
    "Vertical volume/mixer-style slider with inset track and extruded thumb.",
  importName: "SoftVerticalSlider",
  props: [
    {
      name: "value",
      type: "number",
      description: "Controlled value",
    },
    {
      name: "defaultValue",
      type: "number",
      default: "0",
      description: "Initial value",
    },
    {
      name: "min",
      type: "number",
      default: "0",
      description: "Minimum value",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "Maximum value",
    },
    {
      name: "step",
      type: "number",
      default: "1",
      description: "Step increment",
    },
    {
      name: "onChange",
      type: "(value: number) => void",
      description: "Value change handler",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#4A90D9"',
      description: "Color of the filled track",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disabled state",
    },
    {
      name: "height",
      type: "number",
      default: "200",
      description: "Track height in px",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible label",
    },
  ],
  keyboardNotes:
    "Arrow Up/Right = increase, Arrow Down/Left = decrease. Home = max, End = min.",
  relatedComponents: ["soft-slider", "soft-knob"],
});
