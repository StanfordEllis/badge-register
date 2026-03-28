import Link from "next/link";

type ActionBarProps = {
  actions: Array<{ label: string; href: string }>;
};

export function ActionBar({ actions }: ActionBarProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${actions.length}, 1fr)`, gap: 10 }}>
      {actions.map((action, index) => (
        <Link
          key={action.href}
          href={action.href}
          className={`system-button ${index === 0 ? "primary" : "ghost"}`}
          style={{ display: "grid", placeItems: "center" }}
        >
          {action.label}
        </Link>
      ))}
    </div>
  );
}
