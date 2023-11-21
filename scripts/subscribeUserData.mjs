import {
  createNode,
  subscribeToUserData,
  stopNode,
  PUserDataMessage,
} from "../src/lib/wakunet/waku.js";

async function main() {
  const node = await createNode();

  const callback = (message) => {
    const deserializedMessage = PUserDataMessage.decode(message.payload);
    console.log("Received message:", deserializedMessage);
  };

  await subscribeToUserData(node, callback);

  process.on("SIGINT", async () => {
    await stopNode(node);
    process.exit();
  });
}

await main();
