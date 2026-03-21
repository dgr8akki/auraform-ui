"use client";

import { useEffect, useState, useRef } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { navigation } from "@/lib/navigation";

interface SearchResult {
  title: string;
  href: string;
  section?: string;
}

function flattenNav(): SearchResult[] {
  const results: SearchResult[] = [];
  for (const item of navigation) {
    results.push({ title: item.title, href: item.href });
    if (item.items) {
      for (const child of item.items) {
        results.push({
          title: child.title,
          href: child.href,
          section: item.title,
        });
      }
    }
  }
  return results;
}

export function SearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const allPages = flattenNav();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (open) {
          onClose();
        } else {
          // Parent will handle opening
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(allPages);
    } else {
      const q = query.toLowerCase();
      setResults(
        allPages.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.section?.toLowerCase().includes(q)
        )
      );
    }
    setSelectedIndex(0);
  }, [query]);

  function handleSelect(result: SearchResult) {
    router.push(result.href);
    onClose();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    } else if (e.key === "Escape") {
      onClose();
    }
  }

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-x-4 top-[20%] z-50 mx-auto max-w-lg">
        <div className="rounded-2xl bg-[#e0e0e0] dark:bg-[#2d2d2d] shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 border-b border-current/10">
            <Search className="w-5 h-5 text-current/40" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search documentation..."
              className="flex-1 py-4 bg-transparent outline-none text-sm"
            />
            <button onClick={onClose} className="p-1">
              <X className="w-4 h-4 text-current/40" />
            </button>
          </div>
          <div className="max-h-72 overflow-y-auto p-2">
            {results.length === 0 ? (
              <p className="text-center text-sm text-current/40 py-8">
                No results found.
              </p>
            ) : (
              results.map((result, i) => (
                <button
                  key={result.href}
                  onClick={() => handleSelect(result)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                    i === selectedIndex
                      ? "bg-current/10"
                      : "hover:bg-current/5"
                  }`}
                >
                  <div className="font-medium">{result.title}</div>
                  {result.section && (
                    <div className="text-xs text-current/40 mt-0.5">
                      {result.section}
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
