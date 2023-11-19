import { createNode, postUserData, stopNode } from "../src/lib/wakunet/waku.js";
import crypto from "crypto";

const persons = [
  { name: "Tatarko Atishurko", interests: ["a", "b", "Public goods"] },
  { name: "Techno Blaklavha", interests: ["c", "d", "Waku"] },
  { name: "Mataito Bibito", interests: ["Waku", "Public goods", "12312"] },
];

function userDataGenerator(name, interests) {
  const profileData = {
    name: name,
    context: "ETH Global Istanbul 2023",
    bio: crypto.randomBytes(20).toString("hex"),
    img: crypto.randomBytes(30).toString("hex"),
    interests: interests,
  };
  const hash = crypto.createHash("sha256");
  hash.update(JSON.stringify(profileData));
  profileData.id = hash.digest("hex");
  return profileData;
}

const node = await createNode();
const userData = userDataGenerator();
for (let i = 0; i < persons.length; i++) {
  await postUserData(
    node,
    userDataGenerator(persons[i].name, persons[i].interests),
  );
}
await stopNode(node);
