import React, { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";

// Separate component for rendering individual tab items
const Tab = ({ title, isActive, onClick }) => (
    <span
      className={`text-white cursor-pointer border p-2 rounded-lg ${isActive ? "text-pink-700" : ""} bg-gradient-to-r from-[#111827] to-gray-700`}
      onClick={onClick}
    >
      {title}
    </span>
  );
  

const SignedInDiv = () => {
  const { user } = useUser(); // Get the user data
  const [selectedSection, setSelectedSection] = useState("My Charts"); // Default selected section

  // Hardcoded content for each section
  const content = {
    "My Charts": "This is the content for My Charts.",
    "My Tasks": "This is the content for My Tasks.",
    "History": "This is the content for History.",
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#111827]">
      <div className="flex justify-between items-center p-4 bg-transparent">
        <div className="flex space-x-4">
          {/* Render tabs using a loop */}
          {Object.keys(content).map((section) => (
            <Tab
              key={section}
              title={section}
              isActive={selectedSection === section}
              onClick={() => setSelectedSection(section)}
            />
          ))}
        </div>
        <div className="flex items-center">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10",
              },
            }}
          />
          {user && (
            <span className="ml-2 text-m font-semibold text-white">
              {user.firstName}
            </span>
          )}
        </div>
      </div>
      <div className="flex-1 bg-transparent p-4">
        {/* Placeholder Box */}
        <div className="h-full border-2 border-dashed border-gray-400 flex items-center justify-center bg-[#111827] bg-opacity-50">
          <span className="text-gray-500">{content[selectedSection]}</span>
        </div>
      </div>
    </div>
  );
};

export default SignedInDiv;
