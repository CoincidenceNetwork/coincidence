# Private Set Intersection

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

## LessWrong Nov 2023 new matchmaking feature

https://www.lesswrong.com/posts/d65Ax6vbNgztBE8cy/new-lesswrong-feature-dialogue-matching

## simple formalization

## extra notes

## N-party PSI with Zero-Knowledge Proofs

```python
import random
import hashlib
from zkplib import ZKPExponentiationProof

def hash(input):
    return int(hashlib.sha256(str(input).encode('utf-8')).hexdigest(), 16)

def random_exponent():
    return random.randint(1, 2**256)

def exponentiate(value, exponent):
    return pow(value, exponent)

def user_psi_set(user_set):
    exp = random_exponent()
    hashed_set_exp = {item: exponentiate(hash(item), exp) for item in user_set}
    return exp, hashed_set_exp

def generate_zkp_exponentiation(set_elements, exponent):
    return {element: ZKPExponentiationProof.create(hash(element), exponent) for element in set_elements}

def verify_zkp_exponentiation(proofs, hashed_exponentiated_sets):
    return all(ZKPExponentiationProof.verify(hashed_exponentiated_sets[user][element], proofs[user][element])
               for user in proofs for element in proofs[user])

def compute_intersections(local_hashed_set_exp, other_users_hashed_sets, local_exp, other_users_exps):
    intersections = {user: set() for user in other_users_hashed_sets}
    for user, other_user_hashed_set in other_users_hashed_sets.items():
        for local_element, local_val in local_hashed_set_exp.items():
            for other_element, other_val in other_user_hashed_set.items():
                if exponentiate(local_val, other_users_exps[user]) == exponentiate(other_val, local_exp):
                    intersections[user].add(local_element)
    return intersections

def main():
    local_user_set = {'local1', 'local2', 'local3'}
    other_users_sets = {
        'user1': {'user1_item1', 'user1_item2', 'local1'},
        'user2': {'user2_item1', 'local2', 'local3'},
        # ... add as many users as needed
    }

    local_exp, local_hashed_set_exp = user_psi_set(local_user_set)
    other_users_hashed_sets = {user: user_psi_set(other_users_sets[user])[1] for user in other_users_sets}
    other_users_exps = {user: user_psi_set(other_users_sets[user])[0] for user in other_users_sets}

    local_zkp = generate_zkp_exponentiation(local_user_set, local_exp)
    other_users_zkps = {user: generate_zkp_exponentiation(other_users_sets[user], other_users_exps[user]) for user in other_users_sets}

    if not verify_zkp_exponentiation({'local': local_zkp}, {'local': local_hashed_set_exp}):
        raise Exception("Local user's ZKP failed")
    if not verify_zkp_exponentiation(other_users_zkps, other_users_hashed_sets):
        raise Exception("One of the other users' ZKP failed")

    all_intersections = compute_intersections(local_hashed_set_exp, other_users_hashed_sets, local_exp, other_users_exps)
    for user, intersection in all_intersections.items():
        print(f"Intersection with {user}:", intersection)

main()

```

## WIP

userA publishes their 'encrypted set of interests' over pubsub
userB obtains the 'encrypted set of interests' from pubsub
userB compute their intersection from userB's 'encrypted set of interests' using PSI
