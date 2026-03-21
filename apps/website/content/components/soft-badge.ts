import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-badge",
  name: "SoftBadge",
  category: "display",
  description: "Notification badge overlay for child elements.",
  importName: "SoftBadge",
  props: [
    {
      name: "count",
      type: "number",
      default: "0",
      description: "Badge count (0 hides the badge)",
    },
    {
      name: "max",
      type: "number",
      default: "99",
      description: 'Maximum before showing "99+"',
    },
    {
      name: "dot",
      type: "boolean",
      default: "false",
      description: "Show small dot instead of count",
    },
    {
      name: "color",
      type: "string",
      default: '"#E74C3C"',
      description: "Badge background color",
    },
    {
      name: "aria-label",
      type: "string",
      default: "auto",
      description: "Accessible description",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Element to overlay the badge on",
    },
  ],
  accessibilityNotes:
    'role="status" with auto-generated label like "5 notifications".',
  relatedComponents: ["soft-icon-button", "soft-avatar"],
});
