"use client";
import React, { useState, useEffect, useRef } from "react";
import { generatePrompt, getRootDataFromGemini } from "@/blackbox/prompt";
import { getNestedTopics } from "@/blackbox/resource";
import { saveExtractedTopicsInTreeAndRoots } from "@/utils/actions/topicAction";
import { useUser } from "@clerk/nextjs";

const ConversationPage = ({ params }) => {
  const { user } = useUser();
  const conversation = params?.conversation;
  const [masterPrompt, setMasterPrompt] = useState("");
  const [planGenerated, setPlanGenerated] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can you elaborate what you want to learn, so that we have a good idea?",
      isUser: false,
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false); // Track input disabled state
  const [hierarchicalTasks, setHierarchicalTasks] = useState(null); // Use useState for hierarchicalTasks
  const messageEndRef = useRef(null);

  // Scroll to the bottom of the chat whenever a new message is added
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to handle user input submission
  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    // Add user's message to chat
    const newMessages = [...messages, { text: userInput, isUser: true }];
    setMessages(newMessages);
    setUserInput(""); // Reset input field

    try {
      // Call the Gemini API for AI response and await the result
      const aiResponse = await generatePrompt(
        `${userInput} regarding ${conversation}`,
      ); // Ensure you await the promise

      // Ensure the response is a string before updating the messages
      setMasterPrompt(aiResponse);
      setInputDisabled(true); // Disable the input field once the AI responds

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: aiResponse, isUser: false },
      ]);

      // Generate the hierarchical tasks
      const tasks = await getNestedTopics(aiResponse);
      // console.log('tasks:', tasks);

      setHierarchicalTasks(tasks); // Set the hierarchical tasks using useState
      const rootData= await getRootDataFromGemini(decodeURIComponent(conversation).slice(0, 70));
      
      await saveExtractedTopicsInTreeAndRoots(
        tasks,
        user?.emailAddresses[0]?.emailAddress,
        rootData
      ); 

    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Sorry, I couldn't fetch a response. Please try again.",
          isUser: false,
        },
      ]);
    }
  };

  // Handle 'Enter' key press to send message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      {/* Chat container */}
      <div className="w-full h-full flex flex-col p-4 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <h1 className="text-xl sm:text-2xl font-bold mr-4 text-center sm:text-left">
            Let's clarify what exactly you want to learn about?
          </h1>
          <h1 className="w-full sm:max-w-1/2 border p-1 px-2 bg-gradient-to-r from-blue-400 to-pink-400 rounded-xl font-bold text-gray-800 text-center sm:text-left">
            {decodeURIComponent(conversation).slice(0, 70)}
          </h1>
        </div>

        <div className="flex-1 min-h-[70vh] overflow-y-auto bg-gray-800 p-4 sm:p-2 rounded-lg shadow-lg space-y-4 hide-scrollbar">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`p-3 rounded-lg max-w-full sm:max-w-md ${message.isUser
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-700 text-gray-200"
                  }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        {/* Input section */}
        <div className="flex items-center w-full px-2 sm:px-4">
          {/* Conditional Input or Plan Message */}
          {inputDisabled ? (
            <div className="flex-1 py-3 px-2 sm:px-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center">
              {planGenerated ? (
                <p className="text-sm sm:text-lg">The plan's ready for you.</p>
              ) : (
                <p className="text-sm sm:text-lg">
                  We are Cooking... This may take a few seconds.
                </p>
              )}
            </div>
          ) : (
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 py-3 px-2 sm:px-4 rounded-full bg-gray-800 text-white text-sm sm:text-lg focus:outline-none focus:ring-4 focus:ring-cyan-400 placeholder-gray-500"
            />
          )}

          {/* Button for Sending Messages */}
          <button
            onClick={handleSendMessage}
            className={`ml-2 sm:ml-4 p-3 rounded-full shadow-lg ${!masterPrompt
                ? "bg-gray-500 hover:bg-gray-400"
                : planGenerated
                  ? "bg-pink-600 hover:bg-pink-500"
                  : "bg-gradient-to-r from-purple-500 to-purple-300 hover:bg-gradient-to-r"
              }`}
          >
            {/* Button Content Conditional Based on State */}
            {masterPrompt ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 10.5l-6.5-6.5m0 0l-6.5 6.5M14.5 4v16m0-16v0"
                />
              </svg>
            ) : planGenerated ? (
              <div
                onClick={async () => {
                  setPlanGenerated(false);

                  // setTimeout(() => {
                  //   setPlanGenerated(true);
                  //   window.location.href = `/profile`;
                  // }, 1000);

                  await saveExtractedTopicsInTreeAndRoots(
                    hierarchicalTasks,
                    user?.emailAddresses[0]?.emailAddress,
                    rootData
                  ); 
                  
                  

                  setPlanGenerated(false);
                }}
              >
                Lets Dive In
              </div>
            ) : (
              <div className="animate-spin w-5 h-5 sm:w-6 sm:h-6 border-4 border-t-4 border-t-white border-gray-600 rounded-full"></div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
