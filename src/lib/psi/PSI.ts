/*
psi.encrypt_interests(userID, interests[userID]) -> encryptedInterests[userID]
*/

export function nonpsi_intersection(
  myInterests: string[],
  otherInterests: string[],
): Set<string> {
  const myInterestsSet = new Set(myInterests);
  const otherInterestsSet = new Set(otherInterests);
  return new Set([...myInterestsSet].filter((x) => otherInterestsSet.has(x)));
}

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
