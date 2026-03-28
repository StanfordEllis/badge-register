type RegistrySignalPanelProps = {
  title: string;
  items: Array<{
    label: string;
    value: string;
    tone?: "default" | "accent";
  }>;
};

export function RegistrySignalPanel({ title, items }: RegistrySignalPanelProps) {
  return (
    <section
      className="panel-soft"
      style={{
        borderRadius: 22,
        padding: 16,
        display: "grid",
        gap: 10,
      }}
    >
      <p className="section-title">{title}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
        {items.map((item) => (
          <div
            key={item.label}
            style={{
              display: "grid",
              gap: 6,
              padding: 12,
              borderRadius: 16,
              border: "1px solid rgba(124, 199, 255, 0.12)",
              background: item.tone === "accent" ? "rgba(18, 44, 72, 0.55)" : "rgba(8, 15, 28, 0.55)",
            }}
          >
            <span className="section-title">{item.label}</span>
            <strong style={{ fontSize: "1rem" }}>{item.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
