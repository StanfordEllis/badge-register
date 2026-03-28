export function shortenAddress(value?: string, start = 6, end = 4) {
  if (!value) return "No wallet";
  return `${value.slice(0, start)}...${value.slice(-end)}`;
}

export function normalizeBadgeName(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, "-");
}
