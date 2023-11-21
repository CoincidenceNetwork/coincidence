import { ethers } from "ethers";

if (!process.env.PRIVATE_KEY) throw new Error("PRIVATE_KEY not found");
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!process.env.ALCHEMY_TOKEN) throw new Error("ALCHEMY_TOKEN not found");
const ALCHEMY_TOKEN = process.env.ALCHEMY_TOKEN;

export const getProvider = () => {
  // Get RPC from https://chainlist.org/?testnets=true&search=sepolia
  const provider = new ethers.AlchemyProvider(
    420, // Optimism Goerli
    ALCHEMY_TOKEN,
  );

  return provider;
};

export const getSigner = () => {
  // Get RPC from https://chainlist.org/?testnets=true&search=sepolia
  const provider = new ethers.AlchemyProvider(
    420, // Optimism Goerli
    ALCHEMY_TOKEN,
  );

  return new ethers.Wallet(PRIVATE_KEY, provider);
};
