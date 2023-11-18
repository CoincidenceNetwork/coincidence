import Header from "@/components/header";
import { createNode, getPastMessages } from "@/lib/wakunet/waku";
import { PUserDataMessage, UserDataMessage } from "@/types/alltypes";
import { DecodedMessage, LightNode } from "@waku/sdk";
import { useEffect, useState } from "react";

const CardList = ({ pastUserData }) => {
  const cards = pastUserData || [];
  //   {
  //     id: 1,
  //     title: "Card 1",
  //     interests: ["Waku", "Public Good"],
  //     image: "https://dummyimage.com/200x200",
  //   },
  //   {
  //     id: 2,
  //     title: "Card 2",
  //     interests: ["Network State"],
  //     image: "https://dummyimage.com/200x200",
  //   },
  //   {
  //     id: 3,
  //     title: "Card 3",
  //     interests: ["Ethereum Attestation Service", "Public Good"],
  //     image: "https://dummyimage.com/200x200",
  //   },
  //   {
  //     id: 4,
  //     title: "Card 4",
  //     interests: ["Waku", "Public Good", "Network State"],
  //     image: "https://dummyimage.com/200x200",
  //   },
  //   {
  //     id: 5,
  //     title: "Card 5",
  //     interests: ["Waku", "Ethereum Attestation Service"],
  //     image: "https://dummyimage.com/200x200",
  //   },
  // ];

  return (
    <div className="p-4">
      {cards.map((card) => (
        <div key={card.id} className="mb-4 rounded-lg bg-white shadow-md">
          <div className="p-4">
            <h2 className="mb-2 text-xl font-bold">{card.title}</h2>
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-gray-300"></div>
              <div className="ml-2 flex">
                {card.interests.map((interest) => (
                  <span
                    key={interest}
                    className="mr-2 rounded bg-gray-200 px-2 py-1 text-sm text-gray-800"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ConnectPage = ({ wakuNode }) => {
  // const context = localStorage.getItem("context");

  // const processReceivedUserData = async (userDataMessage: DecodedMessage) => {
  //   if (!userDataMessage.payload) return;
  //   const userDataObj = PUserDataMessage.decode(userDataMessage.payload);
  //   console.log("userDataMessageObj", userDataObj);
  // };

  // // Run only once, after the waku network is ready.
  // useEffect(() => {
  //   if (!wakuNode) return;
  //   const subscribeToUserData = async () => {
  //     console.log("Connect: Listening for user data!");
  //     await retrieveExistingUserData(wakuNode, processReceivedUserData);
  //     await subscribeToUserData(wakuNode, processReceivedUserData);
  //   };
  //   subscribeToUserData();
  // }, [wakuNode]);

  // useEffect run only on load. we fegtch all the past data we receive all users data
  // we save lfetch past past data in useState.

  const [pastUserData, setPastUserData] = useState<any[]>(null);

  useEffect(() => {
    const fetchPastUserData = async () => {
      const pastUserData = await getPastMessages(wakuNode);
      setPastUserData(pastUserData);
      console.log("Past user data:", pastUserData);
    };
    fetchPastUserData();
  }, []);

  return (
    <>
      <Header></Header>
      <main className="flex min-h-[calc(100vh-64px)] w-full flex-col px-8 py-20">
        <CardList pastUserData={pastUserData} />
      </main>
    </>
  );
};

export default ConnectPage;
