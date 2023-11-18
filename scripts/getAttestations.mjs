import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { getProvider } from "./utils.mjs";


// Get RPC from https://chainlist.org/?testnets=true&search=sepolia
const provider = getProvider()

// Get EAS from https://docs.attest.sh/docs/quick--start/contracts
const eas = new EAS("0x4200000000000000000000000000000000000021");
// @ts-ignore
eas.connect(provider);

const uid =
  "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995";

const attestation = await eas.getAttestation(uid);

console.log(attestation);
