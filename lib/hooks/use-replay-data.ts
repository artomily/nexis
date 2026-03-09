"use client";

import { useState, useEffect, useCallback } from "react";
import type { HistoricalEvent } from "@/types";

export interface ReplayDataResponse {
  source: string;
  timestamp: string;
  currentPrices: { btc: number; eth: number };
  events: HistoricalEvent[];
}

const POLL_INTERVAL = 30_000;

/**
 * Hook to fetch real-time enriched historical event data.
 * Events are enriched with live BTC/ETH prices from Chainlink for context.
 */
export function useReplayData(): {
  data: ReplayDataResponse | null;
  isLive: boolean;
  isLoading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<ReplayDataResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/replay-data", { cache: "no-store" });
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
