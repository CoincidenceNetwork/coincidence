import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";

if (!process.env.PRIVATE_KEY) throw new Error("PRIVATE_KEY not found");
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!process.env.RPC_URL) throw new Error("RPC_URL not found");
const RPC_URL = process.env.RPC_URL;

// Get RPC from https://chainlist.org/?testnets=true&search=sepolia
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const signer = wallet.connect(provider);

// Get Registry from https://docs.attest.sh/docs/quick--start/contracts
const schemaRegistryContractAddress =
  "0x4200000000000000000000000000000000000020";
const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

// @ts-ignore
schemaRegistry.connect(signer);

const schema = "string interest1, string interest2, string interest3";
const resolverAddress = "0x0000000000000000000000000000000000000000"; // Sepolia 0.26
const revocable = true;

const transaction = await schemaRegistry.register({
  schema,
  resolverAddress,
  revocable,
});

// Optional: Wait for transaction to be validated
const result = await transaction.wait();

console.log(
  "🚀 ~ file: schema.ts:33 ~ result:",
  `https://sepolia.easscan.org/schema/view/${result}`,
);
