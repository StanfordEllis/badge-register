"use client";

import Link from "next/link";
import { useAccount, useReadContract } from "wagmi";
import { baseBadgeRegisterAbi, baseBadgeRegisterAddress } from "@/lib/contracts/baseBadgeRegister";
import { getBadgeRecordByOwner } from "@/lib/mock-registry";
import { RegistrySignalPanel } from "@/components/registry-signal-panel";
import { WalletButton } from "@/components/wallet-button";
import { BadgeStatusChip } from "@/components/badge-status-chip";
import { shortenAddress } from "@/lib/format";
import { builderCodeConfig } from "@/lib/wagmi";

export function WalletBadgePanel() {
  const { address } = useAccount();
  const badgeRead = useReadContract({
    abi: baseBadgeRegisterAbi,
    address: baseBadgeRegisterAddress,
    functionName: "badge",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });
  const mockRecord = getBadgeRecordByOwner(address);
  const badgeName = typeof badgeRead.data === "string" && badgeRead.data.length > 0 ? badgeRead.data : mockRecord?.name;

  return (
    <section className="panel" style={{ borderRadius: 30, padding: 18, display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div className="stack" style={{ gap: 6 }}>
          <p className="section-title">Wallet Record</p>
          <strong style={{ fontSize: "1.1rem" }}>{address ? shortenAddress(address, 8, 6) : "Wallet not connected"}</strong>
        </div>
        <WalletButton />
      </div>

      <div
        style={{
          display: "grid",
          gap: 12,
          padding: 16,
          borderRadius: 24,
          background: "rgba(6, 13, 26, 0.58)",
          border: "1px solid rgba(124, 199, 255, 0.14)",
        }}
      >
        <span className="section-title">Badge Slot</span>
        <strong style={{ fontSize: "2.4rem", lineHeight: 1, letterSpacing: "-0.05em" }}>
          {badgeName || "No badge"}
        </strong>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <BadgeStatusChip status={badgeName ? "registered" : "unlinked"} />
          <span className="subtle">{badgeName ? "Wallet badge record loaded." : "Connect and register to create a record."}</span>
        </div>
      </div>

      <RegistrySignalPanel
        title="Onchain View"
        items={[
          { label: "Record Read", value: badgeName ? "Resolved" : "Empty", tone: "accent" },
          { label: "Address Link", value: address ? "Connected" : "Offline" },
          { label: "Contract", value: "BaseBadgeRegister" },
          { label: "Method", value: "badge(address)" },
        ]}
      />

      <RegistrySignalPanel
        title="Offchain View"
        items={[
          { label: "App ID", value: builderCodeConfig.appId, tone: "accent" },
          { label: "Builder", value: builderCodeConfig.builderCode },
          { label: "Registry Cache", value: mockRecord ? "Warm" : "Standby" },
          { label: "Attribution", value: "Prepared" },
        ]}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Link href="/register" className="system-button primary" style={{ display: "grid", placeItems: "center" }}>
          Register Again
        </Link>
        <Link href={badgeName ? `/badge/${encodeURIComponent(badgeName)}` : "/status"} className="system-button ghost" style={{ display: "grid", placeItems: "center" }}>
          {badgeName ? "Open Record" : "Check Status"}
        </Link>
      </div>
    </section>
  );
}
