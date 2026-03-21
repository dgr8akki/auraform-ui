import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "surface",
  name: "Surface",
  category: "primitive",
  description:
    "The base neumorphic building block. All higher-level components are built on this pattern.",
  importName: "Surface",
  props: [
    {
      name: "elevation",
      type: "Elevation",
      default: '"medium"',
      description: '"flat" | "low" | "medium" | "high"',
    },
    {
      name: "isInset",
      type: "boolean",
      default: "false",
      description: "Renders with inset (pressed) shadows",
    },
    {
      name: "borderRadius",
      type: "number",
      default: "12",
      description: "Border radius in px",
    },
    {
      name: "style",
      type: "CSSProperties",
      description: "Additional inline styles",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Content",
    },
  ],
});
