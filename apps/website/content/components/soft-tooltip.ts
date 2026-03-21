import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-tooltip",
  name: "SoftTooltip",
  category: "navigation",
  description:
    "Floating tooltip on hover and focus with neumorphic styling.",
  importName: "SoftTooltip",
  props: [
    {
      name: "content",
      type: "string",
      description: "Tooltip text",
    },
    {
      name: "placement",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description: "Position relative to trigger",
    },
    {
      name: "delay",
      type: "number",
      default: "200",
      description: "Delay before showing (ms)",
    },
    {
      name: "offset",
      type: "number",
      default: "8",
      description: "Distance from trigger (px)",
    },
    {
      name: "children",
      type: "ReactElement",
      description: "Trigger element",
    },
  ],
  accessibilityNotes:
    'role="tooltip", aria-describedby linking automatically applied to trigger.',
  relatedComponents: ["soft-icon-button"],
});
