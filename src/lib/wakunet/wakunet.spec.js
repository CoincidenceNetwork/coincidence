import "mocha";
import { expect } from "chai";
import { createNode } from "./waku";
import { LightNode, createLightNode } from "@waku/sdk";

describe("Non Private Set Intersection Tests", () => {
  it("Basic connection", () => {
    (async () => {
      const node = await createNode();
      expect(node.isStarted).to.be.true;
    })();
  });
});
