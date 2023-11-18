/*
psi.encrypt_interests(userID, interests[userID]) -> encryptedInterests[userID]

*/

class PrivateSetIntersection {}

class NonPrivateSetIntersection {
  private interests: Map<string, Set<string>>;

  constructor() {
    this.interests = new Map<string, Set<string>>();
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

export { NonPrivateSetIntersection, PrivateSetIntersection };

/*
  testing simple PSI flow

  test1
  userA: {x,y,z,3}
  userB: {x,y,f,3}
  expected result:
  intersectionAB: {x,y,3}

  test2
  userA: {x,y,1,2}
  userB: {x,y,4,2}
  userC: {x,y,4,3}
  expected result:
  intersectionAB: {x,y,2}
  intersectionBC: {x,y,4}
  intersectionAC: {x,y}

  simple PSI interface/flow:
  create_myself() -> me
  get_interests(userID) -> interests[userID]
  me.intersection(userID, interests[userID]) -> intersection[userID]
*/
