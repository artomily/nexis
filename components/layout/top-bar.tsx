import { marketRiskIndex } from "@/lib/mock-data";
import { formatRiskValue, formatTimestamp, formatMomentum } from "@/lib/format";
import {
  getRiskColorClass,
  getRiskLevelFromValue,
  getMarketStateLabel,
  getMarketStateColor,
  getRiskBadgeBgClass,
} from "@/lib/risk-levels";
import { cn } from "@/lib/utils";

export function TopBar() {
  const data = marketRiskIndex;
  const riskLevel = getRiskLevelFromValue(data.value);
  const stateLevel = getMarketStateColor(data.state);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[52px] bg-bg-panel border-b border-border-subtle flex items-center px-6">
      {/* Wordmark */}
      <div className="flex items-center gap-2 min-w-[200px]">
        <span className="font-mono text-[13px] font-semibold tracking-[0.2em] text-text-secondary uppercase">
          RiskTerminal
        </span>
        <span className="font-mono text-[10px] text-text-tertiary tracking-wider">
          AI
        </span>
      </div>

      {/* Center cluster */}
      <div className="flex-1 flex items-center justify-center gap-10">
        {/* Market Risk Index */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono">
              Market Risk Index
            </span>
          </div>
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
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono">
            State
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

        {/* Divider */}
        <div className="w-px h-6 bg-border-subtle" />

        {/* Momentum */}
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono">
            Momentum
          </span>
          <span
            className={cn(
              "font-mono text-sm font-medium tabular-nums",
              data.momentum > 0 ? "text-risk-high" : "text-risk-low"
            )}
          >
            {data.momentum > 0 ? "▲" : "▼"} {formatMomentum(data.momentum)}
          </span>
        </div>
      </div>

      {/* Last Updated */}
      <div className="min-w-[200px] text-right">
        <span className="font-mono text-[10px] text-text-tertiary tracking-wide">
          UPDATED {formatTimestamp(data.lastUpdated)}
        </span>
      </div>
    </header>
  );
}
