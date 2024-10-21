"use client";
import React, { useState } from "react";
import { askFromGemini } from "../blackbox/gemini";
import { ArrowRight, Loader } from "lucide-react";
import { getNestedTopics } from "../blackbox/resource";
const ImproviseChat = ({ node }) => {
  console.log("ImproviseChat node:", node);

  const [topicName, setTopicName] = useState(node.data.label);
  const [miniDescription, setMiniDescription] = useState("");
  const [userQuery, setUserQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [improviseCommand, setImproviseCommands] = useState(
    "I want to learn picking and strumming in detail. ",
  );
  const [improvisingData, setImprovisingData] = useState();
  const fetchDescription = async () => {
    setIsLoading(true);
    try {
      const res = await askFromGemini(
        `Tell me a brief idea in less than 70 words on: ${topicName}`,
      );
      setMiniDescription(
        res?.response?.text() || "Failed to fetch description.",
      );
      setIsFetched(true); // Update button text after first fetch
    } catch (error) {
      console.error("Error fetching description:", error);
      setMiniDescription("An error occurred while fetching the description.");
    }
    setIsLoading(false);
  };

  const handleUserQuery = (e) => {
    setUserQuery(e.target.value);
  };

  const handleLearnMore = async () => {
    setImproviseCommands(improviseCommand + userQuery);
    const response = await getNestedTopics(improviseCommand);
    setImprovisingData(response);
    // console.log(response);
  };

  return (

    <div className="relative min-h-screen  w-full md:w-2/5 p-4 md:p-6 flex justify-center items-center border-l border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 min-h-[100dvh]">
      {/* Premium Button - Responsive positioning and sizing */}
      <button
        className="fixed absolute top-4 md:absolute top-4 md:top-6 right-4 md:right-6 
          bg-gradient-to-r from-blue-500 to-purple-600 
          hover:from-blue-600 hover:to-purple-700 
          text-white text-sm md:text-base font-semibold
          py-2 px-3 md:py-2.5 md:px-4 rounded-lg 
          transition duration-300 ease-in-out 
          flex items-center gap-2 shadow-lg
          hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Get Premium to explore more
      </button>

      <div className="w-full max-w-sm md:max-w-md space-y-6 md:space-y-8 text-center text-white mt-16 md:mt-0">
        {/* Topic Title - Responsive text size */}
        <div className="flex items-center justify-center space-x-2 mb-4 md:mb-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 px-4">
            {topicName}
          </h2>
        </div>

        {/* Loading State or Description */}
        {isLoading ? (
          <div className="flex justify-center items-center p-4">
            <Loader className="w-6 h-6 md:w-8 md:h-8 animate-spin text-blue-400" />
          </div>
        ) : (
          miniDescription && (
            <p className="text-sm md:text-lg mb-6 md:mb-8 p-4 bg-gray-800/50 
              backdrop-blur-sm rounded-lg shadow-inner
              border border-gray-700/50">
              {miniDescription}
            </p>
          )
        )}

        {/* Fetch Description Button - Responsive sizing */}
        <button
          onClick={fetchDescription}
          className={`w-full ${isFetched
            ? "bg-gradient-to-r from-green-500 to-teal-600"
            : "bg-gradient-to-r from-blue-500 to-purple-600"
            } hover:from-blue-600 hover:to-purple-700 
          text-white font-semibold
          text-sm md:text-base
          py-2.5 md:py-3 px-4 md:px-6 
          rounded-lg transition duration-300 ease-in-out 
          flex items-center justify-center gap-2
          shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
        >
          <span>{isFetched ? "Fetch Again" : "Fetch Brief Description"}</span>
        </button>

        {/* Query Input Section - Responsive layout */}
        <div className="flex items-center gap-2 mt-4 md:mt-6">
          <div className="relative flex-1">
            <input
              type="text"
              value={userQuery}
              onChange={handleUserQuery}
              placeholder={`Learn more on ${topicName}? Explain How?`}
              className="w-full p-2.5 md:p-3 
                bg-gray-800/50 text-white 
                text-sm md:text-base
                border border-gray-600 rounded-lg 
                placeholder-gray-400
                focus:ring-2 focus:ring-blue-400 focus:border-transparent 
                transition duration-300 ease-in-out
                backdrop-blur-sm"
            />
          </div>

          <button
            onClick={handleLearnMore}
            className="bg-gradient-to-r from-blue-500 to-purple-600 
              hover:from-blue-600 hover:to-purple-700 
              text-white font-bold
              p-2.5 md:p-3
              rounded-lg transition duration-300 ease-in-out 
              flex items-center justify-center
              shadow-lg hover:shadow-xl 
              transform hover:-translate-y-0.5"
            aria-label="Learn More"
          >
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};


export default ImproviseChat;
