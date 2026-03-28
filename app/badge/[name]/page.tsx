import Link from "next/link";
import { BottomNav } from "@/components/bottom-nav";
import { ActionBar } from "@/components/action-bar";
import { BadgeRecordCard } from "@/components/badge-record-card";
import { RegistryHeader } from "@/components/registry-header";
import { getBadgeRecordByName } from "@/lib/mock-registry";

export default async function BadgeDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const record = getBadgeRecordByName(name);

  return (
    <main className="app-shell">
      <div className="page-grid">
        <RegistryHeader
          eyebrow="Badge Record"
          title={record?.name ?? "Unknown Badge"}
          description="Single badge view with owner, state, and direct copy actions."
        />

        {record ? (
          <section className="panel" style={{ borderRadius: 30, padding: 18, display: "grid", gap: 16 }}>
            <BadgeRecordCard record={record} emphasis />
            <ActionBar
              actions={[
                { label: "Open Register", href: "/register" },
                { label: "View My Badge", href: "/me" },
              ]}
            />
          </section>
        ) : (
          <section className="panel" style={{ borderRadius: 28, padding: 18, display: "grid", gap: 14 }}>
            <p className="section-title">No Record</p>
            <p style={{ margin: 0, fontSize: "1.35rem", fontWeight: 700 }}>This badge name is not in the registry.</p>
            <Link href="/register" className="system-button primary" style={{ display: "grid", placeItems: "center" }}>
              Register This Badge
            </Link>
          </section>
        )}
      </div>

      <BottomNav />
    </main>
  );
}
