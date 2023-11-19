import { UserProfile } from "@/types/alltypes";
import crypto from "crypto";

export function userDataConformance(userValues): UserProfile {
  const profile: UserProfile = {
    id: computeUserID(userValues),
    name: userValues.name,
    bio: userValues.bio,
    img: userValues.img,
    interests: userValues.interests,
    context: userValues.context,
  };
  return profile;
}

export function computeUserID(profile: UserProfile) {
  const hash = crypto.createHash("sha256");
  hash.update(JSON.stringify(profile));
  return hash.digest("hex");
}

export function getStoredProfile() {
  const storedProfile = localStorage.getItem("userProfile");
  return storedProfile
    ? (JSON.parse(storedProfile) as UserProfile)
    : {
        id: "",
        name: "",
        bio: "",
        img: "",
        interests: [],
        context: "",
      };
}
