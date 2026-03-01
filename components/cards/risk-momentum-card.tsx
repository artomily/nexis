"use client";

import { ResponsiveContainer, LineChart, Line } from "recharts";
import { cn } from "@/lib/utils";
import { formatMomentum } from "@/lib/format";
import { getRiskHexColor, getRiskLevelFromValue } from "@/lib/risk-levels";
import type { MomentumData, AccelerationState } from "@/types";

interface RiskMomentumCardProps {
  data: MomentumData;
}

function AccelerationBadge({ state }: { state: AccelerationState }) {
  const config: Record<AccelerationState, { label: string; className: string }> = {
    accelerating: {
      label: "ACCELERATING ▲",
      className: "bg-risk-high/15 text-risk-high",
    },
    decelerating: {
      label: "DECELERATING ▼",
      className: "bg-risk-low/15 text-risk-low",
    },
    stable: {
      label: "STABLE —",
      className: "bg-risk-medium/15 text-risk-medium",
    },
  };
  const { label, className } = config[state];
  return (
    <span
      className={cn(
        "text-[10px] font-mono font-semibold px-2 py-0.5 rounded-sm tracking-wide",
        className
      )}
    >
      {label}
    </span>
  );
}

export function RiskMomentumCard({ data }: RiskMomentumCardProps) {
  const level24h = getRiskLevelFromValue(70 + data.change24h);
  const level7d = getRiskLevelFromValue(70 + data.change7d);
  const lineColor = data.change24h > 0 ? "#B93A3A" : "#3D9A5F";

  const sparklineData = data.sparkline.map((v, i) => ({ i, v }));

  return (
    <div className="bg-bg-panel border border-border-subtle rounded-sm flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-3 border-b border-border-subtle">
        <span className="text-[10px] uppercase tracking-[0.22em] text-text-tertiary font-mono">
          Risk Momentum
        </span>
      </div>

      <div className="flex flex-col gap-5 p-5 flex-1">
        {/* 24H + 7D change row */}
        <div className="flex gap-4">
          <div className="flex-1 bg-bg-primary border border-border-subtle rounded-sm px-4 py-3">
            <div className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono mb-1">
              24H
            </div>
            <span
              className={cn(
                "font-mono text-2xl font-bold tabular-nums",
                data.change24h > 0 ? "text-risk-high" : "text-risk-low"
              )}
            >
              {formatMomentum(data.change24h)}
            </span>
          </div>
          <div className="flex-1 bg-bg-primary border border-border-subtle rounded-sm px-4 py-3">
            <div className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono mb-1">
              7D
            </div>
            <span
              className={cn(
                "font-mono text-2xl font-bold tabular-nums",
                data.change7d > 0 ? "text-risk-high" : "text-risk-low"
              )}
            >
              {formatMomentum(data.change7d)}
            </span>
          </div>
        </div>

        {/* Sparkline */}
        <div className="h-[80px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <Line
                type="monotone"
                dataKey="v"
                stroke={lineColor}
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Acceleration badge */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono">
            Acceleration
          </span>
          <AccelerationBadge state={data.acceleration} />
        </div>
      </div>
    </div>
  );
}
