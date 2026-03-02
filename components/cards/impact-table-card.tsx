import { cn } from "@/lib/utils";
import { getRiskBadgeBgClass, getRiskLabel } from "@/lib/risk-levels";
import type { SimulationResultRow } from "@/types";

interface ImpactTableCardProps {
  title: string;
  results: SimulationResultRow[];
}

export function ImpactTableCard({ title, results }: ImpactTableCardProps) {
  return (
    <div className="bg-bg-panel border border-border-subtle rounded-sm">
      {/* Header */}
      <div className="px-5 py-3 border-b border-border-subtle">
        <span className="text-[10px] uppercase tracking-[0.22em] text-text-tertiary font-mono">
          {title}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="text-left px-5 py-2.5 text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono font-medium">
                Metric
              </th>
              <th className="text-right px-5 py-2.5 text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono font-medium">
                Baseline
              </th>
              <th className="text-right px-5 py-2.5 text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono font-medium">
                Projected
              </th>
              <th className="text-right px-5 py-2.5 text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono font-medium">
                Impact
              </th>
              <th className="text-right px-5 py-2.5 text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono font-medium">
                Severity
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {results.map((row) => (
              <tr key={row.metric} className="hover:bg-bg-panel-hover transition-colors duration-75">
                <td className="px-5 py-3 text-[12px] font-mono text-text-primary font-medium">
                  {row.metric}
                </td>
                <td className="px-5 py-3 text-[12px] font-mono text-text-secondary tabular-nums text-right">
                  {row.baseline}
                </td>
                <td className="px-5 py-3 text-[12px] font-mono text-text-primary tabular-nums font-medium text-right">
                  {row.projected}
                </td>
                <td className="px-5 py-3 text-[12px] font-mono text-risk-high tabular-nums text-right">
                  {row.impact}
                </td>
                <td className="px-5 py-3 text-right">
                  <span
                    className={cn(
                      "text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-sm tracking-wide",
                      getRiskBadgeBgClass(row.severity)
                    )}
                  >
                    {getRiskLabel(row.severity)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
