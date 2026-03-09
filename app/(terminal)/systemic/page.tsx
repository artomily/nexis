"use client";

import { ModuleHeroCard } from "@/components/cards/module-hero-card";
import { KeyIndicatorCard } from "@/components/cards/key-indicator-card";
import { AlertFeedCard } from "@/components/cards/alert-feed-card";
import { RiskTimelineCard } from "@/components/cards/risk-timeline-card";
import { DataTableCard } from "@/components/cards/data-table-card";
import { useModuleData } from "@/lib/hooks/use-module-data";
import { useMarketData } from "@/lib/hooks/use-market-data";
import { moduleDetails } from "@/lib/detail-data";

export default function SystemicPage() {
  const { data: realModule } = useModuleData("systemic");
  const { data: market } = useMarketData();

  const module = market.moduleRiskSummaries.find((m) => m.id === "systemic")!;
  const staticDetail = moduleDetails["systemic"];

  const detail = {
    ...staticDetail,
    keyIndicators: realModule?.keyIndicators ?? staticDetail.keyIndicators,
    alerts: realModule?.alerts ?? staticDetail.alerts,
    timeline: realModule?.timeline ?? staticDetail.timeline,
  };

  const tableRows = realModule?.tableData ?? [
    { label: "Binance", value: "$14.2B OI — FLAGGED" },
    { label: "Bybit", value: "$8.7B OI — FLAGGED" },
    { label: "OKX", value: "$6.1B OI — FLAGGED" },
    { label: "dYdX", value: "$2.6B OI — FLAGGED" },
    { label: "CME", value: "$4.8B OI — Clear" },
    { label: "Kraken", value: "$1.2B OI — Clear" },
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

      {/* ── Row 3: Timeline + Venue Exposure ── */}
      <div className="col-span-8 min-h-85">
        <RiskTimelineCard data={detail.timeline} />
      </div>
      <div className="col-span-4">
        <DataTableCard
          title="Venue Risk Exposure"
          rows={tableRows}
        />
      </div>

    </div>
  );
}
