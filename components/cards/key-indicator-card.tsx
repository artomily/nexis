import { cn } from "@/lib/utils";
import type { KeyIndicator } from "@/types";

interface KeyIndicatorCardProps {
  data: KeyIndicator;
}

export function KeyIndicatorCard({ data }: KeyIndicatorCardProps) {
  const directionColor =
    data.direction === "up"
      ? "text-risk-high"
      : data.direction === "down"
        ? "text-risk-low"
        : "text-text-secondary";

  const arrow =
    data.direction === "up" ? "▲" : data.direction === "down" ? "▼" : "—";

  return (
    <div className="bg-bg-panel border border-border-subtle rounded-sm p-5 flex flex-col gap-3 h-full">
      {/* Label */}
      <span className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary font-mono">
        {data.label}
      </span>

      {/* Value */}
      <span className="font-mono text-2xl font-bold tabular-nums text-text-primary">
        {data.value}
      </span>

      {/* Change */}
      <div className="flex items-center gap-1.5 mt-auto">
        <span className={cn("text-[11px] font-mono", directionColor)}>
          {arrow}
        </span>
        <span className={cn("text-[11px] font-mono tabular-nums", directionColor)}>
          {data.change}
        </span>
      </div>
    </div>
  );
}
