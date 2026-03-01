import { moduleRiskSummaries } from "@/lib/mock-data";
import { RiskCard } from "@/components/terminal/risk-card";
import { Separator } from "@/components/ui/separator";

export function RightPanel() {
  return (
    <aside className="fixed top-[52px] right-0 bottom-0 w-[320px] bg-bg-panel border-l border-border-subtle z-40 overflow-y-auto">
      <div className="p-5">
        {/* Header */}
        <div className="mb-5">
          <span className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary font-mono">
            Risk Modules
          </span>
        </div>

        {/* Risk cards */}
        <div className="space-y-0">
          {moduleRiskSummaries.map((module, index) => (
            <div key={module.id}>
              {index > 0 && (
                <Separator className="my-4 bg-border-subtle" />
              )}
              <RiskCard data={module} />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
