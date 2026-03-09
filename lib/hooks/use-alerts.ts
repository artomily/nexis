"use client";

import { useReadContract, useWatchContractEvent } from "wagmi";
import { useState, useCallback } from "react";
import { NEXIS_ORACLE_ABI, NEXIS_ORACLE_ADDRESS } from "@/lib/chainlink";
import type { RiskAlert, RiskLevel } from "@/types";

/**
 * Mapping from on-chain RiskLevel enum to frontend type.
 *   0 = Low, 1 = Medium, 2 = High, 3 = Critical
 */
const RISK_LEVEL_MAP: RiskLevel[] = ["low", "medium", "high", "critical"];

/**
 * Hook to read alerts from NexisRiskOracle and listen for new ones in real-time.
 * Combines historical alerts (polled) with live event subscription.
 *
 * Falls back to empty array when the contract isn't deployed.
 */
export function useAlerts(count: number = 10): {
  alerts: RiskAlert[];
  isLive: boolean;
  isLoading: boolean;
} {
  const isConfigured =
    NEXIS_ORACLE_ADDRESS !==
    "0x0000000000000000000000000000000000000000";

  const [liveAlerts, setLiveAlerts] = useState<RiskAlert[]>([]);

  // Poll historical alerts
  const { data: onChainAlerts, isLoading } = useReadContract({
    address: NEXIS_ORACLE_ADDRESS,
    abi: NEXIS_ORACLE_ABI,
    functionName: "getLatestAlerts",
    args: [BigInt(count)],
    query: {
      enabled: isConfigured,
      refetchInterval: 30_000,
    },
  });

  // Watch for new RiskAlertTriggered events in real-time
  useWatchContractEvent({
    address: NEXIS_ORACLE_ADDRESS,
    abi: NEXIS_ORACLE_ABI,
    eventName: "RiskAlertTriggered",
    enabled: isConfigured,
    onLogs: useCallback((logs: unknown[]) => {
      const newAlerts: RiskAlert[] = logs.map((log: unknown) => {
        const typedLog = log as {
          args: {
            id: bigint;
            severity: number;
            title: string;
            description: string;
            timestamp: bigint;
          };
        };
        return {
          id: typedLog.args.id.toString(),
          severity: RISK_LEVEL_MAP[typedLog.args.severity] || "medium",
          title: typedLog.args.title,
          description: typedLog.args.description,
          timestamp: new Date(
            Number(typedLog.args.timestamp) * 1000
          ).toISOString(),
        };
      });
      setLiveAlerts((prev) => [...newAlerts, ...prev].slice(0, count));
    }, [count]),
  });

  // Transform on-chain alerts to frontend type
  if (onChainAlerts && isConfigured) {
    const historicalAlerts: RiskAlert[] = onChainAlerts.map((a) => ({
      id: a.id.toString(),
      severity: RISK_LEVEL_MAP[a.severity] || "medium",
      title: a.title,
      description: a.description,
      timestamp: new Date(Number(a.timestamp) * 1000).toISOString(),
    }));

    // Merge live + historical, deduplicate by id
    const merged = [...liveAlerts, ...historicalAlerts];
    const unique = merged.filter(
      (alert, idx, arr) => arr.findIndex((a) => a.id === alert.id) === idx
    );

    return {
      alerts: unique.slice(0, count),
      isLive: true,
      isLoading: false,
    };
  }

  return {
    alerts: liveAlerts,
    isLive: false,
    isLoading,
  };
}
