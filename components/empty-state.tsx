import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: { label: string; href: string };
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <section className="panel-soft" style={{ borderRadius: 26, padding: 18, display: "grid", gap: 10 }}>
      <p className="section-title">Idle State</p>
      <strong style={{ fontSize: "1.15rem" }}>{title}</strong>
      <p className="subtle" style={{ margin: 0 }}>
        {description}
      </p>
      {action ? (
        <Link href={action.href} className="system-button ghost" style={{ display: "grid", placeItems: "center" }}>
          {action.label}
        </Link>
      ) : null}
    </section>
  );
}
