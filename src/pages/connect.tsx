import Header from "@/components/header";
import { nonpsi_intersection } from "@/lib/psi/PSI";
import { getStoredProfile } from "@/lib/userUtils";
import { getExistingUserData, subscribeToUserData } from "@/lib/wakunet/waku";
import {
  PUserDataMessage,
  UserDataMessage,
  UserProfile,
} from "@/types/alltypes";
import { DecodedMessage, LightNode } from "@waku/sdk";
import { useEffect, useState } from "react";

const CardList = ({
  pastUserData,
  intersections,
}: {
  pastUserData: UserDataMessage[];
  intersections: { [id: string]: string[] };
}) => {
  const cards = pastUserData
    .map(({ id, name, interests, img }) => ({
      id,
      title: name,
      interests: intersections[id] || [],
      image: img,
    }))
    .filter(({ interests }) => interests.length > 0)
    .sort((a, b) => b.interests.length - a.interests.length);

  if (cards.length === 0) {
    return (
      <div className="mt-10 flex h-full items-center justify-center">
        <p>No other users found matching your interests.</p>
      </div>
    );
  }
  return (
    <div className="p-4">
      {cards.map(({ id, title, interests }) => (
        <div key={id} className="mb-4 rounded-lg bg-white shadow-md">
          <div className="p-4">
            <h2 className="mb-2 text-xl font-bold">{title}</h2>
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-gray-300"></div>
              <div className="ml-2 flex">
                {interests.map((interest, index) => (
                  <span
                    key={interest + index}
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

const ConnectPage = ({ wakuNode }: { wakuNode: LightNode }) => {
  const [profile, setProfile] = useState<UserProfile>(getStoredProfile());

  const [usersData, setUsersData] = useState<UserDataMessage[]>([]);
  const [intersections, setIntersections] = useState<{
    [id: string]: string[];
  }>({});

  const processReceivedUserData = (userData: UserDataMessage) => {
    console.log("Connect: Received user data!", userData);
    try {
      setUsersData((prevData) => {
        const isUnique = !prevData.some((data) => data.id === userData.id);
        console.log("Is the received user data unique?", isUnique);
        if (isUnique && userData.id !== profile.id) {
          const commonInterests = nonpsi_intersection(
            profile.interests,
            userData.interests,
          );
          console.log("Common interests found:", commonInterests);
          setIntersections((prevIntersections) => ({
            ...prevIntersections,
            [userData.id]: [...commonInterests],
          }));
          const updatedUserData = {
            ...userData,
            commonInterests: [...commonInterests],
          };
          console.log("Updated user data:", updatedUserData);
          return [...prevData, updatedUserData];
        } else {
          return prevData;
        }
      });
    } catch (error) {
      console.error("Error processing received user data:", error);
    }
  };

  console.log("intersections", intersections);

  useEffect(() => {
    if (!wakuNode) return;
    const obtainingUserData = async () => {
      console.log("Connect: Listening for user data!");
      await getExistingUserData(wakuNode, processReceivedUserData);
      await subscribeToUserData(wakuNode, processReceivedUserData);
    };
    obtainingUserData();
  }, [wakuNode]);

  if (!usersData) {
    return <div>Loading user data...</div>;
  }
  return (
    <>
      <Header></Header>
      <main className="flex min-h-[calc(100vh-64px)] w-full flex-col px-8 py-20">
        <CardList pastUserData={usersData} intersections={intersections} />
      </main>
    </>
  );
};

export default ConnectPage;
