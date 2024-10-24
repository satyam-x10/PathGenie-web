"use client";
import React, { useEffect } from "react";
import HomePage from "../components/Homepage.js";
import { useUser } from "@clerk/nextjs";
import { createUser } from "@/utils/actions/userAction.js";

const Page = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    const handleUserCreation = async () => {
      if (isLoaded) {
        if (isSignedIn) {
          try {
            await createUser({ email: user?.emailAddresses[0].emailAddress });

            //console.log(user); // Logs user details when they are loaded and signed in
          } catch (error) {
            console.error("Error creating user:", error);
          }
        } else {
          //console.log("User is not signed in.");
        }
      }
    };

    handleUserCreation();
  }, [isLoaded, isSignedIn, user]);

  return <HomePage />;
};

export default Page;
