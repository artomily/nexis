"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  MarketRiskIndex,
  MomentumData,
  IntelligenceReport,
  ModuleRiskSummary,
  RiskTimelinePoint,
} from "@/types";
import {
  marketRiskIndex as mockMRI,
  momentumData as mockMomentum,
  intelligenceReport as mockReport,
  moduleRiskSummaries as mockModules,
  riskTimeline as mockTimeline,
} from "@/lib/mock-data";

export interface MarketDataResponse {
  source: "chainlink" | "coingecko" | "mock";
  timestamp: string;
  prices: {
    btc: { price: number; change24h: number; change7d: number; volume: number };
    eth: { price: number; change24h: number; change7d: number; volume: number };
  };
  marketRiskIndex: MarketRiskIndex;
  momentumData: MomentumData;
  intelligenceReport: IntelligenceReport;
  moduleRiskSummaries: ModuleRiskSummary[];
  riskTimeline: RiskTimelinePoint[];
}

const POLL_INTERVAL = 30_000; // 30 seconds

/**
 * Hook to fetch real-time market data from the API route.
 * The API route reads Chainlink Data Feeds (mainnet) + CoinGecko.
 * Falls back to mock data on error.
 */
export function useMarketData(): {
  data: MarketDataResponse;
  isLive: boolean;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
} {
  const [data, setData] = useState<MarketDataResponse>({
    source: "mock",
    timestamp: new Date().toISOString(),
    prices: {
      btc: { price: 0, change24h: 0, change7d: 0, volume: 0 },
      eth: { price: 0, change24h: 0, change7d: 0, volume: 0 },
    },
    marketRiskIndex: mockMRI,
    momentumData: mockMomentum,
    intelligenceReport: mockReport,
    moduleRiskSummaries: mockModules,
    riskTimeline: mockTimeline,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/market-data", { cache: "no-store" });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      // Keep existing data (mock or last successful fetch)
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
    isLive: data.source !== "mock",
    isLoading,
    error,
    refetch: fetchData,
  };
}
