// TBD
export default class PrivateSetIntersection {
  private interests: Map<string, Set<string>>;

  constructor() {
    this.interests = new Map<string, Set<string>>();
  }

  create_myself(): PrivateSetIntersection {
    return new PrivateSetIntersection();
  }

  add_interests(userID: string, userInterests: string[]): void {
    this.interests.set(userID, new Set(userInterests));
  }

  get_interests(userID: string): Set<string> | undefined {
    return this.interests.get(userID);
  }

  intersection(userID: string, otherInterests: string[]): Set<string> {
    const myInterests = this.get_interests(userID);
    if (!myInterests) {
      return new Set();
    }

    const otherInterestsSet = new Set(otherInterests);
    return new Set([...myInterests].filter((x) => otherInterestsSet.has(x)));
  }
}
