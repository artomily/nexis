"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatRiskValue } from "@/lib/format";
import { getRiskBadgeBgClass, getRiskLabel, getRiskColorClass, getRiskLevelFromValue } from "@/lib/risk-levels";
import { RiskTimelineCard } from "@/components/cards/risk-timeline-card";
import { useReplayData } from "@/lib/hooks/use-replay-data";
import { historicalEvents as staticEvents } from "@/lib/detail-data";
import type { HistoricalEvent } from "@/types";

export default function ReplayPage() {
  const { data: replayData, isLive } = useReplayData();

  const events: HistoricalEvent[] = replayData?.events ?? staticEvents;
  const [selected, setSelected] = useState<HistoricalEvent>(events[0]);

  // Keep selected in sync when live data arrives
  const currentSelected = events.find((e) => e.id === selected.id) ?? events[0];

  const currentPrices = replayData?.currentPrices;

  return (
    <div className="grid grid-cols-12 gap-4 pt-8 auto-rows-auto">

      {/* ── Row 1: Page header ── */}
      <div className="col-span-12">
        <div className="bg-bg-panel border border-border-subtle rounded-sm px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-text-tertiary font-mono block mb-1">
              Event Replay Engine
            </span>
            <h2 className="font-mono text-base font-semibold text-text-primary tracking-tight">
              Historical Risk Events
            </h2>
          </div>
          <div className="flex items-center gap-6">
            {currentPrices && currentPrices.btc > 0 && (
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono block">
                  BTC Now
                </span>
                <span className="font-mono text-sm text-text-primary tabular-nums">
                  ${currentPrices.btc.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </span>
              </div>
            )}
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono block">
                Database
              </span>
              <span className="font-mono text-sm text-text-primary tabular-nums">
                {events.length} events indexed
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono block">
                Loaded
              </span>
              <span className={cn(
                "font-mono text-sm font-semibold tabular-nums",
                getRiskColorClass(getRiskLevelFromValue(currentSelected.peakRiskValue))
              )}>
                Peak {formatRiskValue(currentSelected.peakRiskValue)}
              </span>
            </div>
            {isLive && (
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-[9px] font-mono text-green-400 uppercase tracking-widest">Live</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Row 2: Event selector cards (3 × col-4) ── */}
      {events.map((event) => {
        const isActive = event.id === currentSelected.id;
        const level = getRiskLevelFromValue(event.peakRiskValue);
        return (
          <button
            key={event.id}
            onClick={() => setSelected(event)}
            className={cn(
              "col-span-4 text-left w-full",
              "bg-bg-panel rounded-sm border transition-all duration-150",
              isActive
                ? "border-accent-blue ring-1 ring-accent-blue/30"
                : "border-border-subtle hover:border-border-active"
            )}
          >
            <div className="flex flex-col h-full">
              {/* Card header */}
              <div className="px-5 py-3 border-b border-border-subtle flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.22em] text-text-tertiary font-mono">
                  {event.type}
                </span>
                <div className="flex items-center gap-2">
                  {isActive && (
                    <span className="flex items-center gap-1 text-[9px] font-mono text-accent-blue uppercase tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse inline-block" />
                      Loaded
                    </span>
                  )}
                  <span className={cn(
                    "text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-sm tracking-wide",
                    getRiskBadgeBgClass(level)
                  )}>
                    {getRiskLabel(level)}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5 flex gap-5 flex-1">
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="font-mono text-sm font-semibold text-text-primary tracking-tight leading-snug">
                    {event.name}
                  </h3>
                  <p className="text-[11px] text-text-secondary leading-relaxed flex-1">
                    {event.description}
                  </p>
                  <span className="text-[10px] font-mono text-text-tertiary">{event.date}</span>
                </div>
                <div className="border-l border-border-subtle pl-5 flex flex-col items-end justify-center gap-1">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono">
                    Peak
                  </span>
                  <span className={cn(
                    "font-mono text-[40px] leading-none font-bold tabular-nums",
                    getRiskColorClass(level)
                  )}>
                    {formatRiskValue(event.peakRiskValue)}
                  </span>
                  <span className="text-[10px] font-mono text-text-tertiary">{event.duration}</span>
                </div>
              </div>
            </div>
          </button>
        );
      })}

      {/* ── Row 3: Timeline chart (reactive) ── */}
      <div className="col-span-8 min-h-85">
        <RiskTimelineCard key={currentSelected.id} data={currentSelected.timeline} />
      </div>

      {/* ── Row 3b: Post-mortem analysis panel ── */}
      <div className="col-span-4">
        <div className="bg-bg-panel border border-border-subtle rounded-sm flex flex-col h-full">
          <div className="px-5 py-3 border-b border-border-subtle flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.22em] text-text-tertiary font-mono">
              Post-Mortem Analysis
            </span>
            <span className={cn(
              "text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-sm tracking-wide",
              getRiskBadgeBgClass(getRiskLevelFromValue(currentSelected.peakRiskValue))
            )}>
              {currentSelected.impactLevel}
            </span>
          </div>
          <div className="px-5 py-4 flex-1 flex flex-col gap-4">
            <div>
              <h3 className="font-mono text-sm font-semibold text-text-primary tracking-tight mb-2">
                {currentSelected.name}
              </h3>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                {currentSelected.analysis}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-3 border-t border-border-subtle mt-auto">
              {currentSelected.metrics.map((metric) => (
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
      </div>

    </div>
  );
}
