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
import type { MarketRiskIndex, IntelligenceReport } from "@/types";

interface MarketRiskCoreProps {
  index: MarketRiskIndex;
  report: IntelligenceReport;
}

export function MarketRiskCore({ index, report }: MarketRiskCoreProps) {
  const riskLevel = getRiskLevelFromValue(index.value);
  const stateLevel = getMarketStateColor(index.state);

  return (
    <div className="bg-bg-panel border border-border-subtle rounded-sm">
      <div className="flex divide-x divide-border-subtle">
        {/* ── Left column: primary metric ── */}
        <div className="flex flex-col justify-between p-6 w-[58%] gap-6">
          {/* Label row */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-text-tertiary font-mono">
              Market Risk Index
            </span>
          </div>

          {/* Giant number */}
          <div className="flex items-end gap-4">
            <span
              className={cn(
                "font-mono text-[88px] leading-none font-bold tabular-nums",
                getRiskColorClass(riskLevel)
              )}
            >
              {formatRiskValue(index.value)}
            </span>
            <div className="flex flex-col gap-2 mb-3">
              <span
                className={cn(
                  "text-[11px] font-mono font-semibold px-2 py-0.5 rounded-sm tracking-wide",
                  getRiskBadgeBgClass(riskLevel)
                )}
              >
                {getRiskLabel(riskLevel)}
              </span>
              <span
                className={cn(
                  "text-[11px] font-mono font-medium px-2 py-0.5 rounded-sm tracking-wide",
                  getRiskBadgeBgClass(stateLevel)
                )}
              >
                {getMarketStateLabel(index.state)}
              </span>
            </div>
          </div>

          {/* Momentum row */}
          <div className="flex items-center gap-3 pt-2 border-t border-border-subtle">
            <span className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary font-mono">
              Momentum
            </span>
            <span
              className={cn(
                "font-mono text-base font-medium tabular-nums",
                index.momentum > 0 ? "text-risk-high" : "text-risk-low"
              )}
            >
              {index.momentum > 0 ? "▲" : "▼"}&nbsp;{formatMomentum(index.momentum)}
            </span>
            <span className="text-[10px] text-text-tertiary font-mono">24H</span>
          </div>
        </div>

        {/* ── Right column: AI intelligence ── */}
        <div className="flex flex-col divide-y divide-border-subtle flex-1">
          {/* Header */}
          <div className="px-5 py-3">
            <span className="text-[10px] uppercase tracking-[0.22em] text-text-tertiary font-mono">
              AI Intelligence
            </span>
          </div>

          {/* Summary */}
          <div className="px-5 py-4">
            <p className="text-[13px] text-text-primary leading-relaxed">
              {report.summary}
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
              {report.primaryDriver}
            </p>
          </div>

          {/* Risk Outlook */}
          <div className="px-5 py-4">
            <div className="mb-1.5">
              <span className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono">
                Risk Outlook (7D)
              </span>
            </div>
            <p className="text-[12px] text-text-secondary leading-relaxed">
              {report.riskOutlook7D}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
