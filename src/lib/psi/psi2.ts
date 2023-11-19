import { ZKPExponentiationProof } from "TBD";
import * as crypto from "crypto";

function hash(input: string): number {
  return parseInt(crypto.createHash("sha256").update(input).digest("hex"), 16);
}

function randomExponent(): number {
  return Math.floor(Math.random() * Math.pow(2, 256));
}

function exponentiate(value: number, exponent: number): number {
  return Math.pow(value, exponent);
}

function userPsiSet(userSet: Set<string>): [number, Map<string, number>] {
  const exp = randomExponent();
  const hashedSetExp = new Map<string, number>();
  userSet.forEach((item) =>
    hashedSetExp.set(item, exponentiate(hash(item), exp)),
  );
  return [exp, hashedSetExp];
}

function generateZkpExponentiation(
  setElements: Set<string>,
  exponent: number,
): Map<string, ZKPExponentiationProof> {
  const result = new Map<string, ZKPExponentiationProof>();
  setElements.forEach((element) =>
    result.set(element, ZKPExponentiationProof.create(hash(element), exponent)),
  );
  return result;
}

function verifyZkpExponentiation(
  proofs: Map<string, ZKPExponentiationProof>,
  hashedExponentiatedSets: Map<string, number>,
): boolean {
  for (let [user, proof] of proofs) {
    if (
      !ZKPExponentiationProof.verify(hashedExponentiatedSets.get(user), proof)
    ) {
      return false;
    }
  }
  return true;
}

function computeIntersections(
  localHashedSetExp: Map<string, number>,
  otherUsersHashedSets: Map<string, Map<string, number>>,
  localExp: number,
  otherUsersExps: Map<string, number>,
): Map<string, Set<string>> {
  const intersections = new Map<string, Set<string>>();
  otherUsersHashedSets.forEach((otherUserHashedSet, user) => {
    const intersection = new Set<string>();
    localHashedSetExp.forEach((localVal, localElement) => {
      otherUserHashedSet.forEach((otherVal, otherElement) => {
        if (
          exponentiate(localVal, otherUsersExps.get(user)) ===
          exponentiate(otherVal, localExp)
        ) {
          intersection.add(localElement);
        }
      });
    });
    intersections.set(user, intersection);
  });
  return intersections;
}
