import Link from "next/link";
import { BadgeRecord } from "@/lib/types";
import { BadgeStatusChip } from "@/components/badge-status-chip";
import { OwnerInfoRow } from "@/components/owner-info-row";

type BadgeRecordCardProps = {
  record: BadgeRecord;
  compact?: boolean;
  emphasis?: boolean;
};

export function BadgeRecordCard({ record, compact = false, emphasis = false }: BadgeRecordCardProps) {
  return (
    <article style={{ display: "grid", gap: compact ? 10 : 14, padding: compact ? 0 : 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div className="stack" style={{ gap: 6 }}>
          <span className="section-title">Badge Name</span>
          <strong
            style={{
              fontSize: emphasis ? "2.2rem" : compact ? "1.3rem" : "1.9rem",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            {record.name}
          </strong>
        </div>
        <BadgeStatusChip status={record.status} />
      </div>

      {!compact && <OwnerInfoRow owner={record.owner} />}

      <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr auto" : "1fr 1fr", gap: 10, alignItems: "center" }}>
        <div className="panel-soft" style={{ borderRadius: 16, padding: 12 }}>
          <span className="section-title">Last Update</span>
          <div style={{ marginTop: 6, fontWeight: 700 }}>{record.updatedAt}</div>
        </div>
        <Link href={`/badge/${encodeURIComponent(record.name)}`} className="system-button ghost" style={{ display: "grid", placeItems: "center" }}>
          Open Record
        </Link>
      </div>
    </article>
  );
}
