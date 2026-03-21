import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-rating",
  name: "SoftRating",
  category: "form",
  description:
    "Interactive star rating with hover preview and keyboard navigation.",
  importName: "SoftRating",
  props: [
    {
      name: "value",
      type: "number",
      description: "Controlled value",
    },
    {
      name: "defaultValue",
      type: "number",
      default: "0",
      description: "Initial value",
    },
    {
      name: "max",
      type: "number",
      default: "5",
      description: "Number of stars",
    },
    {
      name: "onChange",
      type: "(value: number) => void",
      description: "Rating change handler",
    },
    {
      name: "size",
      type: "number",
      default: "32",
      description: "Star size in px",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#F5A623"',
      description: "Filled star color",
    },
    {
      name: "readOnly",
      type: "boolean",
      default: "false",
      description: "Read-only mode",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disabled state",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible label",
    },
  ],
  accessibilityNotes:
    'role="radiogroup" with each star as role="radio". Arrow keys navigate between stars.',
  relatedComponents: ["soft-segmented-control"],
});
