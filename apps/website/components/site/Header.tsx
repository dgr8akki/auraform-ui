"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Github, Search } from "lucide-react";
import { useState } from "react";
import { AuraformProvider, SoftSwitch } from "@auraform/react";
import { useTheme } from "@/lib/theme";

export function Header({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const { theme, toggle, baseColor, mounted } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/docs/getting-started", label: "Docs" },
    { href: "/docs/components", label: "Components" },
    { href: "https://github.com/your-org/auraform-ui", label: "GitHub", external: true },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-current/5 backdrop-blur-md bg-[#e0e0e0]/80 dark:bg-[#2d2d2d]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-2xl">◉</span>
            <span>Auraform UI</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`text-sm font-medium transition-colors hover:text-black dark:hover:text-white ${
                  pathname?.startsWith(link.href)
                    ? "text-black dark:text-white"
                    : "text-current/60"
                }`}
              >
                {link.external ? (
                  <Github className="w-5 h-5" />
                ) : (
                  link.label
                )}
              </Link>
            ))}

            {/* Search button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 text-sm text-current/50 hover:text-current/80 transition-colors px-3 py-1.5 rounded-lg border border-current/10"
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden lg:inline text-xs bg-current/5 px-1.5 py-0.5 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Theme toggle using SoftSwitch */}
            {mounted && (
              <AuraformProvider baseColor={baseColor}>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-current/50">☀</span>
                  <SoftSwitch
                    checked={theme === "dark"}
                    onChange={toggle}
                    aria-label="Toggle dark mode"
                  />
                  <span className="text-current/50">☾</span>
                </div>
              </AuraformProvider>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-current/5">
            <nav className="flex flex-col gap-3">
              {navLinks
                .filter((l) => !l.external)
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium px-2 py-1"
                  >
                    {link.label}
                  </Link>
                ))}
              {mounted && (
                <AuraformProvider baseColor={baseColor}>
                  <div className="flex items-center gap-2 text-sm px-2">
                    <span>☀</span>
                    <SoftSwitch
                      checked={theme === "dark"}
                      onChange={toggle}
                      aria-label="Toggle dark mode"
                    />
                    <span>☾</span>
                  </div>
                </AuraformProvider>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
