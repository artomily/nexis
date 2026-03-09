"use client";

import { ModuleHeroCard } from "@/components/cards/module-hero-card";
import { KeyIndicatorCard } from "@/components/cards/key-indicator-card";
import { AlertFeedCard } from "@/components/cards/alert-feed-card";
import { RiskTimelineCard } from "@/components/cards/risk-timeline-card";
import { DataTableCard } from "@/components/cards/data-table-card";
import { useModuleData } from "@/lib/hooks/use-module-data";
import { useMarketData } from "@/lib/hooks/use-market-data";
import { moduleDetails } from "@/lib/detail-data";

export default function WhalePage() {
  const { data: realModule } = useModuleData("whale");
  const { data: market } = useMarketData();

  const module = market.moduleRiskSummaries.find((m) => m.id === "whale")!;
  const staticDetail = moduleDetails["whale"];

  const detail = {
    ...staticDetail,
    keyIndicators: realModule?.keyIndicators ?? staticDetail.keyIndicators,
    alerts: realModule?.alerts ?? staticDetail.alerts,
    timeline: realModule?.timeline ?? staticDetail.timeline,
  };

  const tableRows = realModule?.tableData ?? [
    { label: "CB Prime → Exchange", value: "12,400 BTC" },
    { label: "Binance Whale Inflow", value: "8,200 BTC" },
    { label: "OKX Whale Inflow", value: "4,600 BTC" },
    { label: "ETH Whale Accum.", value: "+$340M" },
    { label: "Top 100 Net Δ (7D)", value: "−34,200 BTC" },
    { label: "Wallets Active >1K BTC", value: "847" },
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

      {/* ── Row 3: Timeline + Whale Activity ── */}
      <div className="col-span-8 min-h-85">
        <RiskTimelineCard data={detail.timeline} />
      </div>
      <div className="col-span-4">
        <DataTableCard
          title="Recent Whale Movements"
          rows={tableRows}
        />
      </div>

    </div>
  );
}
