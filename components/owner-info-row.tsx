"use client";

import { useState } from "react";
import { shortenAddress } from "@/lib/format";

export function OwnerInfoRow({ owner }: { owner: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(owner);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        gap: 10,
        padding: 12,
        borderRadius: 16,
        border: "1px solid rgba(124, 199, 255, 0.16)",
        background: "rgba(9, 17, 31, 0.52)",
      }}
    >
      <div className="stack" style={{ gap: 4 }}>
        <span className="section-title">Owner</span>
        <strong>{shortenAddress(owner, 8, 6)}</strong>
      </div>
      <button className="system-button ghost" type="button" onClick={handleCopy}>
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
