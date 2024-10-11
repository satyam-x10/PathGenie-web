import React from "react";
import { getResults } from "@/utils/getResults";
const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900">
      {/* Container for content */}
      <div className="text-center space-y-8">
        {/* Glowing title */}
        <h1 className="text-6xl font-bold text-white glow-text">
          Welcome to the Future of AI
        </h1>
        <p className="text-gray-400 text-lg">
          Your gateway to advanced AI solutions. Search anything!
        </p>

        {/* Search bar */}
        <div className="relative mx-auto w-full max-w-lg">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="w-full py-3 pl-5 pr-12 rounded-full bg-gray-800 text-white text-lg focus:outline-none focus:ring-4 focus:ring-cyan-400 placeholder-gray-500"
          />
          <button className="absolute right-4 top-2.5 text-cyan-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.7-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
