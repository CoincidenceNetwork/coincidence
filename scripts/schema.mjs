import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { getSigner } from "./utils.mjs";

const signer = getSigner();

// Get Registry from https://docs.attest.sh/docs/quick--start/contracts
const schemaRegistryContractAddress =
  "0x4200000000000000000000000000000000000020";
const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

// @ts-ignore
schemaRegistry.connect(signer);

const schema = "string interestingggggg";
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
