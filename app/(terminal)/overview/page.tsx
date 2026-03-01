import { MarketRiskCore } from "@/components/cards/market-risk-core";
import { RiskMomentumCard } from "@/components/cards/risk-momentum-card";
import { ModuleRiskCard } from "@/components/cards/module-risk-card";
import { WideModuleCard } from "@/components/cards/wide-module-card";
import { RiskTimelineCard } from "@/components/cards/risk-timeline-card";
import { SimulationCard } from "@/components/cards/simulation-card";
import {
  marketRiskIndex,
  intelligenceReport,
  momentumData,
  moduleRiskSummaries,
  riskTimeline,
} from "@/lib/mock-data";

export const metadata = {
  title: "Overview — RiskTerminal AI",
};

export default function OverviewPage() {
  const liquidity = moduleRiskSummaries.find((m) => m.id === "liquidity")!;
  const derivatives = moduleRiskSummaries.find((m) => m.id === "derivatives")!;
  const whale = moduleRiskSummaries.find((m) => m.id === "whale")!;
  const stablecoin = moduleRiskSummaries.find((m) => m.id === "stablecoin")!;
  const systemic = moduleRiskSummaries.find((m) => m.id === "systemic")!;

  return (
    <div className="grid grid-cols-12 gap-4 auto-rows-auto">

      {/* ── Row 1: Hero + Momentum ── */}
      <div className="col-span-8">
        <MarketRiskCore index={marketRiskIndex} report={intelligenceReport} />
      </div>
      <div className="col-span-4">
        <RiskMomentumCard data={momentumData} />
      </div>

      {/* ── Row 2: Module cards (3 × col-4) ── */}
      <div className="col-span-4">
        <ModuleRiskCard data={liquidity} />
      </div>
      <div className="col-span-4">
        <ModuleRiskCard data={derivatives} />
      </div>
      <div className="col-span-4">
        <ModuleRiskCard data={whale} />
      </div>

      {/* ── Row 3: Wide module cards (2 × col-6) ── */}
      <div className="col-span-6">
        <WideModuleCard data={stablecoin} />
      </div>
      <div className="col-span-6">
        <WideModuleCard data={systemic} />
      </div>

      {/* ── Row 4: Timeline + Simulation ── */}
      <div className="col-span-8 min-h-[340px]">
        <RiskTimelineCard data={riskTimeline} />
      </div>
      <div className="col-span-4">
        <SimulationCard />
      </div>

    </div>
  );
}
