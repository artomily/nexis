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

// --- Module Detail Page Types ---

export interface KeyIndicator {
  label: string;
  value: string;
  change: string;
  direction: "up" | "down" | "neutral";
}

export interface RiskAlert {
  id: string;
  severity: RiskLevel;
  title: string;
  description: string;
  timestamp: string;
}

export interface ModuleDetailData {
  aiAnalysis: string;
  primaryDriver: string;
  outlook7D: string;
  keyIndicators: KeyIndicator[];
  alerts: RiskAlert[];
  timeline: RiskTimelinePoint[];
}

// --- Event Replay Types ---

export interface HistoricalEvent {
  id: string;
  name: string;
  date: string;
  type: string;
  impactLevel: RiskLevel;
  peakRiskValue: number;
  duration: string;
  description: string;
  analysis: string;
  metrics: { label: string; value: string }[];
  timeline: RiskTimelinePoint[];
}

// --- Simulation Types ---

export interface SimulationResultRow {
  metric: string;
  baseline: string;
  projected: string;
  impact: string;
  severity: RiskLevel;
}

export interface SimulationScenario {
  id: string;
  name: string;
  type: string;
  shockMagnitude: string;
  timeHorizon: string;
  description: string;
  projectedPeakRisk: number;
  estimatedLiquidations: string;
  recoveryTime: string;
  results: SimulationResultRow[];
}
