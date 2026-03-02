"use client";

import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from "recharts";
import type { RiskTimelinePoint } from "@/types";
import { getRiskHexColor, getRiskLevelFromValue } from "@/lib/risk-levels";
import { formatRiskValue, formatShortDate } from "@/lib/format";
import { cn } from "@/lib/utils";

interface RiskTimelineCardProps {
  data: RiskTimelinePoint[];
}

type TimeRange = "7D" | "30D" | "90D";
const timeRanges: TimeRange[] = ["7D", "30D", "90D"];

function getSliceCount(range: TimeRange) {
  return range === "7D" ? 7 : range === "30D" ? 30 : 90;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const value = payload[0].value;
  const level = getRiskLevelFromValue(value);
  return (
    <div className="bg-bg-panel border border-border-subtle rounded-sm px-3 py-2 shadow-lg">
      <div className="text-[10px] text-text-tertiary font-mono mb-1">
        {label ? formatShortDate(label) : ""}
      </div>
      <div
        className="font-mono text-sm font-medium tabular-nums"
        style={{ color: getRiskHexColor(level) }}
      >
        {formatRiskValue(value)}
      </div>
    </div>
  );
}

export function RiskTimelineCard({ data }: RiskTimelineCardProps) {
  const [range, setRange] = useState<TimeRange>("30D");

  const displayData = useMemo(
    () => data.slice(-getSliceCount(range)),
    [data, range]
  );

  const latestValue = displayData[displayData.length - 1]?.value ?? 50;
  const lineColor = getRiskHexColor(getRiskLevelFromValue(latestValue));

  return (
    <div className="bg-bg-panel border border-border-subtle rounded-sm h-full flex flex-col">
      {/* Header */}
      <div className="px-5 py-3 border-b border-border-subtle flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.22em] text-text-tertiary font-mono">
          Risk Index Timeline
        </span>
        <div className="flex items-center gap-1">
          {timeRanges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "px-2.5 py-1 text-[11px] font-mono rounded-sm transition-colors duration-100",
                range === r
                  ? "bg-bg-elevated text-text-primary"
                  : "text-text-tertiary hover:text-text-secondary"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 px-4 py-4 min-h-65">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={displayData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid
              stroke="#2A2E37"
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.5}
            />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatShortDate}
              stroke="none"
              tick={{
                fill: "#464B58",
                fontSize: 10,
                fontFamily: "var(--font-geist-mono)",
              }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[20, 100]}
              stroke="none"
              tick={{
                fill: "#464B58",
                fontSize: 10,
                fontFamily: "var(--font-geist-mono)",
              }}
              tickLine={false}
              width={32}
            />
            <Tooltip content={<ChartTooltip />} />
            <ReferenceLine y={40} stroke="#3D9A5F" strokeDasharray="4 4" strokeOpacity={0.3} />
            <ReferenceLine y={60} stroke="#C48A2C" strokeDasharray="4 4" strokeOpacity={0.3} />
            <ReferenceLine y={80} stroke="#B93A3A" strokeDasharray="4 4" strokeOpacity={0.3} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={lineColor}
              strokeWidth={1.5}
              dot={false}
              isAnimationActive={false}
              activeDot={{ r: 3, fill: lineColor, stroke: "#161A22", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
