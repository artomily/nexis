// ============================================
// RiskTerminal AI — Static Mock Data
// ============================================

import type {
  MarketRiskIndex,
  RiskTimelinePoint,
  IntelligenceReport,
  ModuleRiskSummary,
  MomentumData,
  NavItem,
} from "@/types";

// --- Global Market Risk Index ---

export const marketRiskIndex: MarketRiskIndex = {
  value: 82.4,
  state: "distribution",
  momentum: 3.2,
  lastUpdated: "2026-03-02T14:32:00Z",
};

// --- Momentum Data ---

export const momentumData: MomentumData = {
  change24h: 3.2,
  change7d: 8.7,
  acceleration: "accelerating",
  sparkline: [
    64, 65, 63, 67, 70, 68, 71, 73, 72, 75,
    74, 76, 78, 77, 79, 80, 79, 81, 82, 82,
  ],
};

// --- AI Intelligence Report ---

export const intelligenceReport: IntelligenceReport = {
  primaryDriver:
    "Derivatives open interest concentration exceeding 2σ threshold on BTC perpetuals. Funding rates sustained above 0.03% for 96 consecutive hours, indicating late-cycle leveraged long crowding.",
  secondaryDriver:
    "Stablecoin net outflows from centralized venues accelerating over a 72-hour window. USDT redemption velocity on Tron +34% week-over-week. USDC mint activity on Ethereum suppressed.",
  riskOutlook7D:
    "Elevated risk regime likely to persist. Reversion probability sits below the 30th percentile of prior distribution phases. Inflection monitors: CME basis compression below 4%, aggregate OI decline >12%.",
  summary:
    "Market structure exhibits characteristics consistent with a late-stage distribution phase. Convergence of elevated derivatives leverage, weakening stablecoin demand, and concentrated whale positioning creates a fragile equilibrium.",
  generatedAt: "2026-03-02T14:30:00Z",
};

// --- Risk Timeline (90 data points, ~1 per day) ---

function generateTimeline(): RiskTimelinePoint[] {
  const points: RiskTimelinePoint[] = [];
  const baseDate = new Date("2026-03-02T14:00:00Z");
  const baseValues = [
    45, 47, 44, 48, 51, 53, 50, 52, 55, 58,
    56, 54, 57, 60, 63, 61, 59, 62, 65, 68,
    66, 64, 67, 70, 72, 69, 71, 74, 73, 75,
    72, 70, 73, 76, 78, 75, 77, 74, 72, 75,
    78, 80, 77, 79, 76, 74, 77, 80, 82, 79,
    81, 78, 76, 79, 82, 84, 81, 83, 80, 78,
    75, 73, 76, 79, 81, 78, 80, 77, 75, 78,
    81, 83, 80, 82, 79, 77, 80, 83, 85, 82,
    84, 81, 79, 82, 85, 83, 80, 82, 84, 82,
  ];

  for (let i = 0; i < 90; i++) {
    const date = new Date(baseDate);
    date.setUTCDate(date.getUTCDate() - (89 - i));
    points.push({
      timestamp: date.toISOString(),
      value: baseValues[i],
    });
  }

  return points;
}

export const riskTimeline: RiskTimelinePoint[] = generateTimeline();

// --- Module Risk Summaries ---

export const moduleRiskSummaries: ModuleRiskSummary[] = [
  {
    id: "liquidity",
    label: "Liquidity Risk",
    level: "high",
    value: 78,
    description: "Bid depth declining across top 10 pairs. Spread widening accelerating on altcoin markets.",
    subMetrics: [
      { label: "Bid Depth (BTC)", value: "−34%" },
      { label: "Spread Avg", value: "+0.18%" },
    ],
  },
  {
    id: "derivatives",
    label: "Derivatives Risk",
    level: "critical",
    value: 91,
    description: "Open interest at cycle highs. Funding rates elevated. Liquidation cascade risk elevated.",
    subMetrics: [
      { label: "BTC OI", value: "$38.2B" },
      { label: "Funding Rate", value: "+0.041%" },
    ],
  },
  {
    id: "whale",
    label: "Whale Pressure",
    level: "high",
    value: 72,
    description: "Large holder net position change trending negative over 7D. Exchange inflow from whale wallets +18%.",
    subMetrics: [
      { label: "Exchange Inflow", value: "+18%" },
      { label: "Net Position Δ", value: "−$2.1B" },
    ],
  },
  {
    id: "stablecoin",
    label: "Stablecoin Flow",
    level: "medium",
    value: 54,
    description: "Net outflows moderating from prior 72h peak. USDC/USDT peg stability within normal bounds. Redemption velocity declining.",
    subMetrics: [
      { label: "7D Net Flow", value: "−$1.4B" },
      { label: "USDT Velocity", value: "+34% WoW" },
      { label: "USDC Mints", value: "Suppressed" },
      { label: "Peg Deviation", value: "<0.03%" },
    ],
  },
  {
    id: "systemic",
    label: "Systemic Stress",
    level: "high",
    value: 76,
    description: "Cross-venue contagion risk elevated. Correlation clustering between BTC, ETH, and major altcoins approaching 2021 peak levels. Leverage concentration systemic.",
    subMetrics: [
      { label: "Correlation (BTC/ETH)", value: "0.94" },
      { label: "Contagion Score", value: "76 / 100" },
      { label: "Venue Exposure", value: "4 flagged" },
      { label: "Cascade Risk", value: "Moderate" },
    ],
  },
];

// --- Navigation Items ---

export const navItems: NavItem[] = [
  { label: "Overview", href: "/overview", segment: "overview" },
  { label: "Liquidity Risk", href: "/liquidity", segment: "liquidity" },
  { label: "Derivatives Risk", href: "/derivatives", segment: "derivatives" },
  { label: "Stablecoin Flow", href: "/stablecoin", segment: "stablecoin" },
  { label: "Whale Activity", href: "/whale", segment: "whale" },
  { label: "Systemic Stress", href: "/systemic", segment: "systemic" },
  { label: "Event Replay", href: "/replay", segment: "replay" },
  { label: "Simulation", href: "/simulation", segment: "simulation" },
];
