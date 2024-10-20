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
        `Tell me a brief idea in less than 100 words on: ${topicName}`,
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
    <div className="w-full md:w-2/5 p-4 flex justify-center items-center border-l border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <div className="w-full max-w-md space-y-8 text-center text-white">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            {topicName}
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader className="w-8 h-8 animate-spin text-blue-400" />
          </div>
        ) : (
          miniDescription && (
            <p className="text-lg mb-8 p-4 bg-gray-800 rounded-lg shadow-inner">
              {miniDescription}
            </p>
          )
        )}

        <button
          onClick={fetchDescription}
          className={`w-full ${
            isFetched
              ? "bg-gradient-to-r from-green-500 to-teal-600"
              : "bg-gradient-to-r from-blue-500 to-purple-600"
          } hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out flex items-center justify-center space-x-2`}
        >
          <span>{isFetched ? "Fetch Again" : "Fetch Brief Description"}</span>
        </button>

        <div className="flex items-center space-x-2 mt-4">
          <input
            type="text"
            value={userQuery}
            onChange={handleUserQuery}
            placeholder={`Learn more on ${topicName}? Explain How?`}
            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
          />
          <button
            onClick={handleLearnMore}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImproviseChat;
