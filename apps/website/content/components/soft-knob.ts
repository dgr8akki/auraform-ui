import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-knob",
  name: "SoftKnob",
  category: "form",
  description:
    "Rotary dial control with SVG arc indicator. Drag vertically or use arrow keys.",
  importName: "SoftKnob",
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
      description: "Min value",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "Max value",
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
      name: "size",
      type: "number",
      default: "80",
      description: "Knob diameter in px",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#4A90D9"',
      description: "Arc and indicator color",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disabled state",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible label",
    },
  ],
  keyboardNotes:
    'Vertical drag (up = increase), arrow keys, Home/End. role="slider" with full ARIA.',
  relatedComponents: ["soft-slider", "soft-vertical-slider"],
});
