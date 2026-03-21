import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-card",
  name: "SoftCard",
  category: "display",
  description:
    "Semantic card container with optional header, footer, and media slots.",
  importName: "SoftCard",
  props: [
    {
      name: "elevation",
      type: "Elevation",
      default: '"medium"',
      description: "Shadow depth",
    },
    {
      name: "borderRadius",
      type: "number",
      default: "16",
      description: "Border radius in px",
    },
    {
      name: "header",
      type: "ReactNode",
      description: "Header content (bold weight)",
    },
    {
      name: "footer",
      type: "ReactNode",
      description: "Footer content (separated by subtle border)",
    },
    {
      name: "media",
      type: "ReactNode",
      description: "Media element at top (no padding)",
    },
    {
      name: "interactive",
      type: "boolean",
      default: "false",
      description: "Enable hover/press animations and focus ring",
    },
    {
      name: "style",
      type: "CSSProperties",
      description: "Additional styles",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Body content",
    },
  ],
  accessibilityNotes:
    "Renders as <article>. Accepts Framer Motion props.",
  relatedComponents: ["surface"],
});
