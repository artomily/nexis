import { cn } from "@/lib/utils";
import type { ModuleRiskSummary } from "@/types";
import {
  getRiskColorClass,
  getRiskBadgeBgClass,
  getRiskLabel,
} from "@/lib/risk-levels";
import { RiskBar } from "@/components/terminal/risk-bar";
import { formatRiskValue } from "@/lib/format";

interface RiskCardProps {
  data: ModuleRiskSummary;
}

export function RiskCard({ data }: RiskCardProps) {
  return (
    <div className="space-y-3">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-text-secondary font-mono">
          {data.label}
        </span>
        <span
          className={cn(
            "text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-sm",
            getRiskBadgeBgClass(data.level)
          )}
        >
          {getRiskLabel(data.level)}
        </span>
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            "font-mono text-2xl font-bold tabular-nums",
            getRiskColorClass(data.level)
          )}
        >
          {formatRiskValue(data.value)}
        </span>
        <span className="text-[10px] text-text-tertiary font-mono">/ 100</span>
      </div>

      {/* Risk bar */}
      <RiskBar value={data.value} level={data.level} />

      {/* Description */}
      <p className="text-[11px] text-text-tertiary leading-relaxed">
        {data.description}
      </p>
    </div>
  );
}
