import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-button",
  name: "SoftButton",
  category: "form",
  description: "Tactile button with press animation and dual-signaling.",
  importName: "SoftButton",
  props: [
    {
      name: "elevation",
      type: "Elevation",
      default: '"medium"',
      description: "Shadow depth",
    },
    {
      name: "variant",
      type: '"default" | "primary"',
      default: '"default"',
      description: "Primary adds accent border + color",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#4A90D9"',
      description: "Accent for the primary variant",
    },
    {
      name: "borderRadius",
      type: "number",
      default: "12",
      description: "Border radius in px",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disabled state",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Button label",
    },
  ],
  relatedComponents: ["soft-icon-button"],
});
