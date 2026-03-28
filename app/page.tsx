import Link from "next/link";
import { BottomNav } from "@/components/bottom-nav";
import { RegistryHeader } from "@/components/registry-header";
import { RegistrySummaryPanel } from "@/components/registry-summary-panel";
import { WalletButton } from "@/components/wallet-button";
import { getFeaturedBadgeRecord, getRegistrySnapshot } from "@/lib/mock-registry";
import { BadgeRecordCard } from "@/components/badge-record-card";
import { BadgeStatusChip } from "@/components/badge-status-chip";

export default function HomePage() {
  const snapshot = getRegistrySnapshot();
  const featuredBadge = getFeaturedBadgeRecord();

  return (
    <main className="app-shell">
      <div className="page-grid">
        <RegistryHeader
          eyebrow="Registry Access"
          title="Badge Registry"
          description="Claim a clean badge name and keep its record readable."
        />

        <section className="panel" style={{ borderRadius: 28, padding: 18, display: "grid", gap: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <div className="stack" style={{ gap: 8 }}>
              <p className="section-title">Entry Node</p>
              <h1 className="display-title">Register or inspect.</h1>
              <p className="subtle" style={{ margin: 0, maxWidth: 260 }}>
                Short flow. Clear state. Direct badge routing.
              </p>
            </div>
            <WalletButton />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Link href="/register" className="system-button primary" style={{ display: "grid", placeItems: "center" }}>
              Register Badge
            </Link>
            <Link href="/me" className="system-button ghost" style={{ display: "grid", placeItems: "center" }}>
              View My Badge
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gap: 10,
              padding: 14,
              borderRadius: 20,
              border: "1px solid rgba(124, 199, 255, 0.18)",
              background: "rgba(8, 15, 28, 0.52)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="section-title">Focus Record</span>
              <BadgeStatusChip status={featuredBadge.status} />
            </div>
            <BadgeRecordCard record={featuredBadge} compact />
          </div>
        </section>

        <RegistrySummaryPanel snapshot={snapshot} />
      </div>

      <BottomNav />
    </main>
  );
}
