import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-input",
  name: "SoftInput",
  category: "form",
  description:
    "Inset text field with a high-contrast bottom border indicator.",
  importName: "SoftInput",
  props: [
    {
      name: "borderRadius",
      type: "number",
      default: "12",
      description: "Border radius in px",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#4A90D9"',
      description: "Bottom border color on focus",
    },
    {
      name: "style",
      type: "CSSProperties",
      description: "Additional styles",
    },
  ],
  relatedComponents: ["soft-text-area"],
});
