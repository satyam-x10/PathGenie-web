import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { getUser } from "@/utils/actions/userAction";
import { getChainById } from "@/utils/actions/topicAction";
import { Loader2 } from "lucide-react";

const SignedInDiv = () => {

  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const fetchedUser = await getUser(user.emailAddresses[0].emailAddress);
          setUserData(fetchedUser);

          if (fetchedUser?.rootTopics) {
            const topicsData = await Promise.all(
              fetchedUser.rootTopics.map(async (topicId) => {
                try {
                  const topic = await getChainById(topicId);
                  return topic;
                } catch (err) {
                  console.error(`Failed to fetch topic with id ${topicId}`, err);
                  return null;
                }
              })
            );

            setTopics(topicsData.filter((topic) => topic !== null));
            console.log(topicsData);


          }
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Failed to load user data. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-gray-900">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-screen bg-gray-900 space-y-6">
        <div className="flex items-center space-x-4">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10",
              },
            }}
          />
          {user && (
            <span className="text-sm font-medium text-white">
              {user.firstName}
            </span>
          )}
        </div>
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-900">
      <header className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
            Your Record History
          </h1>

          <div className="flex items-center space-x-4">
            {/* add  a premium status button */}
            <div className="bg-gray-700 text-white px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-pink-500">
              You are currently on Premium Version
            </div>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10",
                },
              }}
            />
            {user && (
              <span className="text-sm font-medium text-white">
                {user.firstName}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 ">

        {topics.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4  ">
            {topics.map((topic, index) => (
              <div
                key={index}
                onClick={() => window.location.replace(`/minimap/${topic._id}`)}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl cursor-pointer transition-shadow duration-300"
              >
                <div className="p-4 hover:bg-gradient-to-r from-blue-500 to-blue-800">
                  <h3 className="text-xl font-semibold text-white">
                    {topic?.name}
                  </h3>
                  <p className="text-gray-400">{topic?.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No topics found.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SignedInDiv;
