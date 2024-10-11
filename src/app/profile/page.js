'use client';
import React, { useState } from "react";

const ProfilePage = () => {
    const [userName, setUserName] = useState("John Doe");
    const [email, setEmail] = useState("john.doe@example.com");
    const [history, setHistory] = useState([
        "Order #1 - Pizza - Delivered",
        "Order #2 - Burger - Pending",
        "Order #3 - Pasta - Delivered",
    ]);

    return (
        <div className="flex h-screen w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
            {/* Left Side Placeholder */}
            <div className="w-2/3 bg-gray-800 flex items-center justify-center p-6">
                <div className="w-full h-full bg-gray-700 rounded-lg shadow-lg">
                    {/* Placeholder for left side */}
                </div>
            </div>

            {/* Right Side (Profile Picture, Name, History) */}
            <div className="w-1/3 bg-gray-800 p-6 space-y-6">
                <div className="flex items-center space-x-6">
                    {/* Profile Picture */}
                    <div className="w-24 h-24 bg-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">JD</span> {/* Initials for profile picture */}
                    </div>
                    {/* Profile Details */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">{userName}</h1>
                        <p className="text-lg text-gray-400">{email}</p>
                    </div>
                </div>

                {/* History Section */}
                <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Order History</h2>
                    <ul className="space-y-2">
                        {history.map((order, index) => (
                            <li key={index} className="text-gray-300">
                                {order}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
