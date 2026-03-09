"use client";

import { ModuleHeroCard } from "@/components/cards/module-hero-card";
import { KeyIndicatorCard } from "@/components/cards/key-indicator-card";
import { AlertFeedCard } from "@/components/cards/alert-feed-card";
import { RiskTimelineCard } from "@/components/cards/risk-timeline-card";
import { DataTableCard } from "@/components/cards/data-table-card";
import { useModuleData } from "@/lib/hooks/use-module-data";
import { useMarketData } from "@/lib/hooks/use-market-data";
import { moduleDetails } from "@/lib/detail-data";

export default function LiquidityPage() {
  const { data: realModule, isLive } = useModuleData("liquidity");
  const { data: market } = useMarketData();

  const module = market.moduleRiskSummaries.find((m) => m.id === "liquidity")!;
  const staticDetail = moduleDetails["liquidity"];

  const detail = {
    ...staticDetail,
    keyIndicators: realModule?.keyIndicators ?? staticDetail.keyIndicators,
    alerts: realModule?.alerts ?? staticDetail.alerts,
    timeline: realModule?.timeline ?? staticDetail.timeline,
  };

  const tableRows = realModule?.tableData ?? [
    { label: "Binance BTC/USDT", value: "$42.3M bid depth" },
    { label: "Coinbase BTC/USD", value: "$28.1M bid depth" },
    { label: "OKX BTC/USDT", value: "$18.7M bid depth" },
    { label: "dYdX BTC-PERP", value: "$8.4M bid depth" },
    { label: "Aggregate Depth", value: "$112.6M total" },
    { label: "Depth Δ 24h", value: "-8.3% contraction" },
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

      {/* ── Row 3: Timeline + Venue Data ── */}
      <div className="col-span-8 min-h-85">
        <RiskTimelineCard data={detail.timeline} />
      </div>
      <div className="col-span-4">
        <DataTableCard
          title="Venue Depth Analysis"
          rows={tableRows}
        />
      </div>

    </div>
  );
}
