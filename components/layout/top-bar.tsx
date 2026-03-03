"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { marketRiskIndex } from "@/lib/mock-data";
import { formatRiskValue, formatMomentum } from "@/lib/format";
import {
  getRiskColorClass,
  getRiskLevelFromValue,
  getMarketStateLabel,
  getMarketStateColor,
  getRiskBadgeBgClass,
} from "@/lib/risk-levels";
import { cn } from "@/lib/utils";

const primaryNav = [
  { label: "OVERVIEW", href: "/overview" },
  { label: "REPLAY", href: "/replay" },
  { label: "SIMULATION", href: "/simulation" },
];

const moduleLabels: Record<string, string> = {
  "/liquidity": "Liquidity Risk",
  "/derivatives": "Derivatives Risk",
  "/stablecoin": "Stablecoin Flow",
  "/whale": "Whale Activity",
  "/systemic": "Systemic Stress",
};

export function TopBar() {
  const pathname = usePathname();
  const data = marketRiskIndex;
  const riskLevel = getRiskLevelFromValue(data.value);
  const stateLevel = getMarketStateColor(data.state);

  const isModulePage = Object.keys(moduleLabels).includes(pathname);
  const moduleLabel = moduleLabels[pathname];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-13 bg-bg-panel border-b border-border-subtle flex items-center px-6">
      {/* Wordmark */}
      <div className="flex items-center gap-2 min-w-50">
        <span className="font-mono text-[13px] font-semibold tracking-[0.2em] text-text-secondary uppercase">
          NEXIS
        </span>
        <span className="font-mono text-[10px] text-text-tertiary tracking-wider">
          ALPHA
        </span>
      </div>

      {/* Center cluster */}
      <div className="flex-1 flex items-center justify-center gap-10">
        {/* Market Risk Index */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono">
            MRI
          </span>
          <span
            className={cn(
              "font-mono text-2xl font-bold tabular-nums",
              getRiskColorClass(riskLevel)
            )}
          >
            {formatRiskValue(data.value)}
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-border-subtle" />

        {/* Market State */}
        <span
          className={cn(
            "text-xs font-mono font-medium px-2 py-0.5 rounded-sm",
            getRiskBadgeBgClass(stateLevel)
          )}
        >
          {getMarketStateLabel(data.state)}
        </span>

        {/* Divider */}
        <div className="w-px h-6 bg-border-subtle" />

        {/* Momentum */}
        <span
          className={cn(
            "font-mono text-sm font-medium tabular-nums",
            data.momentum > 0 ? "text-risk-high" : "text-risk-low"
          )}
        >
          {data.momentum > 0 ? "▲" : "▼"} {formatMomentum(data.momentum)}
        </span>
      </div>

      {/* Right nav */}
      <div className="min-w-50 flex items-center justify-end">
        {isModulePage ? (
          /* Breadcrumb for module sub-pages */
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <Link
              href="/overview"
              className="text-text-tertiary hover:text-text-secondary transition-colors duration-100 uppercase tracking-[0.15em]"
            >
              Overview
            </Link>
            <span className="text-text-tertiary">/</span>
            <span className="text-text-primary uppercase tracking-[0.15em]">
              {moduleLabel}
            </span>
          </div>
        ) : (
          /* Primary nav links */
          <nav className="flex items-center gap-5">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-100",
                  pathname === item.href
                    ? "text-text-primary"
                    : "text-text-tertiary hover:text-text-secondary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
