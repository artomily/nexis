"use client";

import { ModuleHeroCard } from "@/components/cards/module-hero-card";
import { KeyIndicatorCard } from "@/components/cards/key-indicator-card";
import { AlertFeedCard } from "@/components/cards/alert-feed-card";
import { RiskTimelineCard } from "@/components/cards/risk-timeline-card";
import { DataTableCard } from "@/components/cards/data-table-card";
import { useModuleData } from "@/lib/hooks/use-module-data";
import { useMarketData } from "@/lib/hooks/use-market-data";
import { moduleDetails } from "@/lib/detail-data";

export default function StablecoinPage() {
  const { data: realModule } = useModuleData("stablecoin");
  const { data: market } = useMarketData();

  const module = market.moduleRiskSummaries.find((m) => m.id === "stablecoin")!;
  const staticDetail = moduleDetails["stablecoin"];

  const detail = {
    ...staticDetail,
    keyIndicators: realModule?.keyIndicators ?? staticDetail.keyIndicators,
    alerts: realModule?.alerts ?? staticDetail.alerts,
    timeline: realModule?.timeline ?? staticDetail.timeline,
  };

  const tableRows = realModule?.tableData ?? [
    { label: "USDT Total Supply", value: "$118.4B" },
    { label: "USDT on Tron", value: "$58.2B (49%)" },
    { label: "USDC Total Supply", value: "$34.8B" },
    { label: "DAI Total Supply", value: "$5.2B" },
    { label: "7D USDT Redemptions", value: "$890M" },
    { label: "7D USDC Mints", value: "$210M" },
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

      {/* ── Row 3: Timeline + Stablecoin Supply ── */}
      <div className="col-span-8 min-h-85">
        <RiskTimelineCard data={detail.timeline} />
      </div>
      <div className="col-span-4">
        <DataTableCard
          title="Stablecoin Supply Breakdown"
          rows={tableRows}
        />
      </div>

    </div>
  );
}
