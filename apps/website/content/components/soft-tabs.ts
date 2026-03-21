import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "soft-tabs",
  name: "SoftTabs",
  category: "navigation",
  description:
    "Neumorphic tab navigation with full ARIA support and keyboard navigation.",
  importName: "SoftTabs, SoftTabList, SoftTab, SoftTabPanel",
  props: [
    {
      name: "value",
      type: "string",
      description: "Controlled active tab",
    },
    {
      name: "defaultValue",
      type: "string",
      description: "Default active tab",
    },
    {
      name: "onChange",
      type: "(tabId: string) => void",
      description: "Tab change handler",
    },
    {
      name: "value (SoftTab)",
      type: "string",
      description: "Unique tab identifier",
    },
    {
      name: "disabled (SoftTab)",
      type: "boolean",
      default: "false",
      description: "Disabled state",
    },
    {
      name: "accentColor (SoftTab)",
      type: "string",
      default: '"#4A90D9"',
      description: "Active tab accent color",
    },
    {
      name: "children (SoftTab)",
      type: "ReactNode",
      description: "Tab label",
    },
  ],
  keyboardNotes:
    "Left/Right arrows cycle tabs. Home/End jump to first/last. Only the active tab is in the tab order.",
  accessibilityNotes:
    'role="tablist" / role="tab" / role="tabpanel", aria-selected, aria-controls, aria-labelledby all auto-wired.',
  relatedComponents: ["soft-segmented-control"],
});
