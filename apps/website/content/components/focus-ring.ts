import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "focus-ring",
  name: "FocusRing",
  category: "primitive",
  description:
    "SVG-based focus indicator that overlays the neumorphic component shape.",
  importName: "FocusRing",
  props: [
    {
      name: "visible",
      type: "boolean",
      description: "Whether the ring is shown",
    },
    {
      name: "borderRadius",
      type: "number",
      default: "12",
      description: "Matches the parent component's radius",
    },
    {
      name: "color",
      type: "string",
      default: '"#4A90D9"',
      description: "Ring color",
    },
    {
      name: "width",
      type: "number",
      default: "2",
      description: "Ring thickness (px)",
    },
    {
      name: "offset",
      type: "number",
      default: "3",
      description: "Gap between ring and component edge (px)",
    },
  ],
});
