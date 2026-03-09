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

// ── CoinGecko historical price lookup ──
async function fetchHistoricalPrice(
  coinId: string,
  date: string
): Promise<number | null> {
  try {
    // date format: dd-mm-yyyy
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/history?date=${date}&localization=false`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json?.market_data?.current_price?.usd ?? null;
  } catch {
    return null;
  }
}

function formatDate(isoDate: string): string {
  const d = new Date(isoDate);
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
}

interface HistoricalEventDef {
  id: string;
  name: string;
  date: string;
  type: string;
  description: string;
  analysis: string;
  duration: string;
  btcPriceAtEvent?: string;
  ethPriceAtEvent?: string;
}

const EVENT_CATALOG: HistoricalEventDef[] = [
  {
    id: "terra-luna",
    name: "Terra/LUNA Cascade",
    date: "2022-05-09",
    type: "Algorithmic Depeg",
    description:
      "The UST algorithmic stablecoin lost its peg, triggering a death spiral that wiped $40B in value from the Terra ecosystem. Contagion spread to centralized lenders and hedge funds over the following weeks.",
    analysis:
      "The cascade originated from concentrated UST selling on Curve's 3pool, breaching the algorithmic redemption capacity. LUNA hyperinflation followed as the mint/burn mechanism failed under stress.",
    duration: "12 days",
    btcPriceAtEvent: "$31,000",
    ethPriceAtEvent: "$2,200",
  },
  {
    id: "ftx-collapse",
    name: "FTX Contagion Event",
    date: "2022-11-06",
    type: "Exchange Insolvency",
    description:
      "The collapse of FTX exchange revealed $8B in misappropriated customer funds. Forced liquidations across the industry, with Alameda Research's positions amplifying losses.",
    analysis:
      "FTX insolvency was triggered by a CoinDesk report revealing Alameda's balance sheet concentration in FTT token. A bank run followed within 72 hours, exposing the commingling of customer deposits.",
    duration: "18 days",
    btcPriceAtEvent: "$20,500",
    ethPriceAtEvent: "$1,580",
  },
  {
    id: "svb-depeg",
    name: "SVB Stablecoin Stress",
    date: "2023-03-10",
    type: "Banking Contagion",
    description:
      "Silicon Valley Bank's collapse caused USDC to temporarily depeg to $0.87 after Circle disclosed $3.3B in reserves held at SVB.",
    analysis:
      "The SVB-induced USDC depeg was a classic banking contagion event. Circle's reserve exposure created a temporary but severe confidence crisis. Rapid recovery after FDIC backstop.",
    duration: "5 days",
    btcPriceAtEvent: "$20,100",
    ethPriceAtEvent: "$1,430",
  },
];

function buildTimeline(values: number[]) {
  const points: { timestamp: string; value: number }[] = [];
  const baseDate = new Date("2026-03-02T14:00:00Z");
  for (let i = 0; i < values.length; i++) {
    const date = new Date(baseDate);
    date.setUTCDate(date.getUTCDate() - (values.length - 1 - i));
    points.push({ timestamp: date.toISOString(), value: values[i] });
  }
  return points;
}

const EVENT_TIMELINES: Record<string, number[]> = {
  "terra-luna": [
    52, 54, 55, 58, 62, 68, 74, 82, 91, 96, 98, 97, 95, 92, 88, 84, 79, 75,
    72, 68, 65, 62, 58, 56, 54, 52, 50, 48, 47, 46,
  ],
  "ftx-collapse": [
    48, 50, 52, 55, 61, 72, 84, 93, 96, 94, 91, 88, 85, 82, 78, 74, 70, 67,
    64, 61, 58, 55, 53, 51, 49, 48, 47, 46, 45, 44,
  ],
  "svb-depeg": [
    45, 47, 48, 52, 58, 67, 78, 85, 87, 84, 79, 72, 65, 58, 52, 48, 46, 45,
    44, 43, 42, 42, 41, 41, 40, 40, 40, 39, 39, 39,
  ],
};

const EVENT_METRICS_STATIC: Record<
  string,
  { label: string; value: string }[]
> = {
  "terra-luna": [
    { label: "UST Market Cap Pre", value: "$18.7B" },
    { label: "UST Market Cap Post", value: "$0.4B" },
    { label: "LUNA Price Drop", value: "−99.99%" },
    { label: "Contagion Reach", value: "47 protocols" },
    { label: "Total Value Lost", value: "$40B+" },
    { label: "Recovery Time", value: "N/A (terminal)" },
  ],
  "ftx-collapse": [
    { label: "Customer Deposits Lost", value: "$8B" },
    { label: "BTC Price Impact", value: "−27%" },
    { label: "Lending Contagion", value: "BlockFi, Genesis" },
    { label: "Peak Funding Rate", value: "−0.12%" },
    { label: "24H Liquidations", value: "$788M" },
    { label: "Market Cap Drawdown", value: "$200B" },
  ],
  "svb-depeg": [
    { label: "USDC Low", value: "$0.87" },
    { label: "Circle SVB Exposure", value: "$3.3B" },
    { label: "Depeg Duration", value: "48 hours" },
    { label: "DAI Deviation", value: "$0.91" },
    { label: "Flight to USDT", value: "+$2.1B" },
    { label: "Recovery Trigger", value: "FDIC Backstop" },
  ],
};

const PEAK_RISK: Record<string, number> = {
  "terra-luna": 98,
  "ftx-collapse": 96,
  "svb-depeg": 87,
};

const IMPACT_LEVEL: Record<string, string> = {
  "terra-luna": "critical",
  "ftx-collapse": "critical",
  "svb-depeg": "high",
};

export async function GET() {
  try {
    // 1. Read live Chainlink prices
    const [btcPrice, ethPrice] = await Promise.all([
      readFeed(CHAINLINK_FEEDS["BTC/USD"]),
      readFeed(CHAINLINK_FEEDS["ETH/USD"]),
    ]);

    // 2. Try to fetch historical BTC prices at event dates from CoinGecko
    const historicalPrices = await Promise.allSettled(
      EVENT_CATALOG.map((e) =>
        fetchHistoricalPrice("bitcoin", formatDate(e.date))
      )
    );

    // 3. Build enriched events
    const events = EVENT_CATALOG.map((event, idx) => {
      const histPrice =
        historicalPrices[idx].status === "fulfilled"
          ? historicalPrices[idx].value
          : null;

      const btcAtEvent = histPrice
        ? `$${histPrice.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
        : event.btcPriceAtEvent ?? "N/A";

      // Compute recovery multiple (current price / price at event crash)
      const recoveryMultiple =
        histPrice && histPrice > 0 && btcPrice > 0
          ? `${(btcPrice / histPrice).toFixed(1)}x`
          : "N/A";

      // Enrich metrics with real-time context
      const staticMetrics = EVENT_METRICS_STATIC[event.id] ?? [];
      const liveMetrics = [
        ...staticMetrics,
        { label: "BTC at Event", value: btcAtEvent },
        {
          label: "BTC Now (Live)",
          value:
            btcPrice > 0
              ? `$${btcPrice.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
              : "N/A",
        },
        { label: "Recovery Multiple", value: recoveryMultiple },
        {
          label: "ETH Now (Live)",
          value:
            ethPrice > 0
              ? `$${ethPrice.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
              : "N/A",
        },
      ];

      return {
        id: event.id,
        name: event.name,
        date: event.date,
        type: event.type,
        impactLevel: IMPACT_LEVEL[event.id] ?? "high",
        peakRiskValue: PEAK_RISK[event.id] ?? 90,
        duration: event.duration,
        description: event.description,
        analysis: event.analysis,
        metrics: liveMetrics,
        timeline: buildTimeline(EVENT_TIMELINES[event.id] ?? [50]),
      };
    });

    return NextResponse.json({
      source: "chainlink",
      timestamp: new Date().toISOString(),
      currentPrices: {
        btc: btcPrice,
        eth: ethPrice,
      },
      events,
    });
  } catch {
    return NextResponse.json(
      { source: "error", events: [] },
      { status: 500 }
    );
  }
}
