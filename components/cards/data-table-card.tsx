interface DataTableCardProps {
  title: string;
  rows: { label: string; value: string }[];
}

export function DataTableCard({ title, rows }: DataTableCardProps) {
  return (
    <div className="bg-bg-panel border border-border-subtle rounded-sm flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-3 border-b border-border-subtle">
        <span className="text-[10px] uppercase tracking-[0.22em] text-text-tertiary font-mono">
          {title}
        </span>
      </div>

      {/* Rows */}
      <div className="flex flex-col divide-y divide-border-subtle flex-1">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between px-5 py-3"
          >
            <span className="text-[11px] text-text-tertiary font-mono uppercase tracking-wide">
              {row.label}
            </span>
            <span className="text-[12px] font-mono text-text-primary tabular-nums font-medium">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
