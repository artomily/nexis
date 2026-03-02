import { cn } from "@/lib/utils";
import { getRiskBadgeBgClass, getRiskLabel } from "@/lib/risk-levels";
import { formatTimestamp } from "@/lib/format";
import type { RiskAlert } from "@/types";

interface AlertFeedCardProps {
  alerts: RiskAlert[];
}

export function AlertFeedCard({ alerts }: AlertFeedCardProps) {
  return (
    <div className="bg-bg-panel border border-border-subtle rounded-sm flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-3 border-b border-border-subtle flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.22em] text-text-tertiary font-mono">
          Active Alerts
        </span>
        <span className="text-[10px] font-mono text-text-tertiary tabular-nums">
          {alerts.length}
        </span>
      </div>

      {/* Alerts list */}
      <div className="flex flex-col divide-y divide-border-subtle flex-1 overflow-y-auto">
        {alerts.map((alert) => (
          <div key={alert.id} className="px-5 py-4">
            {/* Severity + title */}
            <div className="flex items-start gap-2 mb-2">
              <span
                className={cn(
                  "text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-sm tracking-wide shrink-0 mt-0.5",
                  getRiskBadgeBgClass(alert.severity)
                )}
              >
                {getRiskLabel(alert.severity)}
              </span>
              <span className="text-[12px] font-mono font-medium text-text-primary leading-tight">
                {alert.title}
              </span>
            </div>

            {/* Description */}
            <p className="text-[11px] text-text-secondary leading-relaxed mb-2">
              {alert.description}
            </p>

            {/* Timestamp */}
            <span className="text-[10px] font-mono text-text-tertiary tabular-nums">
              {formatTimestamp(alert.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
