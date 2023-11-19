
import { UserProfile } from "@/types/alltypes";
import crypto from "crypto";

export function userDataConformance(profile: UserProfile) {
    profile.id = computeUserID(profile);
    return profile;
  }

export function computeUserID(profile: UserProfile) {
    const hash = crypto.createHash("sha256");
    hash.update(JSON.stringify(profile));
    return hash.digest("hex");
  }