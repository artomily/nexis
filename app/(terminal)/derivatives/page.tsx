"use client";

import { ModuleHeroCard } from "@/components/cards/module-hero-card";
import { KeyIndicatorCard } from "@/components/cards/key-indicator-card";
import { AlertFeedCard } from "@/components/cards/alert-feed-card";
import { RiskTimelineCard } from "@/components/cards/risk-timeline-card";
import { DataTableCard } from "@/components/cards/data-table-card";
import { useModuleData } from "@/lib/hooks/use-module-data";
import { useMarketData } from "@/lib/hooks/use-market-data";
import { moduleDetails } from "@/lib/detail-data";

export default function DerivativesPage() {
  const { data: realModule } = useModuleData("derivatives");
  const { data: market } = useMarketData();

  const module = market.moduleRiskSummaries.find((m) => m.id === "derivatives")!;
  const staticDetail = moduleDetails["derivatives"];

  const detail = {
    ...staticDetail,
    keyIndicators: realModule?.keyIndicators ?? staticDetail.keyIndicators,
    alerts: realModule?.alerts ?? staticDetail.alerts,
    timeline: realModule?.timeline ?? staticDetail.timeline,
  };

  const tableRows = realModule?.tableData ?? [
    { label: "Binance", value: "$14.2B (37%)" },
    { label: "Bybit", value: "$8.7B (23%)" },
    { label: "OKX", value: "$6.1B (16%)" },
    { label: "CME", value: "$4.8B (13%)" },
    { label: "dYdX", value: "$2.6B (7%)" },
    { label: "Others", value: "$1.8B (4%)" },
  ];

  return (
    <div className="grid grid-cols-12 gap-4 auto-rows-auto">

      {/* ── Row 1: Hero + Alerts ── */}
      <div className="col-span-8">
        <ModuleHeroCard module={module} detail={detail} />
      </div>
      <div className="col-span-4">
        <AlertFeedCard alerts={detail.alerts} />
      </div>

      {/* ── Row 2: Key Indicators (4 × col-3) ── */}
      {detail.keyIndicators.map((indicator) => (
        <div key={indicator.label} className="col-span-3">
          <KeyIndicatorCard data={indicator} />
        </div>
      ))}

      {/* ── Row 3: Timeline + Position Concentration ── */}
      <div className="col-span-8 min-h-85">
        <RiskTimelineCard data={detail.timeline} />
      </div>
      <div className="col-span-4">
        <DataTableCard
          title="OI Concentration by Venue"
          rows={tableRows}
        />
      </div>

    </div>
  );
}
