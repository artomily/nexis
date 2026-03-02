import { ModuleHeroCard } from "@/components/cards/module-hero-card";
import { KeyIndicatorCard } from "@/components/cards/key-indicator-card";
import { AlertFeedCard } from "@/components/cards/alert-feed-card";
import { RiskTimelineCard } from "@/components/cards/risk-timeline-card";
import { DataTableCard } from "@/components/cards/data-table-card";
import { moduleRiskSummaries } from "@/lib/mock-data";
import { moduleDetails } from "@/lib/detail-data";

export const metadata = {
  title: "Liquidity Risk — RiskTerminal AI",
};

export default function LiquidityPage() {
  const module = moduleRiskSummaries.find((m) => m.id === "liquidity")!;
  const detail = moduleDetails["liquidity"];

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
          rows={[
            { label: "Binance BTC/USDT", value: "$12.4M bid" },
            { label: "Coinbase BTC/USD", value: "$8.2M bid" },
            { label: "OKX BTC/USDT", value: "$5.8M bid" },
            { label: "Bybit BTC/USDT", value: "$3.4M bid" },
            { label: "Kraken BTC/USD", value: "$1.8M bid" },
            { label: "Total Aggregate", value: "$31.6M" },
          ]}
        />
      </div>

    </div>
  );
}
