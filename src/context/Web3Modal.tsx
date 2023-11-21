import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import {
  arbitrum,
  mainnet,
  optimismGoerli,
  polygonMumbai,
  scrollSepolia,
} from "viem/chains";

// 1. Get projectId
const projectId = "b7f9cca064fdbe6c6ed0a0b59ce8dc4f";

// 2. Create wagmiConfig
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [
  mainnet,
  arbitrum,
  optimismGoerli,
  polygonMumbai,
  scrollSepolia,
];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

export function Web3Modal({ children }: { children: any }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
