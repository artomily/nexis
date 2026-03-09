import { NextResponse } from "next/server";
import { createPublicClient, http, parseAbi } from "viem";
import { mainnet } from "viem/chains";

// ── Chainlink feeds ──
const CHAINLINK_FEEDS = {
  "BTC/USD": "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
  "ETH/USD": "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
} as const;

const aggregatorABI = parseAbi([
  "function latestRoundData() external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)",
]);

const client = createPublicClient({
  chain: mainnet,
  transport: http("https://eth.llamarpc.com"),
});

async function readFeed(address: string): Promise<number> {
  try {
    const data = await client.readContract({
      address: address as `0x${string}`,
      abi: aggregatorABI,
      functionName: "latestRoundData",
    });
    return Number(data[1]) / 1e8;
  } catch {
    return 0;
  }
}

// ── CoinGecko: fetch real OI, market cap, volume ──
async function fetchDerivativesData(): Promise<{
  totalOI: number;
  volume24h: number;
} | null> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/derivatives",
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    let totalOI = 0;
    let volume24h = 0;
    for (const d of json) {
      totalOI += Number(d.open_interest) || 0;
      volume24h += Number(d.trade_volume_24h_btc) || 0;
    }
    return { totalOI, volume24h };
  } catch {
    return null;
  }
}

async function fetchGlobalData(): Promise<{
  totalMarketCap: number;
  totalVolume: number;
  btcDominance: number;
} | null> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/global",
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    const d = json.data;
    return {
      totalMarketCap: d.total_market_cap?.usd ?? 0,
      totalVolume: d.total_volume?.usd ?? 0,
      btcDominance: d.market_cap_percentage?.btc ?? 0,
    };
  } catch {
    return null;
  }
}

function fmt(n: number, decimals = 0): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals });
}

function fmtB(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${fmt(n)}`;
}

interface ScenarioDef {
  id: string;
  name: string;
  type: string;
  shockPct: number; // BTC shock (e.g. -0.30 = -30%)
  ethShockMultiplier: number; // ETH shock relative to BTC
  timeHorizon: string;
  description: string;
  projectedPeakRisk: number;
  liquidationMultiplier: number; // multiply baseline liq by this
  recoveryTime: string;
  extraResults: (ctx: {
    btc: number;
    eth: number;
    totalOI: number;
    totalMarketCap: number;
  }) => { metric: string; baseline: string; projected: string; impact: string; severity: "low" | "medium" | "high" | "critical" }[];
}

const SCENARIOS: ScenarioDef[] = [
  {
    id: "bear-liquidation",
    name: "Bear Liquidation Cascade",
    type: "Bear / Liquidation",
    shockPct: -0.30,
    ethShockMultiplier: 1.2,
    timeHorizon: "72 hours",
    description:
      "Models the cascade effects of a 30% BTC spot decline over a 72-hour window. Simulates estimated liquidation volume, stablecoin flow response, and projected risk index trajectory under historical analog conditions.",
    projectedPeakRisk: 97,
    liquidationMultiplier: 90,
    recoveryTime: "14–21 days",
    extraResults: (ctx) => [
      {
        metric: "Total Liquidations",
        baseline: fmtB(ctx.totalOI * 0.004) + "/day",
        projected: fmtB(ctx.totalOI * 0.35),
        impact: "+8,900%",
        severity: "critical",
      },
      {
        metric: "BTC Open Interest",
        baseline: fmtB(ctx.totalOI),
        projected: fmtB(ctx.totalOI * 0.48),
        impact: "−51.8%",
        severity: "high",
      },
      {
        metric: "Stablecoin Net Flow",
        baseline: "−$200M/day",
        projected: "−$3.2B/day",
        impact: "+1,500%",
        severity: "critical",
      },
    ],
  },
  {
    id: "stablecoin-depeg",
    name: "Stablecoin Depeg Scenario",
    type: "Stablecoin / Depeg",
    shockPct: -0.20,
    ethShockMultiplier: 1.0,
    timeHorizon: "48 hours",
    description:
      "Simulates a temporary USDT depeg to $0.98 sustained over 48 hours. Models the chain reaction on DeFi protocols, CEX withdrawals, and cross-asset correlation compression during a stablecoin confidence crisis.",
    projectedPeakRisk: 94,
    liquidationMultiplier: 44,
    recoveryTime: "7–10 days",
    extraResults: (ctx) => [
      {
        metric: "USDT Peg",
        baseline: "$1.000",
        projected: "$0.980",
        impact: "−2.0%",
        severity: "critical",
      },
      {
        metric: "CEX Withdrawals",
        baseline: fmtB(ctx.totalMarketCap * 0.0005) + "/day",
        projected: fmtB(ctx.totalMarketCap * 0.004) + "/day",
        impact: "+600%",
        severity: "critical",
      },
      {
        metric: "DeFi TVL",
        baseline: fmtB(ctx.totalMarketCap * 0.04),
        projected: fmtB(ctx.totalMarketCap * 0.04 * 0.7),
        impact: "−30.3%",
        severity: "high",
      },
      {
        metric: "USDC Premium",
        baseline: "$1.000",
        projected: "$1.012",
        impact: "+1.2%",
        severity: "medium",
      },
    ],
  },
  {
    id: "exchange-insolvency",
    name: "Exchange Insolvency Shock",
    type: "Counterparty / Contagion",
    shockPct: -0.40,
    ethShockMultiplier: 1.125,
    timeHorizon: "168 hours (7 days)",
    description:
      "Models the systemic impact of a top-5 exchange becoming insolvent. Based on FTX analog patterns, simulates contagion propagation, lending market stress, and recovery trajectory.",
    projectedPeakRisk: 99,
    liquidationMultiplier: 158,
    recoveryTime: "30–60 days",
    extraResults: (ctx) => [
      {
        metric: "Customer Deposits at Risk",
        baseline: "N/A",
        projected: "$4–8B",
        impact: "Direct loss",
        severity: "critical",
      },
      {
        metric: "Lending Protocol Stress",
        baseline: "Low",
        projected: "Critical",
        impact: "Contagion",
        severity: "critical",
      },
      {
        metric: "Cross-venue Correlation",
        baseline: "0.94",
        projected: "0.98",
        impact: "+0.04",
        severity: "high",
      },
    ],
  },
];

export async function GET() {
  try {
    // 1. Fetch live data in parallel
    const [btcPrice, ethPrice, derivData, globalData] = await Promise.all([
      readFeed(CHAINLINK_FEEDS["BTC/USD"]),
      readFeed(CHAINLINK_FEEDS["ETH/USD"]),
      fetchDerivativesData(),
      fetchGlobalData(),
    ]);

    const btc = btcPrice || 68400; // fallback
    const eth = ethPrice || 3420;
    const totalOI = derivData?.totalOI || 38_200_000_000;
    const totalMarketCap = globalData?.totalMarketCap || 2_400_000_000_000;
    const baselineLiq = totalOI * 0.004; // ~daily liquidation volume estimate

    const ctx = { btc, eth, totalOI, totalMarketCap };

    // 2. Build scenarios with real baseline prices
    const scenarios = SCENARIOS.map((s) => {
      const projectedBtc = btc * (1 + s.shockPct);
      const projectedEth = eth * (1 + s.shockPct * s.ethShockMultiplier);
      const estLiq = baselineLiq * s.liquidationMultiplier;

      const baseResults = [
        {
          metric: "BTC Price",
          baseline: `$${fmt(btc)}`,
          projected: `$${fmt(projectedBtc)}`,
          impact: `${(s.shockPct * 100).toFixed(1)}%`,
          severity: "critical" as const,
        },
        {
          metric: "ETH Price",
          baseline: `$${fmt(eth)}`,
          projected: `$${fmt(projectedEth)}`,
          impact: `${(s.shockPct * s.ethShockMultiplier * 100).toFixed(1)}%`,
          severity: "critical" as const,
        },
      ];

      const extraResults = s.extraResults(ctx);

      const riskResult = {
        metric: "Risk Index",
        baseline: "82.4",
        projected: s.projectedPeakRisk.toFixed(1),
        impact: `+${(s.projectedPeakRisk - 82.4).toFixed(1)}`,
        severity: "critical" as const,
      };

      return {
        id: s.id,
        name: s.name,
        type: s.type,
        shockMagnitude:
          s.id === "stablecoin-depeg"
            ? "USDT −2% peg"
            : s.id === "exchange-insolvency"
              ? "Top-5 exchange failure"
              : `${(s.shockPct * 100).toFixed(0)}% BTC`,
        timeHorizon: s.timeHorizon,
        description: s.description,
        projectedPeakRisk: s.projectedPeakRisk,
        estimatedLiquidations: fmtB(estLiq),
        recoveryTime: s.recoveryTime,
        results: [...baseResults, ...extraResults, riskResult],
      };
    });

    return NextResponse.json({
      source: btcPrice > 0 ? "chainlink" : "fallback",
      timestamp: new Date().toISOString(),
      currentPrices: { btc, eth },
      marketContext: {
        totalOI: fmtB(totalOI),
        totalMarketCap: fmtB(totalMarketCap),
        btcDominance: globalData?.btcDominance
          ? `${globalData.btcDominance.toFixed(1)}%`
          : "N/A",
      },
      scenarios,
    });
  } catch {
    return NextResponse.json(
      { source: "error", scenarios: [] },
      { status: 500 }
    );
  }
}
