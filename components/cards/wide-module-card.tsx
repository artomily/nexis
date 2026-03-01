import { cn } from "@/lib/utils";
import { formatRiskValue } from "@/lib/format";
import {
  getRiskColorClass,
  getRiskBadgeBgClass,
  getRiskBgClass,
  getRiskLabel,
} from "@/lib/risk-levels";
import type { ModuleRiskSummary } from "@/types";

interface WideModuleCardProps {
  data: ModuleRiskSummary;
}

export function WideModuleCard({ data }: WideModuleCardProps) {
  const clampedValue = Math.min(100, Math.max(0, data.value));

  return (
    <div className="bg-bg-panel border border-border-subtle rounded-sm flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-3 border-b border-border-subtle flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.22em] text-text-tertiary font-mono">
          {data.label}
        </span>
        <span
          className={cn(
            "text-[10px] font-mono font-semibold px-2 py-0.5 rounded-sm tracking-wide",
            getRiskBadgeBgClass(data.level)
          )}
        >
          {getRiskLabel(data.level)}
        </span>
      </div>

      <div className="flex gap-6 p-5 flex-1">
        {/* Left: value + bar + insight */}
        <div className="flex flex-col gap-4 flex-1">
          {/* Value */}
          <div className="flex items-baseline gap-1.5">
            <span
              className={cn(
                "font-mono text-4xl font-bold tabular-nums",
                getRiskColorClass(data.level)
              )}
            >
              {formatRiskValue(data.value)}
            </span>
            <span className="text-[11px] text-text-tertiary font-mono">/ 100</span>
          </div>

          {/* Progress bar */}
          <div className="h-[3px] w-full bg-bg-primary rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full", getRiskBgClass(data.level))}
              style={{ width: `${clampedValue}%` }}
            />
          </div>

          {/* AI insight */}
          <p className="text-[12px] text-text-secondary leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Right: sub-metrics grid */}
        {data.subMetrics && data.subMetrics.length > 0 && (
          <div className="border-l border-border-subtle pl-6 min-w-[180px]">
            <div className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono mb-3">
              Metrics
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {data.subMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="text-[10px] text-text-tertiary font-mono uppercase tracking-wide">
                    {metric.label}
                  </div>
                  <div className="font-mono text-[13px] text-text-primary tabular-nums mt-0.5">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
