import { cn } from "@/lib/utils";
import { formatRiskValue, formatMomentum } from "@/lib/format";
import {
  getRiskColorClass,
  getRiskLevelFromValue,
  getMarketStateLabel,
  getMarketStateColor,
  getRiskBadgeBgClass,
  getRiskLabel,
} from "@/lib/risk-levels";
import type { MarketRiskIndex } from "@/types";

interface RiskIndexDisplayProps {
  data: MarketRiskIndex;
}

export function RiskIndexDisplay({ data }: RiskIndexDisplayProps) {
  const riskLevel = getRiskLevelFromValue(data.value);
  const stateLevel = getMarketStateColor(data.state);

  return (
    <div className="bg-bg-panel border border-border-subtle rounded-md p-6">
      <div className="flex items-start justify-between">
        {/* Left: Risk Index */}
        <div className="flex flex-col gap-2">
          {/* Label */}
          <span className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary font-mono">
            Market Risk Index
          </span>

          {/* Large number */}
          <div className="flex items-baseline gap-4">
            <span
              className={cn(
                "font-mono text-[72px] leading-none font-bold tabular-nums",
                getRiskColorClass(riskLevel)
              )}
            >
              {formatRiskValue(data.value)}
            </span>

            {/* Risk level label */}
            <span
              className={cn(
                "font-mono text-sm font-medium px-2.5 py-1 rounded-sm",
                getRiskBadgeBgClass(riskLevel)
              )}
            >
              {getRiskLabel(riskLevel)}
            </span>
          </div>
        </div>

        {/* Right: State + Momentum */}
        <div className="flex flex-col items-end gap-3 pt-6">
          {/* Market State */}
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono">
              Market State
            </span>
            <span
              className={cn(
                "text-xs font-mono font-medium px-2 py-0.5 rounded-sm",
                getRiskBadgeBgClass(stateLevel)
              )}
            >
              {getMarketStateLabel(data.state)}
            </span>
          </div>

          {/* Momentum */}
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono">
              Risk Momentum
            </span>
            <span
              className={cn(
                "font-mono text-lg font-medium tabular-nums",
                data.momentum > 0 ? "text-risk-high" : "text-risk-low"
              )}
            >
              {data.momentum > 0 ? "▲" : "▼"} {formatMomentum(data.momentum)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
