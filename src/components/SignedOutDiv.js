import React from "react";
import { SignInButton } from "@clerk/nextjs";
const SignedOutDiv = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6">
      <h1 className="text-3xl font-bold text-white-800">Welcome to Path Genie</h1>
      <p className="text-lg text-white-600">
        To access your Path Genie, please provide your identity. Your journey begins with signing in!
      </p>
      <SignInButton mode="modal">
        <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-full text-white font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
          Sign In
        </button>
      </SignInButton>
    </div>
  );
};

export default SignedOutDiv;
