// ============================================
// RiskTerminal AI — Formatting Utilities
// ============================================

/**
 * Format a risk index value to 1 decimal place.
 */
export function formatRiskValue(n: number): string {
  return n.toFixed(1);
}

/**
 * Format an ISO timestamp to institutional display format.
 * e.g. "02 MAR 2026 14:32 UTC"
 */
export function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
  ];
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${day} ${month} ${year} ${hours}:${minutes} UTC`;
}

/**
 * Format a short timestamp for chart axis labels.
 * e.g. "02 MAR" or "14:00"
 */
export function formatShortDate(iso: string): string {
  const date = new Date(iso);
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
  ];
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = months[date.getUTCMonth()];
  return `${day} ${month}`;
}

/**
 * Format momentum value with proper sign.
 * Positive: "+3.2", Negative: "−1.5" (using proper minus sign U+2212)
 */
export function formatMomentum(n: number): string {
  if (n > 0) return `+${n.toFixed(1)}`;
  if (n < 0) return `\u2212${Math.abs(n).toFixed(1)}`;
  return "0.0";
}
