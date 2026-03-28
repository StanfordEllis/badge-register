import { RegistrySnapshot } from "@/lib/types";

export function RegistrySummaryPanel({ snapshot }: { snapshot: RegistrySnapshot }) {
  const items = [
    { label: "Chain", value: snapshot.chain },
    { label: "Registered", value: snapshot.totalRegistered.toString() },
    { label: "Active Writes", value: snapshot.activeWrites.toString() },
    { label: "Latest", value: snapshot.latestRecord },
  ];

  return (
    <section className="panel-soft" style={{ borderRadius: 24, padding: 16, display: "grid", gap: 10 }}>
      <p className="section-title">Registry Snapshot</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              padding: 14,
              borderRadius: 16,
              background: "rgba(8, 15, 28, 0.55)",
              border: "1px solid rgba(124, 199, 255, 0.12)",
              display: "grid",
              gap: 6,
            }}
          >
            <span className="section-title">{item.label}</span>
            <strong style={{ fontSize: "1.15rem", lineHeight: 1.1 }}>{item.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
