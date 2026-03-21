import { registerComponent } from "@/lib/component-meta";

registerComponent({
  slug: "auraform-provider",
  name: "AuraformProvider",
  category: "provider",
  description:
    "Root context provider that computes neumorphic tokens and injects CSS custom properties.",
  importName: "AuraformProvider",
  props: [
    {
      name: "baseColor",
      type: "string",
      description: "Hex color for the background theme",
    },
    {
      name: "intensity",
      type: "number",
      default: "15",
      description: "Lightness shift (%) for shadow generation",
    },
    {
      name: "mode",
      type: '"light" | "dark" | "auto"',
      default: '"auto"',
      description: "Color mode",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "App content",
    },
  ],
});
