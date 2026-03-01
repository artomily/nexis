"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-[52px] left-0 bottom-0 w-[220px] bg-bg-primary border-r border-border-subtle flex flex-col z-40">
      <div className="flex-1 py-5 px-4">
        {/* Section label */}
        <div className="mb-4 px-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary font-mono">
            Modules
          </span>
        </div>

        {/* Navigation items */}
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.segment}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-sm transition-colors duration-100",
                    isActive
                      ? "text-text-primary bg-bg-panel border-l-2 border-accent-blue"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-panel-hover border-l-2 border-transparent"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Version label */}
      <div className="px-7 py-4 border-t border-border-subtle">
        <span className="text-[10px] text-text-tertiary font-mono">
          v0.1.0 — ALPHA
        </span>
      </div>
    </nav>
  );
}
