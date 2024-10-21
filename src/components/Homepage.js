"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for Next.js routing

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Function to navigate to a search result page
  const handleNavigation = () => {
    if (searchQuery.trim()) {
      setIsLoading(true); // Start loading
      setTimeout(() => {
        router.push(`/conversation/${encodeURIComponent(searchQuery)}`);
        setIsLoading(false); // Stop loading after navigation
      }, 1000); // 1-second wait
    }
  };

  // Function to update the search bar with a topic
  const handleTopicClick = (topic) => {
    setSearchQuery(topic);
    setIsLoading(true); // Start loading
    setTimeout(() => {
      router.push(`/conversation/${encodeURIComponent(topic)}`);
      setIsLoading(false); // Stop loading after navigation
    }, 1000); // 1-second wait
  };

  // Function to handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNavigation(); // Trigger navigation on Enter key press
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 px-4 md:px-8">
      {/* Container for content */}
      <div className="text-center space-y-8 max-w-full">
        {/* Glowing title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white glow-text">
          Welcome to the Future of AI
        </h1>
        <p className="text-gray-400 text-base md:text-lg">
          Your gateway to advanced AI solutions. Search anything!
        </p>

        {/* Search bar */}
        <div className="relative mx-auto w-full max-w-md md:max-w-lg">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown} // Handle Enter key press
            placeholder="Ask me anything..."
            className="w-full py-2 md:py-3 pl-5 pr-12 rounded-full bg-gray-800 text-white text-sm md:text-lg focus:outline-none focus:ring-4 focus:ring-cyan-400 placeholder-gray-500"
          />
          {/* Show loading spinner or search icon based on isLoading state */}
          {!isLoading ? (
            <button
              className="absolute right-4 top-2 md:top-2.5 text-cyan-400"
              onClick={handleNavigation} // Handle button click
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 md:w-6 md:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m1.7-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          ) : (
            <div className="absolute right-4 top-2 md:top-2.5">
              <svg
                className="animate-spin h-5 w-5 md:h-6 md:w-6 text-cyan-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Topic buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {[
            "AI in Healthcare",
            "Machine Learning",
            "Blockchain",
            "Cybersecurity",
            "Natural Language Processing",
          ].map((topic, index) => (
            <button
              key={index}
              onClick={() => handleTopicClick(topic)} // Navigate with pre-selected topic
              className="bg-gray-800 text-white px-3 py-2 rounded-full text-xs md:text-base hover:bg-gray-600 focus:outline-none"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
