"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { navigation, type NavItem } from "@/lib/navigation";

function SidebarLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const hasChildren = item.items && item.items.length > 0;
  const isParentActive = hasChildren && pathname?.startsWith(item.href);
  const [expanded, setExpanded] = useState(isParentActive ?? false);

  return (
    <li>
      {hasChildren ? (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            className={`flex items-center justify-between w-full text-sm py-1.5 px-3 rounded-lg transition-colors hover:bg-current/5 ${
              isParentActive ? "font-semibold" : "text-current/70"
            }`}
          >
            <Link href={item.href} className="flex-1 text-left">
              {item.title}
            </Link>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
          {expanded && (
            <ul className="ml-3 mt-1 space-y-0.5 border-l border-current/10 pl-3">
              {item.items!.map((child) => (
                <SidebarLink key={child.href} item={child} />
              ))}
            </ul>
          )}
        </>
      ) : (
        <Link
          href={item.href}
          className={`block text-sm py-1.5 px-3 rounded-lg transition-colors ${
            isActive
              ? "bg-current/10 font-semibold"
              : "text-current/70 hover:bg-current/5 hover:text-current"
          }`}
        >
          {item.title}
        </Link>
      )}
    </li>
  );
}

export function Sidebar() {
  return (
    <nav className="w-64 shrink-0 hidden lg:block">
      <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto pb-8">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <SidebarLink key={item.href} item={item} />
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 left-0 z-50 w-72 bg-[#e0e0e0] dark:bg-[#2d2d2d] p-6 overflow-y-auto lg:hidden shadow-xl">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <SidebarLink key={item.href} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
}
