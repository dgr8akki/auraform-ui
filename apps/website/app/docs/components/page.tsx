import Link from "next/link";
import {
  getAllComponents,
  getComponentsByCategory,
} from "@/content/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components",
  description: "All 25 Auraform UI React components.",
};

const categoryLabels: Record<string, string> = {
  provider: "Provider & Utilities",
  primitive: "Primitives",
  form: "Form Components",
  display: "Display & Feedback",
  navigation: "Navigation",
};

const categoryOrder = ["provider", "primitive", "form", "display", "navigation"];

export default function ComponentsIndex() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Components</h1>
      <p className="text-current/60 mb-8">
        All {getAllComponents().length} React components exported from{" "}
        <code className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-sm font-mono">
          @auraform/react
        </code>
        . Every component must be wrapped in an{" "}
        <code className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-sm font-mono">
          AuraformProvider
        </code>
        .
      </p>

      {categoryOrder.map((cat) => {
        const components = getComponentsByCategory(
          cat as "provider" | "primitive" | "form" | "display" | "navigation"
        );
        if (components.length === 0) return null;

        return (
          <section key={cat} className="mb-10">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-current/10">
              {categoryLabels[cat]}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {components.map((comp) => (
                <Link
                  key={comp.slug}
                  href={`/docs/components/${comp.slug}`}
                  className="group block p-4 rounded-xl border border-current/5 hover:border-current/15 transition-colors"
                >
                  <div className="font-semibold font-mono text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {comp.name}
                  </div>
                  <div className="text-sm text-current/60 mt-1">
                    {comp.description}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
