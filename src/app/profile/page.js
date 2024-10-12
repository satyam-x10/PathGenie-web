"use client";
import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import SignedOutDiv from "@/components/SignedOutDiv";
import SignedInDiv from "@/components/SignedInDiv";

const ProfilePage = () => {
  return (
    <div className="flex h-screen justify-center items-center w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      <SignedIn>
        <SignedInDiv />
      </SignedIn>

      <SignedOut>
        <SignedOutDiv />
      </SignedOut>
    </div>
  );
};

export default ProfilePage;
