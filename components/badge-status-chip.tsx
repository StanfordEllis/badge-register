import { BadgeStatus } from "@/lib/types";

const statusLabelMap: Record<BadgeStatus, string> = {
  available: "Available",
  registered: "Registered",
  pending: "Pending",
  unlinked: "Unlinked",
};

export function BadgeStatusChip({ status }: { status: BadgeStatus }) {
  return <span className={`status-chip status-${status}`}>{statusLabelMap[status]}</span>;
}
