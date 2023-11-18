import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { getProvider } from "./utils.mjs";


// Get RPC from https://chainlist.org/?testnets=true&search=sepolia
const provider = getProvider()

// Get EAS from https://docs.attest.sh/docs/quick--start/contracts
const eas = new EAS("0x4200000000000000000000000000000000000021");
// @ts-ignore
eas.connect(provider);

const uid =
  "0xfcb39af1be5f18c03dc4f77d981520430f41553527ef4e5b0ea5390f8707cb42";

const attestation = await eas.getAttestation(uid);

console.log(attestation);
