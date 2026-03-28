import Link from "next/link";
import { BottomNav } from "@/components/bottom-nav";
import { EmptyState } from "@/components/empty-state";
import { RegistryHeader } from "@/components/registry-header";
import { WalletBadgePanel } from "@/components/wallet-badge-panel";

export default function MyBadgePage() {
  return (
    <main className="app-shell">
      <div className="page-grid">
        <RegistryHeader
          eyebrow="Personal Registry"
          title="My Badge"
          description="Read the current wallet record and jump into badge actions."
        />

        <WalletBadgePanel />

        <section className="panel-soft" style={{ borderRadius: 28, padding: 18, display: "grid", gap: 12 }}>
          <p className="section-title">Quick Routes</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Link href="/register" className="system-button primary" style={{ display: "grid", placeItems: "center" }}>
              Update Badge
            </Link>
            <Link href="/status" className="system-button ghost" style={{ display: "grid", placeItems: "center" }}>
              View Status
            </Link>
          </div>
        </section>

        <EmptyState
          title="No wallet record yet"
          description="Connect a wallet to load the active badge record."
          action={{ label: "Open Register", href: "/register" }}
        />
      </div>

      <BottomNav />
    </main>
  );
}
