import { expect } from "chai";
import "mocha";
import { NonPrivateSetIntersection } from "./PSI";

describe("Non Private Set Intersection Tests", () => {
  it("Test 1: Intersection of userA and userB", () => {
    const psi = new NonPrivateSetIntersection();
    psi.add_interests("userA", ["x", "y", "z", "3"]);
    psi.add_interests("userB", ["x", "y", "f", "3"]);

    const intersectionAB = psi.intersection("userA", ["x", "y", "f", "3"]);
    expect(Array.from(intersectionAB)).to.have.members(["x", "y", "3"]);
  });

  it("Test 2: Intersections among userA, userB, and userC", () => {
    const psi = new NonPrivateSetIntersection();
    psi.add_interests("userA", ["x", "y", "1", "2"]);
    psi.add_interests("userB", ["x", "y", "4", "2"]);
    psi.add_interests("userC", ["x", "y", "4", "3"]);

    const intersectionAB = psi.intersection("userA", ["x", "y", "4", "2"]);
    const intersectionBC = psi.intersection("userB", ["x", "y", "4", "3"]);
    const intersectionAC = psi.intersection("userA", ["x", "y", "4", "3"]);

    expect(Array.from(intersectionAB)).to.have.members(["x", "y", "2"]);
    expect(Array.from(intersectionBC)).to.have.members(["x", "y", "4"]);
    expect(Array.from(intersectionAC)).to.have.members(["x", "y"]);
  });
});
