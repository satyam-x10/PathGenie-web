"use client";
import { signIn, useSession } from "next-auth/react";
import React from "react";

const Loginpage = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] gap-6 px-4">
      {!session ? (
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sign in to your account to continue
          </p>
          <button
            onClick={() => {
              signIn("google", { callbackUrl: "/" });
            }}
            className="w-full max-w-[300px] border p-2 rounded-md"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back, {session.user.name}!</h1>
        </div>
      )}
    </div>
  );
};

export default Loginpage;
