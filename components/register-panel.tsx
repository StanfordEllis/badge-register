"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { baseBadgeRegisterAbi, baseBadgeRegisterAddress } from "@/lib/contracts/baseBadgeRegister";
import { normalizeBadgeName } from "@/lib/format";
import { isMockBadgeAvailable } from "@/lib/mock-registry";
import { builderCodeConfig } from "@/lib/wagmi";
import { BadgeStatusChip } from "@/components/badge-status-chip";
import { BadgeNameField } from "@/components/badge-name-field";
import { WalletButton } from "@/components/wallet-button";
import { trackTransaction } from "@/utils/track";

const APP_ID = "app-001";
const APP_NAME = "badge-register";

export function RegisterPanel() {
  const { address, isConnected } = useAccount();
  const [rawName, setRawName] = useState("");
  const [statusText, setStatusText] = useState("Waiting for a badge name.");
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const normalizedName = useMemo(() => normalizeBadgeName(rawName), [rawName]);
  const { writeContractAsync, data: hash, isPending: isWriting } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });
  const badgeRead = useReadContract({
    abi: baseBadgeRegisterAbi,
    address: baseBadgeRegisterAddress,
    functionName: "badge",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

  const isAvailable = normalizedName.length > 1 ? isMockBadgeAvailable(normalizedName) : false;

  async function handleRegister() {
    if (!address || !normalizedName) return;

    setSubmittedName(normalizedName);
    setStatusText("Signature requested. Awaiting wallet confirmation.");

    try {
      const txHash = await writeContractAsync({
        abi: baseBadgeRegisterAbi,
        address: baseBadgeRegisterAddress,
        functionName: "set",
        args: [normalizedName],
        dataSuffix: builderCodeConfig.dataSuffix,
      });

      setStatusText("Transaction sent. Waiting for Base confirmation.");
      trackTransaction(APP_ID, APP_NAME, address, txHash);
    } catch {
      setStatusText("Transaction rejected or failed before submission.");
    }
  }

  const currentStatus = !isConnected
    ? "unlinked"
    : receipt.isLoading || isWriting
      ? "pending"
      : normalizedName && isAvailable
        ? "available"
        : badgeRead.data
          ? "registered"
          : "unlinked";

  return (
    <div className="stack" style={{ gap: 18, height: "100%" }}>
      <div
        style={{
          display: "grid",
          gap: 14,
          padding: 16,
          borderRadius: 22,
          background: "linear-gradient(180deg, rgba(19, 35, 60, 0.72), rgba(8, 15, 28, 0.72))",
          border: "1px solid rgba(124, 199, 255, 0.18)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <div className="stack" style={{ gap: 4 }}>
            <p className="section-title">Wallet Session</p>
            <strong>{address ? "Wallet linked" : "No wallet linked"}</strong>
          </div>
          <WalletButton />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gap: 18,
          padding: 18,
          borderRadius: 24,
          background: "rgba(7, 14, 26, 0.72)",
          border: "1px solid rgba(124, 199, 255, 0.18)",
          flex: 1,
        }}
      >
        <div className="stack" style={{ gap: 8 }}>
          <p className="section-title">Badge Terminal</p>
          <BadgeNameField value={rawName} onChange={setRawName} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <BadgeStatusChip status={currentStatus} />
            <span className="subtle" style={{ fontSize: "0.92rem" }}>
              {normalizedName ? `Normalized as ${normalizedName}` : "Lowercase names are recommended."}
            </span>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gap: 12,
            padding: 14,
            borderRadius: 18,
            border: "1px solid rgba(124, 199, 255, 0.12)",
            background: "rgba(19, 35, 60, 0.42)",
          }}
        >
          <div style={{ display: "grid", gap: 6 }}>
            <span className="section-title">Current Readout</span>
            <strong style={{ fontSize: "1.2rem" }}>
              {badgeRead.data ? `Active badge: ${badgeRead.data}` : isAvailable ? "Name is clear to register." : "Enter a new badge name."}
            </strong>
            <p className="subtle" style={{ margin: 0 }}>
              {statusText}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <button
              className="system-button primary"
              type="button"
              disabled={!isConnected || !normalizedName || !isAvailable || isWriting || receipt.isLoading}
              onClick={handleRegister}
            >
              {isWriting || receipt.isLoading ? "Registering..." : "Register Badge"}
            </button>
            <Link
              href={submittedName ? `/badge/${encodeURIComponent(submittedName)}` : "/status"}
              className="system-button ghost"
              style={{ display: "grid", placeItems: "center" }}
            >
              {submittedName ? "Open Pending Record" : "View Status"}
            </Link>
          </div>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          <p className="section-title">Flow Status</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {[
              ["Lookup", normalizedName ? "Ready" : "Idle"],
              ["Write", isWriting ? "Signing" : receipt.isLoading ? "Pending" : "Standby"],
              ["Receipt", receipt.isSuccess ? "Confirmed" : "Waiting"],
            ].map(([label, value]) => (
              <div key={label} className="panel-soft" style={{ borderRadius: 16, padding: 12, display: "grid", gap: 6 }}>
                <span className="section-title">{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
