"use client";

import { useState, useEffect, useCallback } from "react";
import type { KeyIndicator, RiskAlert, RiskTimelinePoint } from "@/types";

export interface ModuleDataResponse {
  source: "chainlink" | "coingecko" | "mock";
  module: string;
  timestamp: string;
  prices: { btc: number; eth: number };
  keyIndicators: KeyIndicator[];
  alerts: RiskAlert[];
  timeline: RiskTimelinePoint[];
  tableData: { label: string; value: string }[];
}

const POLL_INTERVAL = 30_000;

/**
 * Hook to fetch real-time module-specific data.
 * Data flows: Chainlink Data Feeds (mainnet) + CoinGecko → API route → this hook.
 */
export function useModuleData(moduleId: string): {
  data: ModuleDataResponse | null;
  isLive: boolean;
  isLoading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<ModuleDataResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/module-data?module=${moduleId}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [moduleId]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    data,
    isLive: data?.source !== "mock" && data !== null,
    isLoading,
    error,
  };
}
