"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Hub" },
  { href: "/register", label: "Register" },
  { href: "/me", label: "My Badge" },
  { href: "/status", label: "Status" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        left: "50%",
        bottom: 16,
        width: "calc(100% - 24px)",
        maxWidth: 432,
        transform: "translateX(-50%)",
        padding: 8,
        borderRadius: 22,
        border: "1px solid rgba(124, 199, 255, 0.24)",
        background: "rgba(5, 10, 20, 0.88)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 20px 40px rgba(2, 6, 23, 0.35)",
        zIndex: 20,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                minHeight: 50,
                borderRadius: 16,
                display: "grid",
                placeItems: "center",
                fontSize: "0.78rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: active ? "#E6F0FF" : "#94A3B8",
                border: active ? "1px solid rgba(34, 211, 238, 0.4)" : "1px solid transparent",
                background: active ? "linear-gradient(180deg, rgba(124, 199, 255, 0.16), rgba(75, 108, 183, 0.18))" : "transparent",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
