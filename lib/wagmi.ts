import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
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
  // TODO: Replace BUILDER_CODE_SUFFIX with the provided builder code data suffix.
  // Keep this key stable so Base metadata can append the final builder code later.
  builderCodeSuffix: "BUILDER_CODE_SUFFIX",
};
