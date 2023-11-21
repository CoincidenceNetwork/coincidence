import Header from "@/components/header";

const LearnPage = () => {
  return (
    <>
      <Header></Header>
      <main className="flex w-full flex-col px-8 py-4">
        <h2 className="mb-4 text-2xl font-bold">What is Coincidence?</h2>
        <p className="my-1 text-lg">
          Most match-making apps focus on dating, limiting other social
          interactions. They often misuse user data, compromising privacy and
          safety. Additionally, connecting over shared interests or finding
          projects can be challenging and time-consuming. This reveals a gap:
          the need for a platform that enables safe, interest-based connections,
          free from the typical privacy concerns, and what’s culturally
          associated with match-making apps. Coincidence is a peer-to-peer
          platform for connecting people with common interests and goals. It
          prioritizes security and privacy, ensuring users' data is safe with
          advanced encryption. How to get started -Create profile -Add your
          interests -Coincide with people sharing your interests -Chat with your
          new friends!
        </p>
        <h2 className="my-4 text-2xl font-bold">How it's Made</h2>
        <p className="my-1 text-lg">
          Coincidence is powered by Waku, a suite of communication protocols
          designed for privacy-focused messaging in Web3 applications​​. It's a
          general solution for ephemeral messaging that supports peer-to-peer
          interactions and is built to work even in resource-constrained
          environments​​. Waku’s protocol facilitates decentralized
          communication systems such as Coincidence, provides storage for
          offline devices, bandwidth-efficient protocols, and spam prevention
          measures​​. The protocol uses a publish/subscribe architecture, and
          includes additional protocols for functionalities such as encrypted
          communication, preserving bandwidth, and economic spam protection. To
          verify the intersection between the interests of users, Coincidence
          uses attestations, enhancing privacy and trust. Attestations are a
          mechanism where users prove they have certain interests without
          revealing any additional information. This way, Coincidence ensures
          that connections are based on genuine commonalities while safeguarding
          personal data.
        </p>
        <p className="my-3 text-lg font-bold">Stay tuned for more updates!</p>
      </main>
    </>
  );
};

export default LearnPage;
