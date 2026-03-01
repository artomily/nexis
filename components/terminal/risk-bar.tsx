import { cn } from "@/lib/utils";
import { getRiskBgClass } from "@/lib/risk-levels";
import type { RiskLevel } from "@/types";

interface RiskBarProps {
  value: number;
  level: RiskLevel;
}

export function RiskBar({ value, level }: RiskBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="h-1 w-full bg-bg-primary rounded-full overflow-hidden">
      <div
        className={cn("h-full rounded-full", getRiskBgClass(level))}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}
