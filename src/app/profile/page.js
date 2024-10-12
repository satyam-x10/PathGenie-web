'use client';
import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

const ProfilePage = () => {
    return (
        <div className="flex h-screen w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
            {/* Right Side (Profile Information) */}
            <div className="w-full flex items-center justify-center p-6">
                {/* Display if logged in */}
                <SignedIn>
                    <div className="flex justify-end items-center p-4">
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: 'w-12 h-12',
                                }
                            }}
                        />
                    </div>

                </SignedIn>

                {/* Display if not logged in */}
                <SignedOut>
                    <div className="flex flex-col items-center justify-center h-full space-y-6">
                        <h1 className="text-3xl font-bold">Please Sign In</h1>
                        <SignInButton mode="modal">
                            <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-full text-white font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl">
                                Sign In
                            </button>
                        </SignInButton>
                    </div>
                </SignedOut>
            </div>
        </div>
    );
};

export default ProfilePage;
