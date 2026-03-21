import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-radio",
  name: "SoftRadioGroup + SoftRadio",
  category: "form",
  description:
    "Radio button group with circular neumorphic discs and arrow-key navigation.",
  importName: "SoftRadioGroup, SoftRadio",
  props: [
    {
      name: "name",
      type: "string",
      description: "Group name for form submission",
    },
    {
      name: "value",
      type: "string",
      description: "Controlled selected value",
    },
    {
      name: "defaultValue",
      type: "string",
      description: "Initial value (uncontrolled)",
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      description: "Selection change handler",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disable all radios",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible group label",
    },
    {
      name: "radioValue",
      type: "string",
      description: "Option value",
    },
    {
      name: "label",
      type: "string",
      description: "Visible label",
    },
    {
      name: "radioDisabled",
      type: "boolean",
      description: "Override group disabled",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#4A90D9"',
      description: "Inner dot color when selected",
    },
  ],
  keyboardNotes: "Arrow keys cycle between options. Space selects.",
  relatedComponents: ["soft-checkbox", "soft-segmented-control"],
});
