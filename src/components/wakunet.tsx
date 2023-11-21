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

import * as React from "react";
import protobuf from "protobufjs";
import {
  createLightNode,
  createDecoder,
  bytesToUtf8,
  waitForRemotePeer,
  createEncoder,
  LightNode,
  DecodedMessage,
} from "@waku/sdk";

// import UserDataMessage from ../

// const contentTopic = "/coincidence/";
// const encoder = createEncoder({ contentTopic });
// const decoder = createDecoder(contentTopic);

// async function createNode() {
//   const node = await createLightNode({ defaultBootstrap: true });
//   await node.start();
//   await waitForRemotePeer(node);
//   return node;
// }

// async function subscribeToUserData(
//   node: LightNode,
//   callback: (userDataMessage: DecodedMessage) => void,
// ) {
//   if (!callback) {
//     console.log("DEFAULT CALLBACK");
//     const _callback = (userDataMessage: DecodedMessage) => {
//       if (!userDataMessage.payload) return;
//       const userDataObj = UserDataMessage.decode(userDataMessage.payload);
//       console.log("userDataMessage", userDataMessage);
//     };
//     callback = _callback;
//   }
//   const subcription = await node.filter.createSubscription();
//   await subcription.subscribe([decoder], callback);
// }

/*
const ProtoChatMessage = new protobuf.Type("ChatMessage")
  .add(new protobuf.Field("timestamp", 1, "uint64"))
  .add(new protobuf.Field("nick", 2, "string"))
  .add(new protobuf.Field("text", 3, "bytes"));

function WakuNetwork() {
  const [waku, setWaku] = React.useState(undefined);
  const [wakuStatus, setWakuStatus] = React.useState("None");
  const [messages, setMessages] = React.useState([]);

  // TODO obtain current context/topic from user's data in local storag
  const ContentTopic = "/toy-chat/2/huilong/proto";
  const decoder = createDecoder(ContentTopic);

  React.useEffect(() => {
    if (wakuStatus !== "None") return;

    setWakuStatus("Starting");

    createLightNode({ defaultBootstrap: true }).then((waku) => {
      waku.start().then(() => {
        setWaku(waku);
        setWakuStatus("Connecting");
      });
    });
  }, [waku, wakuStatus]);

  React.useEffect(() => {
    if (wakuStatus !== "Connected") return;

    (async () => {
      const startTime = new Date();
      // 7 days/week, 24 hours/day, 60min/hour, 60secs/min, 100ms/sec
      startTime.setTime(startTime.getTime() - 7 * 24 * 60 * 60 * 1000);

      try {
        for await (const messagesPromises of waku.store.queryGenerator(
          [decoder],
          {
            timeFilter: { startTime, endTime: new Date() },
            pageDirection: "forward",
          },
        )) {
          const messages = await Promise.all(
            messagesPromises.map(async (p) => {
              const msg = await p;
              return decodeMessage(msg);
            }),
          );

          setMessages((currentMessages) => {
            return currentMessages.concat(messages.filter(Boolean).reverse());
          });
        }
      } catch (e) {
        console.log("Failed to retrieve messages", e);
        setWakuStatus("Error Encountered");
      }
    })();
  }, [waku, wakuStatus]);

  return (
    <div className="App">
      <header className="App-header">
        <h2>{wakuStatus}</h2>
        <h3>Messages</h3>
        <ul>
          <Messages messages={messages} />
        </ul>
      </header>
    </div>
  );
}

function decodeMessage(wakuMessage) {
  if (!wakuMessage.payload) return;

  const { timestamp, nick, text } = ProtoChatMessage.decode(
    wakuMessage.payload,
  );

  if (!timestamp || !text || !nick) return;

  const time = new Date();
  time.setTime(Number(timestamp));

  const utf8Text = bytesToUtf8(text);

  return {
    text: utf8Text,
    timestamp: time,
    nick,
    timestampInt: wakuMessage.timestamp,
  };
}

function Messages(props) {
  return props.messages.map(({ text, timestamp, nick, timestampInt }) => {
    return (
      <li key={timestampInt}>
        ({formatDate(timestamp)}) {nick}: {text}
      </li>
    );
  });
}

function formatDate(timestamp) {
  return timestamp.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

*/
