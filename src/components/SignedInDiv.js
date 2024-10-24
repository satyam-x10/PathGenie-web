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
          const fetchedUser = await getUser(
            user.emailAddresses[0].emailAddress,
          );
          console.log("fetchedUser:", fetchedUser);
          
          setUserData(fetchedUser);

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
      <header className="bg-gray-800 p-3 sm:p-4 shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 mb-3 sm:mb-0">
            Your Record History
          </h1>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Free Version
            </div>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8",
                },
              }}
            />
            {user && (
              <span className="text-sm font-medium text-white hidden sm:inline-block">
                {user.firstName}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 flex-grow">
        {topics.length > 0 ? (
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {topics.map((topic, index) => (
              <div
                key={index}
                onClick={() => window.location.replace(`/minimap/${topic.id}`)}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-1 px-2 sm:p-2 hover:bg-gradient-to-r from-blue-600 to-blue-800">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                    {topic?.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 text-base sm:text-lg">
              No topics found.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SignedInDiv;
