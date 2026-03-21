import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-segmented-control",
  name: "SoftSegmentedControl",
  category: "form",
  description:
    "iOS-style segmented toggle with animated sliding active segment.",
  importName: "SoftSegmentedControl",
  props: [
    {
      name: "options",
      type: "SegmentOption[]",
      description: "{ value: string, label: string }[]",
    },
    {
      name: "value",
      type: "string",
      description: "Controlled selected value",
    },
    {
      name: "defaultValue",
      type: "string",
      default: "first option",
      description: "Initial selected value",
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      description: "Selection change handler",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#4A90D9"',
      description: "Active segment text color",
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
    'role="radiogroup" with each segment as role="radio". Arrow keys cycle options.',
  relatedComponents: ["soft-tabs", "soft-radio"],
});
