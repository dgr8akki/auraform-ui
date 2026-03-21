import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-progress",
  name: "SoftProgress",
  category: "display",
  description:
    "Linear and circular progress indicators with determinate and indeterminate modes.",
  importName: "SoftProgress",
  props: [
    {
      name: "value",
      type: "number",
      description: "Progress 0–100. Omit for indeterminate.",
    },
    {
      name: "variant",
      type: '"linear" | "circular"',
      default: '"linear"',
      description: "Visual style",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#4A90D9"',
      description: "Fill color",
    },
    {
      name: "size",
      type: "number",
      default: "200 / 48",
      description: "Width (linear) or diameter (circular) in px",
    },
    {
      name: "thickness",
      type: "number",
      default: "8 / 4",
      description: "Track thickness in px",
    },
    {
      name: "showLabel",
      type: "boolean",
      default: "false",
      description: "Show percentage text",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible label",
    },
  ],
  accessibilityNotes:
    'role="progressbar", aria-valuenow, aria-valuemin, aria-valuemax.',
  relatedComponents: ["soft-gauge"],
});
