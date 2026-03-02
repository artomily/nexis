import { cn } from "@/lib/utils";
import { formatRiskValue } from "@/lib/format";
import {
  getRiskColorClass,
  getRiskBadgeBgClass,
  getRiskLabel,
} from "@/lib/risk-levels";
import type { HistoricalEvent } from "@/types";

interface EventSummaryCardProps {
  event: HistoricalEvent;
}

export function EventSummaryCard({ event }: EventSummaryCardProps) {
  return (
    <div className="bg-bg-panel border border-border-subtle rounded-sm flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-3 border-b border-border-subtle flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.22em] text-text-tertiary font-mono">
          {event.type}
        </span>
        <span
          className={cn(
            "text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-sm tracking-wide",
            getRiskBadgeBgClass(event.impactLevel)
          )}
        >
          {getRiskLabel(event.impactLevel)}
        </span>
      </div>

      <div className="flex flex-col gap-4 p-5 flex-1">
        {/* Title + date */}
        <div>
          <h3 className="font-mono text-sm font-semibold text-text-primary tracking-tight">
            {event.name}
          </h3>
          <span className="text-[10px] font-mono text-text-tertiary tabular-nums">
            {event.date} · {event.duration}
          </span>
        </div>

        {/* Peak risk score */}
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono">
            Peak Risk
          </span>
          <span
            className={cn(
              "font-mono text-3xl font-bold tabular-nums",
              getRiskColorClass(event.impactLevel)
            )}
          >
            {formatRiskValue(event.peakRiskValue)}
          </span>
        </div>

        {/* Description */}
        <p className="text-[12px] text-text-secondary leading-relaxed flex-1">
          {event.description}
        </p>

        {/* Key metrics grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-3 border-t border-border-subtle">
          {event.metrics.slice(0, 4).map((metric) => (
            <div key={metric.label}>
              <div className="text-[10px] text-text-tertiary font-mono uppercase tracking-wide truncate">
                {metric.label}
              </div>
              <div className="font-mono text-[12px] text-text-primary tabular-nums mt-0.5">
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
