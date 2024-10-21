import React from "react";
import { SignInButton } from "@clerk/nextjs";

const SignedOutDiv = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-[100dvh] p-4 md:p-6 
          bg-gradient-to-b from-gray-900 to-gray-800 text-center">
      <div className="max-w-md mx-auto space-y-6 md:space-y-8 animate-fade-in">
        {/* Title with gradient text effect */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold 
              bg-gradient-to-r from-cyan-300 to-cyan-100 bg-clip-text text-transparent
              tracking-tight">
          Welcome to Path Genie
        </h1>

        {/* Description text */}
        <p className="text-base md:text-lg text-gray-300 px-4 md:px-6 
              leading-relaxed max-w-sm mx-auto">
          To access your Path Genie, please provide your identity.
          Your journey begins with signing in!
        </p>

        {/* Sign In Button with animation */}
        <SignInButton mode="modal">
          <button className="group relative px-6 py-3 md:px-8 md:py-4 
                bg-gradient-to-r from-cyan-600 to-cyan-500 
                hover:from-cyan-500 hover:to-cyan-400
                rounded-full text-white 
                text-base md:text-lg font-semibold 
                transition-all duration-300 ease-in-out
                shadow-[0_0_20px_rgba(0,200,255,0.3)]
                hover:shadow-[0_0_25px_rgba(0,200,255,0.5)]
                transform hover:-translate-y-0.5
                overflow-hidden">
            <span className="relative z-10">Sign In</span>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 -translate-x-full 
                  group-hover:translate-x-0
                  bg-gradient-to-r from-cyan-400 to-cyan-300
                  transition-transform duration-500 ease-out
                  z-0"/>
          </button>
        </SignInButton>
      </div>
    </div>
  );
};
    

export default SignedOutDiv;
