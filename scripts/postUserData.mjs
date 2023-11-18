import { createNode, postUserData, stopNode } from "../src/lib/wakunet/waku.js";
import crypto from "crypto";

const funnyNames = [
  "Ben Dover",
  "Anita Bath",
  "Dusty Rhodes",
  "Justin Case",
  "Amanda Hugginkiss",
  "Hugh Jass",
  "Ivana Tinkle",
  "Al Coholic",
  "Mike Rotch",
  "Seymour Butts",
];

const interests = [
  "Coding",
  "Hiking",
  "Reading",
  "Music",
  "Traveling",
  "Photography",
  "Art",
  "Fitness",
  "Gaming",
  "Cooking",
];

function userDataGenerator() {
  const profileData = {
    name: funnyNames[Math.floor(Math.random() * funnyNames.length)],
    context: "ETH Global Istanbul 2023",
    bio: crypto.randomBytes(20).toString("hex"),
    img: crypto.randomBytes(30).toString("hex"),
    interests: Array(3)
      .fill()
      .map(() => interests[Math.floor(Math.random() * interests.length)]),
  };
  const hash = crypto.createHash("sha256");
  hash.update(JSON.stringify(profileData));
  profileData.id = hash.digest("hex");

  return profileData;
}

const node = await createNode();
const userData = userDataGenerator();
await postUserData(node, userData);
await stopNode(node);
