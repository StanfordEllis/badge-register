export type BadgeStatus = "available" | "registered" | "pending" | "unlinked";

export type BadgeRecord = {
  name: string;
  owner: `0x${string}`;
  status: BadgeStatus;
  updatedAt: string;
  txHash?: `0x${string}`;
};

export type RegistrySnapshot = {
  totalRegistered: number;
  activeWrites: number;
  latestRecord: string;
  chain: string;
};
