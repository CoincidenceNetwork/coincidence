/*
  topic
  encoder decoders (json is ok alternative)
    separate encoder for topic
    separate encoder for writing messages (ephemeral param e.g. handshakes)
    https://js.waku.org/modules/_waku_message_encryption.html for encrypting 
  waku = create light node (light push, filter, store)
  subscribe for new messags
  query for past messages
*/

import protobuf from "protobufjs";
import {
  createLightNode,
  createDecoder,
  bytesToUtf8,
  waitForRemotePeer,
  createEncoder,
  DecodedMessage,
} from "@waku/sdk";

// sorry, for TypeScript-related issues this is in JavaScript.

// export interface UserDataMessage {
//   name: string;
//   bio: string;
//   img: string;
//   interests: string[]; // later on, attestations
// }

export const PUserDataMessage = new protobuf.Type("UserDataMessage")
  .add(new protobuf.Field("id", 1, "string"))
  .add(new protobuf.Field("name", 2, "string"))
  .add(new protobuf.Field("bio", 3, "string"))
  .add(new protobuf.Field("img", 4, "string"))
  .add(new protobuf.Field("interests", 5, "string", "repeated"));

// import { PUserDataMessage, UserDataMessage } from "../../types/alltypes";

const contentTopic = "/coincidence/0";
const encoder = createEncoder({ contentTopic });
const decoder = createDecoder(contentTopic);

export async function createNode() {
  const node = await createLightNode({ defaultBootstrap: true });
  await node.start();
  await waitForRemotePeer(node);
  console.log("Node started");
  return node;
}

export async function subscribeToUserData(node, callback) {
  const subcription = await node.filter.createSubscription();
  await subcription.subscribe([decoder], (message) => {
    try {
      const decodedData = PUserDataMessage.decode(message.payload);
      callback(decodedData);
    } catch (e) {
      console.error("Failed to decode message payload", e);
    }
  });
  console.log("Subscribed to messages");
}

export async function postUserData(node, userData) {
  console.log("Posting message...", userData.id);
  const protoMessage = PUserDataMessage.create(userData);
  const serializedMessage = PUserDataMessage.encode(protoMessage).finish();
  await node.lightPush.send(encoder, { payload: serializedMessage });
  const deserializedMessage = PUserDataMessage.decode(serializedMessage);
  console.log("Sent message:", deserializedMessage);
}

export async function stopNode(node) {
  await node.stop();
  console.log("Node stopped");
}

export async function getExistingUserData(node, callback) {
  try {
    for await (const userDataPromises of node.store.queryGenerator([decoder])) {
      for (const p of userDataPromises) {
        const data = await p;
        try {
          const decodedData = PUserDataMessage.decode(data.payload);
          if (decodedData) {
            callback(decodedData);
          }
        } catch (e) {
          console.error("Failed to deserialize user data", e);
        }
      }
    }
  } catch (e) {
    console.error("Failed to retrieve user data", e);
  }
}

export async function getPastMessages(node) {
  const messages = [];
  try {
    for await (const messagesPromises of node.store.queryGenerator([decoder])) {
      const decodedMessages = await Promise.all(
        messagesPromises.map(async (p) => {
          const msg = await p;
          try {
            return PUserDataMessage.decode(msg.payload);
          } catch (e) {
            console.error("Failed to deserialize message", e);
            return null;
          }
        }),
      );
      messages.push(...decodedMessages.filter(Boolean));
    }
  } catch (e) {
    console.error("Failed to retrieve messages", e);
  }
  return messages;
}
