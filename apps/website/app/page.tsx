"use client";

import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ComponentShowcase } from "@/components/site/ComponentShowcase";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { ThemePlayground } from "@/components/site/ThemePlayground";
import { Footer } from "@/components/site/Footer";
import { SearchDialog } from "@/components/site/SearchDialog";

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onOpenSearch={() => setSearchOpen(true)} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <ComponentShowcase />
        <FeatureGrid />
        <ThemePlayground />

        {/* Social Proof */}
        <section className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Get Started</h2>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <code className="px-4 py-2 rounded-xl bg-[#1e1e2e] text-[#cdd6f4] text-sm font-mono">
              npm install @auraform/react @auraform/core
            </code>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-current/50">
            <span>3 packages</span>
            <span>·</span>
            <span>25 components</span>
            <span>·</span>
            <span>MIT licensed</span>
            <span>·</span>
            <span>TypeScript native</span>
          </div>
        </section>
      </main>
      <Footer />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
