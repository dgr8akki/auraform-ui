import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-checkbox",
  name: "SoftCheckbox",
  category: "form",
  description:
    "Neumorphic checkbox with extruded \u2192 inset depth shift and SVG checkmark.",
  importName: "SoftCheckbox",
  props: [
    {
      name: "checked",
      type: "boolean",
      description: "Controlled checked state",
    },
    {
      name: "defaultChecked",
      type: "boolean",
      default: "false",
      description: "Initial state (uncontrolled)",
    },
    {
      name: "onChange",
      type: "(checked: boolean) => void",
      description: "Change handler",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#4A90D9"',
      description: "Fill color when checked",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disabled state",
    },
    {
      name: "label",
      type: "string",
      description: "Visible label text",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible label (when no visible label)",
    },
  ],
  dualSignaling:
    "Checked state uses both accent color fill AND inset shadow depth.",
  relatedComponents: ["soft-switch", "soft-radio"],
});
