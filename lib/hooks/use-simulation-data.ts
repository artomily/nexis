"use client";

import { useState, useEffect, useCallback } from "react";
import type { SimulationScenario } from "@/types";

export interface SimulationDataResponse {
  source: string;
  timestamp: string;
  currentPrices: { btc: number; eth: number };
  marketContext: {
    totalOI: string;
    totalMarketCap: string;
    btcDominance: string;
  };
  scenarios: SimulationScenario[];
}

const POLL_INTERVAL = 30_000;

/**
 * Hook to fetch simulation scenarios with real-time baselines.
 * BTC/ETH prices from Chainlink Data Feeds are used as baseline values.
 * OI and market cap from CoinGecko feed into liquidation estimates.
 */
export function useSimulationData(): {
  data: SimulationDataResponse | null;
  isLive: boolean;
  isLoading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<SimulationDataResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/simulation-data", { cache: "no-store" });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    data,
    isLive: data?.source === "chainlink",
    isLoading,
    error,
  };
}
