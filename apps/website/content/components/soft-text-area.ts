import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-text-area",
  name: "SoftTextArea",
  category: "form",
  description:
    "Multi-line text input following the same inset pattern as SoftInput.",
  importName: "SoftTextArea",
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
      name: "autoResize",
      type: "boolean",
      default: "false",
      description: "Auto-grow height based on content",
    },
    {
      name: "style",
      type: "CSSProperties",
      description: "Additional styles",
    },
  ],
  relatedComponents: ["soft-input"],
});
