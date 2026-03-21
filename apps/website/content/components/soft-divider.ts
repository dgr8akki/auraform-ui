import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-divider",
  name: "SoftDivider",
  category: "display",
  description:
    "Neumorphic separator line using an inset groove shadow.",
  importName: "SoftDivider",
  props: [
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description: "Direction",
    },
    {
      name: "length",
      type: "string | number",
      default: '"100%"',
      description: "Length of the divider",
    },
    {
      name: "spacing",
      type: "number",
      default: "12",
      description: "Margin around the divider (px)",
    },
  ],
  accessibilityNotes:
    'Renders as <hr> with role="separator".',
});
