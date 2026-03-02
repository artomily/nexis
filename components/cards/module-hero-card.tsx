import { cn } from "@/lib/utils";
import { formatRiskValue, formatMomentum } from "@/lib/format";
import {
  getRiskColorClass,
  getRiskLevelFromValue,
  getRiskBadgeBgClass,
  getRiskBgClass,
  getRiskLabel,
} from "@/lib/risk-levels";
import type { ModuleRiskSummary, ModuleDetailData } from "@/types";

interface ModuleHeroCardProps {
  module: ModuleRiskSummary;
  detail: ModuleDetailData;
}

export function ModuleHeroCard({ module, detail }: ModuleHeroCardProps) {
  const clampedValue = Math.min(100, Math.max(0, module.value));

  return (
    <div className="bg-bg-panel border border-border-subtle rounded-sm h-full">
      <div className="flex divide-x divide-border-subtle h-full">
        {/* ── Left column: primary metric ── */}
        <div className="flex flex-col justify-between p-6 w-[45%] gap-5">
          {/* Label row */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.22em] text-text-tertiary font-mono">
              {module.label}
            </span>
            <span
              className={cn(
                "text-[10px] font-mono font-semibold px-2 py-0.5 rounded-sm tracking-wide",
                getRiskBadgeBgClass(module.level)
              )}
            >
              {getRiskLabel(module.level)}
            </span>
          </div>

          {/* Big number */}
          <div>
            <div className="flex items-baseline gap-3">
              <span
                className={cn(
                  "font-mono text-[72px] leading-none font-bold tabular-nums",
                  getRiskColorClass(module.level)
                )}
              >
                {formatRiskValue(module.value)}
              </span>
              <span className="text-lg text-text-tertiary font-mono">/ 100</span>
            </div>

            {/* Progress bar */}
            <div className="h-0.75 w-full bg-bg-primary rounded-full overflow-hidden mt-4">
              <div
                className={cn("h-full rounded-full", getRiskBgClass(module.level))}
                style={{ width: `${clampedValue}%` }}
              />
            </div>
          </div>

          {/* Sub-metrics */}
          {module.subMetrics && module.subMetrics.length > 0 && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-3 border-t border-border-subtle">
              {module.subMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="text-[10px] text-text-tertiary font-mono uppercase tracking-wide truncate">
                    {metric.label}
                  </div>
                  <div className="font-mono text-[13px] text-text-primary tabular-nums mt-0.5">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Right column: AI analysis ── */}
        <div className="flex flex-col divide-y divide-border-subtle flex-1">
          {/* Header */}
          <div className="px-5 py-3">
            <span className="text-[10px] uppercase tracking-[0.22em] text-text-tertiary font-mono">
              AI Analysis
            </span>
          </div>

          {/* Summary */}
          <div className="px-5 py-4">
            <p className="text-[13px] text-text-primary leading-relaxed">
              {detail.aiAnalysis}
            </p>
          </div>

          {/* Primary Driver */}
          <div className="px-5 py-4 flex-1">
            <div className="mb-1.5">
              <span className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono">
                Primary Driver
              </span>
            </div>
            <p className="text-[12px] text-text-secondary leading-relaxed">
              {detail.primaryDriver}
            </p>
          </div>

          {/* Outlook */}
          <div className="px-5 py-4">
            <div className="mb-1.5">
              <span className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono">
                Outlook (7D)
              </span>
            </div>
            <p className="text-[12px] text-text-secondary leading-relaxed">
              {detail.outlook7D}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
