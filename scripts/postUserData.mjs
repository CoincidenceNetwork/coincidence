import { createNode, postUserData, stopNode } from "../src/lib/wakunet/waku.js";
import crypto from "crypto";

function userDataGenerator() {
  const profileData = {
    id: crypto.randomBytes(10).toString("hex"),
    name: crypto.randomBytes(10).toString("hex"),
    bio: crypto.randomBytes(20).toString("hex"),
    img: crypto.randomBytes(30).toString("hex"),
    context: crypto.randomBytes(10).toString("hex"),
    interests: [crypto.randomBytes(10).toString("hex")],
  };
  return profileData;
}

const node = await createNode();
const userData = userDataGenerator();
await postUserData(node, userData);
await stopNode(node);
