"use client";

import { useMarketData } from "@/lib/hooks/use-market-data";
import type { MarketRiskIndex } from "@/types";

/**
 * Hook to read the Market Risk Index from real market data.
 * Data flows: Chainlink Data Feeds (mainnet) → API route → this hook.
 * Falls back to mock data when the API is unavailable.
 */
export function useRiskIndex(): {
  data: MarketRiskIndex;
  isLive: boolean;
  isLoading: boolean;
} {
  const { data: marketData, isLive, isLoading } = useMarketData();

  return {
    data: marketData.marketRiskIndex,
    isLive,
    isLoading,
  };
}
