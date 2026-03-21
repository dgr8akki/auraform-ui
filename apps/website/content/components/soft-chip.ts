import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-chip",
  name: "SoftChip",
  category: "display",
  description:
    "Compact label/tag with selectable and removable modes.",
  importName: "SoftChip",
  props: [
    {
      name: "label",
      type: "string",
      description: "Chip text",
    },
    {
      name: "selected",
      type: "boolean",
      description: "Controlled selected state",
    },
    {
      name: "defaultSelected",
      type: "boolean",
      default: "false",
      description: "Initial selected state",
    },
    {
      name: "selectable",
      type: "boolean",
      default: "false",
      description: "Enable toggle selection",
    },
    {
      name: "onSelect",
      type: "(selected: boolean) => void",
      description: "Selection handler",
    },
    {
      name: "removable",
      type: "boolean",
      default: "false",
      description: "Show remove icon",
    },
    {
      name: "onRemove",
      type: "() => void",
      description: "Remove handler",
    },
    {
      name: "accentColor",
      type: "string",
      default: '"#4A90D9"',
      description: "Selected state color",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disabled state",
    },
  ],
  dualSignaling:
    "Selected chips use accent color fill AND inset shadow.",
  relatedComponents: ["soft-badge"],
});
