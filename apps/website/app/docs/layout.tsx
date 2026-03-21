"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Sidebar, MobileSidebar } from "@/components/site/Sidebar";
import { Footer } from "@/components/site/Footer";
import { SearchDialog } from "@/components/site/SearchDialog";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenSearch={() => setSearchOpen(true)} />
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden fixed bottom-4 left-4 z-30 p-3 rounded-full bg-[#e0e0e0] dark:bg-[#2d2d2d] shadow-lg"
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Sidebar />
          <MobileSidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <main className="flex-1 min-w-0 max-w-3xl">
            <article className="prose-slate">{children}</article>
          </main>
        </div>
      </div>
      <Footer />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
