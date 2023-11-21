import {
  createNode,
  getPastMessages,
  stopNode,
} from "../src/lib/wakunet/waku.js";

async function main() {
  const node = await createNode();

  const pastUserData = await getPastMessages(node);
  console.log("Past user data:", pastUserData);

  await stopNode(node);
}

await main();
