import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-stepper",
  name: "SoftStepper",
  category: "form",
  description:
    "Numeric increment/decrement counter with extruded +/\u2212 buttons and inset value display.",
  importName: "SoftStepper",
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
      default: "-Infinity",
      description: "Minimum value",
    },
    {
      name: "max",
      type: "number",
      default: "Infinity",
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
      description: "Button accent color",
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
  accessibilityNotes: 'role="spinbutton" with arrow key support.',
  relatedComponents: ["soft-slider"],
});
