import { cn } from "@/lib/utils";

export function SimulationCard() {
  return (
    <div className="bg-bg-panel border border-border-subtle rounded-sm flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-3 border-b border-border-subtle">
        <span className="text-[10px] uppercase tracking-[0.22em] text-text-tertiary font-mono">
          Scenario Simulation
        </span>
      </div>

      <div className="flex flex-col gap-5 p-5 flex-1">
        {/* Title */}
        <div>
          <h3 className="font-mono text-sm font-semibold text-text-primary tracking-wide uppercase">
            Bear Scenario
          </h3>
          <p className="text-[12px] text-text-tertiary font-mono mt-0.5">
            Stress test
          </p>
        </div>

        {/* Description */}
        <p className="text-[12px] text-text-secondary leading-relaxed flex-1">
          Model the cascade effects of a 30% BTC spot decline over a 72-hour window.
          Simulates estimated liquidation volume, stablecoin flow response, and
          projected risk index trajectory under historical analog conditions.
        </p>

        {/* Simulation parameters */}
        <div className="space-y-2 py-3 border-y border-border-subtle">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-text-tertiary font-mono uppercase tracking-wide">
              Scenario Type
            </span>
            <span className="text-[11px] font-mono text-text-primary">
              Bear / Liquidation
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-text-tertiary font-mono uppercase tracking-wide">
              Shock Magnitude
            </span>
            <span className="text-[11px] font-mono text-text-primary">
              −30% BTC
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-text-tertiary font-mono uppercase tracking-wide">
              Time Horizon
            </span>
            <span className="text-[11px] font-mono text-text-primary">
              72 hours
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          className={cn(
            "w-full py-2.5 rounded-sm font-mono text-[12px] font-semibold uppercase tracking-widest",
            "bg-bg-elevated border border-border-active text-text-primary",
            "hover:bg-bg-panel-hover hover:border-border-active transition-colors duration-100"
          )}
        >
          Run Bear Scenario
        </button>
      </div>
    </div>
  );
}
