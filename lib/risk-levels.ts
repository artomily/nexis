import type { RiskLevel, MarketState } from "@/types";

// --- Risk color mapping (returns Tailwind class names) ---

export function getRiskColorClass(level: RiskLevel): string {
  const map: Record<RiskLevel, string> = {
    low: "text-risk-low",
    medium: "text-risk-medium",
    high: "text-risk-high",
    critical: "text-risk-critical",
  };
  return map[level];
}

export function getRiskBgClass(level: RiskLevel): string {
  const map: Record<RiskLevel, string> = {
    low: "bg-risk-low",
    medium: "bg-risk-medium",
    high: "bg-risk-high",
    critical: "bg-risk-critical",
  };
  return map[level];
}

export function getRiskBadgeBgClass(level: RiskLevel): string {
  const map: Record<RiskLevel, string> = {
    low: "bg-risk-low/15 text-risk-low",
    medium: "bg-risk-medium/15 text-risk-medium",
    high: "bg-risk-high/15 text-risk-high",
    critical: "bg-risk-critical/15 text-risk-critical",
  };
  return map[level];
}

export function getRiskHexColor(level: RiskLevel): string {
  const map: Record<RiskLevel, string> = {
    low: "#3D9A5F",
    medium: "#C48A2C",
    high: "#B93A3A",
    critical: "#D42B2B",
  };
  return map[level];
}

// --- Risk level label ---

export function getRiskLabel(level: RiskLevel): string {
  return level.toUpperCase();
}

// --- Derive risk level from numeric value (0–100) ---

export function getRiskLevelFromValue(value: number): RiskLevel {
  if (value < 40) return "low";
  if (value < 60) return "medium";
  if (value < 80) return "high";
  return "critical";
}

// --- Market state display label ---

export function getMarketStateLabel(state: MarketState): string {
  return state.toUpperCase();
}

export function getMarketStateColor(state: MarketState): RiskLevel {
  const map: Record<MarketState, RiskLevel> = {
    expansion: "low",
    recovery: "low",
    distribution: "high",
    contraction: "high",
    panic: "critical",
  };
  return map[state];
}
