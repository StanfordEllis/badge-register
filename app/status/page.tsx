import { BottomNav } from "@/components/bottom-nav";
import { BadgeStatusChip } from "@/components/badge-status-chip";
import { RegistryHeader } from "@/components/registry-header";
import { RegistrySignalPanel } from "@/components/registry-signal-panel";
import { getRegistryTimeline } from "@/lib/mock-registry";
import { builderCodeConfig } from "@/lib/wagmi";

export default function StatusPage() {
  const timeline = getRegistryTimeline();

  return (
    <main className="app-shell">
      <div className="page-grid">
        <RegistryHeader
          eyebrow="System Status"
          title="Registry State"
          description="Track registration readiness, onchain write flow, and offchain attribution states."
        />

        <RegistrySignalPanel
          title="Onchain State"
          items={[
            { label: "Network", value: "Base", tone: "accent" },
            { label: "Contract", value: "Reachable" },
            { label: "Write Method", value: "set(string)" },
            { label: "Owner Read", value: "badge(address)" },
          ]}
        />

        <RegistrySignalPanel
          title="Offchain State"
          items={[
            { label: "App ID", value: builderCodeConfig.appId, tone: "accent" },
            { label: "Builder", value: builderCodeConfig.builderCode },
            { label: "8021", value: "Attached" },
            { label: "Tracking", value: "Ready" },
          ]}
        />

        <section className="panel" style={{ borderRadius: 26, padding: 18, display: "grid", gap: 12 }}>
          {timeline.map((item) => (
            <div
              key={item.label}
              style={{
                display: "grid",
                gap: 10,
                padding: 14,
                borderRadius: 18,
                border: "1px solid rgba(124, 199, 255, 0.14)",
                background: "rgba(10, 18, 32, 0.48)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <div style={{ display: "grid", gap: 4 }}>
                  <span className="section-title">{item.label}</span>
                  <strong style={{ fontSize: "1.05rem" }}>{item.value}</strong>
                </div>
                <BadgeStatusChip status={item.status} />
              </div>
              <p className="subtle" style={{ margin: 0 }}>
                {item.note}
              </p>
            </div>
          ))}
        </section>
      </div>

      <BottomNav />
    </main>
  );
}
