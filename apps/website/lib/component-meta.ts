import type { PropDef } from "@/components/site/PropsTable";

export interface ComponentMeta {
  slug: string;
  name: string;
  description: string;
  category: "provider" | "primitive" | "form" | "display" | "navigation";
  importName: string;
  props: PropDef[];
  accessibilityNotes?: string;
  keyboardNotes?: string;
  dualSignaling?: string;
  relatedComponents?: string[];
}

export const componentRegistry: Record<string, ComponentMeta> = {};

export function registerComponent(meta: ComponentMeta) {
  componentRegistry[meta.slug] = meta;
}

export function getComponent(slug: string): ComponentMeta | undefined {
  return componentRegistry[slug];
}

export function getAllComponents(): ComponentMeta[] {
  return Object.values(componentRegistry);
}

export function getComponentsByCategory(
  category: ComponentMeta["category"]
): ComponentMeta[] {
  return getAllComponents().filter((c) => c.category === category);
}
