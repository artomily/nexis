// ============================================
// RiskTerminal AI — Module Detail & Scenario Data
// ============================================

import type {
  RiskTimelinePoint,
  ModuleDetailData,
  HistoricalEvent,
  SimulationScenario,
} from "@/types";

// --- Helper: generate deterministic timeline ---

function buildTimeline(values: number[]): RiskTimelinePoint[] {
  const points: RiskTimelinePoint[] = [];
  const baseDate = new Date("2026-03-02T14:00:00Z");
  for (let i = 0; i < values.length; i++) {
    const date = new Date(baseDate);
    date.setUTCDate(date.getUTCDate() - (values.length - 1 - i));
    points.push({ timestamp: date.toISOString(), value: values[i] });
  }
  return points;
}

// ============================================
// MODULE DETAIL DATA
// ============================================

export const moduleDetails: Record<string, ModuleDetailData> = {
  liquidity: {
    aiAnalysis:
      "Order book depth across major BTC and ETH pairs has deteriorated significantly over the past 72 hours. Top-of-book liquidity on Binance, Coinbase, and OKX has contracted by 34% on the bid side, while ask-side depth remains relatively stable — a pattern historically associated with market maker risk-off repositioning ahead of volatility events.",
    primaryDriver:
      "Bid depth on BTC/USDT across top 5 venues contracted from $48M aggregate to $31.6M within 72 hours. Altcoin pair spreads widened 2.3x from 30-day average, with SOL/USDT and AVAX/USDT showing the most pronounced deterioration.",
    outlook7D:
      "Liquidity conditions expected to remain stressed. Market maker inventory models suggest current depth levels are unsustainable without a volatility compression event. Key watch: BTC bid depth recovery above $40M aggregate would signal stabilization.",
    keyIndicators: [
      { label: "BTC Bid Depth", value: "$31.6M", change: "−34%", direction: "down" },
      { label: "BTC Ask Depth", value: "$44.2M", change: "−8%", direction: "down" },
      { label: "BTC Spread Avg", value: "0.18%", change: "+0.07%", direction: "up" },
      { label: "ETH Spread Avg", value: "0.22%", change: "+0.09%", direction: "up" },
    ],
    alerts: [
      {
        id: "liq-1",
        severity: "critical",
        title: "BTC bid depth below $32M threshold",
        description: "Aggregate bid depth across top 5 venues has breached the critical liquidity threshold. Last seen during Jun 2024 deleveraging event.",
        timestamp: "2026-03-02T13:45:00Z",
      },
      {
        id: "liq-2",
        severity: "high",
        title: "Altcoin spread widening acceleration",
        description: "SOL/USDT spread expanded to 0.31% — 3.1x the 30-day average. AVAX/USDT at 0.28%. Pattern consistent with market maker withdrawal.",
        timestamp: "2026-03-02T11:20:00Z",
      },
      {
        id: "liq-3",
        severity: "medium",
        title: "ETH/BTC depth ratio divergence",
        description: "ETH bid depth declining faster than BTC for the first time in 14 days. Ratio shifted from 0.62 to 0.54.",
        timestamp: "2026-03-02T08:10:00Z",
      },
    ],
    timeline: buildTimeline([
      52, 54, 51, 53, 56, 58, 55, 57, 60, 62,
      59, 61, 64, 66, 63, 65, 62, 60, 63, 66,
      68, 65, 67, 70, 72, 69, 71, 68, 66, 69,
      72, 74, 71, 73, 70, 68, 71, 74, 76, 73,
      75, 72, 70, 73, 76, 78, 75, 77, 74, 72,
      69, 67, 70, 73, 75, 72, 74, 71, 69, 72,
      75, 77, 74, 76, 73, 71, 74, 77, 79, 76,
      78, 75, 73, 76, 79, 77, 74, 76, 78, 76,
      74, 73, 75, 77, 79, 78, 76, 77, 78, 78,
    ]),
  },

  derivatives: {
    aiAnalysis:
      "The derivatives complex is exhibiting extreme risk characteristics. BTC perpetual futures open interest has reached $38.2B — the highest level since the November 2024 cycle peak. Funding rates have maintained a sustained positive bias above 0.03% for 96 consecutive 8-hour periods, indicating aggressive leveraged long positioning that historically precedes cascade liquidation events.",
    primaryDriver:
      "Concentrated long positioning on BTC perpetuals across Binance ($14.2B OI) and Bybit ($8.7B OI). CME basis at 8.4% annualized suggests institutional carry trade crowding. ETH OI/Market cap ratio at 4.2% — 2σ above mean.",
    outlook7D:
      "Liquidation cascade probability elevated at 34% (7-day horizon). Historical analogs suggest funding rate normalization requires either a 12%+ OI decline or a 6-8% spot correction. Monitor: aggregate OI decline below $34B, or funding rate sub-0.01% for 24h.",
    keyIndicators: [
      { label: "BTC Open Interest", value: "$38.2B", change: "+12.4%", direction: "up" },
      { label: "Funding Rate (8H)", value: "+0.041%", change: "+0.018%", direction: "up" },
      { label: "24H Liquidations", value: "$142M", change: "+67%", direction: "up" },
      { label: "CME Basis (Ann.)", value: "8.4%", change: "+1.2%", direction: "up" },
    ],
    alerts: [
      {
        id: "der-1",
        severity: "critical",
        title: "BTC OI exceeds $38B — cycle high",
        description: "Open interest has surpassed the previous cycle high set in November 2024. Concentration risk is extreme with 60% of OI on two venues.",
        timestamp: "2026-03-02T14:15:00Z",
      },
      {
        id: "der-2",
        severity: "critical",
        title: "Funding rate sustained above 0.03%",
        description: "96 consecutive 8-hour funding periods above 0.03%. This duration exceeds 95th percentile of historical sustained positive funding events.",
        timestamp: "2026-03-02T12:00:00Z",
      },
      {
        id: "der-3",
        severity: "high",
        title: "Liquidation cluster detected at $58,200",
        description: "Estimated $2.4B in long liquidations clustered between $58,200–$56,800. A move to this level would trigger cascading margin calls.",
        timestamp: "2026-03-02T09:30:00Z",
      },
      {
        id: "der-4",
        severity: "medium",
        title: "ETH OI/MCap ratio at 2σ",
        description: "ETH derivatives positioning relative to market cap has reached statistical extreme. Similar levels preceded a 22% correction in August 2024.",
        timestamp: "2026-03-01T22:00:00Z",
      },
    ],
    timeline: buildTimeline([
      48, 50, 47, 51, 54, 56, 53, 55, 58, 61,
      59, 57, 60, 63, 66, 64, 62, 65, 68, 71,
      69, 67, 70, 73, 75, 72, 74, 77, 76, 78,
      75, 73, 76, 79, 81, 78, 80, 77, 75, 78,
      81, 83, 80, 82, 79, 77, 80, 83, 85, 82,
      84, 81, 79, 82, 85, 87, 84, 86, 83, 81,
      84, 86, 83, 85, 88, 86, 84, 87, 89, 86,
      88, 85, 83, 86, 89, 87, 85, 88, 90, 88,
      86, 88, 90, 89, 91, 90, 88, 90, 91, 91,
    ]),
  },

  stablecoin: {
    aiAnalysis:
      "Stablecoin flow dynamics show a bifurcated pattern. USDT on Tron network is experiencing elevated redemption activity (+34% WoW), while USDC mint activity on Ethereum remains suppressed. Aggregate net outflows from centralized venues have moderated from the 72-hour peak but remain negative. Peg stability metrics are within normal bounds, suggesting no acute depeg risk at current levels.",
    primaryDriver:
      "USDT redemption velocity on Tron accelerated to $890M over 7 days — the highest since March 2023. Conversely, USDC on Ethereum saw near-zero net minting activity, suggesting institutional capital is not rotating into crypto-native stablecoin demand.",
    outlook7D:
      "Outflow pressure likely to moderate. Historical patterns suggest Tron USDT redemption velocity peaks within 5-7 days of acceleration onset. Key inflection: net stablecoin inflow exceeding $800M within 48 hours would signal demand return.",
    keyIndicators: [
      { label: "7D Net Flow", value: "−$1.4B", change: "−$0.6B", direction: "down" },
      { label: "USDT Velocity", value: "+34% WoW", change: "+12%", direction: "up" },
      { label: "USDC Mints (7D)", value: "$210M", change: "−58%", direction: "down" },
      { label: "Peg Deviation", value: "<0.03%", change: "Stable", direction: "neutral" },
    ],
    alerts: [
      {
        id: "stb-1",
        severity: "high",
        title: "USDT Tron redemption velocity spike",
        description: "7-day USDT redemption on Tron at $890M — highest since SVB crisis in March 2023. Historically correlated with institutional risk-off positioning.",
        timestamp: "2026-03-02T10:15:00Z",
      },
      {
        id: "stb-2",
        severity: "medium",
        title: "USDC mint activity suppressed",
        description: "Ethereum USDC net minting at $210M over 7 days — 58% below 30-day average. Indicates institutional demand weakness.",
        timestamp: "2026-03-02T06:30:00Z",
      },
      {
        id: "stb-3",
        severity: "low",
        title: "DAI collateral ratio healthy",
        description: "MakerDAO DAI collateralization ratio at 167% — well above the 150% liquidation threshold. No systemic concern at current levels.",
        timestamp: "2026-03-01T18:00:00Z",
      },
    ],
    timeline: buildTimeline([
      42, 44, 41, 43, 46, 48, 45, 47, 44, 42,
      45, 47, 44, 46, 49, 51, 48, 50, 47, 45,
      48, 50, 47, 49, 52, 54, 51, 53, 50, 48,
      51, 53, 50, 52, 55, 53, 50, 52, 49, 47,
      50, 52, 49, 51, 54, 56, 53, 55, 52, 50,
      53, 55, 52, 54, 57, 55, 52, 54, 51, 49,
      52, 54, 51, 53, 56, 54, 51, 53, 55, 53,
      51, 53, 55, 54, 56, 55, 53, 54, 55, 54,
      52, 53, 54, 53, 55, 54, 53, 54, 54, 54,
    ]),
  },

  whale: {
    aiAnalysis:
      "On-chain whale activity has shifted toward a net distribution posture over the past 7 days. Addresses holding >1,000 BTC have reduced aggregate positions by approximately $2.1B. Exchange inflow from identified whale wallets increased 18% week-over-week, a pattern consistent with profit-taking during late distribution phases. The concentration of large holder outflows on Coinbase Prime and Binance institutional desks suggests coordinated institutional repositioning.",
    primaryDriver:
      "Top 100 BTC addresses by balance have moved an estimated 34,200 BTC to exchange hot wallets over 7 days. Coinbase Prime cold wallet outflows accelerated to 12,400 BTC — the largest 7-day outflow since the ETF approval rally.",
    outlook7D:
      "Whale distribution expected to continue at current pace. Historical analogs suggest large holder repositioning during distribution phases lasts 10-14 days. Current event is in day 8. Key signal: whale exchange inflow decline below 5% WoW would indicate exhaustion of selling pressure.",
    keyIndicators: [
      { label: "Exchange Inflow", value: "+18% WoW", change: "+7%", direction: "up" },
      { label: "Net Position Δ", value: "−$2.1B", change: "−$0.8B", direction: "down" },
      { label: "CB Prime Outflow", value: "12,400 BTC", change: "+42%", direction: "up" },
      { label: "Whale Wallets Active", value: "847", change: "+23%", direction: "up" },
    ],
    alerts: [
      {
        id: "whl-1",
        severity: "high",
        title: "Coinbase Prime cold wallet outflow surge",
        description: "12,400 BTC moved from Coinbase Prime cold storage to exchange hot wallets in 7 days. Largest outflow since Jan 2024 ETF approval period.",
        timestamp: "2026-03-02T13:00:00Z",
      },
      {
        id: "whl-2",
        severity: "high",
        title: "Top 100 addresses net selling",
        description: "Aggregate net position change for top 100 addresses is −34,200 BTC over 7 days. Distribution pattern consistent with late-cycle profit taking.",
        timestamp: "2026-03-02T09:45:00Z",
      },
      {
        id: "whl-3",
        severity: "medium",
        title: "ETH whale accumulation divergence",
        description: "While BTC whales distribute, ETH whale addresses show net accumulation of +$340M. Divergence may indicate rotation rather than broad risk-off.",
        timestamp: "2026-03-01T20:30:00Z",
      },
    ],
    timeline: buildTimeline([
      55, 57, 54, 56, 59, 61, 58, 60, 57, 55,
      58, 60, 57, 59, 62, 64, 61, 63, 66, 68,
      65, 67, 64, 62, 65, 67, 64, 66, 69, 71,
      68, 70, 67, 65, 68, 70, 67, 69, 72, 74,
      71, 73, 70, 68, 71, 73, 70, 72, 69, 67,
      70, 72, 69, 71, 74, 72, 69, 71, 68, 66,
      69, 71, 68, 70, 73, 75, 72, 74, 71, 69,
      72, 74, 71, 73, 70, 68, 71, 73, 75, 73,
      71, 72, 73, 72, 74, 73, 71, 72, 73, 72,
    ]),
  },

  systemic: {
    aiAnalysis:
      "Cross-venue systemic stress indicators are elevated across multiple dimensions. The correlation between BTC, ETH, and top 10 altcoins has compressed to 0.94 — approaching the peak correlation levels observed during the 2021 deleveraging cascade. This correlation clustering reduces portfolio diversification benefits and increases the probability of synchronized drawdowns across the crypto complex. Four major venues have been flagged for concentrated exposure risk.",
    primaryDriver:
      "BTC/ETH 30-day rolling correlation at 0.94 — 97th percentile historically. Combined with leverage concentration on Binance ($14.2B) and Bybit ($8.7B), the system is vulnerable to contagion-style cascading liquidations where a shock on one venue propagates across all connected markets.",
    outlook7D:
      "Systemic stress unlikely to dissipate without a deleveraging event or sustained period of low volatility (>5 days). Correlation compression tends to persist during distribution phases. Key monitor: BTC/ETH correlation decline below 0.85 would signal decorrelation and reduced systemic fragility.",
    keyIndicators: [
      { label: "BTC/ETH Corr.", value: "0.94", change: "+0.08", direction: "up" },
      { label: "Contagion Score", value: "76/100", change: "+11", direction: "up" },
      { label: "Venues Flagged", value: "4", change: "+1", direction: "up" },
      { label: "Cascade Prob.", value: "28%", change: "+9%", direction: "up" },
    ],
    alerts: [
      {
        id: "sys-1",
        severity: "high",
        title: "BTC/ETH correlation at 97th percentile",
        description: "30-day rolling correlation at 0.94. Only exceeded during Terra/LUNA cascade (0.97) and FTX contagion (0.96). Systemic fragility extreme.",
        timestamp: "2026-03-02T14:00:00Z",
      },
      {
        id: "sys-2",
        severity: "high",
        title: "Venue concentration risk — 4 flagged",
        description: "Binance, Bybit, OKX, and dYdX flagged for concentrated leverage exposure. Combined OI on flagged venues represents 78% of total market OI.",
        timestamp: "2026-03-02T11:30:00Z",
      },
      {
        id: "sys-3",
        severity: "medium",
        title: "Cross-market cascade probability rising",
        description: "Monte Carlo simulation estimates 28% probability of cascading liquidation event across 3+ venues within 7-day horizon. Up from 19% last week.",
        timestamp: "2026-03-02T07:00:00Z",
      },
    ],
    timeline: buildTimeline([
      44, 46, 43, 45, 48, 50, 47, 49, 52, 54,
      51, 53, 56, 58, 55, 57, 54, 52, 55, 58,
      60, 57, 59, 62, 64, 61, 63, 60, 58, 61,
      64, 66, 63, 65, 62, 60, 63, 66, 68, 65,
      67, 64, 62, 65, 68, 70, 67, 69, 66, 64,
      67, 69, 66, 68, 71, 73, 70, 72, 69, 67,
      70, 72, 69, 71, 74, 72, 70, 73, 75, 73,
      71, 73, 75, 74, 76, 75, 73, 75, 77, 75,
      73, 74, 76, 75, 77, 76, 74, 75, 76, 76,
    ]),
  },
};

// ============================================
// HISTORICAL EVENTS (Event Replay)
// ============================================

export const historicalEvents: HistoricalEvent[] = [
  {
    id: "terra-luna",
    name: "Terra/LUNA Cascade",
    date: "2022-05-09",
    type: "Algorithmic Depeg",
    impactLevel: "critical",
    peakRiskValue: 98,
    duration: "12 days",
    description:
      "The UST algorithmic stablecoin lost its peg, triggering a death spiral that wiped $40B in value from the Terra ecosystem. Contagion spread to centralized lenders and hedge funds over the following weeks.",
    analysis:
      "The cascade originated from concentrated UST selling on Curve's 3pool, breaching the algorithmic redemption capacity. LUNA hyperinflation followed as the mint/burn mechanism failed under stress. The event demonstrated the systemic risk of algorithmic stablecoin designs and their ability to propagate losses to leveraged counterparties.",
    metrics: [
      { label: "UST Market Cap Pre", value: "$18.7B" },
      { label: "UST Market Cap Post", value: "$0.4B" },
      { label: "LUNA Price Drop", value: "−99.99%" },
      { label: "Contagion Reach", value: "47 protocols" },
      { label: "Total Value Lost", value: "$40B+" },
      { label: "Recovery Time", value: "N/A (terminal)" },
    ],
    timeline: buildTimeline([
      52, 54, 55, 58, 62, 68, 74, 82, 91, 96,
      98, 97, 95, 92, 88, 84, 79, 75, 72, 68,
      65, 62, 58, 56, 54, 52, 50, 48, 47, 46,
    ]),
  },
  {
    id: "ftx-collapse",
    name: "FTX Contagion Event",
    date: "2022-11-06",
    type: "Exchange Insolvency",
    impactLevel: "critical",
    peakRiskValue: 96,
    duration: "18 days",
    description:
      "The collapse of FTX exchange revealed $8B in misappropriated customer funds. The event triggered forced liquidations across the industry, with Alameda Research's interconnected positions amplifying losses across multiple venues and protocols.",
    analysis:
      "FTX insolvency was triggered by a CoinDesk report revealing Alameda Research's balance sheet concentration in FTT token. A bank run followed within 72 hours, exposing the commingling of customer deposits. The event highlighted counterparty concentration risk and the fragility of centralized exchange trust assumptions.",
    metrics: [
      { label: "Customer Deposits Lost", value: "$8B" },
      { label: "BTC Price Impact", value: "−27%" },
      { label: "Lending Contagion", value: "BlockFi, Genesis" },
      { label: "Peak Funding Rate", value: "−0.12%" },
      { label: "24H Liquidations", value: "$788M" },
      { label: "Market Cap Drawdown", value: "$200B" },
    ],
    timeline: buildTimeline([
      48, 50, 52, 55, 61, 72, 84, 93, 96, 94,
      91, 88, 85, 82, 78, 74, 70, 67, 64, 61,
      58, 55, 53, 51, 49, 48, 47, 46, 45, 44,
    ]),
  },
  {
    id: "svb-depeg",
    name: "SVB Stablecoin Stress",
    date: "2023-03-10",
    type: "Banking Contagion",
    impactLevel: "high",
    peakRiskValue: 87,
    duration: "5 days",
    description:
      "Silicon Valley Bank's collapse caused USDC to temporarily depeg to $0.87 after Circle disclosed $3.3B in reserves held at SVB. The event tested stablecoin resilience and triggered a flight to USDT and DAI.",
    analysis:
      "The SVB-induced USDC depeg was a classic banking contagion event. Circle's reserve exposure created a temporary but severe confidence crisis. The rapid recovery (48 hours to full re-peg after FDIC backstop announcement) demonstrated the structural difference between reserve-backed and algorithmic stablecoins.",
    metrics: [
      { label: "USDC Low", value: "$0.87" },
      { label: "Circle SVB Exposure", value: "$3.3B" },
      { label: "Depeg Duration", value: "48 hours" },
      { label: "DAI Deviation", value: "$0.91" },
      { label: "Flight to USDT", value: "+$2.1B" },
      { label: "Recovery Trigger", value: "FDIC Backstop" },
    ],
    timeline: buildTimeline([
      45, 47, 48, 52, 58, 67, 78, 85, 87, 84,
      79, 72, 65, 58, 52, 48, 46, 45, 44, 43,
      42, 42, 41, 41, 40, 40, 40, 39, 39, 39,
    ]),
  },
];

// ============================================
// SIMULATION SCENARIOS
// ============================================

export const simulationScenarios: SimulationScenario[] = [
  {
    id: "bear-liquidation",
    name: "Bear Liquidation Cascade",
    type: "Bear / Liquidation",
    shockMagnitude: "−30% BTC",
    timeHorizon: "72 hours",
    description:
      "Models the cascade effects of a 30% BTC spot decline over a 72-hour window. Simulates estimated liquidation volume, stablecoin flow response, and projected risk index trajectory under historical analog conditions.",
    projectedPeakRisk: 97,
    estimatedLiquidations: "$12.8B",
    recoveryTime: "14–21 days",
    results: [
      { metric: "BTC Price", baseline: "$68,400", projected: "$47,880", impact: "−30.0%", severity: "critical" },
      { metric: "ETH Price", baseline: "$3,420", projected: "$2,189", impact: "−36.0%", severity: "critical" },
      { metric: "Total Liquidations", baseline: "$142M/day", projected: "$12.8B", impact: "+8,900%", severity: "critical" },
      { metric: "BTC Open Interest", baseline: "$38.2B", projected: "$18.4B", impact: "−51.8%", severity: "high" },
      { metric: "Stablecoin Net Flow", baseline: "−$200M/day", projected: "−$3.2B/day", impact: "+1,500%", severity: "critical" },
      { metric: "Risk Index", baseline: "82.4", projected: "97.0", impact: "+14.6", severity: "critical" },
    ],
  },
  {
    id: "stablecoin-depeg",
    name: "Stablecoin Depeg Scenario",
    type: "Stablecoin / Depeg",
    shockMagnitude: "USDT −2% peg",
    timeHorizon: "48 hours",
    description:
      "Simulates a temporary USDT depeg to $0.98 sustained over 48 hours. Models the chain reaction on DeFi protocols, CEX withdrawals, and cross-asset correlation compression during a stablecoin confidence crisis.",
    projectedPeakRisk: 94,
    estimatedLiquidations: "$6.2B",
    recoveryTime: "7–10 days",
    results: [
      { metric: "USDT Peg", baseline: "$1.000", projected: "$0.980", impact: "−2.0%", severity: "critical" },
      { metric: "BTC Price", baseline: "$68,400", projected: "$54,720", impact: "−20.0%", severity: "high" },
      { metric: "CEX Withdrawals", baseline: "$1.2B/day", projected: "$8.4B/day", impact: "+600%", severity: "critical" },
      { metric: "DeFi TVL", baseline: "$89B", projected: "$62B", impact: "−30.3%", severity: "high" },
      { metric: "USDC Premium", baseline: "$1.000", projected: "$1.012", impact: "+1.2%", severity: "medium" },
      { metric: "Risk Index", baseline: "82.4", projected: "94.0", impact: "+11.6", severity: "critical" },
    ],
  },
  {
    id: "exchange-insolvency",
    name: "Exchange Insolvency Shock",
    type: "Counterparty / Contagion",
    shockMagnitude: "Top-5 exchange failure",
    timeHorizon: "168 hours (7 days)",
    description:
      "Models the systemic impact of a top-5 exchange becoming insolvent. Based on FTX analog patterns, simulates contagion propagation, lending market stress, and recovery trajectory.",
    projectedPeakRisk: 99,
    estimatedLiquidations: "$22.4B",
    recoveryTime: "30–60 days",
    results: [
      { metric: "BTC Price", baseline: "$68,400", projected: "$41,040", impact: "−40.0%", severity: "critical" },
      { metric: "ETH Price", baseline: "$3,420", projected: "$1,881", impact: "−45.0%", severity: "critical" },
      { metric: "Customer Deposits at Risk", baseline: "N/A", projected: "$4–8B", impact: "Direct loss", severity: "critical" },
      { metric: "Lending Protocol Stress", baseline: "Low", projected: "Critical", impact: "Contagion", severity: "critical" },
      { metric: "Cross-venue Correlation", baseline: "0.94", projected: "0.98", impact: "+0.04", severity: "high" },
      { metric: "Risk Index", baseline: "82.4", projected: "99.0", impact: "+16.6", severity: "critical" },
    ],
  },
];
