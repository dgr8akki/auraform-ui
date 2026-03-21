import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-icon-button",
  name: "SoftIconButton",
  category: "navigation",
  description:
    "Icon-only button with required accessible label.",
  importName: "SoftIconButton",
  props: [
    {
      name: "aria-label",
      type: "string",
      description: "Accessible label (enforced by TypeScript)",
    },
    {
      name: "elevation",
      type: "Elevation",
      default: '"medium"',
      description: "Shadow depth",
    },
    {
      name: "shape",
      type: '"circle" | "square"',
      default: '"circle"',
      description: "Button shape",
    },
    {
      name: "size",
      type: "number",
      default: "44",
      description: "Width and height in px",
    },
    {
      name: "borderRadius",
      type: "number",
      default: "10",
      description: "Radius for square shape only",
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
      description: "Icon content",
    },
  ],
  relatedComponents: ["soft-button", "soft-tooltip"],
});
