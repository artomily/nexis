import type { IntelligenceReport as IntelligenceReportType } from "@/types";
import { formatTimestamp } from "@/lib/format";

interface IntelligenceReportProps {
  data: IntelligenceReportType;
}

export function IntelligenceReport({ data }: IntelligenceReportProps) {
  const sections = [
    { label: "Primary Driver", content: data.primaryDriver },
    { label: "Secondary Driver", content: data.secondaryDriver },
    { label: "Risk Outlook (7D)", content: data.riskOutlook7D },
  ];

  return (
    <div className="bg-bg-panel border border-border-subtle rounded-md">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border-subtle flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary font-mono">
          AI Intelligence Report
        </span>
        <span className="text-[10px] text-text-tertiary font-mono">
          {formatTimestamp(data.generatedAt)}
        </span>
      </div>

      {/* Summary */}
      <div className="px-6 py-4 border-b border-border-subtle">
        <p className="text-sm text-text-primary leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Structured sections */}
      <div className="divide-y divide-border-subtle">
        {sections.map((section) => (
          <div key={section.label} className="px-6 py-4">
            <div className="mb-2">
              <span className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-mono">
                {section.label}
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
