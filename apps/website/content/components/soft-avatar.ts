import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-avatar",
  name: "SoftAvatar",
  category: "display",
  description: "Circular or rounded avatar for images and initials.",
  importName: "SoftAvatar",
  props: [
    {
      name: "src",
      type: "string",
      description: "Image URL",
    },
    {
      name: "alt",
      type: "string",
      description: "Alt text for the image",
    },
    {
      name: "fallback",
      type: "string",
      default: '"?"',
      description: "Initials text (max 2 chars)",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Size: 32px / 44px / 64px",
    },
    {
      name: "shape",
      type: '"circle" | "rounded"',
      default: '"circle"',
      description: "Avatar shape",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible label (falls back to alt or fallback)",
    },
  ],
  accessibilityNotes:
    "Automatically falls back to initials if the image fails to load.",
  relatedComponents: ["soft-badge"],
});
