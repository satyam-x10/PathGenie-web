'use client';
import React from "react";
import { useRouter } from "next/navigation"; // Correct import for Next.js routing

const Navbar = () => {
    const router = useRouter();

    const handleNavigation = (path) => {
        router.push(path); // This will change the route
    };

    return (
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white p-4 shadow-lg">
            <div className="flex items-center justify-between">
                {/* Logo/Brand */}
                <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold">
                        <span className="text-cyan-500">Path</span>Genie
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="space-x-6">
                    <button
                        onClick={() => handleNavigation("/rm")}
                        className="text-lg font-semibold hover:text-cyan-400 transition duration-300"
                    >
                        Map
                    </button>
                    <button
                        onClick={() => handleNavigation("/profile")}
                        className="text-lg font-semibold hover:text-cyan-400 transition duration-300"
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => handleNavigation("/chat")}
                        className="text-lg font-semibold hover:text-cyan-400 transition duration-300"
                    >
                        Chat
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
