import React, { useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";

const SignedInDiv = () => {
  const { user } = useUser(); // Get the user data
  
  useEffect(() => {
    const fetchUserByEmail = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/user?email=${user.emailAddresses[0].emailAddress}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const userData = await response.json();
          console.log("User data:", userData); // Log the user data
        } catch (error) {
          console.error("Error fetching user by email:", error);
        }
      }
    };

    fetchUserByEmail();
  }, [user]); // Dependency array includes user to run effect when user changes

  return (
    <div className="flex flex-col h-screen w-full bg-[#111827]">
      <div className="flex items-center mx-4 my-2 justify-end">
        <div className="flex items-center">
          <>Let's see your record history</>
        </div>
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
      <div className="flex-1 bg-transparent p-4">
        {/* Placeholder Box */}
        <div className="h-full border-2 border-dashed border-gray-400 flex items-center justify-center bg-[#111827] bg-opacity-50">
          <span className="text-gray-500">Your content goes here.</span>
        </div>
      </div>
    </div>
  );
};

export default SignedInDiv;
