"use client";
import React, { useEffect } from "react";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import SignedOutDiv from "@/components/SignedOutDiv";
import SignedInDiv from "@/components/SignedInDiv";
import { createUser } from "@/utils/actions/userAction";
import { saveExtractedTopics } from "@/utils/actions/topicAction";

const ProfilePage = () => {
  const { user } = useUser();
  // after every 5 seconf print hello
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log(localStorage.getItem("Treedata"));
    }, 5000);
    return () => clearInterval(interval);
  }
  , []);
  const handleSignedIn = () => {
    try {
      if (user?.emailAddresses[0]?.emailAddress) {
        createUser({ email: user?.emailAddresses[0]?.emailAddress });
      } else {
        console.log("User email not found.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      <SignedIn>
        <SignedInComponent handleSignedIn={handleSignedIn} />
      </SignedIn>
      <button onClick={()=>{saveExtractedTopics([
  {
    "Blockchain": [
      {
        "Fundamentals": [
          {
            "Decentralized Nature": []
          },
          {
            "Consensus Mechanisms": []
          }
        ]
      },
      {
        "Potential Applications": []
      }
    ]
  }
])}}>clikc</button>
      <SignedOut>
        <SignedOutDiv />
      </SignedOut>
    </div>
  );
};

const SignedInComponent = ({ handleSignedIn }) => {
  useEffect(() => {
    // Call the function when the component renders
    handleSignedIn();
  }, [handleSignedIn]);

  return <SignedInDiv />;
};

export default ProfilePage;
