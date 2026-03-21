"use client";

import Link from "next/link";
import { CodeBlock } from "./CodeBlock";

const setupCode = `import { AuraformProvider, SoftButton } from '@auraform/react';

function App() {
  return (
    <AuraformProvider baseColor="#e0e0e0">
      <SoftButton variant="primary">Get Started</SoftButton>
    </AuraformProvider>
  );
}`;

export function Hero() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Accessibility-first
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            neumorphic
          </span>{" "}
          React components
        </h1>
        <p className="text-lg md:text-xl text-current/60 max-w-2xl mx-auto mb-8">
          25 beautifully crafted components with automatic contrast safety,
          dual-signaling, keyboard navigation, and one-color theming. Works with
          React and React Native.
        </p>
        <div className="flex items-center justify-center gap-4 mb-12">
          <Link
            href="/docs/getting-started"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/your-org/auraform-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl border border-current/15 font-medium hover:bg-current/5 transition-colors"
          >
            GitHub
          </a>
        </div>
        <div className="max-w-lg mx-auto text-left">
          <CodeBlock code={setupCode} language="tsx" />
        </div>
      </div>
    </section>
  );
}
