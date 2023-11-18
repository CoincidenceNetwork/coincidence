import Header from "@/components/header";
import {
  createNode,
  getExistingUserData,
  getPastMessages,
  subscribeToUserData,
} from "@/lib/wakunet/waku";
import { PUserDataMessage, UserDataMessage } from "@/types/alltypes";
import { DecodedMessage, LightNode } from "@waku/sdk";
import { useEffect, useState } from "react";

const CardList = ({ pastUserData }: { pastUserData: UserDataMessage[] }) => {
  const cards = pastUserData.map(({ id, name, interests, img }) => ({
    id,
    title: name,
    interests,
    image: img,
  }));

  return (
    <div className="p-4">
      {cards.map(({ id, title, interests }) => (
        <div key={id} className="mb-4 rounded-lg bg-white shadow-md">
          <div className="p-4">
            <h2 className="mb-2 text-xl font-bold">{title}</h2>
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-gray-300"></div>
              <div className="ml-2 flex">
                {interests.map((interest) => (
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

  const [usersData, setUsersData] = useState<any[]>([]);

  const processReceivedUserData = (userData: DecodedMessage) => {
    try {
      setUsersData((prevData) => {
        const isUnique = !prevData.some((data) => data.id === userData.id);
        if (isUnique) {
          return [...prevData, userData];
        } else {
          return prevData;
        }
      });
    } catch (error) {
      console.error("Error processing received user data:", error);
    }
  };

  useEffect(() => {
    if (!wakuNode) return;
    const obtainingUserData = async () => {
      console.log("Connect: Listening for user data!");
      await getExistingUserData(wakuNode, processReceivedUserData);
      await subscribeToUserData(wakuNode, processReceivedUserData);
    };
    obtainingUserData();
  }, []);

  if (!usersData) {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      <Header></Header>
      <main className="flex min-h-[calc(100vh-64px)] w-full flex-col px-8 py-20">
        <CardList pastUserData={usersData} />
      </main>
    </>
  );
};

export default ConnectPage;
