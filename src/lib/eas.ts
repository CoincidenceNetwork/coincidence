import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useSigner } from "./eas-wagmi-utils";
import { JsonRpcSigner } from "ethers";

export const offChainAttest = async (signer: JsonRpcSigner) => {
  // Get EAS from https://docs.attest.sh/docs/quick--start/contracts
  const eas = new EAS("0x4200000000000000000000000000000000000021");
  // @ts-ignore
  eas.connect(signer);
  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder(
    "string interest1, string interest2, string interest3",
  );
  const encodedData = schemaEncoder.encodeData([
    { name: "interest1", value: "food", type: "string" },
    { name: "interest2", value: "travel", type: "string" },
    { name: "interest3", value: "ethGlobal", type: "string" },
  ]);

  const offchain = await eas.getOffchain();
  const offchainAttestation = await offchain.signOffchainAttestation(
    {
      recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
      // Unix timestamp of when attestation expires. (0 for no expiration)
      expirationTime: BigInt(0),
      // Unix timestamp of current time
      time: BigInt(1671219636),
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      version: 1,
      nonce: BigInt(0),
      schema:
        "0xbd23de8698370392ae9a462e98db7e6344b4afb9b5d3ab2d4a36746a1da98b2a",
      refUID:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      data: encodedData,
    },
    signer,
  );
  console.log(
    "🚀 ~ file: offChainAttest.mjs:40 ~ offchainAttestation:",
    offchainAttestation,
  );
  return offchainAttestation;
};
