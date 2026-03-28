import { BadgeRecord, RegistrySnapshot } from "@/lib/types";

const records: BadgeRecord[] = [
  {
    name: "ice-signal",
    owner: "0x2e12fA93a6F6B2A1b5671e4b905C0d695A9156f4",
    status: "registered",
    updatedAt: "2026-03-28 09:14 UTC",
    txHash: "0x4de6d2edcd054d6309f647d7dd4f160790fd1d698476f60a3b2d67ba943f2f45",
  },
  {
    name: "slate-mark",
    owner: "0x80D778e2A8dbb9b6a12c9F60dAC525b9eD9b9cA2",
    status: "pending",
    updatedAt: "2026-03-28 09:27 UTC",
    txHash: "0xb56f650459dc3fd69d0d6ad67722c8f1bf9c89d59d7f2bf748e1d9305f1db0a1",
  },
];

export function getRegistrySnapshot(): RegistrySnapshot {
  return {
    totalRegistered: 182,
    activeWrites: 3,
    latestRecord: "ice-signal",
    chain: "Base",
  };
}

export function getFeaturedBadgeRecord(): BadgeRecord {
  return records[0];
}

export function getBadgeRecordByName(name: string): BadgeRecord | null {
  return records.find((record) => record.name.toLowerCase() === decodeURIComponent(name).toLowerCase()) ?? null;
}

export function getBadgeRecordByOwner(owner?: string): BadgeRecord | null {
  if (!owner) return null;
  return records.find((record) => record.owner.toLowerCase() === owner.toLowerCase()) ?? null;
}

export function getRegistryTimeline() {
  return [
    {
      label: "Lookup",
      value: "Readable",
      status: "available" as const,
      note: "Badge names can be queried before a write is sent.",
    },
    {
      label: "Write Flow",
      value: "Ready",
      status: "registered" as const,
      note: "The contract accepts a single string write per wallet.",
    },
    {
      label: "Pending Queue",
      value: "Observed",
      status: "pending" as const,
      note: "The interface reserves room for post-submit pending feedback.",
    },
  ];
}

export function isMockBadgeAvailable(name: string) {
  return !records.some((record) => record.name.toLowerCase() === name.toLowerCase());
}
