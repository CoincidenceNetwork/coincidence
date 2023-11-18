import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { getSigner } from "./utils.mjs";

if (!process.env.PRIVATE_KEY) throw new Error("PRIVATE_KEY not found");
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!process.env.RPC_URL) throw new Error("RPC_URL not found");
const RPC_URL = process.env.RPC_URL;

const signer = getSigner();

// Get EAS from https://docs.attest.sh/docs/quick--start/contracts
const eas = new EAS("0x4200000000000000000000000000000000000021");
// @ts-ignore
eas.connect(signer);
// Initialize SchemaEncoder with the schema string
const schemaEncoder = new SchemaEncoder(
  "string interest1, string interest2, string interest3",
);
const encodedData = schemaEncoder.encodeData([
  { name: "interest1", value: "", type: "string" },
  { name: "interest2", value: "", type: "string" },
  { name: "interest3", value: "", type: "string" },
]);
const tx = await eas.attest({
  schema: "0x9a5415ee7c61920087da60b18704cf4406ac4823641149e308db9844c00fc177",
  data: {
    recipient: "0x0000000000000000000000000000000000000000",
    expirationTime: BigInt(0),
    revocable: true, // Be aware that if your schema is not revocable, this MUST be false
    data: encodedData,
  },
});
const newAttestationUID = await tx.wait();
console.log("New attestation UID:", newAttestationUID);
