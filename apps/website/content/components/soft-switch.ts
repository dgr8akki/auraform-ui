import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-switch",
  name: "SoftSwitch",
  category: "form",
  description:
    "Toggle switch using physical depth and accent color to indicate state.",
  importName: "SoftSwitch",
  props: [
    {
      name: "checked",
      type: "boolean",
      description: "Controlled state",
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
      description: "Toggle handler",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#4A90D9"',
      description: "Track color when on",
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
  dualSignaling:
    "On state uses accent color fill AND inset track shadow. Off state is extruded.",
  relatedComponents: ["soft-checkbox"],
});
