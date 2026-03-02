import { EventSummaryCard } from "@/components/cards/event-summary-card";
import { RiskTimelineCard } from "@/components/cards/risk-timeline-card";
import { DataTableCard } from "@/components/cards/data-table-card";
import { historicalEvents } from "@/lib/detail-data";

export const metadata = {
  title: "Event Replay — RiskTerminal AI",
};

export default function ReplayPage() {
  const featured = historicalEvents[0];

  return (
    <div className="grid grid-cols-12 gap-4 auto-rows-auto">

      {/* ── Row 1: Page header + stats ── */}
      <div className="col-span-5">
        <div className="bg-bg-panel border border-border-subtle rounded-sm p-6 h-full flex flex-col gap-4">
          <span className="text-[10px] uppercase tracking-[0.22em] text-text-tertiary font-mono">
            Event Replay Engine
          </span>
          <h2 className="font-mono text-lg font-semibold text-text-primary tracking-tight">
            Historical Risk Events
          </h2>
          <p className="text-[13px] text-text-secondary leading-relaxed flex-1">
            Analyze past market stress events through the lens of the RiskTerminal AI framework.
            Each event is reconstructed with real-time risk index trajectories, allowing institutional
            teams to study cascade mechanics, contagion patterns, and recovery dynamics.
          </p>
          <div className="pt-3 border-t border-border-subtle">
            <span className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono">
              Database
            </span>
            <span className="font-mono text-[13px] text-text-primary ml-2 tabular-nums">
              {historicalEvents.length} events indexed
            </span>
          </div>
        </div>
      </div>
      <div className="col-span-7">
        <DataTableCard
          title="Event Comparison Matrix"
          rows={historicalEvents.map((event) => ({
            label: event.name,
            value: `Peak ${event.peakRiskValue} · ${event.duration} · ${event.type}`,
          }))}
        />
      </div>

      {/* ── Row 2: Event cards (3 × col-4) ── */}
      {historicalEvents.map((event) => (
        <div key={event.id} className="col-span-4">
          <EventSummaryCard event={event} />
        </div>
      ))}

      {/* ── Row 3: Featured event timeline + analysis ── */}
      <div className="col-span-8 min-h-[340px]">
        <RiskTimelineCard data={featured.timeline} />
      </div>
      <div className="col-span-4">
        <div className="bg-bg-panel border border-border-subtle rounded-sm flex flex-col h-full">
          <div className="px-5 py-3 border-b border-border-subtle">
            <span className="text-[10px] uppercase tracking-[0.22em] text-text-tertiary font-mono">
              Featured Analysis
            </span>
          </div>
          <div className="px-5 py-4 flex-1">
            <h3 className="font-mono text-sm font-semibold text-text-primary tracking-tight mb-3">
              {featured.name}
            </h3>
            <p className="text-[12px] text-text-secondary leading-relaxed mb-4">
              {featured.analysis}
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-3 border-t border-border-subtle">
              {featured.metrics.map((metric) => (
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
