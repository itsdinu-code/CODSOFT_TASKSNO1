/** Money and time formatting. Paise in, rupees out. */

export function formatRupees(paise: number | null): string {
  if (paise === null) return "—";
  const rupees = paise / 100;
  return `₹${rupees.toLocaleString("en-IN", {
    maximumFractionDigits: paise % 100 === 0 ? 0 : 2,
  })}`;
}

export function formatRupeesPlain(paise: number | null): string {
  if (paise === null) return "—";
  return (paise / 100).toLocaleString("en-IN", {
    maximumFractionDigits: paise % 100 === 0 ? 0 : 2,
  });
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(iso: string): string {
  return `${formatDate(iso)}, ${formatTime(iso)}`;
}

export function formatRelative(iso: string, now: number = Date.now()): string {
  const diff = Math.max(0, now - new Date(iso).getTime());
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} h ago`;
  return formatDate(iso);
}

/** Two-digit order reference, e.g. CD-4821. */
export function orderCode(n: number): string {
  return `CD-${String(1000 + n).slice(-4)}`;
}
