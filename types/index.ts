// ============================================
// RiskTerminal AI — Type Definitions
// ============================================

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type MarketState =
  | "expansion"
  | "distribution"
  | "contraction"
  | "panic"
  | "recovery";

export type AccelerationState = "accelerating" | "decelerating" | "stable";

export interface MarketRiskIndex {
  value: number;
  state: MarketState;
  momentum: number;
  lastUpdated: string;
}

export interface RiskTimelinePoint {
  timestamp: string;
  value: number;
}

export interface IntelligenceReport {
  primaryDriver: string;
  secondaryDriver: string;
  riskOutlook7D: string;
  summary: string;
  generatedAt: string;
}

export interface ModuleRiskSummary {
  id: string;
  label: string;
  level: RiskLevel;
  value: number;
  description: string;
  subMetrics?: { label: string; value: string }[];
}

export interface MomentumData {
  change24h: number;
  change7d: number;
  acceleration: AccelerationState;
  sparkline: number[];
}

export interface NavItem {
  label: string;
  href: string;
  segment: string;
}
