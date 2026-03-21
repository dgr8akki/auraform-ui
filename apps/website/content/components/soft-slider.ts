import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-slider",
  name: "SoftSlider",
  category: "form",
  description:
    "Range slider with neumorphic inset track, extruded thumb, and accent fill.",
  importName: "SoftSlider",
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
      description: "Initial value (uncontrolled)",
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
      description: "Color of the filled track portion",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disabled state",
    },
    {
      name: "width",
      type: "number",
      default: "200",
      description: "Track width in px",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible label",
    },
  ],
  keyboardNotes: "Arrow keys adjust by step. Home/End jump to min/max.",
  relatedComponents: ["soft-vertical-slider", "soft-knob"],
});
