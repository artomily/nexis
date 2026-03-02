"use client";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { formatRiskValue } from "@/lib/format";
import {
  getRiskColorClass,
  getRiskLevelFromValue,
  getRiskBadgeBgClass,
  getRiskLabel,
} from "@/lib/risk-levels";
import { ImpactTableCard } from "@/components/cards/impact-table-card";
import { simulationScenarios } from "@/lib/detail-data";

export default function SimulationPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [running, setRunning] = useState(false);

  const runScenario = useCallback((index: number) => {
    if (running) return;
    setRunning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setRunning(false);
    }, 1400);
  }, [running]);

  const primary = simulationScenarios[activeIndex];
  const others = simulationScenarios.filter((_, i) => i !== activeIndex);

  return (
    <div className="grid grid-cols-12 gap-4 pt-8 auto-rows-auto">

      {/* ── Row 1: Scenario config + Results overview ── */}
      <div className="col-span-5">
        <div className="bg-bg-panel border border-border-subtle rounded-sm flex flex-col h-full">
          {/* Header */}
          <div className="px-5 py-3 border-b border-border-subtle">
            <span className="text-[10px] uppercase tracking-[0.22em] text-text-tertiary font-mono">
              Active Scenario
            </span>
          </div>

          <div className="flex flex-col gap-5 p-5 flex-1">
            <div>
              <h3 className="font-mono text-base font-semibold text-text-primary tracking-tight">
                {primary.name}
              </h3>
              <span className="text-[10px] font-mono text-text-tertiary uppercase tracking-wide">
                {primary.type}
              </span>
            </div>

            <p className="text-[12px] text-text-secondary leading-relaxed">
              {primary.description}
            </p>

            {/* Parameters */}
            <div className="space-y-2 py-3 border-y border-border-subtle">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-text-tertiary font-mono uppercase tracking-wide">
                  Shock Magnitude
                </span>
                <span className="text-[11px] font-mono text-text-primary">
                  {primary.shockMagnitude}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-text-tertiary font-mono uppercase tracking-wide">
                  Time Horizon
                </span>
                <span className="text-[11px] font-mono text-text-primary">
                  {primary.timeHorizon}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-text-tertiary font-mono uppercase tracking-wide">
                  Est. Liquidations
                </span>
                <span className="text-[11px] font-mono text-risk-critical">
                  {primary.estimatedLiquidations}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-text-tertiary font-mono uppercase tracking-wide">
                  Recovery Time
                </span>
                <span className="text-[11px] font-mono text-text-primary">
                  {primary.recoveryTime}
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => runScenario(activeIndex)}
              disabled={running}
              className={cn(
                "w-full py-2.5 rounded-sm font-mono text-[12px] font-semibold uppercase tracking-widest",
                "border transition-colors duration-100",
                running
                  ? "bg-bg-elevated border-accent-blue text-accent-blue cursor-not-allowed"
                  : "bg-bg-elevated border-border-active text-text-primary hover:bg-bg-panel-hover hover:border-border-active"
              )}
            >
              {running ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse inline-block" />
                  Running...
                </span>
              ) : "Run Simulation"}
            </button>
          </div>
        </div>
      </div>

      <div className="col-span-7">
        <div className="bg-bg-panel border border-border-subtle rounded-sm flex flex-col h-full">
          {/* Header */}
          <div className="px-5 py-3 border-b border-border-subtle flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.22em] text-text-tertiary font-mono">
              Projected Outcome
            </span>
            <span
              className={cn(
                "text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-sm tracking-wide",
                getRiskBadgeBgClass(getRiskLevelFromValue(primary.projectedPeakRisk))
              )}
            >
              {getRiskLabel(getRiskLevelFromValue(primary.projectedPeakRisk))}
            </span>
          </div>

          <div className="flex flex-col gap-6 p-6 flex-1">
            {/* Peak risk display */}
            <div className="flex items-center gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono block mb-1">
                  Projected Peak Risk
                </span>
                <span
                  className={cn(
                    "font-mono text-[56px] leading-none font-bold tabular-nums",
                    getRiskColorClass(getRiskLevelFromValue(primary.projectedPeakRisk))
                  )}
                >
                  {formatRiskValue(primary.projectedPeakRisk)}
                </span>
              </div>
              <div className="flex flex-col gap-3 ml-auto">
                <div>
                  <span className="text-[10px] text-text-tertiary font-mono uppercase tracking-wide block">
                    Liquidation Volume
                  </span>
                  <span className="font-mono text-xl font-bold text-risk-critical tabular-nums">
                    {primary.estimatedLiquidations}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-text-tertiary font-mono uppercase tracking-wide block">
                    Recovery Estimate
                  </span>
                  <span className="font-mono text-sm text-text-primary">
                    {primary.recoveryTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick results summary */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border-subtle">
              {primary.results.slice(0, 3).map((row) => (
                <div key={row.metric} className="bg-bg-primary border border-border-subtle rounded-sm px-4 py-3">
                  <div className="text-[10px] text-text-tertiary font-mono uppercase tracking-wide mb-1">
                    {row.metric}
                  </div>
                  <div className="font-mono text-sm font-bold text-text-primary tabular-nums">
                    {row.projected}
                  </div>
                  <div className="text-[10px] font-mono text-risk-high tabular-nums mt-0.5">
                    {row.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: Full impact table ── */}
      <div className="col-span-12">
        <ImpactTableCard
          title={`Impact Analysis — ${primary.name}`}
          results={primary.results}
        />
      </div>

      {/* ── Row 3: Other scenarios ── */}
      {others.map((scenario) => (
        <div key={scenario.id} className="col-span-6">
          <div className="bg-bg-panel border border-border-subtle rounded-sm flex flex-col h-full">
            <div className="px-5 py-3 border-b border-border-subtle flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.22em] text-text-tertiary font-mono">
                {scenario.type}
              </span>
              <span
                className={cn(
                  "text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-sm tracking-wide",
                  getRiskBadgeBgClass(getRiskLevelFromValue(scenario.projectedPeakRisk))
                )}
              >
                PEAK {formatRiskValue(scenario.projectedPeakRisk)}
              </span>
            </div>

            <div className="flex gap-6 p-5 flex-1">
              {/* Left: description */}
              <div className="flex flex-col gap-3 flex-1">
                <h3 className="font-mono text-sm font-semibold text-text-primary tracking-tight">
                  {scenario.name}
                </h3>
                <p className="text-[12px] text-text-secondary leading-relaxed flex-1">
                  {scenario.description}
                </p>
                <button
                  onClick={() => runScenario(simulationScenarios.indexOf(scenario))}
                  disabled={running}
                  className={cn(
                    "w-full py-2 rounded-sm font-mono text-[11px] font-semibold uppercase tracking-widest",
                    "border transition-colors duration-100",
                    running
                      ? "bg-bg-elevated border-border-subtle text-text-tertiary cursor-not-allowed"
                      : "bg-bg-elevated border-border-active text-text-primary hover:bg-bg-panel-hover"
                  )}
                >
                  {running ? "Running..." : "Run Scenario"}
                </button>
              </div>

              {/* Right: key metrics */}
              <div className="border-l border-border-subtle pl-5 min-w-40">
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] text-text-tertiary font-mono uppercase tracking-wide block">
                      Shock
                    </span>
                    <span className="font-mono text-[13px] text-text-primary">
                      {scenario.shockMagnitude}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-text-tertiary font-mono uppercase tracking-wide block">
                      Horizon
                    </span>
                    <span className="font-mono text-[13px] text-text-primary">
                      {scenario.timeHorizon}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-text-tertiary font-mono uppercase tracking-wide block">
                      Liquidations
                    </span>
                    <span className="font-mono text-[13px] text-risk-critical">
                      {scenario.estimatedLiquidations}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-text-tertiary font-mono uppercase tracking-wide block">
                      Recovery
                    </span>
                    <span className="font-mono text-[13px] text-text-primary">
                      {scenario.recoveryTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}
