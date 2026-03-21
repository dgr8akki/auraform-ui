import { Accessibility, Palette, Code2, Smartphone } from "lucide-react";

const features = [
  {
    icon: Accessibility,
    title: "Accessibility First",
    description:
      "Automatic WCAG contrast checking, dual-signaling for every state, keyboard navigation, and proper ARIA roles on every component.",
  },
  {
    icon: Palette,
    title: "One-Color Theming",
    description:
      "Pass a single hex color — get a complete neumorphic theme with computed shadows, borders, and semantic colors.",
  },
  {
    icon: Code2,
    title: "TypeScript Native",
    description:
      "Full type safety with exported prop types, required aria-label enforcement on icon buttons, and strict mode compatibility.",
  },
  {
    icon: Smartphone,
    title: "React + React Native",
    description:
      "Web components with Framer Motion animations. Native primitives with SVG shadows and OS accessibility detection.",
  },
];

export function FeatureGrid() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Built Different</h2>
        <p className="text-current/60">
          Neumorphism done right — accessible, themeable, and type-safe.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="p-6 rounded-2xl border border-current/5 hover:border-current/10 transition-colors"
          >
            <feature.icon className="w-8 h-8 mb-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-current/60 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
