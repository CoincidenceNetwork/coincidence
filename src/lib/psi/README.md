```
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
```

---

## varia

basic implementation in rust and libp2p

we expect our situation to be thousands of people, with avg of hundreds items per person

## Decentralized Thoughts article (2020)

https://decentralizedthoughts.github.io/2020-03-29-private-set-intersection-a-soft-introduction/

_motivations_

- Contact discovery (see [this](https://eprint.iacr.org/2018/579.pdf) and references within)
- Remote diagnostic (see [this](https://www.cs.cornell.edu/~shmat/shmat_ccs07.pdf))
- Record linkage (see [this](https://arxiv.org/pdf/1702.00535.pdf))
- Measuring the effectiveness of online advertising (see [this](https://eprint.iacr.org/2017/738.pdf))

## Private set intersection: A systematic literature review (2023)

https://www.sciencedirect.com/science/article/pii/S1574013723000345

Authorized-PSI (A-PSI), there has to be a previous authorization phase (TTP signature) for the elements of the set

## NIST: \***\*A Brief Overview of Private Set Intersection (2021)\*\***

https://csrc.nist.gov/presentations/2021/stppa2-psi

## Wikipedia article

https://en.wikipedia.org/wiki/Private_set_intersection

- Apple uses this technique in Password Monitoring.[[4]](https://en.wikipedia.org/wiki/Private_set_intersection#cite_note-4) It has proposed using the technology for its announced Expanded Protections for Children [[5]](https://en.wikipedia.org/wiki/Private_set_intersection#cite_note-5)
- traditional vs delegated
- a variant of PSI protocol (in both traditional and delegated categories) that support data update, e.g., [[9]](https://en.wikipedia.org/wiki/Private_set_intersection#cite_note-9), [[10]](https://en.wikipedia.org/wiki/Private_set_intersection#cite_note-10).
  - Abadi, Aydin; Dong, Changyu; Murdoch, Steven J; Terzis, Sotirios (2022). ["Multi-party Updatable Delegated Private Set Intersection"](https://fc22.ifca.ai/preproceedings/68.pdf) (PDF). *International Conference on Financial Cryptography and Data Security'22: Proceedings*.
  - Badrinarayanan, Saikrishna; Miao, Peihan; Xie, Tiancheng (2022). ["Updatable Private Set Intersection"](https://petsymposium.org/2022/files/papers/issue2/popets-2022-0051.pdf) (PDF). *Privacy Enhancing Technologies'22:Proceedings*. **2022** (2): 378–406. [doi](<https://en.wikipedia.org/wiki/Doi_(identifier)>):[10.2478/popets-2022-0051](https://doi.org/10.2478%2Fpopets-2022-0051). [S2CID](<https://en.wikipedia.org/wiki/S2CID_(identifier)>) [239000070](https://api.semanticscholar.org/CorpusID:239000070).

## \***\*Arke: Scalable and Byzantine Fault Tolerant Privacy-Preserving Contact Discovery\*\***

https://eprint.iacr.org/2023/1218

## \***\*Malicious Secure, Structure-Aware Private Set Intersection\*\***

https://eprint.iacr.org/2023/1166

## Notes from GPT

Secure Function Evaluation

Diffie-Hellman key exchange mechanism

the use of a hash function as a random oracle

## specifically for the Coincidence scenario

> thousands of people, with avg of hundreds items per person, where each participant perform PSI with every other participant.

malicious

## \***\*Outsourced private set intersection using homomorphic encryption\*\***

https://dl.acm.org/doi/10.1145/2414456.2414506

## **Improved Private Set Intersection for Sets with Small Entries**

https://link.springer.com/chapter/10.1007/978-3-031-31371-4_7

https://chat.openai.com/c/ca8818ef-3fdb-4282-9dd9-47114ba8fdbe

## \***\*Fruity Friends\*\***

https://devfolio.co/projects/fruity-friends-ef88

they worked on a ‘subset’ of the problem

## General notes

malicious

influential publications in the space

## computing over the intersection
