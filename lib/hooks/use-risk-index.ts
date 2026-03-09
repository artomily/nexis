"use client";

import { useReadContract } from "wagmi";
import { NEXIS_ORACLE_ABI, NEXIS_ORACLE_ADDRESS } from "@/lib/chainlink";
import { marketRiskIndex } from "@/lib/mock-data";
import type { MarketRiskIndex } from "@/types";

/**
 * Mapping from on-chain MarketState enum to frontend MarketState string.
 *   0 = Expansion, 1 = Distribution, 2 = Contraction, 3 = Panic, 4 = Recovery
 */
const MARKET_STATE_MAP = [
  "expansion",
  "distribution",
  "contraction",
  "panic",
  "recovery",
] as const;

/**
 * Hook to read the Market Risk Index from the NexisRiskOracle contract.
 * Falls back to mock data when the contract isn't deployed or returns empty.
 */
export function useRiskIndex(): {
  data: MarketRiskIndex;
  isLive: boolean;
  isLoading: boolean;
} {
  const isConfigured =
    NEXIS_ORACLE_ADDRESS !==
    "0x0000000000000000000000000000000000000000";

  const { data: riskData, isLoading } = useReadContract({
    address: NEXIS_ORACLE_ADDRESS,
    abi: NEXIS_ORACLE_ABI,
    functionName: "getRiskData",
    query: {
      enabled: isConfigured,
      refetchInterval: 15_000, // Poll every 15s
    },
  });

  // If we have on-chain data, transform it to the frontend type
  if (riskData && isConfigured) {
    const [mriValue, stateEnum, momentum, lastUpdated] = [
      riskData.mriValue,
      riskData.state,
      riskData.momentum,
      riskData.lastUpdated,
    ];

    const mri = Number(mriValue) / 100; // 8240 → 82.40
    const stateIndex = Number(stateEnum);
    const state = MARKET_STATE_MAP[stateIndex] || "distribution";
    const mom = Number(momentum) / 100; // 320 → 3.20

    return {
      data: {
        value: mri,
        state,
        momentum: mom,
        lastUpdated: new Date(Number(lastUpdated) * 1000).toISOString(),
      },
      isLive: true,
      isLoading: false,
    };
  }

  // Fallback to mock data
  return {
    data: marketRiskIndex,
    isLive: false,
    isLoading,
  };
}
