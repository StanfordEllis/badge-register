import { createConfig, http } from "wagmi";
import { injected } from "@wagmi/connectors";
import { base } from "wagmi/chains";

const projectUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://badge-register.vercel.app";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected({
      shimDisconnect: true,
    }),
  ],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});

export const builderCodeConfig = {
  appId: "69c7336646489d192593bd96",
  appName: "badge-register",
  appUrl: projectUrl,
  builderCode: "bc_4f9en53b",
  // Base builder code data suffix for 8021 attribution validation.
  dataSuffix: "0x62635f346639656e3533620b0080218021802180218021802180218021" as const,
};
