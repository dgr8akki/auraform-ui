import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllComponents, getComponent } from "@/content/components";
import { PropsTable } from "@/components/site/PropsTable";
import { CodeBlock } from "@/components/site/CodeBlock";
import { ComponentDemo } from "@/components/demos/ComponentDemo";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllComponents().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comp = getComponent(slug);
  if (!comp) return {};
  return {
    title: comp.name,
    description: comp.description,
  };
}

export default async function ComponentPage({ params }: PageProps) {
  const { slug } = await params;
  const comp = getComponent(slug);

  if (!comp) {
    notFound();
  }

  const importStatement = `import { ${comp.importName} } from '@auraform/react';`;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{comp.name}</h1>
      <p className="text-current/60 mb-6">{comp.description}</p>

      {/* Import */}
      <CodeBlock code={importStatement} language="tsx" />

      {/* Interactive Demo */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-current/10">
          Interactive Demo
        </h2>
        <ComponentDemo slug={slug} />
      </section>

      {/* Props Table */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-current/10">
          Props
        </h2>
        <PropsTable props={comp.props} />
      </section>

      {/* Accessibility */}
      {(comp.accessibilityNotes ||
        comp.keyboardNotes ||
        comp.dualSignaling) && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-current/10">
            Accessibility
          </h2>
          {comp.dualSignaling && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Dual-Signaling</h3>
              <p className="text-current/80">{comp.dualSignaling}</p>
            </div>
          )}
          {comp.keyboardNotes && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Keyboard</h3>
              <p className="text-current/80">{comp.keyboardNotes}</p>
            </div>
          )}
          {comp.accessibilityNotes && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">ARIA</h3>
              <p className="text-current/80">{comp.accessibilityNotes}</p>
            </div>
          )}
        </section>
      )}

      {/* Related Components */}
      {comp.relatedComponents && comp.relatedComponents.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-current/10">
            Related Components
          </h2>
          <div className="flex flex-wrap gap-2">
            {comp.relatedComponents.map((related) => {
              const relatedComp = getComponent(related);
              return (
                <Link
                  key={related}
                  href={`/docs/components/${related}`}
                  className="px-3 py-1.5 rounded-lg text-sm font-mono border border-current/10 hover:border-current/20 hover:bg-current/5 transition-colors"
                >
                  {relatedComp?.name ?? related}
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
