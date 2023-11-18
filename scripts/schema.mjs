import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";

if (!process.env.PRIVATE_KEY) throw new Error("PRIVATE_KEY not found");
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Get from https://chainlist.org/?testnets=true&search=sepolia
const provider = new ethers.providers.JsonRpcProvider(
  "https://ethereum-sepolia.publicnode.com",
);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const signer = wallet.connect(provider);

// Get from https://docs.attest.sh/docs/quick--start/contracts
const schemaRegistryContractAddress =
  "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0";
const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

schemaRegistry.connect(signer);

const schema = "string interest1, string interest2, string interest3";
const resolverAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26
const revocable = true;

const transaction = await schemaRegistry.register({
  schema,
  resolverAddress,
  revocable,
});

// Optional: Wait for transaction to be validated
const result = await transaction.wait();

console.log("🚀 ~ file: schema.ts:33 ~ result:", `https://sepolia.easscan.org/schema/view/${result}`);
